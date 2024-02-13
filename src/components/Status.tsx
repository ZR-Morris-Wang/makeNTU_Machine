import { useState, useEffect } from "react"
import { useRouter } from "next/navigation";
import useLaserCutRequest from "@/hooks/useLaserCutRequest";
type StatusProps = {
    id:number;
    isAdmin:boolean;
    initialState:string;
    timeStarted: Date;
}

type indRequestForStatus = {
    id: number
    timeleft: Date
    status: string
}

export default function( {id, isAdmin, initialState, timeStarted}: StatusProps ){
    const router = useRouter();
    const [ timer, setTimer ] = useState<NodeJS.Timeout>();
    const statusArray = ['等','到','切','完'];
    const { getLaserCutRequest, putLaserCutRequestStatus, putLaserCutRequestTimeLeft } = useLaserCutRequest();
    const [ requestList, setRequestList ] = useState<indRequestForStatus[]>();
    
    const [ current, setCurrent ] = useState(0);//now status
    const [ timeCreated, setTimeCreated] = useState<Date>()//the latest time switched to "到"
    const [ countdown, setCountdown ] = useState(false);//whether counting down or not
    const [ timeLeft, setTimeLeft ] = useState(0);//left time
    const [ wrong, setWrong ] = useState(false);//pass number or not
    
    function checkID(req:indRequestForStatus){
        return req.id === id
    }

    const gReq = async () => {
        try{
            const requestListInit = await getLaserCutRequest();
            const requestListJson:indRequestForStatus[] = requestListInit["dbresultReq"];
            setRequestList(requestListJson);
            if (typeof(requestListJson.find(checkID)) != undefined) {
                setTimeCreated(requestListJson.find(checkID)?.timeleft)
                console.log(requestListJson.find(checkID)?.timeleft)
            }
            else{
                setTimeCreated(new Date(0))
            }   
        }
        catch(e){
            console.log(e);
        }
    }

    useEffect(()=>{
        if (statusArray.includes(initialState)){
            setCurrent(statusArray.indexOf(initialState))
        }
        if(initialState === "到"){
            setCountdown(true)
            setTimeLeft(Math.trunc(50-(new Date().getTime()-new Date(timeCreated).getTime())/1000))
        }
        gReq();
        // if(initialState === "完"){
        //     setWrong(true)
        // }
    },[])
    
    useEffect(() => {
        // setTimeLeft(50)
        // console.log("cd")
        if(countdown === true){
            // console.log(new Date())
            // console.log(new Date(timeStarted))
            gReq()
            const countDownByState = () => {
                setTimeLeft(Math.trunc(50-(new Date().getTime()-new Date(timeCreated).getTime())/1000));
                console.log(Math.trunc(50-(new Date().getTime()-new Date(timeCreated).getTime())/1000))
            }
            setTimer(setInterval(countDownByState, 1000));

        }
        else{
            clearInterval(timer);
        }
    },[countdown])

    useEffect(()=>{
        // console.log("tlchanged")
        if(timeLeft < 0){
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
        }catch(e){
            console.error(e);
        }
        router.refresh();
    }
    const handleTimeChange = async(id: number, newTimeLeft: Date) => {
        try{
            await putLaserCutRequestTimeLeft({
                id,
                newTimeLeft
            })
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
                <p className={wrong ? "text-red-600" : "text-slate-400" } onClick={()=>{setWrong(false);handleStatusChange(id, "切" );setCurrent(2)}}>過</p>
            </> :
            <>
                <div className="inline-flex flex-row">
                    {statusArray.map(
                    (status)=>(statusArray.indexOf(status) === current ? 
                    <div className="w-min text-red-400">{status}</div> : <div className="w-min">{status}</div>)
                    )}
                </div>
                <p className={countdown? "block" : "hidden"}>{timeLeft}</p>
            </>
            }
        </>
    )
}