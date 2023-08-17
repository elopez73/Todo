import { useContext} from "react";
import { Route, Routes} from "react-router-dom";
import NavBar from "./nav/Navbar";
import Login from "./Login";
import Home from "./Home";
import MyLists from "./MyLists";
import "./App.css";
import { AuthContext } from "./components/AuthContext";
function App() {
	const { loggedIn } = useContext(AuthContext);

	return (<div>
		<NavBar/>
		<Routes>
			<Route path="/" element={<Home/> } />
			{loggedIn ? (
				<Route path="/mylists" element={<MyLists />} />
			) : (
					<Route path="/login" element={<Login />} />
			)}



		</Routes>


		</div>

	);
}

export default App;
