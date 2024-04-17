/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 24/10/2023 22:00:56
*/
import React, { useState, useEffect } from 'react';
import i18n from '../../i18next';

const LanguageSelector: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setSelectedLanguage(lng); // Mettez à jour l'état avec la langue sélectionnée
    localStorage.setItem('selectedLanguage', lng);
  };

  const languageOptions = [
    { value: 'fr', label: 'Français', flag: '/assets/flags/fr.png' },
    { value: 'en', label: 'English', flag: '/assets/flags/en.png' },
    { value: 'es', label: 'Español', flag: '/assets/flags/es.png' },
    { value: 'it', label: 'Italien', flag: '/assets/flags/it.png' },
    { value: 'ru', label: 'Russe', flag: '/assets/flags/ru.png' },
    { value: 'uk', label: 'Ukrainien', flag: '/assets/flags/uk.png' },
    { value: 'de', label: 'Allemand', flag: '/assets/flags/de.png' },
    { value: 'nl', label: 'Néerlandais', flag: '/assets/flags/nl.png' }
  ];

  useEffect(() => {
    // Récupérez la langue sélectionnée depuis localStorage (si elle existe)
    const storedLanguage = localStorage.getItem('selectedLanguage');
    if (storedLanguage) {
      setSelectedLanguage(storedLanguage); // Mettez à jour l'état avec la langue stockée
      changeLanguage(storedLanguage);
    }
  }, []);

  return (
    <div className='LanguageSelector'>
      <select className='form-control mt-2 mb-2' onChange={(e) => changeLanguage(e.target.value)} value={selectedLanguage}>
        {languageOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;