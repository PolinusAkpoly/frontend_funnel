/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 24/02/2024 13:55:19
*/
import React, { FC } from 'react';
import './CustomLink.css';
import { Link } from 'react-router-dom';

interface CustomLinkProps {
  stepId: string;
  tunnelId: string;
}

const CustomLink: FC<CustomLinkProps> = ({ stepId, tunnelId }) => {
  const targetUrl = `/template/${stepId}/${tunnelId}/view`;

  const handleClick = () => {
    const isOpen = window.location.href === targetUrl;

    if (isOpen) {
      // Si le lien est déjà ouvert, naviguez au niveau de l'onglet
      window.focus();
    }
  };

  return (
    <Link
      target='_blank'
      to={targetUrl}
      title="Preview"
      className="GreenButtonUi btn btn-primary btn-sm"
      onClick={handleClick}
    >
      <span className="far fa-eye"></span>
    </Link>
  );
};

export default CustomLink;

