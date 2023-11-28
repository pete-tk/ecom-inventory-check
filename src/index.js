// require to use express module
const express = require('express')
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('../swagger_output.json')
// instanticate express web server instance
const app = express()
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// setup route
app.get('/', (req, res) => {
    res.send('No data')
})
app.use("/inventory", require("./routes/inventory"));
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

// register port for express web server
app.listen(3000)