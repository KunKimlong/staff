import {Link } from "react-router-dom";
import React,{useState} from 'react';
import axios from "axios";
const AddStaff = ()=>{
    const [staffData, setStaffData] = useState({
        fullName: '',
        gender: '',
        dateOfBirth: '',
    });

    const handleChange = (e) => {
        // console.log(e);
        setStaffData({
            ...staffData,
            [e.target.name]: e.target.value,
        });
    };

    const submitStaff = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8888/api/addstaff', staffData)
            .then(response => {
                console.log('Staff added:', response.data);
                setStaffData({
                    fullName: '',
                    gender: '',
                    dateOfBirth: '', 
                });
            })
            .catch(error => {
                console.error('Error of add staff: ', error);
            });
    };

    return (
        <>
             <div className="height-100 bg-light py-3">
                <h4 className="text-center"><u>Add Staff</u></h4>
                <div className="col-6 mx-auto">
                    <form onSubmit={submitStaff}>
                        <label>Full name:</label>
                        <input type="text" 
                            placeholder="Full name" 
                            className="form-control my-2" 
                            name="fullName"
                            value={staffData.fullName}
                            onChange={handleChange}
                             />
                        <label>Date of Birth:</label>
                        <input type="date" name="dateOfBirth" min="1980-01-01" max="2005-12-31" value={staffData.dateOfBirth} onChange={handleChange} className="form-control my-2" id="" />
                        <label>Gender:</label>
                        <select name="gender" id="" value={staffData.gender} onChange={handleChange} className="form-select my-2">
                            <option value="" disabled>Select Gender</option>
                            <option value="1">Male</option>
                            <option value="2">Female</option>
                        </select>

                        <button type="Submit" className="btn btn-outline-success rounded-0 me-2">Submit</button>
                        <Link to={"/"} className="btn btn-outline-secondary rounded-0 me-2">Back</Link>
                    </form>
                </div>
            </div>
        </>
    )
}
export default AddStaff;