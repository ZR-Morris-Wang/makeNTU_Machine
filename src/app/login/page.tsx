"use client"
import React, { useEffect } from "react";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import InputArea from "@/components/ui/InputArea";
import { SignInApi, SignUpApi, isAccountUnique } from "../api/account/route";

export default function Login() {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const comfirmPasswordRef = useRef<HTMLInputElement>(null);
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [comfirmPassword, setComfirmPassword] = useState("");
    const [permission, setPermission] = useState("");
    const [isSignUp, setIsSignUp] = useState(false);

    useEffect(() => {
        console.log("useEffect: ", username, password, permission)
        if (permission !== "") {
            direct();
        }
    }, [permission])

    const handleRegister = async () => {
        if (!checkInput()) {
            return;
        }
        try {
            const { token: token } = await signUpApi({ account, password, permission });
            localStorage.setItem("jwt-token: ", token);
        } catch(error) {
            alert("發生錯誤");
            console.log(error);
            return;
        }
    }

    const handleLogin = async () => {
        console.log(username, password);
        if (!checkInput()) {
            return;
        }
        try {
            const { token: token } = await signInApi({ account, password });
            localStorage.setItem("jwt-token: ", token);
        } catch(error) {
            alert("發生錯誤");
            console.log(error);
            return;
        }
    }

    const checkInput = async () => {
        if (!isSignUp && (username === "" || password === "")) {
            alert("帳號或密碼不得為空");
            return false;
        } else if (isSignUp) {
            if (username === "" || password === "" || comfirmPassword === "")    {
                alert("帳號或密碼不得為空");
                return false;    
            } else if (password !== comfirmPassword) {
                alert("密碼不一致");
                return false;
            }
        }
        if (username.startsWith("admin")) {
            setPermission("admin");
        } else if (username.startsWith("team")) {
            setPermission("contestant");
        } else {
            alert("帳號格式錯誤");
            return false;
        }
        console.log("checkInput: ", username, password, comfirmPassword, permission)
        return true;
    }
    const direct = () => {
        if (permission === 'contestant')  {
            router.push(`contestant/${username}`);
        } else if (permission === 'admin') {
            router.push(`admin/${username}`);
        } else {
            alert("找不到權限");
            return;
        }
    }

    return (
        <>
        <div className="m-2 flex flex-col items-center justify-between">
            <div className="m-2 flex items-center gap-2 active:none">
                <p className="font-bold">帳號：</p>
                <InputArea
                    ref={usernameRef}
                    editable={true}
                    value={username}
                    placeHolder={"Team account"}
                    onChange={(e) => setUsername(e)}
                />
            </div>
            <div className="m-2 flex items-center gap-2">
                <p className="font-bold">密碼：</p>
                <InputArea
                    ref={passwordRef}
                    value={password}
                    editable={true}
                    type={"password"}
                    placeHolder={"Enter Password"}
                    onChange={(e) => setPassword(e)}
                />
            </div>
            {isSignUp && <div className="w-1/3 m-2 flex items-center gap-2">
                <p className="font-bold">確認密碼：</p>
                <InputArea
                    ref={comfirmPasswordRef}
                    value={comfirmPassword}
                    editable={true}
                    type={"password"}
                    placeHolder={"Comfirm Password"}
                    onChange={(e) => setComfirmPassword(e)}
                />
            </div>}
            {!isSignUp && <div className="m-2 flex items-center justify-center gap-2">
                <a className="m-1 text-xs font-bold underline hover:text-blue-800" onClick={() => setIsSignUp(true)}>
                    <p>—第一次登入？註冊—</p>
                </a>
            </div>}
            <div className="m-2 flex gap-2">
                <button
                    className="m-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" 
                    onClick={() => router.push("/")}
                >取消</button>
                {!isSignUp && <button
                    className="m-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" 
                    onClick={handleLogin}
                >登入</button>}
                {isSignUp && <button
                    className="m-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={handleRegister}
                >註冊</button>}
            </div>
        </div>
        </>
    )
}