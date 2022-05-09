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
import Modal from "./components/Modal";

function App() {
	const [issueTerm, setIssueTerm] = useState("");
	const [showModal, setShowModal] = useState(false);
	const [getModalData, setGetModalData] = useState([]);

	return (
		<BrowserRouter>
			<div className="App">
				<Header setIssueTerm={setIssueTerm} />
				<ToastContainer position="top-center" />
				<Routes>
					<Route
						exact
						path="/"
						element={<Home setGetModalData={setGetModalData} setShowModal={setShowModal} issueTerm={issueTerm} />}
					/>
					<Route path="/add" element={<AddEdit />} />
					<Route path="/update/:id" element={<AddEdit />} />
					<Route path="/view/:id" element={<View />} />
					<Route path="/about" element={<About />} />
				</Routes>
			</div>
			<Modal getModalData={getModalData} showModal={showModal} setShowModal={setShowModal} />
		</BrowserRouter>
	);
}

export default App;
