const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const errorHandler = require("./middleware/error");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
//IMPORT ROUTES
const authRoutes = require("./routes/auth");
const memberRoutes = require("./routes/member");
const teacherRoutes = require("./routes/teacher");
const storageRoutes = require("./routes/storage");
const lessonRoutes = require("./routes/lesson");
const rentRoutes = require("./routes/rent");
const debtRoutes = require("./routes/debt");
const paymentRoutes = require("./routes/payment");
const expenseRoutes = require("./routes/expense");
const campRoutes = require("./routes/camp");
// Connect Database

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("DB Connected"))
  .catch((e) => console.log("Error occured: ", e));

//MIDDLEWARE
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
const corsOptions = {
  origin: "https://active-surf.onrender.com",
};

app.use(cors());

//ROUTES MIDDLEWARE

app.use("/api", authRoutes);
app.use("/api", memberRoutes);
app.use("/api", teacherRoutes);
app.use("/api", lessonRoutes);
app.use("/api", rentRoutes);
app.use("/api", storageRoutes);
app.use("/api", debtRoutes);
app.use("/api", paymentRoutes);
app.use("/api", expenseRoutes);
app.use("/api", campRoutes);
// ERROR MIDDLEWARE
app.use(errorHandler);

const port = 8000;

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
