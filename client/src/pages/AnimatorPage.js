import React, { useEffect, useState } from 'react';
import { jwtDecode as jwt_decode } from 'jwt-decode';
import "bootstrap/dist/css/bootstrap.min.css";
import '../css/style-login.css';

// Declare google as a global variable
/* global google */

const AnimatorPage = () => {
  const [user, setUser] = useState({});
  const [isToggled, setIsToggled] = useState(false);

  function handleCallbackResponse(response) {
    console.log("Encoded jwt Id token: " + response.credential);
    var userObject = jwt_decode(response.credential);
    console.log(userObject);
    setUser(userObject);
    document.getElementById("signInDiv").hidden = true;
  }

  function handleSignOut(event) {
    setUser({});
    document.getElementById("signInDiv").hidden = false;
  }

  useEffect(() => {
    // Load Ionicons script dynamically
    const loadIoniconsScript = () => {
      const scriptModule = document.createElement('script');
      scriptModule.type = 'module';
      scriptModule.src = 'https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js';
      document.head.appendChild(scriptModule);

      const scriptNoModule = document.createElement('script');
      scriptNoModule.noModule = true;
      scriptNoModule.src = 'https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js';
      document.head.appendChild(scriptNoModule);
    };

    loadIoniconsScript();

    // Initialize Google sign-in
    google.accounts.id.initialize({
      client_id: "826535731167-qoabun43hdcg5q1o9mtfp6dff5gti5ro.apps.googleusercontent.com",
      callback: handleCallbackResponse
    });

    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      { theme: "outline", size: "large" }
    );

    google.accounts.id.prompt();
  }, []);

  return (
    <div className="App">
      
      <div>
        <form id="loginForm" action="/login" method="post">
          <input 
            type="checkbox" 
            className="input-check" 
            id="input-check" 
            checked={isToggled} 
            onChange={() => setIsToggled(!isToggled)} 
          />
          <label htmlFor="input-check" className="toggle">
            <span className="text off">off</span>
            <span className="text on">on</span>
          </label>
          <div className={`light ${isToggled ? 'on' : 'off'}`}></div>

          <h4 style={{ textAlign: 'left', margin: '20px 0' }}>Login/ Sign In</h4>
          <div className="input-box">
            <span className="icon">
              <ion-icon name="mail"></ion-icon>
            </span>
            <input type="email" id="username" name="username" required />
            <label>Email</label>
            <br />
            <div className="input-line"></div>
          </div>
          <div className="input-box">
            <span className="icon">
              <ion-icon name="lock-closed"></ion-icon>
            </span>
            <input type="password" id="password" name="password" required />
            <label>Password</label>
            <div className="input-line"></div>
          </div>
          <div className="remember-forgot">
            <label>
              <input type="checkbox" /> Remember me / 
               <a href="#">Forgot Password?</a>
            </label>
            
          </div>
          <button type="submit">Login</button>
          <div className="register-link">
            <p>Don't have an account? <a href="/register">Register</a></p>
          </div>
        </form>
      </div>
      <div id="signInDiv"></div>
      {Object.keys(user).length !== 0 &&
        <button onClick={handleSignOut}>Sign out</button>
      }
      {user &&
        <div>
          <br />
          <img src={user.picture} alt="User" />
          <h3 style={{ color: 'marron' }}>{user.name}</h3>
        </div>
      }
    </div>
  );
};

export default AnimatorPage;
