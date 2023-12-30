import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { env } from "../../../utils/env";
import { type NextApiRequest, NextApiResponse } from "next";
const prisma = new PrismaClient();
const secretkey = env.PASSWORD_SECRET;

export async function isAccountUnique(req: NextApiRequest, res: NextApiResponse) {
    const { username } = req.body;
    const result = await prisma.account.findMany({
        where: { name: { equals: username } }
    })
    if(result.length > 0) return res.status(401).json({error: "User already exists"});
    else return res.status(200).json({success: "Unique account"});
}

export async function SignUpApi(req: NextApiRequest, res: NextApiResponse) {
    const { username, password, permission } = req.body;
    const hashedPassword = await bcrypt.hash(password, secretkey);
    const result = await prisma.account.create({
        data: {
            name: username,
            password: hashedPassword,
            permission,
        }
    })
    const token = jwt.sign({usetId: result.name}, secretkey, {expiresIn: env.JWT_EXPIRES_IN});
    return res.json(token);
}

export async function SignInApi(req: NextApiRequest, res: NextApiResponse) {
    const { username, password, permission } = req.body;
    const result = await prisma.account.findFirst({
            where: {
                AND: [
                {permission: {equals: permission}},
                {name: {equals: username}}
                ]
            }
        })
    if(!result) return res.status(404).json({error: "User not found"});
    else {
        const isPasswordValid = await bcrypt.compare(password, result.password);
        if(!isPasswordValid) {
            return res.status(401).json({error: "False password"});
        } else {
            const token = jwt.sign({userId: username}, secretkey, {expiresIn: env.JWT_EXPIRES_IN})
            return res.status(200).json({
                user:{
                    id: result.id,
                    username: result.name,
                    permission: result.permission
                },
                token: token
            })
        }
    }
}