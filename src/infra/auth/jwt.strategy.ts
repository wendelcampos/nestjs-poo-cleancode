import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { z } from "zod";
import { EnvService } from "../env/env.service";

const tokenPayload = z.object({
    sub: z.string().uuid(),
})

export type UserPayload = z.infer<typeof tokenPayload>;

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(env: EnvService) {
        const publicKey = env.get("JWT_PUBLIC_KEY");

        if (!publicKey) {
            throw new Error("JWT_PUBLIC_KEY is not defined in the configuration.");
        }

        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: Buffer.from(publicKey, "base64"),
            algorithms: ["RS256"],
        })
    }

     async validate(payload: UserPayload) {
       return tokenPayload.parse(payload)
    }
}