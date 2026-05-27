<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

function respond(int $status, array $payload): void
{
    http_response_code($status);
    echo json_encode($payload);
    exit;
}

function escapeHtml(string $value): string
{
    return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

function formatFromAddress(string $fromEmail, string $displayName = ''): ?string
{
    $email = trim($fromEmail);
    if ($email === '') {
        return null;
    }

    if (str_contains($email, '<')) {
        return $email;
    }

    $name = trim($displayName);
    if ($name !== '') {
        return $name . ' <' . $email . '>';
    }

    return $email;
}

$raw = file_get_contents('php://input');
$body = json_decode($raw ?: '{}', true);

if (!is_array($body)) {
    respond(400, ['error' => 'Invalid JSON']);
}

$name = trim((string) ($body['name'] ?? ''));
$companyName = trim((string) ($body['companyName'] ?? ''));
$email = trim((string) ($body['email'] ?? ''));
$service = trim((string) ($body['service'] ?? ''));
$message = trim((string) ($body['message'] ?? ''));

if ($name === '' || $message === '') {
    respond(400, ['error' => 'Missing required fields']);
}

$apiKey = trim((string) (getenv('RESEND_API_KEY') ?: ''));
$from = formatFromAddress(
    (string) (getenv('RESEND_FROM_EMAIL') ?: ''),
    (string) (getenv('RESEND_FROM_NAME') ?: ''),
);
$toEmail = trim((string) (getenv('RESEND_TO_EMAIL') ?: ''));

if ($apiKey === '' || $apiKey === 're_xxxxxxxxx') {
    respond(500, ['error' => 'Missing RESEND_API_KEY on server']);
}

if ($from === null) {
    respond(500, ['error' => 'Missing RESEND_FROM_EMAIL on server']);
}

if ($toEmail === '') {
    respond(500, ['error' => 'Missing RESEND_TO_EMAIL on server']);
}

$html = '
  <h2>Nowe zapytanie kontaktowe</h2>
  <p><strong>Imię i nazwisko:</strong> ' . escapeHtml($name) . '</p>
  <p><strong>Firma:</strong> ' . escapeHtml($companyName !== '' ? $companyName : '-') . '</p>
  <p><strong>Email:</strong> ' . escapeHtml($email !== '' ? $email : '-') . '</p>
  <p><strong>Obszar:</strong> ' . escapeHtml($service !== '' ? $service : '-') . '</p>
  <hr />
  <p><strong>Opis potrzeby:</strong></p>
  <p>' . nl2br(escapeHtml($message)) . '</p>
';

$payload = [
    'from' => $from,
    'to' => [$toEmail],
    'subject' => 'Nowe zapytanie: ' . ($service !== '' ? $service : 'Kontakt'),
    'html' => $html,
];

if ($email !== '') {
    $payload['reply_to'] = $email;
}

$ch = curl_init('https://api.resend.com/emails');
curl_setopt_array($ch, [
    CURLOPT_POST => true,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER => [
        'Authorization: Bearer ' . $apiKey,
        'Content-Type: application/json',
    ],
    CURLOPT_POSTFIELDS => json_encode($payload),
    CURLOPT_TIMEOUT => 30,
]);

$responseBody = curl_exec($ch);
$curlError = curl_error($ch);
$httpCode = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($responseBody === false) {
    error_log('Resend curl error: ' . $curlError);
    respond(502, ['error' => 'Failed to send email']);
}

$decoded = json_decode($responseBody, true);

if ($httpCode < 200 || $httpCode >= 300) {
    $message = is_array($decoded) ? ($decoded['message'] ?? 'Resend API error') : 'Resend API error';
    error_log('Resend API error (' . $httpCode . '): ' . $responseBody);
    respond(502, ['error' => $message]);
}

respond(200, ['ok' => true, 'id' => is_array($decoded) ? ($decoded['id'] ?? null) : null]);
