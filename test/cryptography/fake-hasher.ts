import { HashComparer } from '@/domain/forum/cryptography/hash-comparer'
import { HashGenerator } from '@/domain/forum/cryptography/hash-generator'

export class FakeHasher implements HashComparer, HashGenerator {
  async hash(plain: string): Promise<string> {
    return plain.concat('-hashed')
  }

  async compare(plain: string, hash: string): Promise<boolean> {
    return plain.concat('-hashed') === hash
  }
}
