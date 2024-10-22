import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './User/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MovieModule } from './movie/movie.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://kidusp22:B7sX5WEfyEiJe2wE@theatron1.qza2j.mongodb.net/Theatron1'),
    UserModule, AuthModule,ConfigModule.forRoot({isGlobal:true}), MovieModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
