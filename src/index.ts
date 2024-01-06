// //for testing
// import { PrismaClient } from '@prisma/client'

// const prisma = new PrismaClient()

// async function main() {
//     await prisma.request.create({
//         data: {
//             group:1,
//             type:"3dp",
//             number:1,
//             filename:"000",
//             comment:"hi",
//             status:"lol"
//         },
//       })
//     const allUsers = await prisma.request.findMany()
//     console.log(allUsers)
// }
  
// main()
// .then(async () => {
//     await prisma.$disconnect()
// })
// .catch(async (e) => {
//     console.error(e)
//     await prisma.$disconnect()
//     process.exit(1)
// })
  