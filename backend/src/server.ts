import express from 'express' 
import colors from 'colors'
import morgan from 'morgan'
import { db } from './config/db';
import budgetRouter from './routes/budgetRouter';

async function connectDB() {
    try{
        await db.authenticate();
        db.sync();
        console.log( colors.blue.bold('Successfull connecton') );
    }catch(error){
        console.log(error);
    }
}

connectDB();

const app = express()

app.use(morgan('dev'))

app.use(express.json())

app.use('/api/budget', budgetRouter);



export default app