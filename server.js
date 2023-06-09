const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');
const port = 3946
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());
app.set("view engine", 'ejs');
app.set("views", "./views");

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: "dbtest",
})
connection.connect((err) => {
    if (err) {
        console.log(err.message);
    } else {
        console.log("success");
    }
});
app.get("/", (req, res) => {
    const sql = "SELECT * FROM dbtest.book"
    connection.query(sql, (err, result) => {
        if (err) {
            console.log(err.message);
        }
        res.render('home', {listBook: result})
    })
})
app.post("/", (req, res) => {
    const sql = "SELECT * FROM dbtest.book"
    connection.query(sql, (err, result) => {
        if (err) {
            console.log(err.message);
        }
        res.render('home', {listBook: result})
    })
})
app.get('/books', (req, res) => {
    res.render('book',)
})
app.post("/books", (req, res) => {
    const {name, price, author} = req.body
    const sql = `insert into book (name,price,author) values("${name}",${price},"${author}")`
    connection.query(sql, (err, result) => {
        if (err) {
            console.log(err.message);
        }
        res.redirect('/')
    })
})
app.get("/edit/:id", (req, res) => {

        let id = req.params.id
    if (!isNaN(id)) {
        const sql = `select * from book where id = ${id}`
        connection.query(sql, (err, result) => {
            if (err) {
                console.log(err.message);
            }
            if(result.length >0){
                res.render('edit', {Book: result[0]})
            }else {
                res.redirect('/')
            }
        })
    }else {
        res.redirect('/')
    }


})
app.post("/edit/:id", (req, res) => {
    let id = req.params.id
    const {name, price, author} = req.body
    const sql = `UPDATE book
SET name = '${name}', price = ${price}, author =' ${author}'
WHERE id = ${id};`
    connection.query(sql, (err, result) => {
        if (err) {
            console.log(err.message);
        }
        res.redirect('/')
    })
})
app.get("/delete/:id",(req, res)=>{
    let id = req.params.id
    const {name, price, author} = req.body
    const sql = `delete from book where id = ${id}`
    connection.query(sql, (err, result) => {
        if (err) {
            console.log(err.message);
        }
        res.redirect('/')
    })
})

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})

