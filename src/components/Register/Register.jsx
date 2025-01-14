import Lottie from 'lottie-react';
import React, { useContext, useState } from 'react';
import registerLottieData from '../../assets/registration-lottie.json';

import { AuthContext } from '../../providers/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
import SocialLogin from '../SocialLogin/SocialLogin';

const Register = () => {

    const [error, setError] = useState("")

    const navigate = useNavigate();

    const { createUser } = useContext(AuthContext);

    const handleRegister = e => {
        e.preventDefault();
        setError("")
        const form = e.target;

    const name = form.name.value;
    const email = form.email.value;
    const image = form.image.value;
    const password = form.password.value;
    const user = {name, email, image, password}
    console.log(user)
        // password validation: 
        if(password.length < 6) {
            setError("Password should be at least 6 characters.")
            return;
          }
        //   if(!/[a-z]/.test(password)){
        //     setError("Password should be at least one lowercase letter.")
        //     return;
        //   }
          if(!/[A-Z]/.test(password)){
            setError("Password should be at least one uppercase letter.")
            return;
          }
          if(!/[#?!@$%^&*-]/.test(password)){
            setError("Password should be at least one special character.")
            return;
          }
      
        
        createUser(email, password)
            .then(result => {
                console.log(result.user)
                const newUser = {name,email,image}
        //         // save new user info in database

        //         fetch('https://easy-recommendations-server.vercel.app/users', {
        //             method: 'POST',
        //             headers: {
        //               'Content-Type': 'application/json',
        //             },
        //             body: JSON.stringify(newUser),
        //           })
        //             .then((res) => res.json())
        //             .then((data) => {
        //               console.log(data);
        //             })
        //             .catch((error) => console.error('Error:', error));

                form.reset();
                navigate('/login')
            })
            .catch(error => {
                console.log(error.message)
            })

    }

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
              <input type="text" placeholder="Name" name='name' className="input input-bordered" required />
            </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name='email' placeholder="email" className="input input-bordered" required />
                        </div>

                        <div className="form-control">
              <label className="label">
                <span className="label-text">PhotoURL</span>
              </label>
              <input type="text" placeholder="Photo URL" name='image' className="input input-bordered" required />
            </div>


                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name='password' placeholder="password" className="input input-bordered" required />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>

                        {error && <div className="alert alert-error mt-4"><span>{error}</span></div>}

                        <div className="form-control">
                            <button className="btn btn-primary">Register</button>
                        </div>
                    </form>
                    <p>If you aleady have an account, please <Link to="/login" className='text-blue-600 '>Login</Link></p>
                    <SocialLogin></SocialLogin>
                </div>
            </div>
        </div>
    );
};

export default Register;