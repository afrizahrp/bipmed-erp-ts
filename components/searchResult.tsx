'use client';
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
// import { ScrollArea } from './ui/scroll-area';
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
          <Alert
            variant='soft'
            className=' border-l-[8px]'
            color={data.length === 0 ? 'success' : 'dark'}
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
              // <ScrollArea className='h-200 w-full rounded-md border'>
              <div className=' w-full'>
                {/* <ScrollArea className=' w-full overflow-x-auto '> */}
                {/* <ScrollArea className='h-[600px] w-[full] overflow-x-auto rounded-md border p-4'> */}
                {/* <div className='w-full whitespace-nowrap'> */}
                {/* <Table> */}
                <Table wrapperClass='h-[400px] overflow-auto custom-scrollbar'>
                  <TableHeader>
                    <TableRow style={{ textAlign: 'left' }}>
                      {showfields.map((column) => (
                        <TableHead
                          style={{ textAlign: 'left' }}
                          key={column.key}
                          className='bg-default-100 last:pr-6  sticky top-0'
                        >
                          {column.label}
                        </TableHead>
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
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                {/* </div> */}
                {/* </ScrollArea> */}
              </div>
            ) : null}
          </CardContent>
        </Card>
      )}
    </>
  );
}
