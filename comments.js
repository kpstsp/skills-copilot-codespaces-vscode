//Create web server
//Create a POST endpoint /comments
//Create a GET endpoint /comments

//require the express module
const express = require('express');
//require the body-parser module
const bodyParser = require('body-parser');
//require the fs module
const fs = require('fs');
//require the path module
const path = require('path');
//require the uuid module
const { v4: uuidv4 } = require('uuid');
//require the cors module
const cors = require('cors');

//create a new express application
const app = express();

//use the body-parser middleware
app.use(bodyParser.json());
//use the cors middleware
app.use(cors());

//create a POST endpoint /comments
app.post('/comments', (req, res) => {
    // read the comments.json file
    fs.readFile(path.join(__dirname, 'comments.json'), 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }

        //parse the comments.json file
        let comments = JSON.parse(data);

        //create a new comment object
        let newComment = {
            id: uuidv4(),
            name: req.body.name,
            email: req.body.email,
            message: req.body.message,
            createdAt: new Date()
        };

        //add the new comment object to the comments array
        comments.push(newComment);

        //write the comments array back to the comments.json file
        fs.writeFile(path.join(__dirname, 'comments.json'), JSON.stringify(comments, null, 4), (err) => {
            if (err) {
                return res.status(500).json({ message: err.message });
            }

            //send the new comment object as the response
            res.json(newComment);
        });
    });
});

//create a GET endpoint /comments
app.get('/comments', (req, res) => {
    // read the comments.json file
    fs.readFile(path.join(__dirname, 'comments.json'), 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }

        //parse the comments.json file
        let comments = JSON.parse(data);

        //send the comments array as the response
        res.json(comments);
    });
});

//start the server
app.listen(3000, () =>