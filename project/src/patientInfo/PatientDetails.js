import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function PatientDetails() {
    let [patient, setpatient] = useState({ id: 0, name: '', email: '', CategoryId: 0, imageUrl: '', patientCategoryId: 0 });
    let { id } = useParams();

    async function getpatient() {
        let pats = await axios.get(`http://localhost:5000/Patients/${id}`);
        setpatient(pats.data);

        getpatientCategory(pats.data.patientCategoryId);
    }

    useEffect(() => { getpatient() }, []);


    let [patientCat, setpatientCat] = useState({ id: 0, name: '', description: '' });

    async function getpatientCategory(patCatId) {
        let patCat = await axios.get(`http://localhost:5000/PatientCategories/${patCatId}`);
        setpatientCat(patCat.data);
    }

    return (<div>
        <h1 className="alert alert-warning text-center m-3">{patient.name} Details</h1>
        <table className="table table-bordered table-striped table-hover caption-top">
            <tbody>
                <tr><th>Id</th><td>{patient.id}</td></tr>
                <tr><th>Name</th><td>{patient.name}</td></tr>
                <tr><th>Email</th><td>{patient.email}</td></tr>
                <tr><th>Category</th><td>{patient.CategoryId}</td></tr>
                <tr><th>Image</th><td><img src={patient.imageUrl} /></td></tr>
                <tr><th>PatientCategory</th><td>{patient.patientCategoryId}</td></tr>
            </tbody>
        </table>
        <Link to="/Patients" className="btn btn-success">Back to List</Link>
    </div>);
}

export default PatientDetails;