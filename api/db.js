const { MongoClient } = require('mongodb')

let dbConnection

module.exports = {

    connectToDb: (uri, cb) => {
        MongoClient.connect(uri)
            .then(client => {
                dbConnection = client.db()
                return cb()
            })
            .catch(err => {
                console.log(err)
                return cb(err)
            })
    }, 

    getDb: () => dbConnection
    
}
