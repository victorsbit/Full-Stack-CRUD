import { RowDataPacket } from 'mysql2';

export interface User extends RowDataPacket {
  ID: number;
  FirstName: string;
  LastName: string;
  Email: string;
  Password: string;
}
