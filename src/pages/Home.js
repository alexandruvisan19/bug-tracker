import React, { useState, useEffect } from "react";
import db from "../firebase";
import { doc, collection, getDocs, deleteDoc } from "firebase/firestore";
import { Link, useParams } from "react-router-dom";
import "./Home.css";

function Home(props) {
	const [issues, setIssues] = useState([]);
	const [selectedIssue, setSelectedIssue] = useState([]);
	const issuesCollectionRef = collection(db, "issues");
	const { title, issueDescription, solvedDescription, webmasterName, date, tagName, market, id } = selectedIssue;

	useEffect(() => {
		(async () => {
			const data = await getDocs(issuesCollectionRef);
			const objectData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
			objectData.filter((val) => {
				if (props.issueTerm === "") {
					setIssues(objectData);
				} else if (val.title.toLowerCase().includes(props.issueTerm.toLowerCase())) {
					setIssues(objectData.filter((val) => val.title.toLowerCase().includes(props.issueTerm.toLowerCase())));
				}
			});
		})();
	}, [props.issueTerm]);

	const onDelete = (id) => {
		if (window.confirm("Are you sure you want to delete this issue?")) {
			deleteDoc(doc(issuesCollectionRef, id));
			setIssues(issues.filter((issue) => issue.id !== id));
		}
	};

	const onPopup = (id) => {
		setSelectedIssue(...issues.filter((doc) => doc.id === id));
	};

	return (
		<div>
			<table className="styled-table">
				<thead>
					<tr>
						<th style={{ textAlign: "center" }}>No. #️⃣</th>
						<th style={{ textAlign: "center" }}>Title Issue 🔖</th>
						<th style={{ textAlign: "center" }}>Issue Description 📓</th>
						<th style={{ textAlign: "center" }}>Solved Description ✅</th>
						<th style={{ textAlign: "center" }}>Webmaster Name 🤓</th>
						<th style={{ textAlign: "center" }}>Market 🔗</th>
						<th style={{ textAlign: "center" }}>Date 📅</th>
						<th style={{ textAlign: "center" }}>Tagname 🏷️</th>
						<th style={{ textAlign: "center" }}>Action 🖐️</th>
					</tr>
				</thead>
				<tbody>
					{issues.map((issue, id) => {
						return (
							<tr key={issue.id}>
								<th scope="row">{id + 1}</th>
								<td>{issue.title}</td>
								<td>{issue.issueDescription}</td>
								<td>{issue.solvedDescription}</td>
								<td>{issue.webmasterName}</td>
								<td>
									<a href={`https://www.${issue.market}`} target="_blank" rel="noreferrer">
										{issue.market}
									</a>
								</td>
								<td>{issue.date}</td>
								<td>{issue.tagName}</td>
								<td>
									<Link to={`/update/${issue.id}`}>
										<button className="btn btn-edit">Edit</button>
									</Link>
									<button className="btn btn-delete" onClick={() => onDelete(issue.id)}>
										Delete
									</button>
									<button className="btn btn-view" onClick={() => onPopup(issue.id)}>
										View
									</button>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
			<div style={{ marginTop: "150px" }}>
				<div className="card">
					<div className="card-header">
						<p>Issue Details</p>
					</div>
					<div className="container">
						<strong>ID:</strong>
						<span>{id || ""}</span>
						<br />
						<br />
						<strong>title:</strong>
						<span>{title || ""}</span>
						<br />
						<br />
						<strong>Webmaster:</strong>
						<span>{webmasterName || ""}</span>
						<br />
						<br />
					</div>
				</div>
			</div>
		</div>
	);
}

export default Home;
