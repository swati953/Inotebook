import React, { useState } from "react";
import { useHistory } from "react-router";

const Signup = (props) => {
  let history = useHistory();
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
});
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = credentials;
    const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
       body: JSON.stringify({ name, email, password }),
    //   body: JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password})
    });
    const json = await response.json();
    // setCredentials(credentials.concat(credentials));
    console.log(json+"gooooooood");
    if (json.success) {
      //redirect to notes or home screen
      localStorage.setItem("token", json.authtoken);
      history.push("/");
      props.showAlert("Signup Successfully","info");
    } else {
      //give alert mesaage
      props.showAlert("Failed to signup","danger");
    }
  };
  const onchange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            aria-describedby="emailHelp"
            onChange={onchange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            
            onChange={onchange}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            minLength={5} required
            onChange={onchange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            name="cpassword"
            minLength={5} required
            onChange={onchange}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
