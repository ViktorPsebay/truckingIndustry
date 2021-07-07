import express from 'express';
import path from 'path';
import router from './routes/transport.js';
import mongoose from 'mongoose';


const __dirname = path.resolve();
const PORT = process.env.PORT || 4000;

const app = express();

app.use(express.json());
app.use(router);
app.use(express.static(__dirname + "/dw")); 

async function start() {
    try {
        await mongoose.connect('mongodb+srv://Viktor:@<password>@cluster0.iz8xh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        })
        app.listen(PORT, () => {
            console.log("server has been started on PORT: " + PORT);
        })
    } catch (e) {
        console.log(e);
    }
}

start();
