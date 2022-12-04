import { Controller, Get, Param, UseInterceptors, UseGuards, Headers, Post, Body, Put, Delete } from '@nestjs/common';
import { AppService } from './app.service';
import { TokenDTO } from './dto/token.dto';
import { UserDTO } from './dto/user.dto';
import { HeaderGuard } from './helpers/header.guard';

import { ResponseMappingInput, ResponseMappingRetrieve } from "./middleware/interceptor/response/success";

@Controller("/folkatech")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(HeaderGuard)
  @UseInterceptors(ResponseMappingRetrieve)
  @Get("/user")
  async GetUser(@Param() param: any){
    return await this.appService.GetUser(param)
  }

  @UseGuards(HeaderGuard)
  @UseInterceptors(ResponseMappingRetrieve)
  @Get("/user/:accountNumber")
  async GetUserDetail(@Param() accountNumber: number){
    return await this.appService.GetUserDetail(accountNumber)
  }

  @UseGuards(HeaderGuard)
  @UseInterceptors(ResponseMappingRetrieve)
  @Get("/user/:identityNumber")
  async GetUserIdentityNumber(@Param() identityNumber: number){
    return await this.appService.GetUserDetailIdentityNumber(identityNumber)
  }

  @UseGuards(HeaderGuard)
  @UseInterceptors(ResponseMappingInput)
  @Post("/user")
  async CreateUser(@Body() body: UserDTO){
    return await this.appService.CreateDataUser(body)
  }

  @UseGuards(HeaderGuard)
  @UseInterceptors(ResponseMappingInput)
  @Put("/user/:id")
  async UpdateUser(@Body() body: any, @Param() id: number){
    return await this.appService.UpdateDataUser(id, body)
  }

  @UseGuards(HeaderGuard)
  @UseInterceptors(ResponseMappingRetrieve)
  @Delete("/user/:id")
  async DeleteUser(@Param() id: any){
    return await this.appService.DeleteDataUser(id)
  }

  @UseInterceptors(ResponseMappingInput)
  @Post("/generated_token")
  async GeneratedToken(@Body() body: TokenDTO){
    return await this.appService.GeneratedToken(body)
  }
}
