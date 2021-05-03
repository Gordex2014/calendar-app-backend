export interface JWTUserPayload {
  name: string;
  uid: string;
  iat: number;
  exp: number;
}
