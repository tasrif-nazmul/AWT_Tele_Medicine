import {
  Body,
  Controller,
  Post,
  UsePipes,
  // UseInterceptors,
  // UploadedFile,
  ValidationPipe,
  BadRequestException,
  HttpStatus,
  Get,
  Request,
  InternalServerErrorException,
  UseGuards,
  HttpCode,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import * as bcrypt from "bcrypt";
import { LoginDTO, New_PasswordDTO, UserDTO } from "../doctor.dto";
import { AuthGuard } from "./auth.guard";
import { ValidationError } from "class-validator";
@Controller("api/auth")
// @UseGuards(AuthGuard)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get("/index")
  @HttpCode(HttpStatus.OK) 
  getIndex(): any {
    return "Relax! Patient Auth is working.";
  }

  

@Post("/signup")
@HttpCode(HttpStatus.OK) // Set the status code to 200 (OK)
async Signup(@Body() signup_inf: UserDTO): Promise<any> {
  try {
    const hashed_pass = await bcrypt.hash(signup_inf.password, 12);
    signup_inf.password = hashed_pass;

    const user_id = await this.authService.signUp(signup_inf);
    if (user_id < 0) {
      throw new BadRequestException({
        status: HttpStatus.BAD_REQUEST,
        message: "Email Already Exists",
      });
    } else {
      return { message: "Signup successful. Please check your email for verification." };
    }
  } catch (e) {
    throw new BadRequestException({
      status: HttpStatus.BAD_REQUEST,
      message: e.message,
    });
  }
}



  @Post("/login")
  @HttpCode(HttpStatus.OK) // Set the status code to 200 (OK)
  @UsePipes(new ValidationPipe())
  async Login(@Body() login_info: LoginDTO): Promise<any> {
    return await this.authService.signIn(login_info);
  }

  // @Get("/logout")
  // // @UseGuards(AuthGuard)
  // @UsePipes(new ValidationPipe())
  // async Logout(@Request() req): Promise<any> 
  // {
  //   try {
  //     const token = await this.authService.extractTokenFromHeader(req);
  //     if (token != null && token != "") 
  //     {
  //       return await this.authService.logout(req.user.email, token);
  //     } 
  //     else 
  //     {
  //       throw new BadRequestException("Please provide the token inside header, along with the request",);
  //     }
  //   } 
    
  //   catch (e) 
  //   {
  //     throw new InternalServerErrorException(e.message);
  //   }
  // }

  @Get("/logout")
// @UseGuards(AuthGuard)
@UsePipes(new ValidationPipe())
async Logout(@Request() req): Promise<any> 
{
  try {
    const token = await this.authService.extractTokenFromHeader(req);
    if (token != null && token != "") 
    {
      const logoutResult = await this.authService.logout(req.user.email, token);
      return { message: "Logout successful." };
    } 
    else 
    {
      throw new BadRequestException("Please provide the token inside header, along with the request");
    }
  } 
  catch (e) 
  {
    throw new InternalServerErrorException(e.message);
  }
}


  @Post("/change_password")
  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK) // Set the status code to 200 (OK)
  async Change_password(
    @Request() req,
    new_Password_Object_DTO: New_PasswordDTO,
  ): Promise<any> {
    try {
      const result = await this.authService.UpdatePassword(
        req,
        new_Password_Object_DTO.password,
      );
    } catch (e) {
      throw new InternalServerErrorException(
        "Change Password Auth Controller error = " + e.message,
      );
    } finally {
      //   Destroy the JWT
      return await this.authService.destroy_temporary_JWT(req);
    }
  }
}
