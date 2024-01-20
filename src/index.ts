//for testing
'use client'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
    // await prisma.laserCutReq.create({
    //     data: {
    //         group:1,
    //         type:"3dp",
    //         number:1,
    //         filename:"000",
    //         comment:"hi",
    //         status:"lol"
    //     },
    //   })
    // const allUsers = await prisma.request.findMany()
    // console.log(allUsers)
    await prisma.account.create({
        data:{
            name:"testhaha",
            password:"testhaha",
            permission:"admin"
        },
        })
}
  
main()
.then(async () => {
    await prisma.$disconnect()
})
.catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
})
  