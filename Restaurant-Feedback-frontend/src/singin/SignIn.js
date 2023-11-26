import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


const SignIn = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate


    useEffect(() => {
        // Update the document title using the browser API
        let accessToken = localStorage.getItem("access-token")
        let refreshToken = localStorage.getItem("refresh-token")

        // if ((accessToken !== null || accessToken !== undefined) && (refreshToken !== null || refreshToken !== undefined))
            navigate("/")
    });

    let callSignInAPI = async (e) => {
        e.preventDefault();
        try {
            let res = await fetch("http://127.0.0.1:8080/api/v1/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });
            console.log(res);
            let resJson = await res.json();
            console.log(resJson);
            if (res.status === 200) {
                localStorage.setItem("access-token", "Bearer " + resJson.accessToken)
                localStorage.setItem("refresh-token", resJson.refreshToken)

            } else {

            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="container mt-3">

            <div className="tab-content">
                <div className="tab-pane fade show active" id="pills-login" role="tabpanel" aria-labelledby="tab-login">
                    <form onSubmit={callSignInAPI}>
                        {/* <div className="text-center mb-3">
                            <p>Sign in with:</p>
                            <button type="button" className="btn btn-link btn-floating mx-1">
                                <i className="fab fa-facebook-f"></i>
                            </button>

                            <button type="button" className="btn btn-link btn-floating mx-1">
                                <i className="fab fa-google"></i>
                            </button>

                            <button type="button" className="btn btn-link btn-floating mx-1">
                                <i className="fab fa-twitter"></i>
                            </button>

                            <button type="button" className="btn btn-link btn-floating mx-1">
                                <i className="fab fa-github"></i>
                            </button>
                        </div>

                        <p className="text-center">or:</p> */}


                        <div className="form-outline mb-4">
                            <input type="email" id="loginName" className="form-control" onChange={e => setEmail(e.target.value)} />
                            <label className="form-label" htmlFor="loginName">Email or username</label>
                        </div>


                        <div className="form-outline mb-4">
                            <input type="password" id="loginPassword" className="form-control" onChange={e => setPassword(e.target.value)} />
                            <label className="form-label" htmlFor="loginPassword">Password</label>
                        </div>


                        <div className="row mb-4">
                            <div className="col-md-6 d-flex justify-content-center">

                                <div className="form-check mb-3 mb-md-0">
                                    <input className="form-check-input" type="checkbox" value="" id="loginCheck" checked />
                                    <label className="form-check-label" htmlFor="loginCheck"> Remember me </label>
                                </div>
                            </div>

                            <div className="col-md-6 d-flex justify-content-center">

                                <a href="#!">Forgot password?</a>
                            </div>
                        </div>


                        <button type="button" onClick={callSignInAPI} className="btn btn-primary btn-block mb-4">Sign in</button>


                        <div className="text-center">
                            <p>Not a member? <a href="/signup">Register</a></p>
                        </div>
                    </form>
                </div>

            </div>

        </div>
    )





}


export default SignIn;