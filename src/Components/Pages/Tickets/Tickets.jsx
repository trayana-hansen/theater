import axios from "axios";
import { useForm } from "react-hook-form";
import { useAuth } from "../../App/Auth/AuthProvider";
import { useParams } from "react-router-dom";

/**
 * Post Component
 * Formular til at poste data til API
 */
const Tickets = () => {
  const { loginData } = useAuth();
  const { event_id } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const formSubmit = async (formObject) => {
    const api_endpoint = "http://localhost:4000/reservations";

    const formData = new URLSearchParams();
    formData.append("event_id", event_id); // Use the event_id from URL params
    formData.append("firstname", formObject.firstname);
    formData.append("lastname", formObject.lastname);
    formData.append("address", formObject.address);
    formData.append("zipcode", formObject.zipcode);
    formData.append("city", formObject.city);
    formData.append("email", formObject.email);
    formData.append("seats[0]", 1);
    formData.append("seats[1]", 2);

    console.log(...formData);

    const options = {
      headers: {
        Authorization: `Bearer ${loginData.access_token}`,
      },
    };

    try {
      const result = await axios.post(api_endpoint, formData, options);
      if (result.data) {
        console.log(result.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(formSubmit)}>
        <input type="hidden" value={event_id} {...register("event_id")} />
        <div>
          <label htmlFor="firstname">Fornavn:</label>
          <input
            {...register("firstname", {
              required: "Du skal indtaste dit fornavn",
              pattern: {
                value: /^[A-Za-z]+$/i,
                message: "Du skal indtaste et gyldigt navn",
              },
            })}
          />
          {errors.firstname && <span>{errors.firstname.message}</span>}
        </div>

        <div>
          <label htmlFor="lastname">Efternavn:</label>
          <input
            {...register("lastname", {
              required: "Du skal indtaste dit efternavn",
              pattern: {
                value: /^[A-Za-z]+$/i,
                message: "Du skal indtaste et gyldigt navn",
              },
            })}
          />
          {errors.lastname && <span>{errors.lastname.message}</span>}
        </div>

        <div>
          <label htmlFor="address">Adresse:</label>
          <input
            {...register("address", {
              required: "Du skal indtaste din adresse",
            })}
          />
          {errors.address && <span>{errors.address.message}</span>}
        </div>

        <div>
          <label htmlFor="zipcode">Postnummer:</label>
          <input
            {...register("zipcode", {
              required: "Du skal indtaste dit postnummer",
              pattern: {
                value: /^[0-9]+$/i,
                message: "Du skal indtaste et gyldigt postnummer",
              },
              min: {
                value: 999,
                message: "Postnummer kan ikke være mindre end 1000",
              },
              max: {
                value: 9990,
                message: "Postnummer kan ikke være større end 9990",
              },
            })}
          />
          {errors.zipcode && <span>{errors.zipcode.message}</span>}
        </div>

        <div>
          <label htmlFor="city">By:</label>
          <input
            {...register("city", {
              required: "Du skal indtaste et bynavn",
            })}
          />
          {errors.city && <span>{errors.city.message}</span>}
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input
            {...register("email", {
              required: "Du skal indtaste din email",
              pattern: {
                value: /^\S+@\S+$/,
                message: "Du skal indtaste en gyldig mailadresse",
              },
            })}
          />
          {errors.email && <span>{errors.email.message}</span>}
        </div>

        <div>
          <button>Send</button>
        </div>
      </form>
    </div>
  );
};

export default Tickets;
