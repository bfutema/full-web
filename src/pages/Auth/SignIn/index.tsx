import React, { useRef, useState, useCallback, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import * as Yup from 'yup';

import { Button, Input, Loading } from '@components/atoms';
import { IFormHandles } from '@contexts/ReactFormContext';
import { useAuth } from '@hooks/useAuth';
import { useToast } from '@hooks/useToast';
import { ILoginRequest } from '@interfaces/e2e/requests/IAuthRequest';
import { getSocket } from '@services/socket';
import { getValidationErrors } from '@utils/getValidationErrors';

import { Container, Info, Unform } from './styles';

const SignIn: React.FC = () => {
  const { signIn } = useAuth();
  const { addToast } = useToast();

  const history = useHistory();

  const unformRef = useRef<IFormHandles>(null);

  const [creating, setCreating] = useState<boolean>(false);

  const handleSubmit = useCallback(
    async (formData: ILoginRequest) => {
      const schema = Yup.object().shape({
        email: Yup.string().required('Campo e-mail obrigatório!'),
        password: Yup.string().required('Campo senha obrigatório!'),
      });

      try {
        unformRef.current?.setErrors({});

        await schema.validate(formData, { abortEarly: false });

        setCreating(true);

        await signIn(formData);

        addToast({
          title: 'Seja bem vindo. Login efetuado com sucesso!',
          type: 'success',
        });

        unformRef.current?.reset({});

        history.push('/home');
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
    [addToast, signIn, history],
  );

  useEffect(() => {
    const socket = getSocket();

    socket.on('online', data => console.log(data));

    return () => {
      socket.close();
    };
  }, []);

  return (
    <Container>
      <Info>
        <strong>Entrar</strong>
        <p>
          Ainda não tem uma conta?
          <Link to="/sign-up">Criar conta</Link>
        </p>
      </Info>

      <Unform ref={unformRef} onSubmit={handleSubmit}>
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

        <Button type="submit">
          {creating ? (
            <Loading text="Realizando login" size="small" />
          ) : (
            'Entrar'
          )}
        </Button>
      </Unform>
    </Container>
  );
};

export { SignIn };
