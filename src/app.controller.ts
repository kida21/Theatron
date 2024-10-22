import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { UserService } from './User/user.service';
@Controller()
export class AppController {
  constructor(private readonly userService: UserService) {}

  // @Get()
  // get(): string{
  //   return this.userService.get()
  // }

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }
}
