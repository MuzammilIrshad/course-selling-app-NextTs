import jwt, { JwtPayload } from "jsonwebtoken";

type MyCallback = (arg: (boolean | string | JwtPayload)) => void;
export const getUser = (token: string, cb:MyCallback) => {
    jwt.verify(token, "SECRET", (err, user) => {
        if (err || !user) {
            return cb(false);
        }else{
            return cb(user);
        }
    });
}