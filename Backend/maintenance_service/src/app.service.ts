import { Injectable } from '@nestjs/common';

@Injectable()
export class DealService {
  getHello(): string {
    return 'Hello World!';
  }
}
