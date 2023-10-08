import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function DeletePatient() {
    let [patient, setPatient] = useState({ id: 0, name: '', email: '', CategoryId: 0, imageUrl: '', patientCategoryId: 0 });
    let { id } = useParams();
    let navigate = useNavigate();

    async function getpatient() {
        let pat = await axios.get(`http://localhost:5000/Patients/${id}`);
        setPatient(pat.data);
        getpatientCategory(pat.data.patientCategoryId);
    }

    useEffect(() => { getpatient() }, []);

    let [patientCat, setPatientCat] = useState({ id: 0, name: '', description: '' });

    async function getpatientCategory(patCatId) {
        let custCat = await axios.get(`http://localhost:5000/patientCategories/${patCatId}`);
        setPatientCat(custCat.data);
    }


    function deletepat() {
        axios.delete(`http://localhost:5000/Patients/${patient.id}`);
        navigate('/Patients');
    }

    return (<div>
        <h1 className="alert alert-danger text-center m-3">Are you sure you want to delete {patient.name}?</h1>
        <table className="table table-bordered table-striped table-hover caption-top">
            <tbody>
                <tr><th>Id</th><td>{patient.id}</td></tr>
                <tr><th>Name</th><td>{patient.name}</td></tr>
                <tr><th>Email</th><td>{patient.email}</td></tr>
                <tr><th>CategoryId</th><td>{patient.CategoryId}</td></tr>
                <tr><th>Image</th><td><img src={patient.imageUrl} /></td></tr>
                <tr><th> Patient Category</th><td>{patientCat.name}</td></tr>
            </tbody>
        </table>
        <button className="btn btn-danger" onClick={deletepat}>Confirm Delete</button>
        <Link to="/Patients" className="btn btn-success">Back to List</Link>
    </div>);
}

export default DeletePatient;