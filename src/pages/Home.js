import React, { useState, useEffect } from "react";
import db from "../firebase";
import { doc, collection, getDocs, deleteDoc } from "firebase/firestore";
import { Link, useParams } from "react-router-dom";
import "./Home.css";

function Home(props) {
	const [issues, setIssues] = useState([]);
	const [selectedIssue, setSelectedIssue] = useState([]);
	const issuesCollectionRef = collection(db, "issues");
	const [order, setOrder] = useState("ASC");

	const openModal = (id) => {
		setSelectedIssue(...issues.filter((doc) => doc.id === id));
		props.setGetModalData(...issues.filter((doc) => doc.id === id));
		props.setShowModal((prev) => !prev);
	};

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

	const sorting = (col) => {
		if (order === "ASC") {
			const sorted = [...issues.sort((a, b) => (a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1))];
			setIssues(sorted);
			setOrder("DES");
		}
		if (order === "DES") {
			const sorted = [...issues.sort((a, b) => (a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1))];
			setIssues(sorted);
			setOrder("ASC");
		}
	};
	return (
		<div>
			<table className="styled-table">
				<thead>
					<tr>
						<th style={{ textAlign: "center" }}>No. #️⃣</th>
						<th onClick={() => sorting("title")} style={{ textAlign: "center" }}>
							Issue 🔖 {order === "ASC" ? <span>↓</span> : <span>↑</span>}
						</th>
						<th onClick={() => sorting("issueDescription")} style={{ textAlign: "center" }}>
							Issue Description 📓 {order === "ASC" ? <span>↓</span> : <span>↑</span>}
						</th>
						<th onClick={() => sorting("solvedDescription")} style={{ textAlign: "center" }}>
							Solved Description ✅ {order === "ASC" ? <span>↓</span> : <span>↑</span>}
						</th>
						<th onClick={() => sorting("webmasterName")} style={{ textAlign: "center" }}>
							Webmaster 🤓 {order === "ASC" ? <span>↓</span> : <span>↑</span>}
						</th>
						<th onClick={() => sorting("market")} style={{ textAlign: "center" }}>
							Market 🔗 {order === "ASC" ? <span>↓</span> : <span>↑</span>}
						</th>
						<th onClick={() => sorting("date")} style={{ textAlign: "center" }}>
							Date 📅 {order === "ASC" ? <span>↓</span> : <span>↑</span>}
						</th>
						<th onClick={() => sorting("tagName")} style={{ textAlign: "center" }}>
							Tagname 🏷️ {order === "ASC" ? <span>↓</span> : <span>↑</span>}
						</th>
						<th style={{ textAlign: "center" }}>Action 🖐️</th>
					</tr>
				</thead>
				<tbody>
					{issues.map((issue, id) => {
						return (
							<tr key={issue.id}>
								<th style={{ backgroundColor: "#f3f3f3", color: "black" }} scope="row">
									{id + 1}
								</th>
								<td>
									<h3>{issue.title}</h3>
								</td>
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
									<button className="btn btn-view" onClick={() => openModal(issue.id)}>
										View
									</button>
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
