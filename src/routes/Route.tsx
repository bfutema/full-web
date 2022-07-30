/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { Route as ReactRoute, RouteProps, Redirect } from 'react-router-dom';

import { useAuth } from '@hooks/useAuth';

interface IRouteProps extends RouteProps {
  isPrivate?: boolean;
  component: React.FC<RouteProps>;
}

const Route: React.FC<IRouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { signed } = useAuth();

  if (isPrivate && !signed) return <Redirect to="/sign-in" />;

  if (!isPrivate && signed) return <Redirect to="/home" />;

  const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div>{children}</div>
  );

  return (
    <ReactRoute
      {...rest}
      render={props => {
        return (
          <Layout>
            <Component {...props} />
          </Layout>
        );
      }}
    />
  );
};

export { Route };
