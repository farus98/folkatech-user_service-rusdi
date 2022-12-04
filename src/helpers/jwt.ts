import { UnauthorizedException } from '@nestjs/common'
import * as jwt from 'jsonwebtoken'

export async function JWTVerify(token: string) {
    try {
        return jwt.verify(token, "Zm9sa2F0ZWNoLXVzZXItcnVzZGk=")
    }
    catch(err) {
        throw new UnauthorizedException(err)
    }
}

export async function JWTSign(data: any) {
    try {
        return jwt.sign(data, "Zm9sa2F0ZWNoLXVzZXItcnVzZGk=", { algorithm: 'RS256'})
    }
    catch(err) {
        throw new UnauthorizedException(err)
    }
}