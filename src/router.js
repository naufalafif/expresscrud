const express = require('express')
const router = express.Router();
const {query} = require('./model')

router.route('/books/crud')
.get((req,res,next)=>{
  let hasil = null
  query((db,resolve,reject)=>{
    db.all('SELECT * from book',[],(err,rows)=>{
      if(err){
        reject(`fail, message : ${err.message}`)
        res.send([])
      }else{
        resolve('success')
        hasil = rows            
        res.send(hasil)
      }
    })
  })
})
.post((req,res,next)=>{
  console.log(req.body)
  const {title,desc,release_date,publisher} = req.body
  const insert_query = `INSERT INTO book (book_title,book_desc,release_date,publisher) VALUES ("${title}","${desc}","${release_date}","${publisher}")`
  console.log(insert_query);
  
  query((db,resolve,reject)=>{
    db.run(insert_query,[],function(err){
      if(err){
        reject(`fail, message : ${err.message}`)
        res.send({action:false,message:err.message})
      }else{
        resolve('success')
        let message = `A row has been inserted with rowid ${this.lastID}`
        res.send({action:true,message})
        console.log(message)
      }
    })
  })
})
.put((req,res,next)=>{  
  res.send('put book')
})
.delete((req,res,next)=>{
  res.send('delete book')
})

router.get('/books',(req,res)=>{
  res.render('books',{title:'Books Page'})
})

router.get('/',(req,res)=>{
  res.render('index',{title:'Simple Crud with Express',desc:'Crud app using express, handlebars & sqlite. made by @naufalafif58'})
})


module.exports = router;