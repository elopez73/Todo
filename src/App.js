import {  Route, Routes } from "react-router-dom";
import NavBar from "./nav/Navbar";
import Login from "./Login";
import Home from "./Home";
import "./App.css";

function App() {

	return (<div>
		<NavBar/>
		<Routes>
					<Route path="/" element={<Home/> } />
					<Route path="/login" element={ <Login/>} />
		</Routes>


		</div>

	);
}

export default App;
