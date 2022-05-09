import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";

const Header = (props) => {
	const [activeTab, setActiveTab] = useState("Home");
	const location = useLocation();
	const [search, setSearch] = useState("");

	useEffect(() => {
		if (location.pathname === "/") {
			setActiveTab("Home");
			props.setIssueTerm(search);
		} else if (location.pathname === "/add") {
			setActiveTab("AddIssue");
		} else if (location.pathname === "/about") {
			setActiveTab("About");
		}
	}, [location]);

	const handleSubmit = (e) => {
		e.preventDefault();
		props.setIssueTerm(search);
		setSearch("");
	};

	const resetSearch = () => {
		setSearch("");
		props.setIssueTerm("");
	};

	return (
		<div className="header">
			<p className="logo">888poker Bug Tracker</p>
			<div className="header-right">
				{location.pathname === "/" && (
					<>
						<form onSubmit={handleSubmit}>
							<input
								type="text"
								className="inputField"
								placeholder="Search Issue..."
								onChange={(e) => setSearch(e.target.value)}
								value={search}
							/>
							<button className="searchBtn">Search</button>
						</form>
						<button onClick={resetSearch} className="resetBtn">
							Reset
						</button>
					</>
				)}
				<Link to="/">
					<p className={`${activeTab === "Home" ? "active" : ""}`} onClick={() => setActiveTab("Home")}>
						Home
					</p>
				</Link>
				<Link to="/add">
					<p className={`${activeTab === "AddIssue" ? "active" : ""}`} onClick={() => setActiveTab("AddIssue")}>
						Add Issue
					</p>
				</Link>
				<Link to="/about">
					<p className={`${activeTab === "About" ? "active" : ""}`} onClick={() => setActiveTab("About")}>
						About
					</p>
				</Link>
			</div>
		</div>
	);
};

export default Header;
