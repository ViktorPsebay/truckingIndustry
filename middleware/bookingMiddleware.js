import jwt from 'jsonwebtoken';

const CustomerMiddleware = function(req, res, next) {
    // return function (req, res, next) {
        
    // }
    if (req.method === "OPTIONS") {
        next();
    }

    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(403).json({message: "Пользователь не авторизован"});
        }

        const decodedData = jwt.verify(token, "Random_Secret_Key");
        req.user = decodedData;
        const role = decodedData.role;
        let roles = ['Driver'];
        let hasRole = false;
        for (let elem of roles) {
            if (role === elem) {
                hasRole =true;
            }
        }

        if (!hasRole) {
           return res.status(403).json({message: "Доступно только для водителей"});
        } 
        next();
    } catch (e) {
        console.log(e);
        return res.status(403).json({message: "Пользователь не авторизован!"});
    }
}

export default CustomerMiddleware;