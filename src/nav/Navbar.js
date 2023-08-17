
import { Link, useNavigate } from "react-router-dom";
import classes from './Nav.module.css';
import Status from "../components/Status";
import { AuthContext } from "../components/AuthContext";
import { useContext, useEffect } from "react";
function NavBar() {
	const { loggedIn } = useContext(AuthContext);
	const navigate = useNavigate();
	useEffect(() => {
		if (!loggedIn && window.location.pathname === "/mylists") {
			navigate("/");
		}
	}, [loggedIn, navigate]);
	return (
		<header className={classes.navBar}>
			<Status />
			<div className={classes.dropdown}>
				<button className={classes.dropbtn}>Menu</button>
				<nav>
					<div className={classes.dropdownContent}>

						<ul>
							<li>
								<Link to="/">Home</Link>
							</li>
							{!loggedIn ? <li> <Link to="/login">Login</Link> </li> : <li><Link to="/mylists">Mylists</Link>
							</li>}
						</ul>

					</div>
				</nav>

			</div>
		</header>
	)
};

export default NavBar;
