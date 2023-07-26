import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");

  const navigate = useNavigate();

  const HandleSubmit = async (e) => {
    e.preventDefault();
    const url = "http://localhost:3000/api/register";
    if (password !== passwordCheck) {
      return console.log("Passwords do not match");
    }
    axios
      .post(url, {
        name: name,
        lastname: lastName,
        email: email,
        password: password,
      })
      .then((data) => {
        console.log(data);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <form onSubmit={HandleSubmit}>
        <div>
          <input
            required
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Name"
            value={name}
          />
          <input
            required
            onChange={(e) => setLastName(e.target.value)}
            type="text"
            placeholder="Last Name"
            value={lastName}
          />
        </div>
        <div>
          <input
            required
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            value={email}
          />
        </div>
        <div>
          <input
            required
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            value={password}
          />
        </div>
        <div>
          <input
            required
            onChange={(e) => setPasswordCheck(e.target.value)}
            type="password"
            placeholder="Password Check"
            value={passwordCheck}
          />
        </div>
        <button>Register</button>
      </form>
      <div>
        <h3> Do you already have an account? </h3>
        <button onClick={() => navigate("/")}>Login</button>
      </div>
    </div>
  );
}

export default Register;
