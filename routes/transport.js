import Router from 'express';
import post from '../post.js';
import path from 'path';
import User from '../user.js';
import { read } from 'fs';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import CustomerMiddleware from '../middleware/CustomerMiddleware.js';
import bookingMiddleware from '../middleware/bookingMiddleware.js';
import sendCargoMiddleware from "../middleware/sendCargoMiddleware.js";

const __dirname = path.resolve();

const router = Router();

const generateAccessToken = (id, role) => {
    const payload = {
        id, 
        role
    }
    return jwt.sign(payload, "Random_Secret_Key", {expiresIn: '2h'});
}

router.get('/', (req, res) => {
    //res.send('<h1>Hello from Express');
    res.sendFile(path.resolve(__dirname, 'dw', 'index.html'));
})

router.get('/create', (req, res) => {
    //res.send('<h1>Hello from Express');
    res.sendFile(path.resolve(__dirname, 'dw', 'sendData/proposeCargo.html'));
})

router.get('/posts', async (req, res) => {
    try {
        const posts = await post.find();
        return res.json(posts);
    } catch(e) {
        res.status(500).json(e);
    }
})

// router.get('/post', async (req, res) => {
//     try {
//         const posts = await post.find();
//         return res.json(posts);
//     } catch(e) {
//         res.status(500).json(e);
//     }
// })

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

router.post('/send', sendCargoMiddleware, async (req, res) => {
        try {
            const Post = await post.create(req.body);
            res.status(200).json({message: "???????? ?????????????? ???????????????? ?? ???????? ????????????"});
        } catch(e) {
            res.status(500).json(e);
        }
})

// router.post('/update', async (req, res) => {
//     try {

//         const Post = await post.create(req.body);
//         res.status(200).json(Post);
//     } catch(e) {
//         res.status(500).json(e);
//     }
// })

router.get('/update/:id', async (req, res) => {
    try {

        const {id} = req.params;
        if(!id) {
            res.status(407).json({message: "oooo"});
        }
        const Post = await post.findById(id);
        res.status(200).json(Post);
    } catch(e) {
        res.status(500).json(e);
    }
})

router.delete('/update/:id', async (req, res) => {
    try {
        const {id} = req.params;
        if(!id) {
            res.status(407).json({message: "???? ???????????? ????????"});
        }
        const Post = await post.findByIdAndDelete(id);
        res.status(200).json({message: "???????? ???????????? ???? ???????? ????????????"});
        
    } catch(e) {
        res.status(500).json(e);
    }
})



router.put('/update', bookingMiddleware, async (req, res) => {
    try {
        const posts = req.body;
           
        const updatedPost = await post.findByIdAndUpdate(posts._id, posts, {new:true});
        return res.status(200).json({message: "???????? ?????????????? ????????????????????????"});
        
    } catch(e) {
        res.status(500).json(e);
    }
})


router.put('/refuse', bookingMiddleware, async (req, res) => {
    try {
        const posts = req.body;
           
        const updatedPost = await post.findByIdAndUpdate(posts._id, posts, {new:true});
        return res.status(200).json({message: "?????????? ??????????"});
        
    } catch(e) {
        res.status(500).json(e);
    }
})


router.post('/registration', async (req, res) => {
    try {
        const {username, password, role} = req.body;
        //console.log(username);
        const candidate = await User.findOne({username: username});
        if (candidate) {
            return res.status(400).json({message: "???????????????????????? ?? ?????????? ???????????? ?????? ????????????????????"});
        }
        const hashPassword = bcrypt.hashSync(password, 1);
        const user = new User({username: username, password: hashPassword, role: role});
        await user.save();
        return res.json({message: "???????????????????????? ?????? ?????????????? ????????????????"});
    } catch (e) {
        console.log(e);
        read.status(400).json({message: "Error"}); 
    }
});

router.post('/login', async (req, res) => {
    try {
        const {username, password} = req.body;
        const user = await User.findOne({username});
        if (!user) {
            return res.status(400).json({message: "???????????????????????? ???? ????????????"});
        }
        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({message: "???????????? ???????????????? ????????????"});
        }
        const token = generateAccessToken(user._id, user.role);
        return res.status(200).json(token);

    } catch (e) {
        console.log(e);
        read.status(400).json({message: "Error"});        
    }
});

router.get('/users', CustomerMiddleware, async (req, res) => {
    try {
        const users = await User.find();
        return res.json(users);
    } catch (e) {
        console.log(e);
        read.status(400).json({message: "Error"});        
    }
});

// router.get('/posts', async (req, res) => {
//     try {
//         const posts = await post.find();
//         return res.json(posts);
//     } catch(e) {
//         res.status(500).json(e);
//     }
// })

router.post('/lk', async (req, res) => {
    try {
        const {username} = req.body;
        const user = await User.findOne({username});
        if (!user) {
            return res.status(400).json({message: "???????????????????????? ???? ????????????"});
        }
        const userRole = {role: user.role};
        return res.status(200).json(userRole);

    } catch (e) {
        console.log(e);
        read.status(400).json({message: "Error"});        
    }
});

export default router;