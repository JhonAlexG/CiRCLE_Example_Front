import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
      <button onClick={() => navigate("/register")}>Register</button>
    </div>
  );
}
