import { useState, useEffect } from "react"
import { useRouter } from "next/navigation";
import useLaserCutRequest from "@/hooks/useLaserCutRequest";
type StatusProps = {
    id:number;
    isAdmin:boolean;
    initialState:string;
    timeStarted: Date;
}

export default function( {id, isAdmin, initialState, timeStarted}: StatusProps ){
    const router = useRouter();
    const [ timer, setTimer ] = useState<NodeJS.Timeout>();
    const statusArray = ['等','到','切','完'];
    const { putLaserCutRequestStatus, putLaserCutRequestTimeLeft } = useLaserCutRequest();
    
    const [ current, setCurrent ] = useState(0);
    const [ countdown, setCountdown ] = useState(false);
    const [ timeLeft, setTimeLeft ] = useState(0)
    const [ wrong, setWrong ] = useState(false);

    useEffect(()=>{
        console.log(typeof(timeStarted))
        if (statusArray.includes(initialState)){
            setCurrent(statusArray.indexOf(initialState))
        }
        if(initialState === "到"){
            setCountdown(true)
            setTimeLeft(10000-new Date().getTime()+new Date(timeStarted).getTime())
        }
        // if(initialState === "完"){
        //     setWrong(true)
        // }
    },[])
    
    useEffect(() => {
        setTimeLeft(10)
        if(countdown === true){
            console.log(new Date().getTime())
            console.log(new Date(timeStarted).getTime() )

            const countDownByState = () => setTimeLeft(new Date().getTime()-new Date(timeStarted).getTime());
            setTimer(setInterval(countDownByState, 1000));
        }
        else{
            clearInterval(timer);
        }
    },[countdown])

    useEffect(()=>{
        if(timeLeft <= 0){
            clearInterval(timer);
            setCountdown(false);
            setWrong(true);
            handleStatusChange(id, "過")
        }
    },[timeLeft])

    const handleStatusChange = async(id: number, newStatus: string) => {
        try{
            await putLaserCutRequestStatus({
                id,
                newStatus
            })
            // console.log("successful test3")
        }catch(e){
            console.error(e);
        }
        router.refresh();
    }
    const handleTimeChange = async(id: number, newTimeLeft: Date) => {
        try{
            // alert(newStatus)
            await putLaserCutRequestTimeLeft({
                id,
                newTimeLeft
            })
            // console.log("successful test3")
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
                        handleTimeChange(id, new Date())
                    }
                    else{
                        setCountdown(false)
                    }
                }}>左</button>
                <button onClick={ ()=>{
                    if (current !== 3){
                        setCurrent((prev)=>(prev+1));
                        handleStatusChange(id, statusArray[current+1] )
                    }
                    if (current === 0){
                        setCountdown(true)
                        handleTimeChange(id, new Date())
                    }
                    else{
                        setCountdown(false)
                    }
                } }>右</button>
                {/* <p className={countdown? "block" : "hidden"}>{String(Math.trunc(timeLeft/60))+":"+String(timeLeft%60)}</p> */}
                <p className={countdown? "block" : "hidden"}>{timeLeft}</p>
                <p className={wrong ? "text-red-600" : "text-slate-400" } onClick={()=>{setWrong(false);handleStatusChange(id, "切" )}}>過</p>
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