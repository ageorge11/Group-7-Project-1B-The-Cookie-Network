const db = require('../db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
    console.log(req.body);

    const { name, email, password, pswRepeat } = req.body;

    try {
        let results = await db.checkEmailExist(email);

        if (results.length > 0) {
            res.status(401).json({
                message: "User Registration Failed - Email Already in Use"
            });
            console.log('Email exist :' + email)
        }
        else {
            let hashedPassword = await bcrypt.hash(password, 3);
            //console.log(hashedPassword);
            let op = await db.insertUser(req.body, hashedPassword);
            res.status(201).json({
                message: "User Registration Success"
            });;
        }
    } catch (e) {
        console.log(e)
    }
}

exports.login = async (req, res) => {
    console.log(req.body);

    const { email, password } = req.body;

    try {
        let results = await db.checkEmailExist(email);
        console.log(results);
        if (results.length > 0) {
            if (await bcrypt.compare(password, results[0].password)) {

                const id = results[0].user_id;
                const token = jwt.sign({ id: id, username: results[0].user_name }, 'secretpassword', {
                    expiresIn: '30d'
                });

                //console.log(token);

                // const cookieOptions = {
                //     expires: new Date(
                //         Date.now() + 30 * 24 * 60 * 60 * 1000
                //     ),
                //     httpOnly: true
                // }
                // res.cookie('jwt', token, cookieOptions);
                res.status(200).json({
                    message: "Auth success",
                    token: token,
                    userName: results[0].user_name
                });
                console.log("Log in Success");
            }
            else {
                res.status(401).json({
                    message: "Auth Failed - Password not Correct"
                });
                console.log("password not correct");
            }
        }
        else {
            res.status(401).json({
                message: "Auth Failed - Email not Correct"
            });
            console.log("email not exist");
        }
    } catch (e) {
        console.log(e);
    }
}
