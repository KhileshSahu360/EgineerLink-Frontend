import { io } from 'socket.io-client';

export const initSocket = async () => {
    const options = {
        'force new connection': true,
       reconnectionAttempt: 'Infinity',
        timeout: 10000,
        transports: ['websocket'],
    };
    return io(`${import.meta.env.VITE_BACKEND_URL}collabcode`, options);
    // return io(`http://localhost:3000/collabcode`, options);
};
 