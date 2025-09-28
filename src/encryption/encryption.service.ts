// src/encryption/encryption.service.ts
import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { join } from 'path';
import { createCipheriv, createDecipheriv, randomBytes, publicEncrypt, privateDecrypt } from 'crypto';

@Injectable()
export class EncryptionService {
  private readonly publicKey: string;
  private readonly privateKey: string;

  constructor() {
    // Always load from project root, works for dev and after build
    this.publicKey = readFileSync(join(process.cwd(), 'src/keys/public.pem'), 'utf8');
    this.privateKey = readFileSync(join(process.cwd(), 'src/keys/private.pem'), 'utf8');
  }

  encryptData(payload: string) {
    const aesKey = randomBytes(32);
    const iv = randomBytes(16);
    const cipher = createCipheriv('aes-256-cbc', aesKey, iv);
    let encryptedData = cipher.update(payload, 'utf8', 'hex');
    encryptedData += cipher.final('hex');

    const encryptedKey = publicEncrypt(this.publicKey, aesKey);

    return {
      data1: encryptedKey.toString('hex'),
      data2: `${iv.toString('hex')}:${encryptedData}`,
    };
  }

  decryptData(data1: string, data2: string) {
    const [ivHex, encryptedData] = data2.split(':');
    const iv = Buffer.from(ivHex, 'hex');
    const aesKey = privateDecrypt(this.privateKey, Buffer.from(data1, 'hex'));
    const decipher = createDecipheriv('aes-256-cbc', aesKey, iv);
    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }
}
