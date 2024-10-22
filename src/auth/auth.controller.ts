import { Controller, Post, Res, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from 'src/guards/local-auth-guard';
import { CurrentUser } from './current-custom-decorator';
import { User } from 'src/User/schema/userSchema';
import { Response } from 'express';
import { AuthService } from './auth.service';


@Controller('auth')
export class AuthController {
    constructor(private readonly authservice:AuthService){}
    @Post('login')
    @UseGuards(LocalAuthGuard)
    async Login(
        @CurrentUser() user: User,
        @Res({passthrough:true}) response:Response
    ) {
      await this.authservice.login(user,response)   
    }
}
