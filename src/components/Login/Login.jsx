import Lottie from 'lottie-react';
import React, { useContext, useState } from 'react';
import loginLottieJSON from '../../assets/login-lottie.json'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';
import SocialLogin from '../SocialLogin/SocialLogin';

const Login = () => {

    const [user, setUser] = useState(null)
    const { signInUser } = useContext(AuthContext);
    const [success,setSuccess] = useState(false);
    const [loginError, setLoginError] = useState("")
    const location = useLocation();
    const navigate = useNavigate();
    console.log('in signIn page', location)
    const from = location.state || '/';

    const handleSignIn = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);

        setSuccess(false);
        setLoginError('');

        signInUser(email, password)
            .then(result => {
                setUser(result.user)
                setSuccess(true)
                navigate(from);
            })
            .catch(error => {
                console.log(error);
                setLoginError(error.message);
            })

    }

    return (
        <div className="hero bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left w-96">
                    <Lottie animationData={loginLottieJSON}></Lottie>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <h1 className="ml-8 text-3xl font-bold">Login now!</h1>
                    <form onSubmit={handleSignIn} className="card-body p-2">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name='email' placeholder="email" className="input input-bordered" required />
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
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Login</button>
                        </div>

                        <p>If you don't have an account, please <Link to="/register" className='text-blue-600'> Register</Link></p>
                    </form>

                    {
                        success && <p className='text-green-500'>Login successfull</p>
                    }
                    {
                        loginError && <p className='text-red-500'>Invalid email or password</p>
                    }
                    <SocialLogin></SocialLogin>
                </div>
            </div>
        </div>
    );
};

export default Login;