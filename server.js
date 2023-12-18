import express from "express"
import mysql from "mysql"
import bodyParser from "body-parser"
import cors from "cors"

const app = express()
const port = 3020

const db = mysql.createConnection({
    host: 'svc.sel4.cloudtype.app',
    port: '32452',
    user: 'root',
    password: '1234',
    database: 'vdb'
})

db.connect()

app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.json({ result: "success" })
})


app.get('/vtuber-data', (req, res) => {
    const sql = 'SELECT * from vtuber'
    db.query(sql, (err, rows) => {
        if (err) {
            res.json({ result: "error" })
            return console.log(err)
        }
        res.json(rows)
    })
})



app.listen(port, () => {
    console.log(`서버 실행됨 (port ${port})`);
});
