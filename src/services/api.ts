import axios from 'axios';
import { parseCookies } from 'nookies';

import { AUTH_COOKIE_TOKEN } from '@constants/auth';

const cookies = parseCookies();

const api = axios.create({
  baseURL: 'http://localhost:3333',
  headers: { Authorization: `Bearer ${cookies[`${AUTH_COOKIE_TOKEN}`]}` },
});

export { api };
