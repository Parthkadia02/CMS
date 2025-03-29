import React, { useEffect, useState } from 'react'
import { auth } from '../firebase'
import NavBar from '../components/NavBar'

const HomePage = () => {
    const [name, setName] = useState("")
    useEffect(() => {
        const user = auth.currentUser;
        if (user) {
            setName(user.displayName);
        }
        else {
            setName(null)
        }
    },[]);

  return (
    <div>
        <NavBar/>
        <div className='flex items-center justify-center h-screen'>
          <h1 className='text-black font-bold text-5xl'>Welcome to my Website! {name}</h1>
        </div>
    </div>
  )
}

export default HomePage
