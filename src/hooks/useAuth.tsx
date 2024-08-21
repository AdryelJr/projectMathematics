import { useContext } from "react";
import { AuthContext } from "../contexts/userAuth";

export function useAuth(){
    const value = useContext(AuthContext);
    return value;
}