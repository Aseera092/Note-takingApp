import React, { useState } from 'react'
import axios from 'axios';

const SignUp = () => {
    const [input, setInput] = new useState(
        {
            "name": "",
            "phone": "",
            "email": "",
            "password": "",
            "ConfirmPassword": ""
        }
    )
    const inputHandler = (event) => {
        setInput({ ...input, [event.target.name]: event.target.value })
    }

    const readValue = () => {
        if (input.password === input.ConfirmPassword) {
            console.log(input);
            let newInput = {
                "name": input.name,
                "phone": input.phone,
                "email": input.email,
                "password": input.password,
            }
            console.log(newInput);
            axios.post("http://localhost:3030/signUp", newInput).then((response) => {
                console.log(response.data)
                if (response.data.status === "User created successfully") {
                    alert("User registered successfully")
                } else {
                    alert("User already exists")
                }
            })
            .catch((error) => {
                console.log(error)
            })
        } else {
            alert("Password and Confirm Password do not match");
        }
    }

      const navigateToSignIn = () => {
        navigate('/signIn'); }
    return (
        <div>
            <div className="background min-vh-100 min-vw-100 pb-5">
                <div className="container form-container-wrapper ">
                <div className="row">
                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                        <div className="row g-3 col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                           
                            <input type="text"  placeholder="Enter name" className="form-control" name='name' value={input.name} onChange={inputHandler} />
                        </div>
                         <div style={{ marginBottom: '16px' }}></div>
                        <div className="row g-3 col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                           
                            <input type="text"  placeholder="Enter PhoneNo" className="form-control" name='phone' value={input.phone} onChange={inputHandler} />
                        </div>
                         <div style={{ marginBottom: '16px' }}></div>
                        <div className="row g-3 col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                           
                            <input type="text" placeholder="Enter your EmailID" className="form-control" name='email' value={input.email} onChange={inputHandler} />
                        </div>
                         <div style={{ marginBottom: '16px' }}></div>
                        <div className="row g-3 col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                         
                            <input type="password" placeholder="Enter Password" className="form-control" name='password' value={input.password} onChange={inputHandler} />
                        </div>
                         <div style={{ marginBottom: '16px' }}></div>
                        <div className="row g-3 col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                            <input type="password"  placeholder="Enter ConfirmPassword" className="form-control" name='ConfirmPassword' value={input.ConfirmPassword} onChange={inputHandler} />
                        </div>
                         <div style={{ marginBottom: '16px' }}></div>
                        <div className="row g-3 col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                            <button onClick={readValue} className="btn btn-primary">Create Account</button>
                        </div>
                           <div style={{ marginBottom: '16px' }}></div>
                        <text>Already have an account?  <a href="/">SignIn</a></text>
                    </div>
                </div>
            </div>
            </div>
        </div>
    )
}

export default SignUp