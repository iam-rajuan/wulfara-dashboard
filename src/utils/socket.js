import { io } from "socket.io-client";
import { SOCKET_BASE_URL } from "../config/urls";

export const createAppSocket = () => {
  if (typeof window === "undefined") {
    return null;
  }

  return io(SOCKET_BASE_URL, {
    autoConnect: false,
    transports: ["websocket"],
    reconnection: true,
    reconnectionAttempts: 2,
    reconnectionDelay: 1500,
    timeout: 5000,
  });
};
