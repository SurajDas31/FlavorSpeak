import { Routes, Route } from "react-router-dom";
import SignIn from "../auth/SignIn/SignIn";
import SignUp from "../auth/SignUp/SignUp";


import Dashboard from "../user/Dashboard";
import Home from "../home/Home";


export default function LayoutRouter() {

    return (

        <Routes>

            <Route index element={<Home />} />
            <Route path="signin" element={<SignIn />} />
            <Route path="signup" element={<SignUp />} />

            <Route path="/auth">
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="profile" />
            </Route>:

        </Routes>

    );

}