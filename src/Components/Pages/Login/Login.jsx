import { useAuth } from "../../App/Auth/Auth";
import axios from "axios";
import { useState } from "react";

const Login = () => {
  // Get authentication datafrom useAuth hook
  const { loginData, setLoginData } = useAuth();

  // Make a variable to handle the error messages
  const [message, setMessage] = useState("");

  // Create a function to set in the login
  const sendLoginRequest = async (data) => {
    // Retrieve username and password from the formData
    const formData = new URLSearchParams();
    formData.append("username", data.target.form.username.value);
    formData.append("password", data.target.form.password.value);

    try {
      // Send a POST request to the login endpoint
      const result = await axios.post("http://localhost:4000/login", formData);

      // Handle the session data if login is successful
      handleSessionData(result.data);
    } catch (err) {
      // Sent an error message to the enduser if login was unsuccessful
      setMessage("Kunne ikke logge ind!");
      // Display error code in the console
      console.log(err);
    }
  };


  const handleSessionData = (data) => {
    if (data) {
      // Keep authentication token in session storage
      sessionStorage.setItem("token", JSON.stringify(data));

      // Update the data in state
      setLoginData(data);
    }
  };

  // Function to log out
  const logOut = () => {
    // Remove the authentication token from session storage
    sessionStorage.removeItem("token");

    // Remove the authentication data in the state
    setLoginData("");
  };

  return (
    <>
      {!loginData && !loginData.username ? (
        // Login form if user is not logged in
        <form>
          <div>

            <input type="text" id="username" placeholder="Indtast brugernavn" />
          </div>
          <div>

            <input
              type="password"
              id="password"
              placeholder="Indtast adgangskode"
            />
          </div>
          {message && <div>{message}</div>}

          <div>
            <button type="button" onClick={sendLoginRequest}>
              Send
            </button>
          </div>
        </form>
      ) : (
        // Login info and user data if logged in
        <div>
          <p>
            Du er logget på som{" "}
            {`${loginData.firstname} ${loginData.lastname} `}
          </p>
          <button onClick={logOut}>Log ud</button>
        </div>
      )}
    </>
  );
};

export default Login;
