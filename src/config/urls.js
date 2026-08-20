const DEFAULT_BACKEND_ORIGIN = 'http://localhost:5000';
const WEBSITE_ORIGIN = 'http://localhost:3000';

const backendOrigin = (import.meta.env.VITE_BACKEND_URL || DEFAULT_BACKEND_ORIGIN).replace(/\/+$/, '');

export const API_BASE_URL = `${backendOrigin}/api/v1`;
export const SOCKET_BASE_URL = backendOrigin;
export const POLICIES_URL = `${WEBSITE_ORIGIN}/policies`;
