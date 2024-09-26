import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Form() {
  let [data, setData] = useState({});
  let [hobby, setHobby] = useState([]);
  let [errors, setErrors] = useState({});
  let navigator = useNavigate();

  let handleInput = (e) => {
    let { name, value } = e.target;

    let ho = [...hobby];
    if (name === "hobby") {
      if (e.target.checked) {
        ho.push(value);
      } else {
        let pos = ho.findIndex((v) => value === v);
        ho.splice(pos, 1);
      }
    }
    setHobby(ho);
    setData({ ...data, [name]: value });
    validateField(name, value);
  };

  let validateField = (name, value) => {
    let errorMsg = "";

    if (name === "name") {
      if (!value) {
        errorMsg = "Name is required.";
      }
    } else if (name === "email") {
      if (!value) {
        errorMsg = "Email is required.";
      } else if (!/\S+@\S+\.\S+/.test(value)) {
        errorMsg = "Email format is invalid.";
      }
    } else if (name === "password") {
      if (!value) {
        errorMsg = "Password is required.";
      } else if (value.length < 6) {
        errorMsg = "Password must be at least 6 characters.";
      }
    } else if (name === "phone") {
      if (!value) {
        errorMsg = "Phone number is required.";
      } else if (!/^\d{10}$/.test(value)) {
        errorMsg = "Phone number must be 10 digits.";
      }
    } else if (name === "gender") {
      if (!value) {
        errorMsg = "Gender selection is required.";
      }
    } else if (name === "city") {
      if (!value) {
        errorMsg = "City selection is required.";
      }
    }

    setErrors({ ...errors, [name]: errorMsg });
  };

  let handleSubmit = (e) => {
    e.preventDefault();

    for (const key in data) {
      validateField(key, data[key]);
    }

    const isEmptyForm = Object.values(data).every((value) => !value);

    if (isEmptyForm) {
      toast.error("Please fill out all field before submitting.");
      return;
    }

    if (Object.values(errors).every((err) => err === "")) {
      fetch("http://localhost:3000/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then(() => {
          toast.success("Data Added.");
          setTimeout(() => {
            navigator("/showData");
          }, 1000);
        })
        .catch((err) => {
          toast.error(err.message || "An error occurred.");
        });
    } else {
      toast.error("Please fix the errors before submitting.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-100 via-pink-200 to-red-300">
      <form
        method="post"
        className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg"
        onSubmit={handleSubmit}
      >
        <caption className="text-2xl font-bold mb-6 block text-center text-gray-800">
          Registration Form
        </caption>
        <Link to="/showData">Show Data</Link>
        <table className="w-full">
          <tbody>
            <tr className="mb-6">
              <td className="pr-4 text-right font-semibold text-gray-700">
                Name:
              </td>
              <td>
                <input
                  type="text"
                  name="name"
                  className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-400 transition duration-200 ease-in-out"
                  placeholder="Enter your name"
                  onChange={handleInput}
                />
                {errors.name && <p className="text-red-500">{errors.name}</p>}
              </td>
            </tr>
            <tr className="mb-6">
              <td className="pr-4 text-right font-semibold text-gray-700">
                Email:
              </td>
              <td>
                <input
                  type="email"
                  name="email"
                  className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-400 transition duration-200 ease-in-out"
                  placeholder="Enter your email"
                  onChange={handleInput}
                />
                {errors.email && <p className="text-red-500">{errors.email}</p>}
              </td>
            </tr>
            <tr className="mb-6">
              <td className="pr-4 text-right font-semibold text-gray-700">
                Password:
              </td>
              <td>
                <input
                  type="password"
                  name="password"
                  className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-400 transition duration-200 ease-in-out"
                  placeholder="Enter your password"
                  onChange={handleInput}
                />
                {errors.password && (
                  <p className="text-red-500">{errors.password}</p>
                )}
              </td>
            </tr>
            <tr className="mb-6">
              <td className="pr-4 text-right font-semibold text-gray-700">
                Phone:
              </td>
              <td>
                <input
                  type="text"
                  name="phone"
                  className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-400 transition duration-200 ease-in-out"
                  placeholder="Enter your phone number"
                  onChange={handleInput}
                />
                {errors.phone && <p className="text-red-500">{errors.phone}</p>}
              </td>
            </tr>
            <tr className="mb-6">
              <td className="pr-4 text-right font-semibold text-gray-700">
                Gender:
              </td>
              <td>
                <label className="mr-3 text-gray-700">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    className="mr-2"
                    onChange={handleInput}
                  />
                  Male
                </label>
                <label className="mr-3 text-gray-700">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    className="mr-2"
                    onChange={handleInput}
                  />
                  Female
                </label>
                <label className="text-gray-700">
                  <input
                    type="radio"
                    name="gender"
                    value="other"
                    className="mr-2"
                    onChange={handleInput}
                  />
                  Other
                </label>
                {errors.gender && (
                  <p className="text-red-500">{errors.gender}</p>
                )}
              </td>
            </tr>
            <tr className="mb-6">
              <td className="pr-4 text-right font-semibold text-gray-700">
                Hobby:
              </td>
              <td>
                <label className="mr-3 text-gray-700">
                  <input
                    type="checkbox"
                    name="hobby"
                    value="reading"
                    className="mr-2"
                    onChange={handleInput}
                  />
                  Reading
                </label>
                <label className="mr-3 text-gray-700">
                  <input
                    type="checkbox"
                    name="hobby"
                    value="painting"
                    className="mr-2"
                    onChange={handleInput}
                  />
                  Painting
                </label>
                <label className="text-gray-700">
                  <input
                    type="checkbox"
                    name="hobby"
                    value="cooking"
                    className="mr-2"
                    onChange={handleInput}
                  />
                  Cooking
                </label>
              </td>
            </tr>
            <tr className="mb-6">
              <td className="pr-4 text-right font-semibold text-gray-700">
                Address:
              </td>
              <td>
                <textarea
                  name="address"
                  className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-400 transition duration-200 ease-in-out"
                  placeholder="Enter your address"
                  onChange={handleInput}
                ></textarea>
              </td>
            </tr>
            <tr className="mb-6">
              <td className="pr-4 text-right font-semibold text-gray-700">
                City:
              </td>
              <td>
                <select name="city" onChange={handleInput}>
                  <option value="" disabled selected>
                    --select-city--
                  </option>
                  <option value="surat">Surat</option>
                  <option value="pune">Pune</option>
                  <option value="mumbai">Mumbai</option>
                  <option value="delhi">Delhi</option>
                  <option value="chennai">Chennai</option>
                  <option value="bangalore">Bangalore</option>
                  <option value="kolkata">Kolkata</option>
                  <option value="hyderabad">Hyderabad</option>
                  <option value="ahmedabad">Ahmedabad</option>
                  <option value="jaipur">Jaipur</option>
                </select>
                {errors.city && <p className="text-red-500">{errors.city}</p>}
              </td>
            </tr>
            <tr className="mt-6">
              <td></td>
              <td>
                <input
                  type="submit"
                  value="Add Data"
                  className="bg-gradient-to-r from-purple-200 to-pink-500 text-white py-2 px-6 rounded-lg hover:bg-pink-600 focus:outline-none focus:ring-4 focus:ring-pink-400 transition duration-200 ease-in-out w-full"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </form>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

export default Form;
