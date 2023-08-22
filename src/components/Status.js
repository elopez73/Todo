import { useContext} from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

import styles from '../styles/Status.module.css';



async function handleLogOut(dispatch) {

	await dispatch({ type: 'LOGOUT' });
};



function Status() {
	const api = process.env.API_SITE;
	const { user, dispatch } = useContext(AuthContext);

	const logOut = () => {
		axios.post(`${api}/api/auth/${user?.email}/logout`).then((response) => {
			if (response.data.message) {
				handleLogOut(dispatch);
			}
		})
	}



	return (<div className={styles.contain}>
		<h2>Logged in as: {user?.email}</h2>
		<button className={styles.button} onClick={logOut}>Log Out</button>


	</div>

	)
}
export default Status;
