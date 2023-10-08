import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function AddPatient() {
    let [patient, setPatient] = useState({ name: '', email: '', CategoryId: 0, patientCategoryId: 0, imageUrl: '' });
    let [PatientCategories, setPatientCategories] = useState([]);
    let[categories,setCategories]=useState([]);
    let navigate = useNavigate();

    async function getAllPatientCats() {
        let patcats = await axios.get('http://localhost:5000/PatientCategories');
        setPatientCategories(patcats.data);
       
    }
    async function getAllCategories()
    {
        let cats=await axios.get('http://localhost:5000/categories');
        setCategories(cats.data);
    }

    useEffect(() => { getAllPatientCats() }, []);
    useEffect(() =>{ getAllCategories()},[]);

    function handleChange(event) {
        setPatient({ ...patient, [event.target.name]: event.target.value });
    }


    function handleSubmit() {
        axios.post('http://localhost:5000/Patients', patient);
        navigate('/patients');
    }

    return (<div>
        <h1 className="alert alert-primary text-center m-3">Add New patient</h1>

        <div className="row">
            <form className="col-4" onSubmit={handleSubmit}>
                <div className="mt-2">
                    <label className="form-label" style={{ float: "left" }}>Name</label>
                    <input type="text" name="name" className="form-control" onChange={handleChange} />
                </div>
                <div className="mt-2">
                    <label className="form-label" style={{ float: "left" }}>Email</label>
                    <input type="text" name="email" className="form-control" onChange={handleChange} />
                </div>
                {/* <div className="mt-2">
                    <label className="form-label" style={{ float: "left" }}>CategoryId</label>
                    <input type="number" name="balance" className="form-control" onChange={handleChange} />
                </div> */}
                <div className="mt-2">
                    <label className="form-label" style={{ float: "left" }}>Image URL</label>
                    <input type="text" name="imageUrl" className="form-control" onChange={handleChange} />
                </div>
                <div className="mt-2">
                <label className="form-label" style={{ float: "left" }}>Category</label>
                    <select name='CategoryId' defaultValue={0} className="form-control" onChange={handleChange}>
                        <option disabled hidden value={0}>Select...</option>
                        {categories.map((cat) => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                    </select>
                </div>

                <div className="mt-2">
                <label className="form-label" style={{ float: "left" }}>patient Category</label>
                    <select name='patientCategoryId' defaultValue={0} className="form-control" onChange={handleChange}>
                        <option disabled hidden value={0}>Select...</option>
                        {PatientCategories.map((pat) => <option key={pat.id} value={pat.id}>{pat.name}</option>)}
                    </select>
                </div>

                <button type="submit" className="btn btn-success mt-2">Add</button>
            </form>
        </div>

    </div>);
}

export default AddPatient;