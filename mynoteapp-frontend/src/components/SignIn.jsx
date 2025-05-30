import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css'; 

const SignIn = () => {
  const navigate = useNavigate();

  const [input, setInput] = useState({
    email: "",
    password: ""
  });

  const inputHandler = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value });
  };

  const readValue = () => {
    axios.post("http://localhost:3030/signIn", input)
      .then((response) => {
        if (response.data.status === "Incorrect Password") {
          alert("Incorrect Password");
        } else if (response.data.status === "Invalid Email ID") {
          alert("Invalid Email ID");
        } else {
          let token = response.data.token;
          let userId = response.data.userId;
          sessionStorage.setItem("token", token);
          sessionStorage.setItem("userId", userId);
          navigate('/dashboard');
        }
      })
      .catch(() => {
        alert("An error occurred");
      });
  };

  const navigateToSignUp = () => {
        navigate('/signUp'); }

return (
    <div className="login-container">
        <div className="left-panel">
            <center>
            <div style={{ marginBottom: '16px' }}></div>
            <h3>Welcome to</h3>
            <div style={{ marginBottom: '16px' }}></div>
       
            <img src="../src/assets/icon.png" className="" style={{ width: '110px', height: '150px', margin: '0 auto', display: 'block' }} />
            
            <b><h6 className="app-name">NoteCorner</h6></b>
            <div style={{ marginBottom: '120px' }}></div>
             <img src="../src/assets/img5.png" style={{width: '800px', height: '390px' }} />
            <footer>By Continuing you accepting the <u>Terms of Use & Privacy Policy</u></footer>
            </center>
        </div>

        <div className="right-panel">
            <div className="form-box">
                <h2>Sign In</h2>
                <div className="form-group">
                    <input type="email" name="email" placeholder="Enter your email" value={input.email} onChange={inputHandler} />
                </div>
                <div className="form-group">
                    <input type="password" name="password" placeholder="Enter your password" value={input.password} onChange={inputHandler} />
                </div>
                <div className="form-group checkbox-group">
                    <input type="checkbox" id="terms" />
                    <label htmlFor="terms">I agree to the <a href="#">Terms & Conditions</a></label>
                </div>
                <button className="btn primary" onClick={readValue}>Sign In</button>
                <button onClick={navigateToSignUp} className="btn secondary">Sign Up</button>
            </div>
        </div>
    </div>
);
};

export default SignIn;
