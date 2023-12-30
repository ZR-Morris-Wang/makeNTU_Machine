'use client'
import { createContext, useEffect, useState } from "react";

export type Account = {
    id: number;
    name: string;
    password: string;
    permission: string;
}
export type AccountRequest = {
    account: Account["name"];
    password: Account["password"];
    permission: Account["permission"];
}
export type AccountResponse = {
    account: Account["name"];
    token: string;
}

export type AccountContext = {
    user?: Account | null;
    setAccount?: (user: Account) => void;
}

export const AccountContext = createContext<AccountContext>({
    user: null,
    setAccount: () => {},
});

type Props = {
    children: React.ReactNode;
}
export const AccountProvider = ({ children }: Props) => {
    const [user, setAccount] = useState<Account | null>(null);

    useEffect(() => {
        const fetchAccount = async() => {
            try {
                const res = await fetch("/api/account");
                const data = await res.json();
                if (data?.messages) {
                  setAccount(data.messages);
                  console.log(data.messages);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAccount();
    }, [])

    return (
        <AccountContext.Provider value={{ user, setAccount }}>
            {children}
        </AccountContext.Provider>
    )
}