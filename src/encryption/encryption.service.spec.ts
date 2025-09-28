import { Test, TestingModule } from '@nestjs/testing';
import { EncryptionService } from './encryption.service';

describe('EncryptionService', () => {
  let service: EncryptionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EncryptionService],
    }).compile();

    service = module.get<EncryptionService>(EncryptionService);
  });

  it('should encrypt and decrypt correctly', () => {
    const payload = 'Hello World';
    const { data1, data2 } = service.encryptData(payload);
    const decrypted = service.decryptData(data1, data2);
    expect(decrypted).toBe(payload);
  });
});
