import { IsEmpty, IsNotEmpty, IsOptional } from "class-validator";
import * as moment from "moment-timezone";

export class UserDTO{
    @IsNotEmpty()
    userName: string

    @IsNotEmpty()
    accountNumber: number

    @IsNotEmpty()
    emailAddress: string

    @IsNotEmpty()
    identityNumber: number

    @IsOptional()
    created_time: any = moment().tz("Asia/Jakarta")

    @IsOptional()
    updated_time: any = moment().tz("Asia/Jakarta")

}