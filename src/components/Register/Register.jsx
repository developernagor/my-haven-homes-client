import Lottie from "lottie-react";
import React, { useContext, useState } from "react";
import registerLottieData from "../../assets/registration-lottie.json";

import { AuthContext } from "../../providers/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import SocialLogin from "../SocialLogin/SocialLogin";
import axios from "axios";
import { updateProfile } from "firebase/auth";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Register = () => {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const { createUser } = useContext(AuthContext);
  

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
  
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const image = form.image.files[0];
    const password = form.password.value;
  
    // Password validation
    if (password.length < 6) {
      setError("Password should be at least 6 characters.");
      return;
    }
    if (!/[A-Z]/.test(password)) {
      setError("Password should have at least one uppercase letter.");
      return;
    }
    if (!/[#?!@$%^&*-]/.test(password)) {
      setError("Password should have at least one special character.");
      return;
    }
  
    try {
      // Image upload to imgbb
      const imageFormData = new FormData();
      imageFormData.append("image", image);
  
      const imgRes = await axios.post(image_hosting_api, imageFormData);
      const photoURL = imgRes.data.data.url;
  
      // Create user with Firebase
      const userCredential = await createUser(email, password);
      const user = userCredential.user;
      // console.log(userCredential, user)
  
      // Update profile with displayName and photoURL
      await updateProfile(user, {
        displayName: name,
        photoURL: photoURL,
      });
  
      setSuccess("User registered successfully!");
      // console.log("User created:", { name, email, photoURL });
  
      // Reset form and navigate
      form.reset();
      navigate("/login");
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  return (
    <div className="hero bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left w-96">
          <Lottie animationData={registerLottieData}></Lottie>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <h1 className="ml-8 text-3xl font-bold">Register now!</h1>
          <form onSubmit={handleRegister} className="card-body p-2">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="Name"
                name="name"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">PhotoURL</span>
              </label>
              <input
                type="file"
                accept="image/*"
                name="image"
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />{" "}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>

            {error && (
            <p className="text-sm text-red-500">
              <strong>Error:</strong> {error}
            </p>
          )}
          {success && (
            <p className="text-sm text-green-500">
              <strong>Success:</strong> {success}
            </p>
          )}

            <div className="form-control">
              <button className="btn btn-primary">Register</button>
            </div>
          </form>
          <p>
            If you aleady have an account, please{" "}
            <Link to="/login" className="text-blue-600 ">
              Login
            </Link>
          </p>
          <SocialLogin></SocialLogin>
        </div>
      </div>
    </div>
  );
};

export default Register;
