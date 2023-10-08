import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function EditPatient() {
    let urlParametersObj = useParams();
    let patientId = urlParametersObj.id;
    let navigate = useNavigate();

    let [patient, setpatient] = useState({ id: 0, name: '', email: '', CategoryId: 0, imageUrl: '', patientCategoryId: 0 });
    let [categories, setCategories] = useState([]);
    let[patientCategories,setPatientCategories]= useState([]);
    async function getAllPatientCats() {
        let patcats = await axios.get('http://localhost:5000/PatientCategories');
        setPatientCategories(patcats.data);
       
    }
    async function getAllCats() {
        let pats = await axios.get('http://localhost:5000/categories');
        setCategories(pats.data);
    }

    useEffect(() => { getAllCats() }, []);
    useEffect(() => { getAllPatientCats() }, []);
    async function getpatient() {
        let cust = await axios.get('http://localhost:5000/Patients/' + patientId)
        setpatient(cust.data);
    }

    useEffect(() => { getpatient() }, []);

    function handleChange(event) {
        setpatient({ ...patient, [event.target.name]: event.target.value });
    }

    function handleSubmit() {
        axios.put(`http://localhost:5000/Patients/${patientId}`, patient);
        navigate('/Patients');
    }

    return (<div>
        <h1 className="alert alert-success text-center m-3">Edit {patient.name}</h1>

        <div className="row">
            <form className="col-4" onSubmit={handleSubmit}>
                <div className="mt-2">
                    <label className="form-label" style={{ float: "left" }}>Name</label>
                    <input type="text" name="name" value={patient.name} className="form-control" onChange={handleChange} />
                </div>
                <div className="mt-2">
                    <label className="form-label" style={{ float: "left" }}>Email</label>
                    <input type="text" name="email" value={patient.email} className="form-control" onChange={handleChange} />
                </div>
                <div className="mt-2">
                    <label className="form-label" style={{ float: "left" }}>Image URL</label>
                    <input type="text" name="imageUrl" value={patient.imageUrl} className="form-control" onChange={handleChange} />
                </div>
                <div className="mt-2">
                    <label className="form-label" style={{ float: "left" }}> Category</label>
                    <select name='CategoryId' value={patient.CategoryId} className="form-control" onChange={handleChange}>
                        <option disabled hidden value={0}>Select...</option>
                        {categories.map((pat) => <option key={pat.id} value={pat.id}>{pat.name}</option>)}
                    </select>
                </div>

                <div className="mt-2">
                    <label className="form-label" style={{ float: "left" }}>patient Category</label>
                    <select name='patientCategoryId' value={patient.patientCategoryId} className="form-control" onChange={handleChange}>
                        <option disabled hidden value={0}>Select...</option>
                        {patientCategories.map((cat) => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                    </select>
                </div>

                <button type="submit" className="btn btn-success m-2">Edit patient</button>
                <Link to="/Patients" className="btn btn-primary m-2">Go to List</Link>
            </form>
        </div>

    </div>);
}

export default EditPatient;