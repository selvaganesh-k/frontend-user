import React, { useState } from "react";
import apiClient from "../apiService/Apiservice";
import './Auth.css';
export default function Auth() {
    const [regformData, setregformData] = useState({
        email:'',
        password:''
    });
    const [loginformData, setloginformData]=useState({
        email:'',
        password:''
    });

    const handleChange1 =async(e)=>{
        const{name, value} = e.target;
        setregformData({...regformData, [name]:value});
    }
    const handleChange2=async(e)=>{
        const{name, value} = e.target;
        setloginformData({...loginformData, [name]:value});
    }
    const handleSubmit= async(e)=>{
        e.preventDefault();
        if(regformData.email !== ''){
            await apiClient.post('/register',regformData)
        .then(response=>{
            alert(response.data.message);
            setregformData({
                email:'',
                password:''
            })
        })
        .catch(error=>{
            alert(error.response.data.message);
        })
        }
        else{
            await apiClient.post('/login', loginformData)
        .then(response=>{
            alert(response.data.message);
            localStorage.setItem('LoginUser',JSON.stringify(response.data.user));
            window.location.href='/';
            setloginformData({
                email:'',
                password:''
            })
        })
        .catch(error=>{
            alert(error.response.data.message);
        })
        }
        
    }
    return (
        <div className="login_register">
            <div className="container">
                <div className="row justify-content-between">
                    <div className="col-lg-5 mt-3 login">
                        <div className="customerloginform">
                            <h1 className="title_login mb-0 text-center">LOGIN</h1>
                            <form method="post" id="customer_login" onSubmit={handleSubmit}>
                                <div class="form-group row">
                                    <label for="staticEmail" class="col-sm-3 col-form-label">Email adress </label>
                                    <div class="col-sm-9">
                                        <input type="email" class="" name="email" onChange={handleChange2} value={loginformData.email} placeholder="Email adress" required="" />
                                    </div>
                                </div>

                                <div class="form-group row">
                                    <label for="inputPassword" class="col-sm-3 col-form-label">Password </label>
                                    <div class="col-sm-9">
                                        <input type="password" class="" placeholder="Password" onChange={handleChange2} value={loginformData.password} name="password" required="" />
                                    </div>
                                </div>

                                <div class="text-center mt-5">
                                    <button class="btn btn-dark" value="Log In">
                                        Log In
                                    </button>
                                </div>
                                <div class="forgot_pass_form mt-4 d-flex justify-content-around">
                                    <div class="leftx pr-4  ">
                                        <a href="/shop">Return to Store</a>
                                    </div>
                                    <div class="rightx">
                                        <a href="#" class="ResetPassword">Forgot your password?</a>
                                    </div>

                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-lg-1">

                    </div>
                    <div class="col-lg-5 mt-3 register">
                        <h1 class="title_login mb-0 text-center">REGISTER</h1>
                        <form method="post" id="create_customer" onSubmit={handleSubmit}>
                            <div class="form-group row">
                                <label for="staticEmail" class="col-sm-3 col-form-label">Email address</label>
                                <div class="col-sm-9">
                                    <input type="email" placeholder="Email address" onChange={handleChange1} class="" value={regformData.email} name="email" required="" />
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="inputPassword" class="col-sm-3 col-form-label">Password</label>
                                <div class="col-sm-9">
                                    <input type="password" class="" name="password" onChange={handleChange1} value={regformData.password} placeholder="Password" required="" />
                                </div>
                            </div>
                            <div class="text-center mt-5">
                                <button class="btn btn-dark" value="register">
                                    register
                                </button>
                            </div>
                        </form>
                        <div class="forgot_pass mt-4 text-center">
                            <a href="/shop">Return to Store</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}