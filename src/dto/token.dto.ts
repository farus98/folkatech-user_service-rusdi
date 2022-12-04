import { IsNotEmpty} from "class-validator";

export class TokenDTO{
    @IsNotEmpty()
    userName: string

    @IsNotEmpty()
    fullname: string

    @IsNotEmpty()
    password: string

}