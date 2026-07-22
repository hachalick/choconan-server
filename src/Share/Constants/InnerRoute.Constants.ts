const PROTOCOL = 'http';
const DOMAIN = 'localhost:8080';

export const InnerRoute = {
  PROTOCOL,
  DOMAIN,
  BASE_URL: `${PROTOCOL}://${DOMAIN}`,
} as const;
