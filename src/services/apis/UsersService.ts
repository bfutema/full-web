import { ICreateUserRequest } from '@interfaces/e2e/requests/IUsersRequest';
import { ICreateUserResponse } from '@interfaces/e2e/responses/IUsersResponse';
import { api } from '@services/api';

class UsersService {
  public async create({
    username,
    name,
    email,
    password,
    password_confirmation,
  }: ICreateUserRequest): Promise<ICreateUserResponse> {
    const { data } = await api.post<ICreateUserResponse>('/users', {
      username,
      name,
      email,
      password,
      password_confirmation,
    });

    return data;
  }
}

const INSTANCE = new UsersService();

export { INSTANCE as UsersService };
