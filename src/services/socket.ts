import io from 'socket.io-client';

const getSocket = () => io('http://localhost:3333');

export { getSocket };
