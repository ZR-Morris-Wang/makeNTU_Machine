import { useState, useEffect } from "react"
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
    const [countdown, setCountdown] = useState(false);
    const [timeLeft, setTimeLeft] = useState(10)
    useEffect(()=>{
        if (statusArray.includes(initialState)){
            setCurrent(statusArray.indexOf(initialState))
        }
    },[])

    useEffect(function startTime () {
        if(countdown === true){
            // setTimeLeft(10)
            setTimeLeft((prev)=>(prev-1))
            setInterval(startTime, 1000);          
        }
        else{
            setTimeLeft(10)
        }
    },[countdown])

    const handleStatusChange =  async(id: number, newStatus: string) => {
        try{
            // alert(newStatus)
            await putLaserCutRequestStatus({
                id,
                newStatus
            })
            console.log("successful test3")
        }catch(e){
            console.error(e);
        }
        router.refresh();
    }

    return(
        <>
            {isAdmin === true ? 
            <>
                <div className="inline-flex flex-row">
                    {statusArray.map(
                    (status)=>(statusArray.indexOf(status) === current ? 
                    <div className="w-min text-red-400">{status}</div> : <div className="w-min">{status}</div>)
                    )}
                </div>
                <br/>
                <button onClick={ ()=>{
                    if (current !== 0){
                        setCurrent((prev)=>(prev-1));
                        handleStatusChange(id,statusArray[current-1] )
                    }
                    if (current === 2){
                        setCountdown(true)
                    }
                    else{
                        setCountdown(false)
                    }
                }}>左</button>
                <button onClick={ ()=>{
                    if (current !== 4){
                        setCurrent((prev)=>(prev+1));
                        handleStatusChange(id,statusArray[current+1] )
                    }
                    if (current === 0){
                        setCountdown(true)
                    }
                    else{
                        setCountdown(false)
                    }
                } }>右</button>
                <p className={countdown? "block" : "hidden"}>{timeLeft}</p>
            </> :
            <>
                <div className="inline-flex flex-row">
                    {statusArray.map(
                    (status)=>(statusArray.indexOf(status) === current ? 
                    <div className="w-min text-red-400">{status}</div> : <div className="w-min">{status}</div>)
                    )}
                </div>
            </>
            }
        </>
    )
}