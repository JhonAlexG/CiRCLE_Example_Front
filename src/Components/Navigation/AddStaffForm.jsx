import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function StaffForm() {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [identification, setIdentification] = useState("");

  const navigate = useNavigate();

  const HandleSubmit = async (e) => {
    e.preventDefault();
    const url = "http://localhost:3000/api/staff";
    if (password !== passwordCheck) {
      return console.log("Passwords do not match");
    }
    axios
      .post(
        url,
        {
          name: name,
          lastname: lastname,
          email: email,
          password: password,
          identification: identification,
        },
        { headers: { "x-access-token": localStorage.getItem("token") } }
      )
      .then((data) => {
        console.log(data);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });

    setName("");
    setLastname("");
    setEmail("");
    setPassword("");
    setPasswordCheck("");
    setIdentification("");
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
            onChange={(e) => setLastname(e.target.value)}
            type="text"
            placeholder="Last Name"
            value={lastname}
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
            placeholder="Confirm Password"
            value={passwordCheck}
          />
        </div>
        <div>
          <input
            required
            onChange={(e) => setIdentification(e.target.value)}
            type="text"
            placeholder="Identification"
            value={identification}
          />
        </div>
        <div>
          <button type="submit">Register</button>
        </div>
      </form>
      <div>
        <button onClick={() => navigate("/home")}>Back</button>
      </div>
    </div>
  );
}

export default StaffForm;
