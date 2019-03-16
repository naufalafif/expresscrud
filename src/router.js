const express = require('express')
const router = express.Router();
const {query} = require('./model')

router.route('/books')
.get((req,res,next)=>{
  res.send('get book')
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

router.get('/',(req,res)=>{
  res.render('index',{title:'Simple Crud with Express'})
})

module.exports = router;