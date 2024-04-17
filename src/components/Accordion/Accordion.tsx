/*
  Author: Mudey Formation
  Website: https://mudey.fr/
  App Name: E-commerce with React.Js
  Created At: 07/02/2024 15:32:08
*/
import React, { FC, useState, ReactNode } from 'react';
import './Accordion.css'; // Assurez-vous d'avoir un fichier CSS pour styliser votre accordion

interface AccordionProps {
  title: string;
  children: ReactNode;
}

const Accordion: FC<AccordionProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={` accordion-item p-1 ${isOpen ? 'open bg-dark' : 'closed'}`}>
      <div className="accordion-title d-flex align-items-center justify-content-between" onClick={toggleAccordion}>
        {title}
        {/* Affichage de l'icône d'accordéon ouvert/fermé en fonction de l'état */}
        {isOpen ? <span>&#9660;</span> : <span>&#9654;</span>}
      </div>
      {/* Affichage du contenu de l'accordéon s'il est ouvert */}
      {isOpen && <div className="accordion-content">{children}</div>}
    </div>
  );
};

export default Accordion;
