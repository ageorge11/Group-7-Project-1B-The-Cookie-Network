const mysql = require('mysql');

const dbPool = mysql.createConnection({
    password: 'mypass',
    user: 'root',
    database: 'cookie_recipe',
    host: 'localhost'
});

dbPool.connect((error) => {
    if (error) {
        console.log(error);
    } else {
        console.log("MySQL Connected...")
    }
})

let cookieDb = {}

cookieDb.all = () => {

    return new Promise((resolve, reject) => {
        dbPool.query(`select * from users`, (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
};

cookieDb.one = (id) => {

    return new Promise((resolve, reject) => {
        dbPool.query(`select * from users where user_id = ?`, [id], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results[0]);
        });
    });
};

cookieDb.checkEmailExist = (email) => {

    return new Promise((resolve, reject) => {
        dbPool.query(`select * from users where email = ?`, [email], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
};

cookieDb.insertUser = (data, hashPass) => {

    // console.log(data.fname);
    return new Promise((resolve, reject) => {
        dbPool.query(`INSERT INTO users (first_name, last_name,user_name,password,email) VALUES (?,?,?,?,?)`, [data.fname,data.lname,data.userName,hashPass,data.email], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
};

module.exports = cookieDb;