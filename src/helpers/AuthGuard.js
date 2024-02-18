import { Navigate } from "react-router-dom";

function AuthGuard({component : Component, socket}){
    const token = localStorage.token;
    return token ? (<Component socket={socket} />) : (<Navigate to = '/cuenta/login'/>)
};

export default AuthGuard;