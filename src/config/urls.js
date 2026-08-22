const defaultBackendOrigin = import.meta.env.DEV ? 'http://localhost:5000' : '';
const defaultWebsiteOrigin = import.meta.env.DEV ? 'http://localhost:3000' : '';

const backendOrigin = (import.meta.env.VITE_BACKEND_URL || defaultBackendOrigin).replace(/\/+$/, '');
const websiteOrigin = (import.meta.env.VITE_WEBSITE_URL || defaultWebsiteOrigin).replace(/\/+$/, '');

export const API_BASE_URL = backendOrigin ? `${backendOrigin}/api/v1` : '/api/v1';
export const SOCKET_BASE_URL = backendOrigin;
export const WEBSITE_ORIGIN = websiteOrigin;
export const POLICIES_URL = websiteOrigin ? `${websiteOrigin}/policies` : '/policies';
export const SUPPORT_URL = websiteOrigin ? `${websiteOrigin}/help-center` : '/help-center';
export const PRIVACY_URL = websiteOrigin ? `${websiteOrigin}/privacy` : '/privacy';
export const TERMS_URL = websiteOrigin ? `${websiteOrigin}/terms` : '/terms';
export const SUPPLIER_ONBOARDING_URL = websiteOrigin
  ? `${websiteOrigin}/sign-up?intent=supplier-onboarding`
  : '/sign-up?intent=supplier-onboarding';
