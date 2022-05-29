import React from 'react'
import { useNavigate } from 'react-router-dom';

const Home = () => {
	
	const navigate = useNavigate();
	const handleLogin = () => {
		navigate('/login');
	}
	const handleSignup = () => {
		navigate('/signup');
	}
  return (
    <div>
		<h1 className='mt-6 text-center text-4xl font-extrabold text-gray-900'>Hello Ambulance driver</h1>
		<div className='amb'><img src="../icons/working.gif" alt="gif" /></div>
		<div className="flex justify-evenly">

			<button onClick={handleLogin} type="submit" class="flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer">Sign in</button>

			<button onClick={handleSignup} type="submit" class="flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer">Sign Up</button>
			
		</div>
    </div>
  )
}

export default Home;