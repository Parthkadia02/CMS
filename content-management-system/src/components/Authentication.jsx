import React, { useEffect, useState } from 'react'
import { auth, app } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { Link } from 'react-router-dom';


const Authentication = () => {
    const [authenticatedUser, setAuthenticatedUser] = useState("");

    useEffect(() => {
        const listenAuth = onAuthStateChanged(auth, (user) =>{
            if (user){
                setAuthenticatedUser(user)
            } else{
                setAuthenticatedUser(null)
            }
        }
        )
        return () =>{
            listenAuth();
        }
    },[])

    const userSignOut = () => {
        signOut(auth)
    }

  return (
    <>
    {authenticatedUser ? (
        <>
          <Link className="logout bg-red-500 text-white px-4 py-2 rounded" to="/login" onClick={userSignOut}>Logout</Link>
        </>
      ) : (
        <>
          <Link className='login bg-blue-500 text-white px-4 py-2 rounded mr-2' to="/login">Login</Link>
        </>
      )}
    </>
  )
}

export default Authentication
