import React, { useMemo } from 'react';
import { useTransition } from 'react-spring';

import { Toast } from '@components/atoms';
import { ToastMessage } from '@contexts/ReactToastContext';

import { Container } from './styles';

interface IToastsProps {
  messages: ToastMessage[];
  setMessages: React.Dispatch<React.SetStateAction<ToastMessage[]>>;
}

const Toasts: React.FC<IToastsProps> = ({ messages, setMessages }) => {
  const cancelMap = useMemo(() => new WeakMap(), []);

  const transitions = useTransition(messages, {
    from: { opacity: 0, right: '-120%', life: '100%' },
    keys: item => item.id,
    enter: item => async (next, cancel) => {
      cancelMap.set(item, cancel);

      await next({ opacity: 1, right: '0%' });
      await next({ life: '0%' });
    },
    leave: [{ opacity: 0 }, { right: '-120%' }],
    onRest: (_, __, item) => {
      setMessages(state => state.filter(i => i.id !== item.id));
    },
    config: (_, __, phase) => key =>
      phase === 'enter' && key === 'life'
        ? { duration: 3000 }
        : { tension: 125, friction: 20, precision: 0.1 },
  });

  return (
    <Container>
      {transitions((animation, item) => {
        return <Toast message={item} animation={animation} />;
      })}
    </Container>
  );
};

export { Toasts };
