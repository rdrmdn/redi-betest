import jwt, { JwtPayload } from 'jsonwebtoken';

export function generateJWT(email: string) {
  return jwt.sign(
    { email },
    process.env.JWT_SECRET as string,
    { expiresIn: '24h' },
  );
};

export function validateJwtToken(token: string): JwtPayload {
  return jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
}
