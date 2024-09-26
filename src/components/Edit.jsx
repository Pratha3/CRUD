import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Edit() {
  let [hobby, setHobby] = useState([]);
  let [data, setData] = useState({});
  let nevigater = useNavigate();
  let { id } = useParams();

  let fetchData = () => {
    fetch(`http://localhost:3000/user/${id}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    return () => {
      fetchData();
    };
  }, []);

  let handleInput = (e) => {
    let { name, value } = e.target;

    let ho = [...hobby];
    if (name == "hobby") {
      if (e.target.checked) {
        ho.push(value);
      } else {
        let pos = ho.findIndex((v, i) => value == v);
        ho.splice(pos, 1);
      }
      console.log(ho);
      value = ho;
    }
    setHobby(ho);

    setData({ ...data, [name]: value });
  };

  let handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://localhost:3000/user/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    })
      .then(() => {
        toast.info("Data Add..");
      })
      .catch((err) => {
        toast.error(err);
      });
    setTimeout(() => {
      nevigater("/showData");
    }, 1000);
  };

  return (
    <div>
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-100 via-pink-200 to-red-300">
        <form
          className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg"
          onSubmit={handleSubmit}
        >
          <caption className="text-2xl font-bold mb-6 block text-center text-gray-800">
            Edit & Update Data
          </caption>
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
                    value={data.name || ""}
                    className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-400 transition duration-200 ease-in-out"
                    placeholder="Enter your name"
                    onChange={handleInput}
                  />
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
                    value={data.email || ""}
                    className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-400 transition duration-200 ease-in-out"
                    placeholder="Enter your email"
                    onChange={handleInput}
                  />
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
                    value={data.password || ""}
                    className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-400 transition duration-200 ease-in-out"
                    placeholder="Enter your password"
                    onChange={handleInput}
                  />
                </td>
              </tr>
              <tr className="mb-6">
                <td className="pr-4 text-right font-semibold text-gray-700">
                  Phone:
                </td>
                <td>
                  <input
                    type="number"
                    name="phone"
                    value={data.phone || ""}
                    className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-400 transition duration-200 ease-in-out"
                    placeholder="Enter your phone number"
                    onChange={handleInput}
                  />
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
                      checked={data.gender === "male" ? "checked" : ""}
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
                      checked={data.gender === "female" ? "checked" : ""}
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
                      checked={data.gender === "other" ? "checked" : ""}
                      className="mr-2"
                      onChange={handleInput}
                    />
                    Other
                  </label>
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
                      checked={hobby.includes("reading") ? "checked" : ""}
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
                      checked={hobby.includes("painting") ? "checked" : ""}
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
                      checked={hobby.includes("cooking") ? "checked" : ""}
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
                    value={data.address || ""}
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
                  <select
                    name="city"
                    value={data.city || ""}
                    className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-400 transition duration-200 ease-in-out"
                    onChange={handleInput}
                  >
                    <option value="" disabled>
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
                </td>
              </tr>
              <tr className="mt-6">
                <td></td>
                <td>
                  <input
                    type="submit"
                    value="Update Data"
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
          transition={Bounce}
        />
      </div>
    </div>
  );
}

export default Edit;
