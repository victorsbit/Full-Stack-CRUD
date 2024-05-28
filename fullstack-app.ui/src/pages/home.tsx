import logo from '@/../public/osten_moove.svg';
import { User } from '@/interfaces/user';
import { getAllUsers } from '@/services/modules/userService';
import { Image } from '@nextui-org/image';
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from '@nextui-org/table';
import { Key, useCallback, useEffect, useState } from 'react';

import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const columns = [
  {
    key: 'iD',
    label: 'ID',
  },
  {
    key: 'firstName',
    label: 'Nome',
  },
  {
    key: 'email',
    label: 'Email',
  },
];

export default function HomePage() {
  const [users, setUsers] = useState<User[]>([]);

  const renderCell = useCallback(
    (user: User, columnKey: Key) => {
      const cellValue = user[columnKey as keyof User];

      switch (columnKey) {
        case 'firstName':
          return <div>{`${user['firstName']} ${user['lastName']}`}</div>;
        default:
          return <div>{cellValue}</div>;
      }
    },
    [users],
  );

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await getAllUsers();

      setUsers(response ?? []);
    };

    void fetchUsers();
  }, []);

  const router = useNavigate();
  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) {
      toast.error('É necessário realizar login para utilizar o sistema.');
      return router('/');
    }
  }, []);

  return (
    <main className='flex flex-col w-full h-full gap-20'>
      <nav className='w-full p-8 bg-[#F5F5F5] shadow-md shadow-[#C0C0C0]'>
        <Image src={logo} width={300} height={0} />
      </nav>
      <h2 className='text-xl md:text-2xl lg:text-3xl px-10'>Listagem de usuários</h2>
      <div className='w-full px-10'>
        <Table aria-label='Example table with dynamic content'>
          <TableHeader columns={columns}>
            {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
          </TableHeader>
          <TableBody items={users}>
            {(item) => (
              <TableRow key={item.iD}>{(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}</TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}
