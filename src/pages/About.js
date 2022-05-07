import React from "react";
import "./About.css";

export default function About() {
	return (
		<div className="about">
			<h2>About The Application</h2>

			<ul>
				<li>
					This App is built using React and for the{" "}
					<a href="https://developer.mozilla.org/en-US/docs/Glossary/CRUD">CRUD</a> operations its using Firebase.
				</li>
				<li>
					This App should only be usable from a desktop environment since it's hard to work with tables from a mobile.
				</li>
			</ul>
		</div>
	);
}
