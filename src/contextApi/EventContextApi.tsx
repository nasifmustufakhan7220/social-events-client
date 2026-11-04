"use client"
import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";


export interface IVluntearType {
  _id: string;
  eventName: string;
  eventType: string;
  date: string;
  location: string;
  image: string;
  description: string;
  userEmail:string;
  userName: string;
  userImage: string;
  eventID:string
}

interface IContextType{
    joined: IVluntearType[];
    setJoined: Dispatch<SetStateAction<IVluntearType[]>>
}

export const EventContextApi = createContext<IContextType>({
    joined: [],
    setJoined: ()=>{},
});

const EventContextApiProvider = ({children}: {children: ReactNode}) => {
    const [joined, setJoined] = useState<IVluntearType[]>([]);


    const obj={
        joined,
        setJoined,
    }
    return <EventContextApi.Provider value={obj}>{children}</EventContextApi.Provider>
};

export default EventContextApiProvider;