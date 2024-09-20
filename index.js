const express = require("express");
const userRouters = require('./Routes/userRoutes');
const sequelize = require('./Config/database');
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.static("react-frontend/dist"));

app.use('/api', userRouters);

sequelize.sync().then(() => {
    console.log("Database synched");
}).catch((err) => {
    console.error("Error synching database: ", err);
});

const port = process.env.PORT || 8080;
app.listen(port, async () => {
    console.log(`Server started at ${port}`);
});
