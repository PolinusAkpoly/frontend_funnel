/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 02/02/2024 10:03:16
*/
import React, { FC } from 'react';
import { NavItem, NavLink } from 'react-bootstrap';

interface StepTabProps {
  href: string;
  label: string;
}

const StepTab: FC<StepTabProps> = ({ href, label }) => (
  <NavItem>
    <NavLink  eventKey={href}>{label}</NavLink>
  </NavItem>
);

export default StepTab;