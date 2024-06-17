'use client';
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { X } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
// import { AlertModal } from './modals/alert-modal';
interface Item {
  id: string;
  name: string;
  [key: string]: any;
}

interface Field {
  key: string;
  label: string;
}

interface TableResultsProps {
  data: Item[];
  showfields: any[];
  title: string;
  description: string;
  // onItemSelected: (item: any) => void;
  // isOpen: boolean;
  // onClose: () => void;
}

export default function SearchResults({
  data,
  showfields,
  title,
  description, // onItemSelected,
}: TableResultsProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);

  const onClose = () => {
    setIsOpen(false);
  };
  const onItemSelected = (item: Item) => {
    setOpenDialog(true);
    // console.log('Selected item', item);
  };

  return (
    <>
      {isOpen && (
        <Card>
          {/* <Alert className='border-l-[8px] bg-gray-100'> */}
          {/* <Alert
            variant='soft'
            className={` ${data.length === 0 ? 'bg-green-300 border-l-[8px]' : 'bg-gray-200'}`}
            
          > */}
          <Alert
            variant='soft'
            className=' border-l-[8px]'
            color={data.length === 0 ? 'success' : 'dark'}
            // className={` ${data.length === 0 ? 'bg-green-400 border-l-[8px]' : 'bg-gray-300'}`}
          >
            <div className='flex justify-between items-center w-full'>
              <div>
                <AlertTitle>{title}</AlertTitle>
                <AlertDescription>{description}</AlertDescription>
              </div>
              <button onClick={onClose} aria-label='Close alert'>
                <X size={18} />
              </button>
            </div>
          </Alert>
          <CardContent>
            {data.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow style={{ textAlign: 'left' }}>
                    {showfields.map((column) => (
                      <TableHead style={{ textAlign: 'left' }} key={column.key}>{column.label}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.map((item) => (
                    <TableRow
                      key={item.id}
                      className='border-none hover:bg-default-300'
                    >
                      {showfields.map((field: Field) => (
                        <TableCell
                          style={{ textAlign: 'left' }}
                          key={field.label}
                        >
                          {item[field.key]}
                        </TableCell>
                      ))}

                      {/* <TableCell>
                        <button
                          onClick={() => onItemSelected(item)}
                          className='text-primary-500'
                        >
                          Lihat
                        </button>
                      </TableCell> */}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : null}
          </CardContent>
        </Card>
      )}
      {/* <AlertModal isOpen={openDialog} onClose={() => setOpenDialog(false)} /> */}
    </>
  );
}
