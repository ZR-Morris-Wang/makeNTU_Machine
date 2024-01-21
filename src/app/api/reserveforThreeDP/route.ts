//import prisma from ".prisma/client";  
import prisma from "../../../../prisma/client";
import { NextResponse, type NextRequest } from "next/server";

//POST
export async function POST(req: NextRequest) {
    const data = await req.json();
    const { group, machine, filename, loadBearing, material, comment, status } = data;
    console.log(data.group);
    try {
        const user = await prisma.account.update({
          where:{
            name: group
          }, 
          data: {
            ThreeDPReq:{
              create:{
                machine: machine,
                filename: filename,
                loadBearing: loadBearing,
                material: material,
                comment: comment,
                status:"pending",
              }
            }
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
export async function GET (req: NextRequest) {
    try{
        const dbresultReq = await prisma.threeDPReq.findMany();
        return NextResponse.json({dbresultReq}, {status: 200});
    }catch(error){
        console.log("error: ", error);
        return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500 },
        );
    }
}

//PUT
export async function PUT (req: NextRequest) {
    
    const data = await req.json();
    const {newStatus} = data;
    console.log(newStatus);
    const reqID = data.id;
    try{
      const result = await prisma.threeDPReq.update({
        where: {
          id: reqID,
        },
        data:{
          status: newStatus,
        }
      })
      return NextResponse.json({ status: 200 });
    } catch (error) {
        console.log("error: ", error);
        return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500 },
          );
    }
  }