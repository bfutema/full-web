import { ILoginRequest } from '@interfaces/e2e/requests/IAuthRequest';
import { ILoginResponse } from '@interfaces/e2e/responses/IAuthResponse';
import { api } from '@services/api';

class AuthService {
  public async login({
    email,
    password,
  }: ILoginRequest): Promise<ILoginResponse> {
    const { data } = await api.post<ILoginResponse>('/auth', {
      email,
      password,
    });

    api.defaults.headers.Authorization = `Bearer ${data.token}`;

    return data;
  }

  public async logout(): Promise<void> {
    await api.delete<void>('/auth');
  }
}

const INSTANCE = new AuthService();

export { INSTANCE as AuthService };
