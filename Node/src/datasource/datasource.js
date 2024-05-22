
import { DataSource } from 'typeorm';
import Staff from "../model/Staff.entity.js"
import 'dotenv/config';

const AppDataSource = new DataSource({
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: 3306,//port database
    username: process.env.DB_USER,//username in database
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [
        Staff
    ],
    
});

export default AppDataSource;