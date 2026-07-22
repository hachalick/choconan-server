import { pbkdf2Sync } from 'crypto';

export class Hashing {
  static Password(content: string, key: string) {
    return pbkdf2Sync(content, key, 200, 64, 'sha256').toString('hex');
  }
}
