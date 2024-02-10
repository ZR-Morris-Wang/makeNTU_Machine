//import prisma from ".prisma/client";  
import { machine } from "os";
import prisma from "../../../../prisma/client";
import { NextResponse, type NextRequest } from "next/server";

//POST
export async function POST(req: NextRequest) {
  const data = await req.json();
  const { group, filename, material, comment } = data;
  try {
    const groupFinal = await prisma.account.update({
      where:{
        name: group
      },
      data:{
        LaserCutReq:{
          create:{
            machine: 0, 
            filename: filename,
            material: material,
            finalMaterial: "",
            comment: comment,
            status: "",
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
    const dbresultReq = await prisma.laserCutReq.findMany({
      orderBy:[
        {createAt: 'desc'},
      ],
    });
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
  const {newStatus, newMachine, newFinalMaterial} = data;
  // console.log(newStatus);
  const reqID = data.id;
  try{
    const result = await prisma.laserCutReq.update({
      where: {
        id: reqID,
      },
      data:{
        status: newStatus,
        machine: newMachine,
        finalMaterial: newFinalMaterial,
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