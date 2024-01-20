import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Register from "./Register";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showRegister, setShowRegister] = useState(false);

  const navigate = useNavigate();

  const HandleSubmit = async (e) => {
    e.preventDefault();
    const url = "http://localhost:3000/api/login";
    const response = await axios.post(url, {
      email: email,
      password: password,
    });
    console.log(response);
    if (response.statusText === "OK") {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userType", response.data.userType);
      navigate("/home");
    }
  };
  return (
    <div>
      <div>
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
        />
      </div>
      <div>
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />
      </div>

      <button onClick={HandleSubmit}>Login</button>
      <button onClick={() => setShowRegister(true)}>Register</button>

      {showRegister && (
        <>
          <div
            style={{
              position: "absolute",
              width: "100vw",
              height: "100vh",
              backgroundColor: "white",
              opacity: "0.5",
              top: "0",
              left: "0",
            }}
          ></div>
          <div
            style={{
              position: "absolute",
              width: "50vw",
              height: "75vh",
              backgroundColor: "red",
              zIndex: "10",
              top: "17%",
              left: "25%  ",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "28px",
              boxShadow: "2px 8px 8px 14px rgba(0,0,0,0.75)",
              
            }}
          >
            <Register setShowRegister={setShowRegister}/>
            <div>
              <h3> Do you already have an account? </h3>
              <button onClick={() => setShowRegister(false)}>Login</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
