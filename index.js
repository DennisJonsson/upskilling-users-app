const express = require('express');
const sequelize = require('./Config/database');
const cors = require('cors');
const path = require('path');

const app = express();

sequelize.sync().then(() => {
    console.log("Database synched");
}).catch((err) => {
    console.error("Error synching database: ", err);
});

app.use(cors());

app.use(express.json());
app.use('/',express.static(path.join(__dirname,'ikea-react-frontend/dist')));
//app.use(express.static('ikea-react-frontend/dist'));

const userRoutes = require('./Routes/userRoutes');
app.use('/api', userRoutes);

const port = process.env.PORT || 8080;
app.listen(port, async () => {
    console.log(`Server started at ${port}`);
});
