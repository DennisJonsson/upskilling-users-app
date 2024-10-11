const express = require('express');
const sequelize = require('./Config/database');
const userRoutes = require('./Routes/userRoutes');
const accountRoutes = require('./Routes/accountRoutes');
const cors = require('cors');


const app = express();

sequelize.sync().then(() => {
    console.log("Database synched");
}).catch((err) => {
    console.error("Error synching database: ", err);
});

app.use(cors());

app.use(express.json());
app.use(express.static('ikea-react-frontend/dist'));


app.use('/api', userRoutes);
app.use('/api',accountRoutes);

const port = process.env.PORT || 8081;

server =  app.listen(port, async () => {
    console.log(`Server started at ${port}`)
});
module.exports = {app, server}
