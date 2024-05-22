import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import debounce from 'lodash/debounce';
import { format } from "date-fns";
import jsPDF from "jspdf";
import "jspdf-autotable";


const SearchStaff = () => {
    const [search, setSearch] = useState({
        id: '',
        gender: '',
        fromDate: '',
        toDate: '',
    });

    const [staffs, setStaffs] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSearch({
            ...search,
            [name]: value,
        });
    };

    const fetchStaffs = useCallback(
        debounce(async (searchParams) => {
            try {
                const response = await axios.get("http://localhost:8888/api/search", {
                    params: searchParams,
                });
                setStaffs(response.data.data);
            } catch (error) {
                console.error("Error fetching staff data:", error);
            }
        }, 500), // debounce time in milliseconds
        []
    );

    useEffect(() => {
        fetchStaffs(search);
    }, [search, fetchStaffs]);

    const exportPDF = () => {
        const doc = new jsPDF();
        const tableColumn = ["ID", "Name", "Gender", "Date of Birth"];
        const tableRows = [];

        staffs.forEach((staff) => {
            const staffData = [
                staff.id,
                staff.fullName,
                staff.gender === "1" ? "Male" : "Female",
                format(new Date(staff.dateOfBirth), "yyyy-MM-dd"),
            ];
            tableRows.push(staffData);
        });

        doc.text("Staff Search Results", 14, 15);
        doc.autoTable({
            head: [tableColumn],
            body: tableRows,
            startY: 20,
        });

        doc.save("staffSearch.pdf");
    };

    return (
        <>
            <div className="height-100 bg-light py-3">
                <h4 className="text-center"><u>Fill Data to search</u></h4>
                <form action="" className="col-6 mx-auto">
                    <label>ID:</label>
                    <input type="text" name="id" value={search.id} onChange={handleChange} placeholder="ID" id="" className="form-control my-2" />
                    <label>Gender:</label>
                    <select name="gender" id="" value={search.gender} onChange={handleChange} className="form-select my-2">
                        <option value="" disabled>Gender</option>
                        <option value="1">Male</option>
                        <option value="2">Female</option>
                    </select>
                    <label>Date:</label>
                    <div className="row justify-content-between">
                        <div className="col-5">
                            <label htmlFor="">From:</label>
                            <input type="date" min="1980-01-01" max="2005-12-31" value={search.fromDate} onChange={handleChange} name="fromDate" className="form-control" id="" />
                        </div>
                        <div className="col-5">
                            <label>To:</label>
                            <input type="date" min="1980-01-01" max="2005-12-31" value={search.toDate} onChange={handleChange} name="toDate" className="form-control" id="" />
                        </div>
                    </div>
                </form>
                <h4 className="text-center mt-5"><u>Result of Searching</u></h4>
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
                            {staffs.map(staff => (
                                <tr key={staff.id}>
                                    <td>{staff.id}</td>
                                    <td>{staff.fullName}</td>
                                    <td>{staff.gender == "1" ? "Male" : "Female"}</td>
                                    <td>{format(new Date(staff.dateOfBirth), 'yyyy-MM-dd')}</td>
                                    <td>
                                        <Link to={"/editstaff/" + staff.id} className="btn btn-outline-warning">Update</Link>
                                        <button onClick={() => DeleteData(staff.id)} className="btn btn-outline-danger ms-3">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table> <button className="btn btn-primary" onClick={exportPDF}>
                        Export as PDF
                    </button>
                </div>
                
            </div>
        </>
    );
};
export default SearchStaff;
