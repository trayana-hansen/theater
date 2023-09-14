import { useAuth } from "../../App/Auth/AuthProvider";
import { useForm } from "react-hook-form";
import axios from "axios";
import "./Login.scss";
import Profile from "../../Pages/Profile/Profile";

const Login = () => {
  // Get authentication datafrom useAuth hook
  const { loginData, setLoginData } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Create a function to set in the login

  // Retrieve username and password from API

  const formSubmit = async (form) => {
    const formData = new URLSearchParams();
    formData.append("username", form.username);
    formData.append("password", form.password);
    const endpoint = `http://localhost:4000/login`;

    try {
      const result = await axios.post(endpoint, formData);
      handleSessionData(result.data);
    } catch (err) {
      console.error(`Kunne ikke logge ind: ${err}`);
    }
  };
  const handleSessionData = async (data) => {
    if (data) {
      sessionStorage.setItem("token", JSON.stringify(data));
      setLoginData(data);
    }
  };
  const logOut = () => {
    // Fjerner login info fra session storage
    sessionStorage.removeItem("token");
    // Nulstiller tilstandsvariabel
    setLoginData("");
  };

  return (
    <>
      <div className="pageContainer">
        <div className="loginContainer">
          {/* If data is incorre ct: */}
          {!loginData && !loginData.username ? (
            // onSubmit event with closing
            <form onSubmit={handleSubmit(formSubmit)}>
              <div>
                {/* Input username with form hook settings */}

                <input
                  type="text"
                  placeholder="Indtast brugernavn"
                  {...register("username", { required: true })}
                />
                {/* Udskriver valideringsfejl hvis der er nogle */}
                {errors.username && (
                  <span className="error">Du skal indtaste dit brugernavn</span>
                )}
              </div>
              <div>
                <input
                  placeholder="Indtast password"
                  type="password"
                  {...register("password", { required: true })}
                />
                {/* Show message if there is an error */}
                {errors.password && (
                  <span className="error">
                    Du skal indtaste din adgangskode
                  </span>
                )}
              </div>

              <div className="submit">
                <button type="submit">LOGIN</button>
              </div>
            </form>
          ) : (
            // Show login data if user is logged in
            <section>
              <p>
                {`Du er logget ind som ${loginData.user.firstname} ${loginData.user.lastname} `}{" "}
              </p>
              <Profile />
              <button onClick={() => logOut()} id="logout">
                LOG UD
              </button>
            </section>
          )}
        </div>
      </div>
    </>
  );
};

export default Login;
