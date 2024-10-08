const handleRegister = (req,res,db,bcrypt) => {
    const { email, name, password } = req.body;
    if(!email || !name || !password) {
       return res.status(400).json('incorrect form submission');
    }
    const hash = bcrypt.hashSync(password);
    db.transaction(trx => {
        trx.insert({
            hash: hash,
            email: email
        })
            .into('login')
            .returning('email')
            .then(loginEmail => {
                return trx('users')
                    .returning('*')
                    .insert({
                        email: loginEmail[0].email,
                        name: name,
                        joined: new Date()             // from database
                    })
                    .then(user => {
                        res.json(user[0]);
                    })
            })
            .then(trx.commit)
            .catch(trx.rollback)
    })
        // bcrypt.hash(password, null, null, function(err, hash) {
        //     console.log(hash);
        // })

        .catch(err => {
            console.log({err})
            res.status(400).json('unable to register')})
    //     database.users.push({
    //         id: '125',
    //         name: name,
    //         email: email,
    //         password: password,
    //         entries: 0,
    //         joined: new Date()                       // from bakEnd
    //  })
    //  res.json(database.users[database.users.length-1]);
}


module.exports = {
    handleRegister: handleRegister
}













