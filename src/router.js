const express = require('express')
const router = express.Router();
const {query} = require('./model')


router.get('/books/crud',(req,res,next)=>{
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
router.post('/books/crud',(req,res,next)=>{
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

router.put('/books/crud',(req,res)=>{
  const {book_id,book_title,book_desc,release_date,publisher} = req.body

  
  let update_query = `  
  UPDATE book
  SET book_title = "${book_title}", 
      book_desc = "${book_desc}", 
      release_date = "${release_date}", 
      publisher = "${publisher}"
  WHERE book_id = ${book_id} ;
  `

  console.log(update_query);
  
  query((db,resolve,reject)=>{
    db.run(update_query,[],function(err){
      if(err){
        reject(`fail, message : ${err.message}`)
        res.send({action:false,message:err.message})
      }else{
        resolve('success')
        let message = `A row has been updated with rowid ${book_id}`
        res.send({action:true,message})
        console.log(message)
      }
    })
  })
  
})

router.delete('/books/crud/:id',(req,res)=>{
  let book_id = req.params.id
  let delete_query = `DELETE FROM book
  WHERE book_id = ${book_id};
  `
  query((db,resolve,reject)=>{
    db.run(delete_query,[],function(err){
      if(err){
        reject(`fail, message : ${err.message}`)
        res.send({action:false,message:err.message})
      }else{
        resolve('success')
        let message = `A row has been deleted with rowid ${book_id}`
        res.send({action:true,message})
        console.log(message)
      }
    })
  })
  
})


router.get('/books',(req,res)=>{
  res.render('books',{title:'Books Page'})
})

router.get('/',(req,res)=>{
  res.render('index',{title:'Simple Crud with Express',desc:'Crud app using express, handlebars & sqlite. made by @naufalafif58'})
})


module.exports = router;