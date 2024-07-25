import React, { createContext } from 'react';

const ModuleContext = createContext(
  'defaultModuleNamex' // Default value
);

export const ModuleProvider = ({
  children,
  modulename,
}: {
  children: React.ReactNode;
  modulename: string;
}) => {
  return (
    <ModuleContext.Provider value={modulename}>
      {children}
    </ModuleContext.Provider>
  );
};

export default ModuleContext;
