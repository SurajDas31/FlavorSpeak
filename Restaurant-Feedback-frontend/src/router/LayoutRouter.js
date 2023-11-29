import { Routes, Route } from "react-router-dom";
import SignIn from "../auth/SignIn/SignIn";
import SignUp from "../auth/SignUp/SignUp";
import UserRouter from "./UserRouter";
import Home from '../home/home'

export default function LayoutRouter() {
    return (

        <Routes>
            
                <Route path="/" element={<Home/>}/>
                <Route path="signin" element={<SignIn />} />
                <Route path="signup" element={<SignUp />} />
            
            <Route path="/auth" element={<UserRouter/>}>
                <Route path="dashboard"/>
                <Route path="profile"/>
            </Route>
        </Routes>

    );

}