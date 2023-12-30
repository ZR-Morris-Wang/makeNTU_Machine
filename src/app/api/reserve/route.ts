import prisma from ".prisma/client";
//import { type NextApiRequest, NextApiResponse } from "next";
import { NextResponse, type NextRequest } from "next/server";

//POST
export async function POST(req: NextRequest, ) {
    const data = await req.json();
    const { group, type, filename, comment } = data;
    try {
        const user = await prisma.request.create({
            data: {
                group: group,
                type: type,
                filename: filename,
                comment: comment,
                number: 0,
                status:"pending",
            }
        });
        return NextResponse.json({ status: 200 });
    } catch (error) {
        console.log("error: ", error);
        return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500 },
          );
    }
}

// GET
// export async function GET (req: NextRequest, res:NextResponse) {
//     const resultReq = await prisma.request.findMany();
//     return res.status(200).json(resultReq);
// }

//POST
// export const UpdateStatus = async (req: NextRequest, res: NextResponse) => {
//     const { id, username, type, title, note, number, status} = req.body;
//     try{
//       const result = await prisma.request.update({
//         where: {
//           id: id,
//         },
//         data:{
//           group: username,
//           type: type,
//           filename: title,
//           comment: note,
//           number: 0,
//           status: status,
//         }
//       })
//       return res.status(200).json({ data: result});
//     } catch (error) {
//       return res.status(400).json({ error: "unable to update status"});
//     }
//   }