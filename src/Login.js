import { useState, useEffect } from "react";
import Axios from "axios";
function Login() {
	const [EmailReg, setEmailReg] = useState('');
	const [pwdReg, setPwdReg] = useState('');
	const [EmailCheck, setEmailCheck] = useState('');
	const [pwdCheck, setPwdCheck] = useState('');
	Axios.defaults.withCredentials = true;

	const register = () => {
		Axios.post('https://todoserver.herokuapp.com/register', { email: EmailReg, hashpassword: pwdReg, }).then((response) => {
			console.log(response);
		})
	}
	const [loginStatus, setLoginStatus] = useState('');

	const login = () => {
		Axios.post('https://todoserver.herokuapp.com/login', {
			email: EmailCheck,
			hashpassword: pwdCheck,
		}).then((response) => {
			if (response.data.message) {
				setLoginStatus(response.data.message)
			} else {
				setLoginStatus(response.data[0].email);
			}

		})
	}

	useEffect(() => {
		Axios.get('https://todoserver.herokuapp.com/login',{
			email: EmailCheck,
			hashpassword: pwdCheck,
		}).then((response) => {
			if (response.data.loggedIn === true) {
				setLoginStatus(response.data.user[0].email)
			}

		});
	}, [])

	const [show, setshow] = useState(false);

	return (

		<div>
			<h2 className="current">Currently Logged in as: {loginStatus}</h2>

			<div className="login">
				<h2>Login: </h2>
				<label >Email: </label>
				<input type="text" onChange={(e) => { setEmailCheck(e.target.value) }} />
				<br />
				<label >Password: </label>
				<input type="password" onChange={(e) => { setPwdCheck(e.target.value) }} />
				<br />
				<button onClick={login}>Login</button>
				<br />
				<p>Need to register?</p>
				<button onClick={()=>setshow(true)}>Click here</button>
			</div>
			{ show &&
				<div className="signup">
					<h2>Registration</h2>
					<label >Email: </label>
					<input type="text" onChange={(e) => { setEmailReg(e.target.value) }} />
					<br />
					<label >Password: </label>
					<input type="password" onChange={(e) => { setPwdReg(e.target.value) }} />
					<br />
					<button onClick={register}>Register</button>
				</div>
			}
		</div>


	);
}

export default Login;
