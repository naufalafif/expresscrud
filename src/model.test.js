const {query} = require('./model');

query((db,resolve,reject)=>{
  db.all('SELECT * from book',[],(err,rows)=>{
    if(err)
      throw reject('fail')
    
    rows.forEach(record => {
      console.log(record);    
    });
    resolve('success')
  })
})