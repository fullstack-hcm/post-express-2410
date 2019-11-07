let express = require('express');
let app     = express();
let bodyParser = require('body-parser');

let users = [
    { username: 'MERN_2410', pwd: '123' },
    { username: 'MERN_2412', pwd: '111' }
];

// middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// config view engine
app.set('view engine', 'ejs');
app.set('views', './views')

app.get('/', (req, res) => {
    res.render('index', {
        users,
        infoUser: undefined
    });
});

// app.get('/login', (req, res) => {
//     res.render('login');
// });

// app.post('/login', (req, res) => {
//     let { username, pwd } = req.body;

//     // let isExists = users.find(user => user.username === username);
//     // if (isExists) res.json({ messsage: 'user_exists' });

//     // users.push({ username, pwd });

//     // res.json({ users })
//     console.log({ username, pwd });
// });

app.route('/login')
    .get((req, res) => {
        res.render('login');
    })
    .post((req, res) => {
        let { username, pwd } = req.body;
    
        // let isExists = users.find(user => user.username === username);
        // if (isExists) res.json({ messsage: 'user_exists' });
    
        // users.push({ username, pwd });
    
        // res.json({ users })
        console.log({ username, pwd });
    });

app.post('/add-user', (req, res) => {
    let { username, pwd } = req.body;

    let isExists = users.find(user => user.username === username);
    if (isExists) res.json({ messsage: 'user_exists' });

    users.push({ username, pwd });

    // res.json({ users })
    res.redirect('/');
});

app.get('/remove-user/:username', (req, res) => {
    let { username } = req.params;
    let indexForRemove = users.findIndex(user => user.username === username);

    if (indexForRemove !== -1) 
        users.splice(indexForRemove, 1);

    res.redirect('/');
})

app.route('/update-user/:username')
    .get((req, res) => {
        let { username } = req.params;
        let infoUser = users.find(item => item.username === username);

        res.render('index', {
            users,
            infoUser
        })
    })
    .post((req, res) => {
        let { username: usernameOld } = req.params;
        let { username: usernameNew, pwd: pwdNew } = req.body;   
        users = users.map(user => {
            if (user.username === usernameOld) {
                console.log(`tick`);
                console.log({ user, usernameOld });
                return {
                    ...user, // spread operator ES6
                    username: usernameNew,
                    pwd: pwdNew 
                }
            }
            return user;
        });
        res.redirect('/');
    })

app.listen(3000, () => {
    console.log(`SERVER STARTED AT PORT 3000`);
});