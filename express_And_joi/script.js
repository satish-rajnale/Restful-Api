const bodyParser = require('body-parser');
const express = require('express');
const Joi = require('@hapi/joi');
// const Joi = require('joi');
const app = express();
app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use(bodyParser.raw());

//data to server
const customers = [
  { title: 'George', id: 1 },
  { title: 'jash', id: 2 },
  { title: 'alice', id: 3 },
  { title: 'candice', id: 4 },
]

// Display the message when the URL consists of '/'
app.get('/', (req, res) => {
  res.send('welcome');
});

app.get('/api/customers', (req, res) => {
  res.send(customers);
});

app.get('/api/customers/:id', (req, res) => {
  const customer = customers.find(c => c.id === parseInt(req.params.id));
  // if no valid id or no custeomer with the id
  if (!customer) res.status(404).send('no such customer id');
  res.send(customer);
});

app.post('/api/customers', (req, res) => {
  const customer = {
    id: customers.length + 1,
    title: req.body.title
  }
  console.log('Got body:', customer);
  res.status(200).send(customer);
});

function validateCustomer(customer) {
  const schema = Joi.object().keys({
    title: Joi.string().min(3).required()
  });
  console.log(Joi.validate(customer, schema))
  return Joi.validate(customer, schema);

}

app.post('/api/customers/add', (req, res) => {
  // const { error } = validateCustomer(req.body);
  // if (error) {
  //   res.status(500).json({ error: 'an error occurred' });
  // }
  // const customer = {
  //   id: customers.length + 1,
  //   title: req.body.title
  // }
  // customers.push(customer);

  var customer;
  let local = req.body.cusList;

  local.forEach(e => {
       customer = {
          title: e.title,
          id: customers.length+1
          }

          customers.push(customer);
  });
  console.log('Got body:', customers);
  res.status(200).send(customers);

});


app.put('/api/customers/:id', (req, res) => {
  const customer = customers.find(c => c.id === parseInt(req.params.id));
  if (!customer) { res.status(404).send('<h2>no such customer id</h2>'); }

  const data = req.body;
  const id = req.params.id;
  const schema = Joi.object().keys({
    title: Joi.string().min(3).required()
  });


  Joi.validate(data, schema, (err, value) => {

    if (err) {
      res.status(422).json({
        status: 'error',
        message: 'Invalid request data',
        data: data
      });
    } else {
      const elementsIndex = customers.findIndex(element => element.id == req.params.id)
      customers[elementsIndex] = {
        title: req.body.title,
        id: parseInt(id, 10)
      }
      res.json({
        status: 'success',
        message: 'User created successfully',
        data: customers[elementsIndex]
      });
    }
  });


  customer.title = req.body.title;
  res.send(customers);
  console.log(customers);
})

const port = process.env.PORT || 8080;
app.listen(port, () => console.log('listening on port :' + port));

//joi validation

const personID = Joi.string().guid({ version: 'uuidv4' });

const name = Joi.string().regex(/^[A-Z]+$/).uppercase();

const ageSchema = Joi.alternatives().try([
  Joi.number().integer().greater(6).required(),
  Joi.string().replace(/^([7-9]|[1-9]\d+)(y|yr|yrs)?$/i, '$1').required()
]);

const personDataSchema = Joi.object().keys({
  id: personID.required(),
  firstname: name,
  lastname: name,
  fullname: Joi.string().regex(/^[A-Z]+ [A-Z]+$/i).uppercase(),
  type: Joi.string().valid('STUDENT', 'TEACHER').uppercase().required(),

  age: Joi.when('type', {
    is: 'STUDENT',
    then: ageSchema.required(),
    otherwise: ageSchema
  })
})
  .xor('firstname', 'fullname')
  .and('firstname', 'lastname')
  .without('fullname', ['firstname', 'lastname']);