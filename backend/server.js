const express = require("express");
const cors = require("cors");
const session = require("express-session")

const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

app.use(express.json());

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://chrono-sync-rosy.vercel.app"
  ],
  credentials: true,
}));

app.set("trust proxy", 1);

app.use(session({
  secret: "chronosync-secret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  }
}));


app.get("/",(req,res) => {
    res.send("ChronoSync Backend Running");
})

app.use("/api/auth", authRoutes);
app.use("/api/nexus/tasks", taskRoutes);



app.listen(5000,() => {
    console.log("server running on port 5000")
})