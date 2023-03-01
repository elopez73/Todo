import { useState, useEffect } from "react";
import Axios from "axios";



function Status() {

    const [loginStatus, setLoginStatus] = useState('');
	useEffect(() => {
		Axios.get('https://todoserver.herokuapp.com/check').then((response) => {
			if (response.data.loggedIn === true) {
				setLoginStatus(response.data.user[0].email)
			}

		});
	}, [])
    return (
        <h2 className="current">Currently Logged in as: {loginStatus}</h2>
    )
}
export default Status;
