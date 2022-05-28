import { useState } from 'react';
import { Link } from 'react-router-dom';

const LoginForm = () => {
	const [name, setName] = useState('')
	const [password, setPassword] = useState('')

	async function loginUser(event) {
		event.preventDefault();

		const response = await fetch('http://auth-server-ws.herokuapp.com/api/auth/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name,
				password,
			}),
		})

		const data = await response.json()
		// console.log(data);
		if (data.driver) {
			localStorage.setItem('token', data.driver)
			alert('Login successful')
			window.location.href = '/title';
		} else {
			alert(`Please check your ${name} and ${password}`)
		}
	}

	return (
		<div class="min-h-screen bg-gray-100 flex flex-col justify-center py-12 px-6 lg:px-8">
			<div class="sm:mx-auto sm:w-full sm:max-w-md">
				<img class="mx-auto h-12 w-auto" src="../icons/ambulance (2).png" alt="ambulance" />
				<h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Login to your account</h2>
				<p class="mt-2 text-center text-sm text-gray-600 max-w">
					Haven't registered?
					<Link to={'/signup'} class="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"> Sign up</Link>
				</p>
			</div>

			<div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
				<div class="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
					<form class="mb-0 space-y-6" onSubmit={loginUser}>
						<div>
							<label for="username" class="block text-sm font-medium text-gray-700">Username</label>
							<div class="mt-1">
								<input
								 id="username" name="username" type="text" autocomplete="username" required class="" value={name} onChange={(e) => setName(e.target.value)}
								 />
							</div>
						</div>

						<div>
							<label for="password" class="block text-sm font-medium text-gray-700">Password</label>
							<div class="mt-1">
								<input 
								id="password" name="password" type="password" autocomplete="current-password" required class=""
								value={password} onChange={(e) => setPassword(e.target.value)}
								/>
							</div>
						</div>

						<div>
							<button type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Sign in</button>
						</div>
					</form>
				</div>
			</div>
		</div>

		
		// <div>
		// 	<h1 className='text-4xl'>Login</h1>
		// 	<form onSubmit={loginUser}>
		// 		<input
		// 			value={name}
		// 			onChange={(e) => setName(e.target.value)}
		// 			type="text"
		// 			placeholder="Name"
		// 		/>
		// 		<br />
		// 		<input
		// 			value={password}
		// 			onChange={(e) => setPassword(e.target.value)}
		// 			type="password"
		// 			placeholder="Password"
		// 		/>
		// 		<br />
		// 		<input type="submit" value="Login" />
		// 	</form>
		// </div>
	)
}

export default LoginForm;