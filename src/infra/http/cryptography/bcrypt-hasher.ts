import { hash, compare } from 'bcryptjs'

import { HashComparer } from '@/domain/forum/cryptography/hash-comparer'
import { HashGenerator } from '@/domain/forum/cryptography/hash-generator'

export class BcryptHasher implements HashGenerator, HashComparer {
  private HASH_SALT_LENGTH = 8

  async compare(plain: string, hash: string): Promise<boolean> {
    return compare(plain, hash)
  }

  hash(plain: string): Promise<string> {
    return hash(plain, this.HASH_SALT_LENGTH)
  }
}
