import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';

import { EmailConfirmation } from '@pages/Auth/EmailConfirmation';
import { SignIn } from '@pages/Auth/SignIn';
import { SignUp } from '@pages/Auth/SignUp';

import { Home } from '../pages/Main/Home';
import { Route } from './Route';

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/sign-up" component={SignUp} />
        <Route exact path="/sign-in" component={SignIn} />
        <Route exact path="/email-confirmation" component={EmailConfirmation} />

        <Route exact path="/home" component={Home} isPrivate />
      </Switch>
    </BrowserRouter>
  );
};

export { Routes };
