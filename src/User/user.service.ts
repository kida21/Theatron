import { HttpException, HttpStatus, Injectable, NotFoundException, Res} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./schema/userSchema";
import { FilterQuery, Model } from "mongoose";
import { UserDto } from "src/Dto/UserDto";
import { hash } from "bcryptjs";


@Injectable()
export class UserService{
    constructor(@InjectModel(User.name) private userModel : Model<User>){}
    
  async getUsers(){
    try {
      return await this.userModel.find();
    } catch (err) {
      throw new HttpException(err,HttpStatus.FORBIDDEN)
    }
  }
  async getUser(query:FilterQuery<User>) {
    const user = await this.userModel.findOne(query);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }
  async getUserById(id:string) {
    try {
      return await this.userModel.findById(id)
   } catch (err) {
      throw new HttpException(err,HttpStatus.NOT_FOUND)
    }
  }
    
  async CreateUser(createUserDto: UserDto): Promise<User> {
    try {
      return await new this.userModel({
        ...createUserDto,
        password: await hash(createUserDto.password, 10)
      }).save();
         
    }
    catch (err) {
       throw new HttpException(err,HttpStatus.FORBIDDEN)
      }
  }
  async UpdateUser(id: string, updateUserDto: UserDto) {
    try {
       return await this.userModel.findByIdAndUpdate(id, updateUserDto);
    }
    catch (err) {
      throw new HttpException(err,HttpStatus.FORBIDDEN)
    }
  }
     async DeleteUser(id: string) {
    try {
       return await this.userModel.findByIdAndDelete(id);
    }
    catch (err) {
      throw new HttpException(err,HttpStatus.FORBIDDEN)
    }
  }
}