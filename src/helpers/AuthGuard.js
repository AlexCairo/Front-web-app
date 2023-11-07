import { Navigate } from "react-router-dom";

function AuthGuard({component : Component}){
    const token = localStorage.token;
    return token ? (<Component />) : (<Navigate to = '/cuenta/login'/>)
};

export default AuthGuard;