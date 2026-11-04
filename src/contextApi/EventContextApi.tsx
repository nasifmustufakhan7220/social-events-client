"use client";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

export interface IVluntearType {
  _id: string;
  eventName: string;
  eventType: string;
  date: string;
  location: string;
  image: string;
  description: string;
  userEmail: string;
  userName: string;
  userImage: string;
  eventID: string;
}

export interface IAvaiableType {
  _id: string;
  eventName: string;
  eventType: string;
  date: string;
  location: string;
  image: string;
  description: string;
  userEmail: string;
  userName: string;
  userImage: string;
}

interface IContextType {
  joined: IVluntearType[];
  setJoined: Dispatch<SetStateAction<IVluntearType[]>>;
  avaiable: IAvaiableType | null;
  setAvaiable: Dispatch<SetStateAction<IAvaiableType | null>>;
}

export const EventContextApi = createContext<IContextType>({
  joined: [],
  setJoined: () => {},
  avaiable: null,
  setAvaiable: () => {},
});

const EventContextApiProvider = ({ children }: { children: ReactNode }) => {
  const [joined, setJoined] = useState<IVluntearType[]>([]);
  const [avaiable, setAvaiable] = useState<IAvaiableType | null>(null);

  const obj = {
    joined,
    setJoined,
    avaiable,
    setAvaiable,
  };
  return (
    <EventContextApi.Provider value={obj}>{children}</EventContextApi.Provider>
  );
};

export default EventContextApiProvider;
