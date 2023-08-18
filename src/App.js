import { Route, Routes, useLocation } from "react-router-dom";
import NavBar from "./nav/Navbar";
import Login from "./Login";
import Home from "./Home";
import MyLists from "./MyLists";
import "./App.css";
import Status from "./components/Status";
function App() {

	const location = useLocation();
	return (<div>
		<Status />
		<NavBar />
		<Routes key={location.pathname} location={location}>
			<Route path="/" element={<Home />} />
			<Route path="/mylists" element={<MyLists />} />
			<Route path="/login" element={<Login />} />
		</Routes>

	</div>

	);
}

export default App;
