import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { Response } from 'express';
import { User } from 'src/User/schema/userSchema';
import { UserService } from 'src/User/user.service';
import { TokenPayload } from './token-payload.inteface';


@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly configService: ConfigService,
        private readonly jwtService:JwtService
) { }
    async verifyUser(email: string, password: string) {
        try {
         const user = await this.userService.getUser({ email, })
        if (!user) {
            throw new NotFoundException()
            }
        const authenticated = await compare(password,user.password)    
        if (!authenticated) {
            throw new UnauthorizedException();  
            }
            return user;
        } catch (err) {
            throw new UnauthorizedException()
        }
    }
    async login(user: User, response: Response) {
        const expireAccessToken = new Date()
        expireAccessToken.setMilliseconds(
            expireAccessToken.getTime() + parseInt(
                this.configService.getOrThrow<string>('JWT_ACCESS_TOKEN_EXPIRATION'),
            ),
        )
        const tokenPayload: TokenPayload = {
            userId:user._id.toHexString()
        }
        const accessToken = this.jwtService.sign(tokenPayload, {
            secret: this.configService.getOrThrow('JWT_ACCESS_TOKEN_SECRET'),
            expiresIn:this.configService.getOrThrow('JWT_ACCESS_TOKEN_EXPIRATION')
        })
        response.cookie('Authentication', accessToken, {
            httpOnly: true,
            expires: expireAccessToken,
            secure:this.configService.get('NODE_ENV')==='production'
        })
    }
}
