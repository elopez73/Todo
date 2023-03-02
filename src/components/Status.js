import { useState, useEffect } from "react";
import Axios from "axios";


function Status() {
    const [loginStatus, setLoginStatus] = useState('');
    useEffect(() => {
        Axios.get('https://todoserver.herokuapp.com/login').then((response) => {


            if (response.data.loggedIn === true) {
                setLoginStatus(response.data.user)

            }

        });
    }, [])

    return (
        <h2 className="current">Currently Logged in as: {loginStatus}</h2>
    )
}
export default Status;
