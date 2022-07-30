import React, { useState, useCallback, useMemo } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import { useInfiniteQuery } from '@tanstack/react-query';
import { parseCookies } from 'nookies';
import { v4 } from 'uuid';

import { Button } from '@components/atoms';
import { AUTH_COOKIE_TOKEN } from '@constants/auth';
import { useAuth } from '@hooks/useAuth';
import { IUser } from '@interfaces/models/IUser';
import { api } from '@services/api';

import { Container, Users, User } from './styles';

interface IUsers {
  prev: number;
  page: number;
  next: number;
  last: number;
  total: number;
  results: IUser[];
}

interface IQuery {
  q: string;
  page: number;
  limit: number;
  sort: string;
  relations: string;
  pagination: boolean;
}

const Home: React.FC = () => {
  const { signOut } = useAuth();

  const [query, setQuery] = useState<IQuery>({
    q: '',
    page: 1,
    limit: 50,
    pagination: true,
    relations: '',
    sort: '',
  });

  const getUsers = useCallback(
    async (params?: any): Promise<IUsers> => {
      const cookies = parseCookies();

      setQuery({
        ...query,
        page: params?.pageParam || 1,
      });

      const { data: users } = await api.get(
        `/users?page=${params?.pageParam || 1}&limit=${query.limit}`,
        {
          headers: {
            Authorization: `Bearer ${cookies[`${AUTH_COOKIE_TOKEN}`]}`,
          },
        },
      );

      return users;
    },
    [query],
  );

  const { data, isLoading, error, fetchNextPage } = useInfiniteQuery(
    ['users-list'],
    getUsers,
    { getNextPageParam: lastPage => lastPage.page + 1 },
  );

  const results = useMemo(() => {
    const users: IUser[] = [];

    data?.pages.forEach(page => {
      page.results.forEach(user => {
        users.push(user);
      });
    });

    return users;
  }, [data?.pages]);

  return (
    <Container>
      <strong>Home {data?.pages.length}</strong>

      <InfiniteScroll
        dataLength={results.length}
        next={fetchNextPage}
        hasMore
        loader={<div />}
        height={500}
      >
        {isLoading ? (
          <strong>Carregando...</strong>
        ) : error ? (
          <strong>Erro!</strong>
        ) : (
          <Users>
            {results.map(user => {
              return <User key={v4()}>{user.name}</User>;
            })}
          </Users>
        )}
      </InfiniteScroll>

      <Button type="button" onClick={() => fetchNextPage()}>
        Next page
      </Button>

      <Button type="button" onClick={signOut}>
        Logout
      </Button>
    </Container>
  );
};

export { Home };
