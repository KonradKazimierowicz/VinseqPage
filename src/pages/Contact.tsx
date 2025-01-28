import { GridPattern } from "@/components/ui/grid-pattern";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { MailIcon, PhoneIcon, MapPinIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { FAQSection } from "./Home";


interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  website: string;
  service: string;
  message: string;
  files: FileList | null;
  gdpr: boolean;
}

const ContactHero = () => (
  <section className="relative bg-slate-100 flex flex-col justify-center items-center h-[35vh] pt-20 pb-10 overflow-hidden">
    <GridPattern
      width={40}
      height={40}
      className="absolute inset-0 opacity-50 [mask-image:linear-gradient(180deg,white_0%,white_10%,transparent_100%)]"
    />
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="z-10 text-center"
    >
      <h1 className="text-5xl font-bold mb-4">Skontaktuj się z nami</h1>
      <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
        Jesteśmy tutaj, aby pomóc Ci osiągnąć sukces w internecie. Skontaktuj się z nami i rozpocznij swoją drogę do lepszej widoczności online.
      </p>
    </motion.div>
  </section>
);

const ContactInfo = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    website: "",
    service: "",
    message: "",
    files: null,
    gdpr: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitStatus('success');
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      files: e.target.files
    }));
  };

  const handlePhoneInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Remove all non-digit characters except + (at the beginning)
    const cleaned = value.replace(/[^\d+]/g, '').replace(/^\+*/, '+').replace(/\+.+\+/g, '+');
    
    // Limit to max 12 digits after the + sign
    const formatted = cleaned.slice(0, cleaned.startsWith('+') ? 13 : 12);
    
    setFormData(prev => ({
      ...prev,
      phone: formatted
    }));
  };

  const validatePhone = (phone: string) => {
    // Polish phone number format: +48 XXX XXX XXX or XXX XXX XXX
    const phoneRegex = /^\+?48?\d{9}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  };

  const handleWebsiteInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.toLowerCase();
    
    // If user didn't enter http(s):// or www., add https://
    if (value && !value.match(/^https?:\/\//) && !value.startsWith('www.')) {
      value = 'https://' + value;
    }
    // If user entered www. without http(s):/, add https://
    if (value.startsWith('www.')) {
      value = 'https://' + value;
    }
    
    setFormData(prev => ({
      ...prev,
      website: value
    }));
  };

  const validateUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <section className="bg-gradient-to-b from-slate-100 to-slate-50 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <h2 className="text-2xl font-bold mb-6">Napisz do nas</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">
                    Imię <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    placeholder="Jan"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">
                    Nazwisko <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    placeholder="Kowalski"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">
                    Email <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    type="email"
                    placeholder="jan@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">
                    Telefon
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handlePhoneInput}
                    onBlur={(e) => {
                      if (e.target.value && !validatePhone(e.target.value)) {
                        e.target.setCustomValidity('Wprowadź poprawny numer telefonu (format: +48 XXX XXX XXX)');
                      } else {
                        e.target.setCustomValidity('');
                      }
                    }}
                    type="tel"
                    placeholder="+48 123 456 789"
                    pattern="^\+?48?\d{9}$"
                    title="Wprowadź poprawny numer telefonu (format: +48 XXX XXX XXX)"
                    maxLength={13}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="website">
                    Firma/Strona WWW
                  </Label>
                  <Input
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleWebsiteInput}
                    onBlur={(e) => {
                      if (e.target.value && !validateUrl(e.target.value)) {
                        e.target.setCustomValidity('Wprowadź poprawny adres strony internetowej');
                      } else {
                        e.target.setCustomValidity('');
                      }
                    }}
                    type="url"
                    placeholder="https://www.twojafirma.pl"
                    pattern="https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)"
                    title="Wprowadź poprawny adres URL (np. https://www.twojafirma.pl)"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="service">
                    Interesująca usługa
                  </Label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Wybierz usługę</option>
                    <option value="web-design">Projektowanie stron WWW</option>
                    <option value="buissnes-card">Wizytówka Google</option>
                    <option value="seo">SEO</option>
                    <option value="digital-marketing">Marketing cyfrowy</option>   
                    <option value="other">Inne</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">
                  Wiadomość <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  placeholder="Twoja wiadomość..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="files">
                  Załączniki
                </Label>
                <input
                  id="files"
                  name="files"
                  type="file"
                  onChange={handleFileChange}
                  multiple
                  className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Maksymalny rozmiar pliku: 10MB
                </p>
              </div>

              <div className="flex items-start space-x-2">
                <input
                  id="gdpr"
                  name="gdpr"
                  type="checkbox"
                  checked={formData.gdpr}
                  onChange={handleInputChange}
                  required
                  className="mt-1"
                />
                <label htmlFor="gdpr" className="text-sm text-muted-foreground">
                  Wyrażam zgodę na przetwarzanie moich danych osobowych zgodnie z polityką RODO. <span className="text-destructive">*</span>
                </label>
              </div>

              <div className="text-sm text-muted-foreground">
                <span className="text-destructive">*</span> Pola wymagane
              </div>

              <ShimmerButton 
                className="w-full" 
                disabled={isSubmitting}
              >
                {isSubmitting ? "Wysyłanie..." : "Wyślij wiadomość"}
              </ShimmerButton>

              <AnimatePresence>
                {submitStatus !== 'idle' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={cn(
                      "p-4 rounded-lg text-center",
                      submitStatus === 'success' ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    )}
                  >
                    {submitStatus === 'success' 
                      ? "Wiadomość została wysłana! Skontaktujemy się wkrótce."
                      : "Wystąpił błąd. Spróbuj ponownie później."}
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-2xl font-bold mb-6">Informacje kontaktowe</h2>
              <p className="text-muted-foreground mb-8">
                Wybierz najwygodniejszą dla siebie formę kontaktu. Jesteśmy dostępni w dni robocze w godzinach 9:00-17:00.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <PhoneIcon className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium">Telefon</h3>
                  <a href="tel:+48669281812"><p className="text-muted-foreground">+48 669 281 812</p></a>
                  <p className="text-sm text-muted-foreground mt-1">
                    Pon-Pt: 8:00 - 17:00
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <MailIcon className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium">Email</h3>
                  <a href="mailto:vinseq7@gmail.com"><p className="text-muted-foreground">vinseq7@gmail.com</p></a>
                  <p className="text-sm text-muted-foreground mt-1">
                    Odpowiadamy w ciągu 24 godzin
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <MapPinIcon className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium">Adres</h3>
                  <p className="text-muted-foreground">Głogów, Polska</p>
                 
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="mt-8 h-[300px] rounded-lg overflow-hidden">
              <iframe
                width="100%"
                height="100%"
                src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=G%C5%82og%C3%B3w,%20Polska+(Vinseq%20Studio)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <main>
      <ContactHero />
      <ContactInfo />
      <FAQSection />
    </main>
  );
}

export default Contact;
