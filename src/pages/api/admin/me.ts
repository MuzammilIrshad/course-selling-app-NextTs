// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { ensureDbConnected } from '@/lib';
import { Admin } from '@/db';

import { getUser } from '@/lib/middleware';
import { JwtPayload } from 'jsonwebtoken';

type Data = {
    email?: string,
    password?: string
    user?:string | boolean | JwtPayload
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    await ensureDbConnected();
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        getUser(token, (userId:(boolean | string | JwtPayload)) => {
            if (!userId) {
                res.status(403).json({});
                
            }else{
                res.json({user: userId})
            }
        });
    }
}