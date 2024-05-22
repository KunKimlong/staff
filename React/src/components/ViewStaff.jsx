import axios from "axios";
import React,{useState,useEffect} from "react";
import { Link } from "react-router-dom";

const ViewStaff = ()=>{
    const [staffs,setStaffs] = useState([]);
    useEffect(()=>{
        const fetchData = async()=>{
            const response = await axios.get('http://127.0.0.1:8888/api/getstaff')
            const getStaff = await response.data.data;
            setStaffs(getStaff);
        }
        fetchData()
    },[])
    const DeleteData = async(id)=>{
        const respone = await axios.post("http://127.0.0.1:8888/api/deletestaff");
        if(respone){
            setStaffs(staffs.filter(staff => staff.id !== id));
        }

    }
    

    return(
        <>
            <div className="height-100 bg-light py-3">
                <h4 className="text-center"><u>View all Staff</u></h4>
                <div className="col-6 mx-auto">
                    <table className="table table-hover table-dark text-center">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Gender</th>
                                <th>Date of Birth</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
          
                                {staffs.map(staff=>(
                                    <tr key={staff.id}>
                                        <td>{staff.id}</td>
                                        <td>{staff.fullName}</td>
                                        <td>{(staff.gender=="1") ? "Male" : "Female" }</td>
                                        <td>{staff.dateOfBirth}</td>
                                        <td>
                                            <Link to={"/editstaff/"+staff.id} className="btn btn-outline-warning">Update</Link>
                                            <button onClick={()=>DeleteData(staff.id)} className="btn btn-outline-danger ms-3">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                   
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}
export default ViewStaff;