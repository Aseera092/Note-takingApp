import axios from 'axios';
import React, { useState } from 'react'
import NavBar from '../components/NavBar'

const CreateNote = () => {
    const token = sessionStorage.getItem("token")

    const [input, setInput] = React.useState({
        "Message": "",
        "userId": sessionStorage.getItem("userId")
    })

    const inputHandler = (event) => {
        setInput({ ...input, [event.target.name]: event.target.value });
    };



    const readValue = () => {
        console.log(input)
        console.log(token)
        axios.post("http://localhost:3030/create", input, {
            headers: { "token": token, "Content-Type": "application/json" },

        }).then((response) => {
            console.log(response.data)
            if (response.data.status === "Note Creation Successfully") {
                alert("Note created successfully")

            } else {
                alert("Something Went Wrong")

            }
        })
    }

    return (
        <div>
            <NavBar />
            <div className="create-background min-vh-100 min-vw-100 pb-5">
                <div className="row">
                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                        <div className="row">

                            <div className="mb-3">
                                <textarea name="Message" placeholder="Type your note here..." value={input.Message} id="" className="form-control" rows="5" onChange={inputHandler}></textarea>
                            </div>
                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                <button onClick={readValue} className="btn btn-primary">Create Note</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateNote