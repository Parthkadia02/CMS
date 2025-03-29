import React, { useState } from 'react'
import './index.css'
import { auth, app } from '../firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { Link } from 'react-router';
import { useNavigate } from 'react-router';


const SignUp = () => {
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate('');

    const SignUp = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                updateProfile(user, {
                    displayName: name
                }).then(() => {
                navigate("/login")
                //console.log(userCredential)
            }).catch((error) => {
                console.error("Error updating profile")
            })
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
                        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">Sign Up</h1>
                        <p className="text-sm text-gray-600 text-center mb-6">Already a user? <span><Link to="/login" className="text-blue-600 hover:underline">Login</Link></span></p>
                    </div>

                    <form onSubmit={SignUp} className="space-y-4">
                    <div className="input-control">
                            <input type="text" placeholder="Enter your username" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none" required />
                        </div>
                        <div className="input-control">
                            <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none" required />
                        </div>
                        <div className="input-control">
                            <input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none" required />
                        </div>
                        <button type="submit" name="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300" value="Sign In">Sign Up</button>
                    </form>
                </section>

            </div>
        </>
  )
}

export default SignUp
