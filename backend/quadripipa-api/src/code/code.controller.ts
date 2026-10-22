import { Body, Controller, Post } from '@nestjs/common';
import { CodeService } from './code.service.js';
import { VerifyCodeDto } from './dto/verify-code.dto.js';

@Controller('verify-code')
export class CodeController {
  constructor(private readonly codeService: CodeService) {}
  @Post()
  verify(@Body() dto: VerifyCodeDto) {
    return this.codeService.verifyCode(dto);
  }
}
