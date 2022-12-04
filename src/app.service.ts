import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDTO } from './dto/user.dto';
import { TokenDTO } from './dto/token.dto';
import {User, UserDocument} from "./schema/user.schema"
import { RedisService } from './helpers/redis/redis.service';
import { JWTSign } from './helpers/jwt';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>, 
    private readonly redisService: RedisService
  ) {}

  async CreateDataUser(body:UserDTO): Promise<User> {
    const insertData = new this.userModel(body)
    const insert = await insertData.save()

    await this.SyncRedis({id: body.accountNumber, data: body})
    await this.SyncRedis({id: body.identityNumber, data: body})

    return insert 
  }

  async UpdateDataUser(id, body:UserDTO): Promise<User> {
    await this.SyncRedis({id: body.accountNumber, data: body})
    await this.SyncRedis({id: body.identityNumber, data: body})

    return await this.userModel.findByIdAndUpdate(id, body, {new: true})
  }

  async DeleteDataUser(id: number): Promise<any>{
    const getData = await this.userModel.findById(id).exec() 
    this.redisService.Delete("user-folkatech-"+getData.identityNumber)
    this.redisService.Delete("user-folkatech-"+getData.accountNumber)
    return await this.userModel.findByIdAndRemove(id);
  }

  async GetUser(param: any): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async GetUserDetail(id: number): Promise<User>{
    const getRedis = await this.redisService.Get("user-folkatech-"+id)

    let data
    if(!getRedis){
      data = await this.userModel.findById(id).exec();
    }else{
      data = getRedis
    }

    return data 
  }

  async GetUserDetailIdentityNumber(id: number): Promise<User>{
    const getRedis = await this.redisService.Get("user-folkatech-"+id)

    let data
    if(!getRedis){
      data = await this.userModel.findById(id).exec();
    }else{
      data = getRedis
    }

    return data 
  }

  async SyncRedis(body: any){
    await this.redisService.Save("user-folkatech-"+body.id, body.data, { ttl: 2 * (60 * 60) });
  }
  
  async GeneratedToken(body: TokenDTO) {
    return await JWTSign(body)
  }

}
