const express = require('express');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');

const app = express();

// Helps us to parser the JSON to some readable HTML
app.use(bodyParser.json());

// Again helps with displaying the JSON as HTML
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);

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
      // Take the JSON and load the homepage
      res.render('index', {
        title: 'HR Applicant System',
        people: json
      });
  });
});

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
});

app.post('/submission', (req, res) => {
  let url = "http://api:8080/v1/applicant";
  let settings = { method: "post",  body: JSON.stringify(req.body), headers: { 'Content-Type': 'application/json' }};

  try{
    fetch(url, settings).then(      
      // Go back to the homepage after successful submission
      res.redirect("back"))
  } catch(err) {
    res.status(404).json({Error: err.message})
  }
});

const server = app.listen(80, () => {
  console.log(`Express running → PORT ${server.address().port}`);
});