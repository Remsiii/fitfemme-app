import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { supabase } from "@/lib/supabase"; // Importiere deine Supabase-Instanz

// Typen für Supabase-Daten
interface UserLanguage {
  language?: string;
}

// Funktion, um die Sprache aus der Datenbank zu laden
const fetchUserLanguage = async (): Promise<string> => {
  const { data: authUser, error: authError } = await supabase.auth.getUser();

  if (authError || !authUser?.user) return "en"; // Standard: Englisch
  const userId = authUser.user.id;

  const { data, error } = await supabase
    .from("users")
    .select("language")
    .eq("id", userId)
    .maybeSingle();

  if (error || !data) return "en"; // Fallback-Sprache
  return data.language || "en";
};

// Initialisiere i18n mit der DB-Sprache
(async () => {
  const userLanguage = await fetchUserLanguage();

  i18n.use(initReactI18next).init({
    resources: {
      en: {
        translation: {
          'Select Language': 'Select Language',
          'Save Changes': 'Save Changes',
          'Edit Profile': 'Edit Profile',
          'Settings': 'Settings',
          'Change Photo': 'Change Photo',
          'Name': 'Name',
          'Email': 'Email',
          'Age': 'Age',
          'Height (cm)': 'Height (cm)',
          'Weight (kg)': 'Weight (kg)',
          'Fitness Goal': 'Fitness Goal',
          'English': 'English',
          'Română': 'Romanian',
          'Contact Us': 'Contact Us',
          'Privacy Policy': 'Privacy Policy',
          'Welcome Back': 'Welcome Back',
          'Today Target': 'Today Target',
          'Check': 'Check',
          'ActivityIcon Status': 'Activity Status',
          'Ritm Cardiac': 'Heart Rate',
          'Sleep': 'Sleep',
          'Personal Data': 'Date Personale',
          'Achievement': 'Realizare',
          'Activity': 'Activitate',
          'Workout Progress': 'Progresul de antrenament',
          'Logout': 'Deconectare',
        }
      },
      ro: {
        translation: {
          'Select Language': 'Selectează Limba',
          'Save Changes': 'Salvează Modificările',
          'Edit Profile': 'Editează Profilul',
          'Settings': 'Setări',
          'Change Photo': 'Schimbă Fotografia',
          'Name': 'Nume',
          'Email': 'Email',
          'Age': 'Vârstă',
          'Height (cm)': 'Înălțime (cm)',
          'Weight (kg)': 'Greutate (kg)',
          'Fitness Goal': 'Obiectiv de Fitness',
          'English': 'Engleză',
          'Română': 'Română',
          'Contact Us': 'Contacteaza-ne',
          'Privacy Policy': 'Politica de Confidentă',
          'Welcome Back': 'Bine ai revenit',
          'Today Target': 'Ținta de azi',
          'Check': 'Verifică',
          'ActivityIcon Status': 'Stare Activitate',
          'Ritm Cardiac': 'Ritm Cardiac',
          'Sleep': 'Somn',
          'Personal Data': 'Date Personale',
          'Achievement': 'Realizare',
          'Activity': 'Activitate',
          'Workout Progress': 'Progresul de antrenament',
          'Logout': 'Deconectare',
        }
      }
    },
    lng: userLanguage, // Sprache aus der DB setzen
    fallbackLng: "en", // Fallback-Sprache
    interpolation: {
      escapeValue: false,
    },
  });
})();

export default i18n;
