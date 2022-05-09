import React, { useState, useEffect } from "react";
import db from "../firebase";
import { collection, getDocs, addDoc, updateDoc, doc } from "firebase/firestore";
import "./View.css";
import { useNavigate, useParams } from "react-router-dom";

function View() {
	const [issue, setIssue] = useState({});
	const { id } = useParams();
	const issueCollectionRef = collection(db, "issues");
	const { title, issueDescription, solvedDescription, webmasterName, date, tagName, market } = issue;

	useEffect(() => {
		(async () => {
			const getIssue = await getDocs(issueCollectionRef);
			setIssue(getIssue.docs.filter((v) => v.id !== id)[0]._document.data.value.mapValue.fields);
		})();
	}, [id]);

	return (
		<div>
			<h2>View</h2>
		</div>
	);
}

export default View;
