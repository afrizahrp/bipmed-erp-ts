'use client';

import { ApiAlert } from '@/components/ui/api-alert';
import { useOrigin } from '@/hooks/use-origin';
// import { useParams } from 'react-router-dom';
// import { useContext } from 'react';
// import ModuleContext from '@/provider/module.context';

interface ApiListProps {
  entityName: string; // This can be 'inventory/products', 'cms/categories', etc.
  entityIdName: string | null | undefined;
  // modulename: string; // Added modulename to the props
}

export const ApiList = ({
  entityName,
  entityIdName,
  // modulename,
}: ApiListProps) => {
  // const modulename = useContext(ModuleContext); //|| 'defaultModuleName'; // Fallback to a default value

  // console.log('modulename', modulename); // 'inventory'

  const origin = useOrigin();
  const baseUrl = `${origin}/api`;

  const constructUrl = (entityName: string, entityIdName?: string | null) => {
    let url = `${baseUrl}/${entityName}`;
    if (entityIdName) {
      url += `/${entityIdName}`;
    }
    return url;
  };

  return (
    <>
      <ApiAlert
        title='GET'
        variant='public'
        description={constructUrl(entityName)} // URL without ID, assuming 'inventory' is the modulename
      />
      <ApiAlert
        title='GET'
        variant='public'
        description={constructUrl(entityName, entityIdName)} // URL with ID
      />
    </>
  );
};
