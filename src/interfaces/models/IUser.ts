import { Full, IGeneric } from '@interfaces/generic/IGeneric';

export interface IUser extends Full<IGeneric> {
  username: string;
  name: string;
  email: string;
}
