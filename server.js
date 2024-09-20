// const http = require('http');
// const server = http.createServer(()=>{
//     console.log(' Hi everyone i am here for giving helpe')
// })
// server.listen(4000)




const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
const image = require('./controllers/image')


const db = knex({
    client: 'pg',
    connection: {
        
        host: process.env.Database_host || 'localhost',
        user: process.env.Database_username || 'postgres',
        port: 5432,
        password: process.env.Database_passowrd || 'gelisim',
        database: process.env.Database_database || 'smart-brain'
    }
});

db.select('*').from('users').then(data => {
    console.log(data);
});

const app = express();

app.use(bodyParser.json());
app.use(cors())

// const database = {
//     users: [
//         {
//             id:'123',
//             name: 'ESAM',
//             email: 'esam@gmail.com',
//             password: 'gelisim',
//             entries: 0,
//             joined: new Date()
//         },
//         {
//             id:'1234',
//             name: 'AHMED',
//             email: 'ahmed@gmail.com',
//             password: 'aydin',
//             entries: 0,
//             joined: new Date()
//         }
//     ],
//     login: [
//         {
//             id: "999",
//             hash: '',
//             email: 'esam@gmail.com'
//         }
//     ]
// }

app.get('/', (req, res) => {
    // res.send(database.users)
    res.send('success')
})


app.post('/signin', (req,res)=> {signin.handleSignin(req,res,db,bcrypt)})
app.post('/register',(req,res)=>  {register.handleRegister(req,res,db,bcrypt)})
app.get('/profile/:id', (req,res)=> { profile.handleProfile(req,res,db)})
app.put('/image', (req,res)=> {image.handleImage(req,res,db)})
app.post('/imageurl', (req,res)=> {image.handleApiCall(req,res)})




app.listen(4000, () => {
    console.log('app is running')
})


/*
/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user
*/