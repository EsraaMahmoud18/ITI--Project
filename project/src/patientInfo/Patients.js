
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";



function Patients() {
    let [patients, setpatients] = useState([]);

    let [searchText, setSearchText] = useState('');

    let [searchTextForClick, setSearchTextForClick] = useState('');

    function handleSearchForClickChange(event) {
        setSearchTextForClick(event.target.value);
    }

    function handleSearchChange(event) {
        setSearchText(event.target.value);
    }

    let [filterPatientCategoryId, setFilterPatientCategoryId] = useState(0);

    function handleCategoryChange(event) {
        setFilterPatientCategoryId(Number(event.target.value));
    }

    let [PatientCategories, setPatientCategories] = useState([]);

    async function getAllPatientCats() {
        let patsSpecfic = await axios.get('http://localhost:5000/categories');

        setPatientCategories(patsSpecfic.data);
    }



    async function getpatients() {
        let result;
        if (filterPatientCategoryId !== undefined && filterPatientCategoryId > 0 && (searchText === undefined || searchText.trim() === '')) {
            

            result = await axios.get(`http://localhost:5000/Patients?CategoryId=${filterPatientCategoryId}`);

        }
        else if (searchText !== undefined && searchText.trim().length > 0 && (filterPatientCategoryId === undefined || filterPatientCategoryId === 0)) {
          
            result = await axios.get(`http://localhost:5000/Patients?q=${searchText.trim()}`);

        } else if (filterPatientCategoryId !== undefined && filterPatientCategoryId > 0 && searchText !== undefined && searchText.trim().length > 0) {
            
            result = await axios.get(`http://localhost:5000/Patients?CategoryId=${filterPatientCategoryId}&q=${searchText}`);
        }
        else {
            
            result = await axios.get('http://localhost:5000/Patients');
        }

        setpatients(result.data);
    }

    useEffect(() => { getpatients(); }, [filterPatientCategoryId, searchText]);
    useEffect(() => { getAllPatientCats(); }, []);

    async function search() {
        let searchResult = await axios.get(`http://localhost:5000/Patients?q=${searchTextForClick}`);
        setpatients(searchResult.data);
    }

    function showPatients() {
        if (patients.length > 0) {
            return (<div>
                <table className="table table-bordered table-striped table-hover caption-top text-center">
                    <caption className="text-center fs-1">Patients</caption>
                    <thead><tr><th>Id</th><th>Name</th><th>CategoryId</th><th>Patient Category Id</th><th>Email</th><th>Image</th><th>Actions</th></tr></thead>
                    <tbody>
                        {patients.map((pats) => <tr key={pats.id}><td>{pats.id}</td><td>{pats.name}</td>
                            <td>{pats.CategoryId}</td><td>{pats.patientCategoryId}</td><td>{pats.email}</td><td><img src={pats.imageUrl} alt={`${pats.name} logo`} /></td>
                            <td>
                                <div className="btn-group btn-group-sm">
                                    <Link to={`/patients/details/${pats.id}`} className="btn btn-success" title='Details'>
                                        <i className="bi bi-list-ul"></i>
                                    </Link>
                                    <Link to={`/patients/edit/${pats.id}`} className="btn btn-primary">
                                        <i className="bi bi-pencil-square"></i>
                                    </Link>
                                    <Link to={`/patients/delete/${pats.id}`} className="btn btn-danger">
                                        <i className="bi bi-trash"></i>
                                    </Link>
                                </div>
                            </td>
                        </tr>)}
                    </tbody>
                </table>
                <Link to="/patients/add" className="btn btn-success col-3">Add New patient</Link>
            </div >);
        } else {
            return (<h1 className="alert alert-danger text-center m-3">There are no customers to display.</h1>)
        }
    }

    return (
        <div className="row">
            
            
            <div>
                <div className="input-group w-50 m-auto col-4">
                    <input
                        type="text"
                        className="form-control"
                        onChange={handleSearchForClickChange}
                    />
                    <button className="btn btn-secondary" onClick={search}><i className="bi bi-search"></i></button>
                </div>
            </div>


            <div className="col-4 m-2">
                <select defaultValue={0} className="form-control" onChange={handleCategoryChange}>
                    <option value={0}>All Hospital Services</option>
                    {PatientCategories.map((pat) => <option key={pat.id} value={pat.id}>{pat.name}</option>)}
                </select>
            </div>

            <div className="input-group w-50 m-2">
                <input type="text" className="form-control" onChange={handleSearchChange} />
            </div>
            

            {showPatients()}
            

        </div>);
}


export default Patients;