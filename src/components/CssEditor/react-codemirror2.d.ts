declare module 'react-codemirror2' {
    import * as Codemirror from 'codemirror';
    import * as React from 'react';
  
    interface ControlledProps {
      value: string;
      options?: Codemirror.EditorConfiguration;
      onBeforeChange: (editor: Codemirror.Editor, data: Codemirror.EditorChange, value: string) => void;
    }
  
    const Controlled: React.FC<ControlledProps>;
  
    export {
      Controlled
    };
  }
  