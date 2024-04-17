/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 02/02/2024 09:15:25
*/
import React, { FC, useEffect, useState } from 'react';
import { Nav, Tab, } from 'react-bootstrap';
import StepTab from '../StepTab/StepTab';

interface TabData {
  href: string;
  label: string;
  content: React.ReactNode; // Adjust the type as needed
}

interface StepContentProps {
  tabs: TabData[];
}

const StepContent: FC<StepContentProps> = ({ tabs }) => {
  // If you intend to use activeKey and handleTabSelect in the future, you can keep them.
  // Otherwise, you can remove them.

  const [activeKey, setActiveKey] = useState<string | null>(tabs[0]?.href || null);

  const handleTabSelect = (key: string | null) => {
    console.log({key});
    
    setActiveKey(key);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const runLocalData = async () => {
      // Your local data logic here
    };
    runLocalData();
  }, []);



  return (
    <div className="StepContent p-1">
      <div className="StepContentHeader">
        <Nav variant="tabs" activeKey={activeKey!} onSelect={handleTabSelect}>
          {tabs.map((tab, index) => (
            <StepTab key={index} href={tab.href} label={tab.label} />
          ))}
        </Nav>
      </div>
      <div className="StepContentTab">
        <Tab.Content>
          {tabs.map((tab, index) => (
            <div key={index}>
            {activeKey === tab.href && tab.content}
            </div>
          ))}
        </Tab.Content>
      </div>
    </div>
  );
};

export default StepContent;