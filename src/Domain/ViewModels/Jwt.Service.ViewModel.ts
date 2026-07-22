import { JWTPayload } from 'jose';

export class PayloadAccessTokenViewModel implements JWTPayload {
  [propName: string]: unknown;
  iss?: string;
  sub?: string;
  aud?: string | string[];
  jti?: string;
  nbf?: number;
  exp?: number;
  iat?: number;
  NationalCode: string;
  Phone: string;
}

export class PayloadRefreshTokenViewModel implements JWTPayload {
  [propName: string]: unknown;
  iss?: string;
  sub?: string;
  aud?: string | string[];
  jti?: string;
  nbf?: number;
  exp?: number;
  iat?: number;
  NationalCode: string;
  Phone: string;
}
