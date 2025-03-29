import React, { useState } from 'react'
import './index.css'
import { auth, app } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Link } from 'react-router';
import { useNavigate } from 'react-router';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate('');

    const Login = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                navigate("/dashboard")
                //console.log(userCredential)
            })
            .catch((error) => {
                //console.log(error)
            });
    }

    return (
        <>
            <div className="flex items-center justify-center min-h-screen">
                <section className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                    <div className="heading">
                        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">Login</h1>
                        <p className="text-sm text-gray-600 text-center mb-6">New user? <span><Link to="/signup" className="text-blue-600 hover:underline">Create an account</Link></span></p>
                    </div>

                    <form onSubmit={Login} className="space-y-4">
                        <div className="input-control">
                            <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none" required/>
                        </div>
                        <div className="input-control">
                            <input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none" required/>
                        </div>
                        <button type="submit" name="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300" value="Sign In">Login</button>
                    </form>
                </section>

            </div>
        </>
    )
}

export default Login
