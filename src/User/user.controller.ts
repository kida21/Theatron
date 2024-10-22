import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserDto } from "src/Dto/UserDto";
import { JwtAuthGuard } from "src/guards/jwt-auth-guard";
import { CurrentUser } from "src/auth/current-custom-decorator";
import { User } from "./schema/userSchema";

@Controller('users')
export class UserController{
    constructor(private readonly userService: UserService) { }
    @Get()
    @UseGuards(JwtAuthGuard)
    getUsers(@CurrentUser() user: User) {
        console.log(user)
        return  this.userService.getUsers()
    }
    @Get('/:id')
    getUser(@Param('id')id) {
       return  this.userService.getUserById(id) 
    }
    @Post()
    createUser(@Body() createUserDto:UserDto){
        return this.userService.CreateUser(createUserDto)
    }
    @Put('/:id')
    updateUser(@Param('id') id ,@Body() updateUserDto:UserDto) {
        return this.userService.UpdateUser(id, updateUserDto);
    }
    @Delete('/:id')
    deleteUser(@Param('id') id) {
         this.userService.DeleteUser(id)
    }


}
