import React, { useState, useEffect } from "react";
import db from "../firebase";
import { doc, collection, getDocs, deleteDoc } from "firebase/firestore";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
	const [issues, setIssues] = useState([]);
	const issuesCollectionRef = collection(db, "issues");

	useEffect(() => {
		const getIssues = async () => {
			const data = await getDocs(issuesCollectionRef);
			setIssues(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
		};

		getIssues();
	}, [issuesCollectionRef]);

	const onDelete = async (id) => {
		if (window.confirm("Are you sure you want to delete this issue?")) {
			await deleteDoc(doc(issuesCollectionRef, id));
		}
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
									<Link to={`/view/${issue.id}`}>
										<button className="btn btn-view">View</button>
									</Link>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}

export default Home;
