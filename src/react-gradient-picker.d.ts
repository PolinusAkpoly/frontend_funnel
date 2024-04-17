declare module 'react-gradient-picker' {
    import React, { ChangeEvent } from 'react';
  
    interface GradientPickerProps {
      id?: string;
      value: string;
      onChange: (value: string) => void;
      // Ajoutez d'autres propriétés nécessaires selon la documentation
    }
  
    const GradientPicker: React.FC<GradientPickerProps>;
  
    export default GradientPicker;
  }
  