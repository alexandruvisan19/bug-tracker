import "./App.css";
import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddEdit from "./pages/AddEdit";
import View from "./pages/View";
import About from "./pages/About";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";

function App() {
	const [issueTerm, setIssueTerm] = useState("");

	return (
		<BrowserRouter>
			<div className="App">
				<Header setIssueTerm={setIssueTerm} />
				<ToastContainer position="top-center" />
				<Routes>
					<Route exact path="/" element={<Home issueTerm={issueTerm} />} />
					<Route path="/add" element={<AddEdit />} />
					<Route path="/update/:id" element={<AddEdit />} />
					<Route path="/view/:id" element={<View />} />
					<Route path="/about" element={<About />} />
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
