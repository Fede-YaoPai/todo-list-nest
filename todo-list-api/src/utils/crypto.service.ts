import { Injectable } from "@nestjs/common";

const crypto: Crypto = require('crypto');

@Injectable()
export class CryptoService {
  public getRandomUUID(): string {
    return crypto.randomUUID();
  }
}