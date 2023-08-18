import { useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import styles from '../styles/Status.module.css';


function handleLogin(dispatch, user) {

	dispatch({ type: 'LOGIN', payload: user });
};
async function handleLogOut(dispatch) {

	await dispatch({ type: 'LOGOUT' });
};



function Status() {
	const api = 'https://boxscoreapi-263655f53c81.herokuapp.com';
	const navigate = useNavigate();
	const { user, dispatch } = useContext(AuthContext);
	const logOut = () => {
		axios.post(`${api}/api/auth/logout`).then((response) => {
			if (response.data.message) {
				handleLogOut(dispatch);
			}
		})
	}

	useEffect(() => {
		if (user === null)
			axios.get(`${api}/api/auth/login`).then((response) => {

				if (response.data.loggedIn === true) {
					handleLogin(dispatch, response.data);
				}
			});
	}, [dispatch, user, navigate, api]);

	return (<div className={styles.contain}>
		<h2>Logged in as: {user?.email}</h2>
		<button className={styles.button} onClick={logOut}>Log Out</button>


	</div>

	)
}
export default Status;
