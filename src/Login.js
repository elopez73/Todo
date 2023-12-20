import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./components/AuthContext";
import './styles/Login.css';
import { useNavigate } from 'react-router-dom';
axios.defaults.withCredentials = true;

function Login() {
	const [EmailReg, setEmailReg] = useState('');
	const [pwdReg, setPwdReg] = useState('');
	const [EmailCheck, setEmailCheck] = useState('');
	const [pwdCheck, setPwdCheck] = useState('');
	const { dispatch } = useContext(AuthContext);
	const navigate = useNavigate();
	const api = process.env.REACT_APP_API_SITE;

	function handleLogin(loggedIn, user) {
		dispatch({ type: 'LOGIN', payload: { loggedIn, user } });
	};
	const register = async () => {

		try {
			const res = await axios.post(`${api}/api/auth/register`, { email: EmailReg, hashpassword: pwdReg, })
			if(res.data)
			{
				try {
					await axios.post(`${api}/api/auth/${EmailCheck}/login`, {
						email: EmailCheck,
						password: pwdCheck,
					}).then((response) => {
						if (response.data.message) {
							handleLogin(response.data.message)
						} else {
							handleLogin(true, response.data.user);
							sessionStorage.setItem("loggedIn", true);
							sessionStorage.setItem("user", JSON.stringify(response.data.user[0]));
							navigate("/mylists");
						}
					})
				}
				catch {
					alert('Registration complete but login failed, please re-try.');
				}

			}
		} catch (err) {
			console.log(err)
			alert('Failed to register, please try again');
		}

	}

	//LOGIN
	const login = async () => {

		await axios.post(`${api}/api/auth/${EmailCheck}/login`, {
			email: EmailCheck,
			password: pwdCheck,
		}).then((response) => {
			if (response.data.message) {
				handleLogin(response.data.message)
			} else {
				handleLogin(true, response.data.user);
				sessionStorage.setItem("loggedIn", true);
				sessionStorage.setItem("user", JSON.stringify(response.data.user[0]));
				navigate("/mylists");
			}
		})
	}


	const [show, setShow] = useState(false);

	return (show ? <div className="auth-container">
		<div className="login">
			<h2>Registration</h2>
			<div className="input">
				<label>Email</label>
				<input type="text" onChange={(e) => { setEmailReg(e.target.value) }} />
			</div>
			<div className="input">
				<label>Password</label>
				<input type="password" onChange={(e) => { setPwdReg(e.target.value) }} />
			</div>


			<button onClick={register}>Register</button>
			<p>Already have an account?</p>
			<button className="signup-button" onClick={() => setShow(false)}>Click here</button>

		</div>
	</div> :
		<div className="auth-container">
			<div className="login">
				<h2>Login</h2>
				<div className="input">
					<label>Email</label>
					<input type="text" onChange={(e) => { setEmailCheck(e.target.value) }} />
				</div>
				<div className="input">
					<label>Password</label>
					<input type="password" onChange={(e) => { setPwdCheck(e.target.value) }} />
				</div>
				<button onClick={login}>Login</button>
				<p>Need to register?</p>
				<button className="signup-button" onClick={() => setShow(true)}>Click here</button>
			</div>
		</div>




	);
}

export default Login;
