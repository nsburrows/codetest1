const express = require('express');
const router = express.Router();
const swaggerUi = require('swagger-ui-express');
const db = require('../db/queries')
const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Get Applicants App',
      version: '1.0.0',
    },
  },
  swaggerOptions: {
    validatorUrl: 'none'
  }, 
  // Path to the API docs
  apis: ['./routes/routes.js'],
};

// Initialize swagger-jsdoc -> returns validated swagger spec in json format
const swaggerSpec = swaggerJSDoc(options);
 
/**
 * @swagger
 * 
 * /v1/applicant:
 *   get:
 *     description: Get all applicants that are trying to apply
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: List of all applicants and their details returned successfully
 */
router.get('/applicant', db.getAllApplicants);

/**
 * @swagger
 * 
 * /v1/applicant/{applicantId}:
 *   get:
 *     description: Get a specific applicant's profile based off their primary key (Id). Will return their name, age and if they graduated college
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: applicantId
 *         description: The primary key (Id) of the applicant
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: List of applicants details returned successfully
 */
router.get('/applicant/:applicantId', db.getApplicant);

/**
 * @swagger
 * 
 * /v1/applicant:
 *   post:
 *     description: Creates a new applicant
 *     produces:
 *       - application/json
 *     requestBody:
 *       content: 
 *         'application/json':
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               age:
 *                 type: integer
 *               is_college_grad:
 *                 type: boolean
 *             required:
 *               - name
 *               - age
 *               - is_college_grad
 *             example:
 *                name: John
 *                age: 35
 *                is_college_grad: false 
 *           examples:
 *             applicant:
 *               summary: User Example
 *               value: 
 *                 name: John
 *                 age: 35
 *                 is_college_grad: false
 *     responses:
 *       200:
 *         description: Returns the amount of applicants inserted which should be 1
 */
router.post('/applicant', db.addApplicant);

// Return Swagger documentaion
router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerSpec, options));

module.exports = router;