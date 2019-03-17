const express = require('express')
const router = express.Router();
const {query} = require('./model')

router.route('/books/crud')
.get((req,res,next)=>{
  let hasil = null
  query((db,resolve,reject)=>{
    db.all('SELECT * from book',[],(err,rows)=>{
      if(err)
        throw reject('fail')
      resolve('success')
      hasil = rows            
      res.send(hasil)
    })
  })
})
.post((req,res,next)=>{
  res.send('post book')
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