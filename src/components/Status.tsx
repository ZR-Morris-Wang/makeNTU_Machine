import { useState } from "react"
import { useRouter } from "next/navigation";

import useLaserCutRequest from "@/hooks/useLaserCutRequest";
type StatusProps = {
    id:number;
    isAdmin:boolean;
    initialState:string;
}

export default function( {id, isAdmin, initialState}: StatusProps ){
    const router = useRouter();
    const [current, setCurrent] = useState(0);
    const statusArray = ['等','到','過','切','完'];
    const {putLaserCutRequestStatus} = useLaserCutRequest();
    
    const handleStatusChange =  async(id: number, newStatus: string) => {
        try{
            // alert(newStatus)
            router.refresh();
            await putLaserCutRequestStatus({
                id,
                newStatus
            })
            console.log("successful test3")
        }catch(e){
            console.error(e);
        }
    }

    return(
        <>
            <p>
                {statusArray.map(
                (status)=>(statusArray.indexOf(status) === current ? 
                <p className="text-red-400">{status}</p> : <p>{status}</p>)
                )}
            </p>
            <p>{current}</p>
            <button onClick={ ()=>{setCurrent((prev)=>(current === 0? prev: prev-1));handleStatusChange(id,statusArray[current] )} }>左</button>
            <button onClick={ ()=>{setCurrent((prev)=>(current === 4? prev: prev+1));handleStatusChange(id,statusArray[current] )} }>右</button>
        </>
    )
}