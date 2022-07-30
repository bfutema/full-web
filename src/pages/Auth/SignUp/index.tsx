import React, { useRef, useState, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';

import * as Yup from 'yup';

import { Button, Input, Loading } from '@components/atoms';
import { IFormHandles } from '@contexts/ReactFormContext';
import { useToast } from '@hooks/useToast';
import { ICreateUserRequest } from '@interfaces/e2e/requests/IUsersRequest';
import { UsersService } from '@services/apis/UsersService';
import { delay } from '@utils/delay';
import { getValidationErrors } from '@utils/getValidationErrors';

import { Container, Info, Unform } from './styles';

const SignUp: React.FC = () => {
  const { addToast } = useToast();

  const history = useHistory();

  const unformRef = useRef<IFormHandles>(null);

  const [creating, setCreating] = useState<boolean>(false);

  const handleSubmit = useCallback(
    async (formData: ICreateUserRequest) => {
      const schema = Yup.object().shape({
        username: Yup.string().required('Campo username obrigatório!'),
        name: Yup.string().required('Campo nome obrigatório!'),
        email: Yup.string().required('Campo e-mail obrigatório!'),
        password: Yup.string().required('Campo senha obrigatório!'),
        password_confirmation: Yup.string().required(
          'Campo confirmação de senha obrigatório!',
        ),
      });

      try {
        unformRef.current?.setErrors({});

        await schema.validate(formData, { abortEarly: false });

        setCreating(true);

        await UsersService.create(formData);

        await delay(1500);

        addToast({
          title: 'Conta criada com sucesso!',
          type: 'success',
        });

        unformRef.current?.reset({});

        history.push('/sign-in');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          unformRef.current?.setErrors(errors);

          addToast({
            title: 'Primeiro preencha o formulário e tente novamente!',
            type: 'warning',
          });

          return;
        }

        addToast({
          title: 'Ocorreu um erro ao criar sua conta!',
          type: 'error',
        });
      } finally {
        setCreating(false);
      }
    },
    [addToast, history],
  );

  return (
    <Container>
      <Info>
        <strong>Registrar-se</strong>
        <p>
          Já tem uma conta?
          <Link to="/sign-in">Fazer login</Link>
        </p>
      </Info>

      <Unform ref={unformRef} onSubmit={handleSubmit}>
        <Input
          label="Username"
          name="username"
          type="text"
          placeholder="Username"
        />

        <Input
          label="Nome completo"
          name="name"
          type="text"
          placeholder="Nome completo"
        />

        <Input
          label="E-mail"
          name="email"
          type="email"
          placeholder="Seu e-mail"
        />

        <Input
          label="Senha"
          name="password"
          type="password"
          placeholder="Sua senha"
        />

        <Input
          label="Confirmação da senha"
          name="password_confirmation"
          type="password"
          placeholder="Confirme sua senha"
        />

        <Button type="submit">
          {creating ? (
            <Loading text="Criando sua conta" size="small" />
          ) : (
            'Criar conta'
          )}
        </Button>
      </Unform>
    </Container>
  );
};

export { SignUp };
