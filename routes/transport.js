import Router from 'express';
import post from '../post.js';
//import postClient from '../post.js';
import path from 'path';

const __dirname = path.resolve();

const router = Router();

router.get('/', (req, res) => {
    //res.send('<h1>Hello from Express');
    res.sendFile(path.resolve(__dirname, 'dw', 'index.html'));
})

router.get('/create', (req, res) => {
    //res.send('<h1>Hello from Express');
    res.sendFile(path.resolve(__dirname, 'dw', 'sendData/proposeCargo.html'));
})

// async getAll(req, res) {
//     try {
//         const posts = await post.find();
//         return res.json(posts);
//     } catch(e) {
//         res.status(500).json(e);
//     }
// }

router.get('/posts', async (req, res) => {
    try {
        const posts = await post.find();
        return res.json(posts);
    } catch(e) {
        res.status(500).json(e);
    }
})

router.post('/sendcargo', (req, res) => {
    //res.send('<h1>Hello from Express');
    res.sendFile(path.resolve(__dirname, 'dw', 'sendData/proposeCargo.html'));
})

router.post('/create', async (req, res) => {
    const posts = new post({ 
        ownerOfCargo: req.body.ownerOfCargo,
        cargoName: req.body.cargoName,
        pointOfDeparture: req.body.pointOfDeparture,
        pointOfDestination: req.body.pointOfDestination,
        dateOfDeparture: req.body.dateOfDeparture,
        typeOfCargo: req.body.typeOfCargo,
        weightOfCargo: req.body.weightOfCargo,
        volumeOfCargo: req.body.volumeOfCargo,
        id: req.body.id
    })
    
    await post.create(posts);
    //res.redirect('/');
})

router.post('/send', async (req, res) => {
        try {
            const Post = await post.create(req.body);
            res.status(200).json(Post);
        } catch(e) {
            res.status(500).json(e);
        }
})


export default router;