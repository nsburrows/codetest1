const Pool = require('pg').Pool

require('dotenv/config');

const pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DB,
    password: process.env.PG_PASS,
    port: process.env.PG_PORT,
  });

const getAllApplicants = (request, response) => {
    pool.query('SELECT * FROM masterdata.applicant order by age desc', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

const getApplicant = (request, response) => {
    const applicantId = request.params.applicantId
    pool.query('select * from masterdata.applicant where Id = $1::integer', [applicantId], (error, results) => {
        try{
            response.status(200).json(results.rows)
        } catch(err){
            response.status(404).json({Error: "Id passed must be a number"})
        }
    })
}

const addApplicant = (request, response) => {

  console.log(request.body);
  const insertQuery = 'insert into masterdata.applicant ("name", age, is_college_grad) values ($1::text, $2::integer, $3::boolean)';
  const insertParams = [request.body.name, request.body.age, request.body.is_college_grad];

  pool.query(insertQuery, insertParams, (error, results) => {
      try{
          response.status(200).json(results.rowCount)
      } catch(err){
          response.status(404).json({Error: 'All required fields must be filled: name, age and is_college_grad. Example object {"name": "John", "age": 35, "is_college_grad": true}'})
      }
  });

  // pool.query('COMMIT', err => {
  //   if (err) {
  //     console.error('Error committing transaction', err.stack)
  //   }
  // });
}

  module.exports = {
    getAllApplicants,
    getApplicant,
    addApplicant
  }

  