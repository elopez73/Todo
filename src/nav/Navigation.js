import { Link } from "react-router-dom";
import classes from './Nav.module.css';
function Naviagtion() {
    return (
		<header className={classes.navBar}>
		<div className={classes.dropdown}>
			<button className={classes.dropbtn}>Menu</button>
		<nav>
		<div className={classes.dropdownContent}>
			<ul>
			<li>
					<Link to="/">Home</Link>
				</li>
				<li>
					<Link to="/login">Login</Link>
				</li>

			</ul>
			</div>
		</nav>

		</div>
	</header>
    )
}

export default Naviagtion;
