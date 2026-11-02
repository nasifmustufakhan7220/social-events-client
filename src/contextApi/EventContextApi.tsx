"use client"
import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";

export type IJoinedButton = {
    email: string;
    image: string;
    name: string;
}

interface IContextType{
    joined: IJoinedButton[];
    setJoined: Dispatch<SetStateAction<IJoinedButton[]>>
    isLoading: boolean;
    setIsLoading: Dispatch<SetStateAction<boolean>>
}

export const EventContextApi = createContext<IContextType>({
    joined: [],
    setJoined: ()=>{},
    isLoading: true,
    setIsLoading: ()=>{}
});

const EventContextApiProvider = ({children}: {children: ReactNode}) => {
    const [joined, setJoined] = useState<IJoinedButton[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
        const getVluntear = localStorage.getItem("voluntear");

        if(getVluntear){
            const perseVoluntear = JSON.parse(getVluntear);
            setJoined(perseVoluntear);
        }

        setIsLoading(false);
    },[]);

    useEffect(()=>{
        if(isLoading === false){
            localStorage.setItem("voluntear", JSON.stringify(joined));
        }
    },[joined, isLoading]);

    const obj={
        joined,
        setJoined,
        isLoading,
        setIsLoading
    }
    return <EventContextApi.Provider value={obj}>{children}</EventContextApi.Provider>
};

export default EventContextApiProvider;