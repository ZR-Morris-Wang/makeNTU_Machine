'use client'
import React, { useContext } from "react";
import { useRouter } from "next/navigation";
import { AccountContext } from "@/context/Account";

import useRequest from "@/hooks/useRequest";
export default function HeadBar() {
    const router = useRouter();
    const { user } = useContext(AccountContext);
    const { postRequest, getRequest, putRequest } = useRequest();
    const group = 1;
    const type = "3dp";
    const number = 1;
    const filename = "lol";
    const comment = "hi";
    const status = "hi";
    const newStatus = "done";
    const id = 6;
    const testApi = async () =>{
        try{
            await postRequest(
                {
                    group,
                    type,
                    number,
                    filename,
                    comment,
                    status,
                }
            )
            console.log("successful test")
        }
        catch (e){
            console.error(e);
            alert("Error testing");
        }
    }
    const testApitwo = async () => {
        try {
            await getRequest();
            console.log("successful test2")
        }
        catch(e){
            console.error(e);
            alert("Error testing2");
        }
    }
    const testApithree = async () => {
        try{
            await putRequest({
                id,
                newStatus
            })
            console.log("putted")
        }catch(e){
            console.error(e);
            alert("Error testing3");
        }
    }
    return (
        <>
        <div className="h-16 m-2 flex items-center justify-center cursor-pointer" onClick={()=>router.push("/")}>
            <h1 className="text-4xl font-bold text-blue-500">MakeNTU 機台租借網站</h1>
        </div>
        <div className="m-2 flex flex-row justify-end">
            <div className="flex flex-row justify-between">
                {user?.permission==='contestant' && <button
                    className="m-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => router.push("/reserve")}
                >機台登記</button>}
                {(user?.permission!=='admin' && user?.permission!=='contestant') && <button
                    className="m-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => router.push("/login")}
                >登入</button>}
                {(user?.permission==='admin' || user?.permission==='contestant') && <button
                    className="m-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => router.push("/")}
                >登出</button>}
                <button onClick={()=>{testApi()}} className="hover:bg-orange-500">test</button>
                <button onClick={()=>{testApitwo()}} className="hover:bg-red-500">test2</button>
                <button onClick={()=>{testApithree()}} className="hover:bg-purple-500">test3</button>
            </div>
        </div>
        </>
    )
}