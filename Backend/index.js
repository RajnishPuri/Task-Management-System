require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const { dbConnect } = require('./config/db');
const userRouter = require('./routes/authRoute');
const cookieParser = require('cookie-parser');
const taskRouter = require('./routes/taskRoutes');

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/auth', userRouter);
app.use('/api/task', taskRouter);


app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`);
    await dbConnect();
});
