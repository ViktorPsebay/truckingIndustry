import express from 'express';
import mongoose from 'mongoose';
import exphbs from 'express-handlebars';
import router from './routes/transport.js';


const PORT = 3000;

const app = express();
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.urlencoded({ extended: true}));

app.use(router); 

async function start() {
    try {
        await mongoose.connect('mongodb+srv://Viktor:@P-xQy5879YVzqs@cluster0.iz8xh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        })
        app.listen(PORT, () => {
            console.log("server has been started");
        })
    } catch (e) {
        console.log(e);
    }
}

start();

