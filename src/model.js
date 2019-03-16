const sqlite3 = require('sqlite3').verbose(),
      path = require('path')

const DB_DIRECTORY_PATH = path.join(__dirname,'../db/book.db')

module.exports.query = async function(callback){
  let db = new sqlite3.Database(DB_DIRECTORY_PATH, (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected Open');
  });

  let callbackPromise = new Promise(function (resolve,reject){
    callback(db,resolve,reject);
  });

  callbackPromise.then((results)=>{
    console.log('results ',results);
    db.close((err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log('Connection Closed');
    });
  }).catch((err)=>{
    console.log('error ',err);
    db.close((err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log('Connection Closed');
    });
  })
}