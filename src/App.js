
import { Routes, Route, useLocation } from "react-router-dom";
import Naviagtion from "./nav/Navigation";
import Login from "./Login";
import Home from "./Home";

import "./App.css";




function App() {

	const location =useLocation();


	return (

		<div>

			<Naviagtion/>
			<Routes  key={location.pathname} location={location}>
			<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />

			</Routes>

		</div>
	);
}

export default App;
