const express = require('express');
const people = require('./people.json');
const fetch = require('node-fetch');

const app = express();

app.set('view engine', 'pug');

// Import static files for pug like CSS and images
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  let url = "http://api:8080/v1/applicant";
  let settings = { method: "Get" };
  // Get Applicants JSON object
  fetch(url, settings)
  .then(res => res.json())
  .then((json) => {
      // do something with JSON
      res.render('index', {
        title: 'HR Applicant System',
        people: json
      });
  });
});

let person;
app.get('/profile', (req, res) => {
    const profileurl = "http://api:8080/v1/applicant/" + req.query.id;
    let settings = { method: "Get" };
    // Get Applicants JSON object
    fetch(profileurl, settings)
    .then(res => res.json())
    .then((json) => {
        res.render('applicant', {
            title: `About  ${json[0].name}`,
            person: json[0]
            }); 
    });

    
    // do something with JSON
});

const server = app.listen(80, () => {
  console.log(`Express running → PORT ${server.address().port}`);
});