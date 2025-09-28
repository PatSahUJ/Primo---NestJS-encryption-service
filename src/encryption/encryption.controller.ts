import { Controller, Post, Body } from '@nestjs/common';
import { EncryptionService } from './encryption.service';
import { EncryptDto } from './dto/encrypt.dto';
import { DecryptDto } from './dto/decrypt.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Encryption')
@Controller()
export class EncryptionController {
  constructor(private readonly encryptionService: EncryptionService) {}

  @Post('get-encrypt-data')
  encrypt(@Body() encryptDto: EncryptDto) {
    const { data1, data2 } = this.encryptionService.encryptData(encryptDto.payload);
    return { successful: true, error_code: '', data: { data1, data2 } };
  }

  @Post('get-decrypt-data')
  decrypt(@Body() decryptDto: DecryptDto) {
    const payload = this.encryptionService.decryptData(decryptDto.data1, decryptDto.data2);
    return { successful: true, error_code: '', data: { payload } };
  }
}
