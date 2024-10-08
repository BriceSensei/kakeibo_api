import jwt, { decode, JwtPayload, SignOptions } from 'jsonwebtoken';

export class JWT {
    verify() {
        jwt.verify(this.__token!, process.env.JWTHASH!);
    }
    __token?: string;
    __values?: { [key: string]: string } = {};
    __options: SignOptions = {};

    get values(): { [key: string]: string } {
        return decode(this.__token!) as { [key: string]: string };
    }

    get token(): string {
        return jwt.sign(this.__values!, process.env.JWTHASH!, this.__options);
    }

    set values(values: { [key: string]: string }) { this.__values = values; }
    set token(token: string) { this.__token = token; }
    set options(options: { [key: string]: string }) { this.__options = options; }
}