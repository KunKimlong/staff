import express from 'express';
import cors from "cors";
import AppDataSource from'./src/datasource/datasource.js';
import 'dotenv/config';


const app = express();
const PORT = process.env.PORT;
app.use(express.json());
app.use(cors())

app.listen(PORT,(error)=>{
    (!error) && console.log(`Server is running on http://127.0.0.1:${PORT}`);
})

// Connect to the database
AppDataSource.initialize()
    .then(() => {
        console.log('Database is connected');
    })
    .catch((err) => {
        console.error('Error during Database initialization:', err);
    });


//get all staff
app.get("/api/getstaff", async(req,res)=>{
    // console.log(123);
   try {
        const staffRepo = AppDataSource.getRepository('Staff');
        const staffs = await staffRepo.find();
        res.status(200).json({message:"success",data:staffs})
   } catch (error) {
        console.log(`data can not get ${error}`);
   }
})
// get by id
app.get("/api/getstaff/:id",async(req,res)=>{
    const userRepository = AppDataSource.getRepository("Staff");
    const staffId = req.params.id;
    const staff = await userRepository.findOneBy({id:staffId});
    console.log(staff);
    if(staff){
        res.status(200).json({message:"success",data:staff});
    }
    else{
        res.status(404).json({message:"this id is not found please check again"});
    }
})

//add staff
app.post("/api/addstaff",async(req,res)=>{
    var data = {fullName:'',gender:null,dateOfBirth:null};
    try {
        const userRepository = AppDataSource.getRepository('Staff');
        
        data = req.body;
        const user = userRepository.create(data);
        await userRepository.save(user);
        res.status(201).json({message:"created"});
    } catch (error) {
        console.log(`Can not add Staff ${error}`);
    }
})

//delete staff
app.post('/api/deletestaff',async(req,res)=>{
    try{
        const userRepository = AppDataSource.getRepository('Staff');
        const staffId = req.body.id;
        const respone = await userRepository.findOneBy({id:staffId});
        console.log(respone);
        if(respone){
            await userRepository.remove(respone);
            res.status(200).json({message:"deleted"});
        }
        else{
            res.status(404).json({message:"this id not found please check again...!"});
        }
    }
    catch(error){
        console.log(`Error on deleting: ${error}`);
    }
})

// update staff by id
app.post("/api/updatestaff/:id",async(req,res)=>{

    try {
        var data = {fullName:'',gender:null,dateOfBirth:null};
        const userRepository = AppDataSource.getRepository("Staff");
        const staffId = req.params.id;
        const staff = await userRepository.findOneBy({id:staffId});
        if(staff){
            data = req.body;
            if(data.fullName) staff.fullName = data.fullName; 
            if(data.gender) staff.gender = data.gender; 
            if(data.dateOfBirth) staff.dateOfBirth = data.dateOfBirth; 
            await userRepository.save(staff);
            res.status(200).json({message:"updated"});
        }
        else{
            res.status(404).json({message:"this id not found please check again...!"});
        }
    } catch (error) {
        console.log(`Error during updating: ${error}`);
    }

})

//search staff

const searchStaff = async (data) => {
    const userRepository = AppDataSource.getRepository("Staff");
    let query = `SELECT * FROM staffs WHERE 1=1`;
    const parameters = [];

    if (data.id) {
        query += ' AND id = ?';
        parameters.push(data.id);
    }
    if (data.gender) {
        query += ' AND gender = ?';
        parameters.push(data.gender);
    }
    if (data.fromDate && data.toDate) {
        query += ' AND dateOfBirth BETWEEN ? AND ?';
        parameters.push(data.fromDate, data.toDate);
    }

    return userRepository.query(query, parameters);
};
app.get('/api/search', async (req, res) => {
    try {
        const { id, gender, fromDate, toDate } = req.query;
        const staffs = await searchStaff({ id, gender, fromDate, toDate });
        if (staffs.length > 0) {
            res.status(200).json({ message: "Success", data: staffs });
        } else {
            res.status(404).json({ message: "No staff found...!" });
        }
    } catch (error) {
        console.error('Error during search:', error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});





