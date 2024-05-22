import { Link,useParams } from "react-router-dom";
import React,{useEffect, useState} from 'react';
import axios from "axios";

const EditStaff = ()=>{
    const [staffs, setStaffs] = useState({
        fullName: '',
        gender: '',
        dateOfBirth: '',
    });

    const handleChange = (e) => {
        // console.log(e);
        setStaffs({
            ...staffs,
            [e.target.name]: e.target.value,
        });
    };

    const id = useParams().id;

    useEffect(()=>{
    
        const getOneStaffs = async()=>{
            const respone = await axios.get("http://localhost:8888/api/getstaff/"+id);
            console.log(respone);
            const staffs    = respone.data.data;
            console.log(staffs.fullName);
            if(respone.status === 200){
                setStaffs({
                    fullName:staffs.fullName,
                    gender:staffs.gender,
                    dateOfBirth:staffs.dateOfBirth,
                })
                
            }

        }
        getOneStaffs();
    },[])

    

    const submitStaff = (e) => {
        // if(respone){
        //     setStaffs(staffs.filter(staffs => staffs.id !== id));
        // }
        e.preventDefault();
        axios.post('http://localhost:8888/api/updatestaff/'+id, staffs)
            .catch(error => {
                console.error('Error of update staffs: ', error);
            });
    };

    return (
        <>
             <div className="height-100 bg-light py-3">
                <h4 className="text-center"><u>Update Staffs</u></h4>
                <div className="col-6 mx-auto">
                    <form onSubmit={submitStaff} method="post">
                        <label>Full name:</label>
                        <input type="text" 
                            placeholder="Full name" 
                            className="form-control my-2" 
                            name="fullName"
                            value={staffs.fullName}
                            onChange={handleChange}
                             />
                        <label>Date of Birth:</label>
                        <input type="date" name="dateOfBirth" min="1980-01-01" max="2005-12-31" value={staffs.dateOfBirth} onChange={handleChange} className="form-control my-2" id="" />
                        <label>Gender:</label>
                        <select name="gender" id="" value={staffs.gender} onChange={handleChange} className="form-select my-2">
                            <option value="" disabled>Select Gender</option>
                            <option value="1">Male</option>
                            <option value="2">Female</option>
                        </select>

                        <button type="Submit" className="btn btn-outline-success rounded-0 me-2">Submit</button>
                        <Link to={"/viewstaff"} className="btn btn-outline-secondary rounded-0 me-2">Back</Link>
                    </form>
                </div>
            </div>
        </>
    )
}
export default EditStaff;