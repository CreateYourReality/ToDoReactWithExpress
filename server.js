import express from "express";
import cors from "cors";

const PORT = 9898;
const app = express()

const todoList = [
    {
        "id": 1,
        "Name": "test1"
    },
    {
        "id": 2,
        "Name": "test2"
    }
]

app.use(express.json())

app.use(cors()); /*{ 
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }*/ 

app.use((req,res,next) => {
    console.log(req.method, req.url);
    next()
})

app.get("/todos",(req,res) => {
    res.json(todoList)
})


app.post("/todos",(req,res) => {
    todoList.push(req.body)
    res.send(req.body)
})

app.listen(PORT, () => console.log('Ich stehe wieder vor der Tür'))