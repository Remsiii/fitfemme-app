import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '../components/ui/button';
import { supabase } from '@/lib/supabase';

const LanguageSettings = (): JSX.Element => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const [userId, setUserId] = React.useState<string>('');
  const [selectedLanguage, setSelectedLanguage] = React.useState<string>('en');

  React.useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // Authentifizierten Benutzer abrufen
        const { data: authUser, error: authError } = await supabase.auth.getUser();
  
        if (authError || !authUser?.user) {
          navigate("/login");
          throw new Error("User is not authenticated");
        }
  
        setUserId(authUser.user.id); // userId wird hier gesetzt
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
  
    fetchUserProfile();
  }, [navigate]);
  
  React.useEffect(() => {
    if (!userId) return; // Abbrechen, wenn userId noch nicht gesetzt ist
  
    const fetchUserLanguage = async () => {
      try {
        const { data, error } = await supabase
          .from('users')
          .select('language')
          .eq('id', userId)
          .maybeSingle();
  
        if (error) {
          console.error('Error fetching language:', error.message);
          return;
        }
  
        if (data) {
          setSelectedLanguage(data.language || 'en');
          i18n.changeLanguage(data.language || 'en');
        }
      } catch (error) {
        console.error("Error fetching user language:", error);
      }
    };
  
    fetchUserLanguage();
  }, [userId, i18n]); // Lauscht auf Änderungen von userId
  

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newLanguage = event.target.value;
    setSelectedLanguage(newLanguage);
    i18n.changeLanguage(newLanguage);
  };

  const handleSave = async () => {
    const { error } = await supabase
      .from('users')
      .update({ language: selectedLanguage })
      .eq('id', userId);

    if (error) {
      console.error('Error updating language:', error.message);
      return;
    }

    navigate(-1); // Go back to the previous page
  };

  return (
    <div className="bg-white min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-xl font-bold mb-4">{t('Language Settings')}</h1>
      <div className="mb-4">
        <label htmlFor="language-select" className="block mb-2">{t('Select Language')}</label>
        <select id="language-select" value={selectedLanguage} onChange={handleLanguageChange} className="p-2 border rounded">
          <option value="en">{t('English')}</option>
          <option value="ro">{t('Română')}</option>
        </select>
      </div>
      <Button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded">
        {t('Save Changes')}
      </Button>
    </div>
  );
};

export default LanguageSettings;
