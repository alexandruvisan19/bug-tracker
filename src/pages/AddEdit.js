import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./AddEdit.css";
import db from "../firebase";
import { collection, getDocs, addDoc, updateDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";

const initialState = {
	title: null,
	issueDescription: null,
	solvedDescription: null,
	webmasterName: null,
	market: null,
	date: null,
	tagName: null,
};

export default function AddEdit() {
	const [state, setState] = useState(initialState);
	const [issues, setData] = useState([]);
	const issueCollectionRef = collection(db, "issues");
	const { title, issueDescription, solvedDescription, webmasterName, date, tagName, market } = state;
	const { id } = useParams();

	useEffect(() => {
		let getIssues = async () => {
			let issueArr = [];
			const data = await getDocs(issueCollectionRef);
			issueArr.push(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
			setData(...issueArr);
		};
		getIssues();
	}, [id]);

	useEffect(() => {
		if (id) {
			setState({ ...issues.filter((v) => v.id === id)[0] });
		} else {
			setState({ ...initialState });
		}

		return () => {
			setState({ ...initialState });
		};
	}, [id, issues]);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setState({ ...state, [name]: value });
	};

	let navigate = useNavigate();
	const createIssue = async (e) => {
		e.preventDefault();
		if (!title || !issueDescription || !solvedDescription || !webmasterName || !date || !tagName || !market) {
			toast.error("Please provide a value in each input field");
		} else {
			if (id) {
				try {
					const issueDoc = doc(db, "issues", id);
					await updateDoc(issueDoc, state);
					toast.success("Issue updated succesfully");
				} catch (err) {
					toast.error(err);
				}
			} else {
				const { error } = await addDoc(issueCollectionRef, state);
				if (error) {
					toast.error(error);
				} else {
					toast.success("Issue added succesfully");
				}
			}
			setTimeout(() => navigate("/"), 500);
		}
	};

	const resetFields = () => {
		setState(initialState);
	};

	return (
		<div style={{ marginTop: "100px" }}>
			<form
				className="formClass"
				style={{ margin: "auto", padding: "15px", maxWidth: "980px", alignContent: "center" }}
				onSubmit={createIssue}
			>
				<div className="title">
					<label htmlFor="title">Title:</label>
					<input
						type="text"
						id="title"
						name="title"
						placeholder="Title Name..."
						value={title || ""}
						onChange={handleInputChange}
					/>
				</div>

				<div className="webmasterName">
					<label htmlFor="webmasterName">Webmaster Name:</label>
					<input
						type="text"
						id="webmasterName"
						name="webmasterName"
						placeholder="Webmaster Name..."
						value={webmasterName || ""}
						onChange={handleInputChange}
					/>
				</div>

				<div className="market">
					<label htmlFor="market">Choose a market:</label>
					<select
						value={market || ""}
						defaultValue={market || ""}
						id="market"
						name="market"
						onChange={handleInputChange}
					>
						<option value="defMarket">Choose market</option>
						<option value="888poker.com">888poker.com</option>
						<option value="888poker.es">888poker.es</option>
						<option value="888poker.ro">888poker.ro</option>
						<option value="888poker.pt">888poker.pt</option>
					</select>
				</div>

				<div className="date">
					<label htmlFor="date">Date:</label>
					<input
						type="date"
						id="date"
						name="date"
						placeholder="Webmaster Name..."
						value={date || ""}
						onChange={handleInputChange}
					/>
				</div>

				<div className="tagName">
					<label htmlFor="tagName">Tag Name:</label>
					<input
						type="text"
						id="tagName"
						name="tagName"
						placeholder="Tag Name..."
						value={tagName || ""}
						onChange={handleInputChange}
					/>
				</div>

				<div className="issueDescription">
					<label htmlFor="issueDescription">Issue Description:</label>
					<textarea
						type="text"
						id="issueDescription"
						name="issueDescription"
						placeholder="Issue Description..."
						value={issueDescription || ""}
						onChange={handleInputChange}
						rows="3"
						cols="20"
					></textarea>
				</div>

				<div className="solvedDescription">
					<label htmlFor="solvedDescription">How It Was Solved Description:</label>
					<textarea
						type="text"
						id="solvedDescription"
						name="solvedDescription"
						placeholder="Solving Description..."
						value={solvedDescription || ""}
						onChange={handleInputChange}
						rows="3"
						cols="20"
					></textarea>
				</div>

				<input className="addUpdateBtn" type="submit" value={id ? "Update Issue" : "Add Issue"} />
				{(title || issueDescription || solvedDescription || webmasterName || date || tagName || market) && (
					<button onClick={resetFields} className="cancelBtn" value="Cancel">
						Cancel
					</button>
				)}
			</form>
		</div>
	);
}
