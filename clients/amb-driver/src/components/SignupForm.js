import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const SignupForm = () => {
	const navigate = useNavigate();

	const [name, setName] = useState('');
	const [password, setPassword] = useState('');
	const [ambNumber, setAmbNumber] = useState('');

	async function registerUser(event) {
		event.preventDefault();
		const response = await fetch('https://auth-server-ws.herokuapp.com/api/auth/signup', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name,
				password,
				ambNumber,
			}),
		})

		const data = await response.json()
		console.log(data);
		if (data.status === 'ok') {
			navigate('/login');
		}
	}

	return (

		<div class="min-h-screen bg-gray-100 flex flex-col justify-center py-12 px-6 lg:px-8">
			<div class="sm:mx-auto sm:w-full sm:max-w-md">
			<img class="mx-auto h-12 w-auto" src="../icons/ambulance (2).png" alt="ambulance" />
				<h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Create your account</h2>
				<p class="mt-2 text-center text-sm text-gray-600 max-w">
					Already registered?
					<Link to={'/login'} class="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"> Sign in</Link>
				</p>
			</div>

			<div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
				<div class="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
					<form class="mb-0 space-y-6" onSubmit={registerUser}>

						<div>
							<label for="ambnum" class="block text-sm font-medium text-gray-700">Ambulance Number</label>
							<div class="mt-1">
								<input id="ambnum" name="ambnum" type="text" autocomplete="ambnum" required class=""
								value={ambNumber}
								onChange={(e) => setAmbNumber(e.target.value)} />
							</div>
						</div>

						<div>
							<label for="username" class="block text-sm font-medium text-gray-700">Username</label>
							<div class="mt-1">
								<input
								id="username" name="username" type="text" autocomplete="username" required class="" value={name} onChange={(e) => setName(e.target.value)}
								/>
							</div>
						</div>

						<div>
							<label
								for="password" class="block text-sm font-medium text-gray-700">
								Password
							</label>
							<div class="mt-1">
								<input
								id="password" name="password" type="password" 
								autocomplete="current-password" required class=""
								value={password} onChange={(e) => setPassword(e.target.value)} />
							</div>
						</div>

						<div class="flex items-center">
							<input id="terms-and-privacy" name="terms-and-privacy" type="checkbox" class="" />
							<label for="terms-and-privacy" class="ml-2 block text-sm text-gray-900"
								>I agree to the
								<Link to={'/a/terms'} class="text-indigo-600 hover:text-indigo-500">Terms </Link>
								and
								<Link to={'/a/policy'} class="text-indigo-600 hover:text-indigo-500"> Privacy Policy</Link>.
							</label>
						</div>

						<div>
							<button type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Sign up</button>
						</div>
					</form>
				</div>
			</div>
		</div>




		// <div>
		// 	<h1>Register</h1>
		// 	<form onSubmit={registerUser}>
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

        //         <input
		// 			value={ambNumber}
		// 			onChange={(e) => setAmbNumber(e.target.value)}
		// 			type="text"
		// 			placeholder="Ambulance Number"
		// 		/>
        //         <br />

		// 		<input type="submit" value="Register" />
		// 	</form>
		// </div>
	)
}

export default SignupForm;