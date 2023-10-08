import logo from './logo.svg';
import './App.css';
import Modal from "react-modal";
import background from './bg.jpg';

import Home from './Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import ContactUs from './ContactUs';
import AboutUs from './AboutUs';

import Footer from './Footer';
import PageNotFound from './component/PageNotFound';
import Patients from './patientInfo/Patients';
import AddPatient from './patientInfo/AddPatient';
import PatientDetails from './patientInfo/PatientDetails';
import DeletePatient from './patientInfo/DeletePatient';
import EditPatient from './patientInfo/EditPatient';



function App() {
  return (
    <div className='row' style={{ fontFamily: `'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`, position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundImage: `url(${background})`, backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center center", height: "100vh" }}>
      <div className="" >
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/contact' element={<ContactUs />} />
            <Route path='/about' element={<AboutUs />} />
            <Route path='/patients' element={<Patients/>} />
            <Route path='/patients/add' element={<AddPatient/>} />
            <Route path='/patients/details/:id' element={<PatientDetails/>} />
            <Route path='/patients/delete/:id' element={<DeletePatient/>} />
            <Route path='/patients/edit/:id' element={<EditPatient/>} />
            <Route path='*' element={<PageNotFound />} />
          </Routes>
          <Footer />
        </BrowserRouter>

      </div>
    </div>
  );
}

export default App;
