import { hash, genSalt, compareSync } from "bcryptjs";
import crypto from "crypto-js";
import jwt from "jsonwebtoken";

export async function encrypt(message: string) {
  return crypto.AES.encrypt(message, process.env.SECRET).toString();
}

export async function decrypt(message: string) {
  let bytes = crypto.AES.decrypt(message, process.env.SECRET);
  return bytes.toString(crypto.enc.Utf8);
}

export async function tokenizeEmail(email: string, expiresInHours: number) {
  const now = new Date();
  now.setHours(now.getHours() + expiresInHours);

  const message = {
    email,
    expires: now.toISOString(),
  };

  const encryptedMessage = await encrypt(JSON.stringify(message));

  return encodeURIComponent(encryptedMessage);
}

export async function detokenizeEmail(message: string) {
  try {
    const decryptedMessage = await decrypt(decodeURIComponent(message));

    if (!decryptedMessage) return false;

    const token = JSON.parse(decryptedMessage);

    if (token.expires && token.email) {
      const now = new Date();
      const expiry = new Date(token.expires);
      const isExpired = now.getTime() > expiry.getTime();

      if (isExpired) {
        return false;
      }

      return token.email;
    }
  } catch (e) {
    return false;
  }

  return false;
}

export async function hashPassword(password: string) {
  const salt = await genSalt();
  const hashedPassword = await hash(password, salt);
  return hashedPassword;
}

export function verifyPassword(password: string, hashedPassword: string) {
  return compareSync(password, hashedPassword);
}

export function generateToken(payload: { email: string; id: string; exp?: string }) {
  const { exp, email, id } = payload;
  return jwt.sign({email, id}, process.env.SECRET, { expiresIn: exp || "72h" });
}

export function generateCode(codeLength: number) {
  const randomNumbers = [];

  for (let i = 0; i < codeLength; i++) {
    randomNumbers.push(Math.floor(Math.random() * 10));
  }
  return randomNumbers.join('')
}

export function decodeToken(token: string | false) {
  if (!token) {
    return false;
  }

  try {
    return jwt.verify(token, process.env.SECRET);
  } catch (e) {
    return false;
  }
}
