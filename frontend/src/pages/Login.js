import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios";
import { authActions } from "../store/auth";

const Login = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  const [data, setData] = useState({ username: "", password: "" });

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const submitFunction = async () => {
    try {
      if (data.username === "" || data.password === "") {
        alert("All fields are required! Try again...");
      } else {
        const response = await axios.post("http://localhost:1000/api/v1/login", data);
        setData({ username: "", password: "" });
        localStorage.setItem("id", response.data.id);
        localStorage.setItem("token", response.data.token);

        dispatch(authActions.login());
        navigate("/"); // Redirect to home
      }
    } catch (error) {
      alert(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="h-[98vh] flex items-center justify-center">
      <div className="p-4 w-2/6 rounded bg-gray-700 shadow-[0_19px_80px_-15px_rgba(53,111,194,0.3)]">
        <div className="text-2xl font-semibold text-center">Login</div>
        <input
          type="text"
          placeholder="Enter Username"
          name="username"
          value={data.username}
          className="p-3 w-full bg-gray-700 text-white border-b-2 border-gray-600 focus:border-blue-500 focus:outline-none text-lg mb-4 rounded-md"
          onChange={change}
        />
        <input
          type="password"
          placeholder="Enter Password"
          name="password"
          value={data.password}
          className="p-3 w-full bg-gray-700 text-white border-b-2 border-gray-600 focus:border-blue-500 focus:outline-none text-lg mb-4 rounded-md"
          onChange={change}
        />
        <div className="w-full flex items-center justify-between">
          <button
            className="my-5 bg-indigo-500 shadow-lg shadow-indigo-500/50 hover:bg-indigo-600 w-2/6 p-2 rounded transition-all duration-300 mx-2 font-semibold"
            onClick={submitFunction}
          >
            Login
          </button>
          <Link
            to="/signup"
            className="p-2 text-lg text-gray-400 hover:text-blue-300"
          >
            Create a new Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
