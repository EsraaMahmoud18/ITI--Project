import React, { useState } from "react";
import Modal from "react-modal";
import { Link } from "react-router-dom";
const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "white",
        width: 400,
    },
};

function AboutUs() {
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <div className="AboutUs">
            <button className="btn btn-dark p-2 mt-4" onClick={setModalOpen}>About Hawaa Hospital</button>
            <Modal
                isOpen={modalOpen}
                onRequestClose={() => setModalOpen(false)}
                style={customStyles}
            >
                <div>    
                <p className="p-2 text-muted">
                    The success of hospitals and healthcare providers depends on the quality of their service.
                    But in an age where most of us look up information online before making almost any decision,
                    a well-designed healthcare website is no less important.
                </p>
                    <ul className="list-group" >
                        <li className="list-group-item active">Our Services</li>
                        <li className="list-group-item list-group-item-action">Emergency room services.</li>
                        <li className="list-group-item list-group-item-action">Short-term hospitalization</li>
                        <li className="list-group-item list-group-item-action">X-ray/radiology services</li>
                        <li className="list-group-item list-group-item-action">Blood services</li>

                    </ul></div>

                <div className="input-group mt-3">
                <button className="btn btn-danger p-2 " onClick={() => setModalOpen(false)}>close</button>
                
                <Link to="/" className="btn btn-success  p-2"> Back </Link>
                
                </div>
            </Modal>
        </div>
    );
}

export default AboutUs;