// src/app.module.ts
import { Module } from '@nestjs/common';
import { EncryptionModule } from 'src/encryption/encryption.module';

@Module({
  imports: [EncryptionModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
