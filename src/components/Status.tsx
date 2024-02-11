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
    const [ current, setCurrent ] = useState(0);
    const statusArray = ['等','到','切','完'];
    const { putLaserCutRequestStatus } = useLaserCutRequest();
    const [ countdown, setCountdown ] = useState(false);
    const [ timeLeft, setTimeLeft ] = useState(100)
    const [ timer, setTimer ] = useState<NodeJS.Timeout>();
    const [ wrong, setWrong ] = useState(false);
    useEffect(()=>{
        if (statusArray.includes(initialState)){
            setCurrent(statusArray.indexOf(initialState))
        }
    },[])
    
    
    useEffect(() => {
        setTimeLeft(100)
        if(countdown === true){
            const countDownByState = () => setTimeLeft((prev)=>(prev-1));
            setTimer(setInterval(countDownByState, 1000));
        }
        else{
            clearInterval(timer);
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
            {/* <button onClick={()=>{clearInterval(timer);alert("stopped!")}}>stop!</button> */}
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
                    if (current !== 3){
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
                <p className={countdown? "block" : "hidden"}>{String(Math.trunc(timeLeft/60))+":"+String(timeLeft%60)}</p>
            </> :
            <>
                <div className="inline-flex flex-row">
                    {statusArray.map(
                    (status)=>(statusArray.indexOf(status) === current ? 
                    <div className="w-min text-red-400">{status}</div> : <div className="w-min">{status}</div>)
                    )}
                </div>
                <p className={countdown? "block" : "hidden"}>{String(Math.trunc(timeLeft/60))+":"+String(timeLeft%60)}</p>
            </>
            }
        </>
    )
}