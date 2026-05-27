<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    http_response_code(204);
    exit;
}

function respond(int $status, array $payload): void
{
    http_response_code($status);
    echo json_encode($payload);
    exit;
}

function loadEnvFile(string $path): void
{
    if (!is_readable($path)) {
        return;
    }

    $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    if ($lines === false) {
        return;
    }

    foreach ($lines as $line) {
        $line = trim($line);

        if ($line === '' || str_starts_with($line, '#')) {
            continue;
        }

        $parts = explode('=', $line, 2);
        if (count($parts) !== 2) {
            continue;
        }

        $key = trim($parts[0]);
        $value = trim($parts[1], " \t\n\r\0\x0B\"'");

        if ($key === '' || env($key) !== '') {
            continue;
        }

        putenv($key . '=' . $value);
        $_ENV[$key] = $value;
        $_SERVER[$key] = $value;
    }
}

function env(string $key): string
{
    $value = getenv($key);
    if (is_string($value) && $value !== '') {
        return trim($value);
    }

    if (isset($_ENV[$key]) && is_string($_ENV[$key]) && $_ENV[$key] !== '') {
        return trim($_ENV[$key]);
    }

    if (isset($_SERVER[$key]) && is_string($_SERVER[$key]) && $_SERVER[$key] !== '') {
        return trim($_SERVER[$key]);
    }

    return '';
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

// .env obok index.html (po build: dist/.env) — nie commituj tego pliku na GitHub
loadEnvFile(dirname(__DIR__) . '/.env');

if (isset($_GET['health'])) {
    respond(200, [
        'ok' => true,
        'hasApiKey' => env('RESEND_API_KEY') !== '' && env('RESEND_API_KEY') !== 're_xxxxxxxxx',
        'hasFromEmail' => env('RESEND_FROM_EMAIL') !== '',
        'hasToEmail' => env('RESEND_TO_EMAIL') !== '',
    ]);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(405, ['error' => 'Method not allowed']);
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

$apiKey = env('RESEND_API_KEY');
$from = formatFromAddress(env('RESEND_FROM_EMAIL'), env('RESEND_FROM_NAME'));
$toEmail = env('RESEND_TO_EMAIL');

if ($apiKey === '' || $apiKey === 're_xxxxxxxxx') {
    respond(500, [
        'error' => 'Brak RESEND_API_KEY na serwerze. Dodaj .env w katalogu strony lub zmienne w panelu Hostinger.',
        'code' => 'MISSING_RESEND_API_KEY',
    ]);
}

if ($from === null) {
    respond(500, [
        'error' => 'Brak RESEND_FROM_EMAIL. Użyj adresu ze zweryfikowanej domeny w Resend.',
        'code' => 'MISSING_RESEND_FROM_EMAIL',
    ]);
}

if ($toEmail === '') {
    respond(500, [
        'error' => 'Brak RESEND_TO_EMAIL na serwerze.',
        'code' => 'MISSING_RESEND_TO_EMAIL',
    ]);
}

if (preg_match('/@(gmail|googlemail|outlook|hotmail|yahoo)\./i', $from)) {
    respond(500, [
        'error' => 'RESEND_FROM_EMAIL nie może być adresem Gmail/Outlook. Zweryfikuj domenę w Resend i ustaw np. kontakt@twoja-domena.pl.',
        'code' => 'INVALID_RESEND_FROM_EMAIL',
    ]);
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
    respond(502, ['error' => 'Połączenie z Resend nie powiodło się.', 'code' => 'CURL_ERROR']);
}

$decoded = json_decode($responseBody, true);

if ($httpCode < 200 || $httpCode >= 300) {
    $message = is_array($decoded) ? ($decoded['message'] ?? 'Resend API error') : 'Resend API error';
    error_log('Resend API error (' . $httpCode . '): ' . $responseBody);
    respond(502, ['error' => $message, 'code' => 'RESEND_API_ERROR']);
}

respond(200, ['ok' => true, 'id' => is_array($decoded) ? ($decoded['id'] ?? null) : null]);
