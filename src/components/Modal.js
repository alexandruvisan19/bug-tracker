import React, { useRef } from "react";
import "./Modal.css";

const Modal = ({ showModal, getModalData, setShowModal }) => {
	const modalRef = useRef();

	const closeModal = (e) => {
		if (modalRef.current === e.target) {
			setShowModal(false);
		}
	};

	console.log(getModalData);

	return (
		<>
			{showModal ? (
				<div className="backgroundModal" ref={modalRef} onClick={closeModal}>
					<div showModal={showModal} className="modalWrapper">
						<div>
							<div className="card">
								<div className="card-header">
									<h1>Issue Details</h1>
								</div>
								<div className="container">
									<strong>ID: </strong>
									<span>{getModalData.id || ""}</span>
									<br />
									<br />
									<strong>Title: </strong>
									<span>{getModalData.title || ""}</span>
									<br />
									<br />
									<strong>Issue Description: </strong>
									<span>{getModalData.issueDescription || ""}</span>
									<br />
									<br />
									<strong>Solved Description: </strong>
									<span>{getModalData.solvedDescription || ""}</span>
									<br />
									<br />
									<strong>Webmaster: </strong>
									<span>{getModalData.webmasterName || ""}</span>
									<br />
									<br />
									<strong>Market: </strong>
									<span>{getModalData.market || ""}</span>
									<br />
									<br />
									<strong>Date: </strong>
									<span>{getModalData.date || ""}</span>
									<br />
									<br />
									<strong>Tagname: </strong>
									<span>{getModalData.tagName || ""}</span>
									<br />
									<br />
								</div>
							</div>
							<span onClick={() => setShowModal((prev) => !prev)} className="closeModalBtn">
								X
							</span>
						</div>
					</div>
				</div>
			) : null}
		</>
	);
};

export default Modal;
