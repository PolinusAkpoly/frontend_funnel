/*
  Auteur : Mudey Formation
  Site Web : https://mudey.fr/
  Nom de l'application : E-commerce avec React.Js
  Créé le : 24/10/2023 22:00:56
*/
import React, { useState, useEffect } from 'react';
import i18n from '../../i18next';

const LanguageDropdown: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

  // Fonction pour changer la langue
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setSelectedLanguage(lng);
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
    // Récupérer la langue sélectionnée depuis localStorage (si elle existe)
    const storedLanguage = localStorage.getItem('selectedLanguage');
    if (storedLanguage) {
      setSelectedLanguage(storedLanguage);
      changeLanguage(storedLanguage);
    }
  }, []);

  return (
    <div className='language-dropdown m-1'>
      <div className="dropdown">
        <button className="btn btn-outline-secondary dropdown-toggle" style={{color:'white'}} type="button" data-bs-toggle="dropdown" aria-expanded="false">
          {selectedLanguage}
        </button>
        <ul className="dropdown-menu">
          {languageOptions.map((option) => (
            <li className='p-1' key={option.value} onClick={() => changeLanguage(option.value)}>
              {option.label} ({option.value})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LanguageDropdown;
