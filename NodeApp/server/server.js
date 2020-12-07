const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();

const corsOptions = {
    credentials: true
  };
app.use(cors(corsOptions));

app.use(express.urlencoded({extended : false}));
app.use(express.json());
app.use(cookieParser());

const authRoute = require('./routes/auth');
const mysql = require('mysql');


app.use('/api/user', authRoute);   


app.listen(process.env.PORT || '3000', ()=>{
    console.log(`Server Running on port: ${process.env.PORT || '3000'}`);
});


