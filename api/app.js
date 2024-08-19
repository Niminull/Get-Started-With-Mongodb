
// init app & middleware
const PORT = 2070
const version = 1
const database_url = 'mongodb://localhost:27017/mydb'
const express = require('express')
const app = express()

app.use(express.json())

// modules
const { ObjectId } = require('mongodb')
const { connectToDb, getDb } = require('./db')

// db connection
let db
connectToDb(database_url, (err) => {
    if (err) return

    app.listen(PORT, () => console.log(`\n--> App listening on port ${PORT}\n`))
    db = getDb()

})


// routes
app.get(`/api/v${version}/docs`, (req, res) => {

    const page = req.query.p ? req.query.p: 0
    const docsPerPage = 5
    
    let documents = []
    db.collection('docs')
        .find()
        .sort({ key1: 1 })
        .skip(page * docsPerPage)
        .limit(docsPerPage)
        .forEach(doc => documents.push(doc))
        .then(() => res.status(200).json(documents))
        .catch(err => res.status(500).json({ error: 'Could not fetch the documents' }))

})

app.get(`/api/v${version}/docs/:id`, (req, res) => {

    if (!ObjectId.isValid(req.params.id)) {
        res.status(500).json({ error: 'Not a valid id' })
        return
    }

    db.collection('docs')
        .findOne({ _id: new ObjectId(req.params.id) })
        .then(doc => res.status(200).json(doc))
        .catch(err => res.status(500).json({ error: 'Could not fetch the document' }))

})

app.post(`/api/v${version}/docs`, (req, res) => {

    const document = {
        key_1: req.body.key_1, 
        key_2: req.body.key_2, 
        key_3: req.body.key_3
    }

    db.collection('docs')
        .insertOne(document)
        .then(result => res.status(201).json(result))
        .catch(err => res.status(500).json({ error: 'Could not create a new document' }))

})

app.delete(`/api/v${version}/docs/:id`, (req, res) => {

    if (!ObjectId.isValid(req.params.id)) {
        res.status(500).json({ error: 'Not a valid id' })
        return
    }

    db.collection('docs')
        .deleteOne({ _id: new ObjectId(req.params.id) })
        .then(result => res.status(200).json(result))
        .catch(err => res.status(500).json({ error: 'Could not delete the document' }))

})

app.patch(`/api/v${version}/docs/:id`, async (req, res) => {

    if (!ObjectId.isValid(req.params.id)) {
        res.status(500).json({ error: 'Not a valid id' })
        return
    }

    let document

    await db.collection('docs')
        .findOne({ _id: new ObjectId(req.params.id) })
        // .then(doc => document = doc)
        .then(doc => document = {...doc})
        .catch(err => res.status(500).json({ error: 'Could not fetch the document before update' }))

    if (!document) return

    const newDocument = req.body

    const updates = {
        key_1: newDocument.hasOwnProperty('key_1') ? newDocument.key_1: document.key_1, 
        key_2: newDocument.hasOwnProperty('key_2') ? newDocument.key_2: document.key_2, 
        key_3: newDocument.hasOwnProperty('key_3') ? newDocument.key_3: document.key_3
    }

    db.collection('docs')
        .updateOne({ _id: new ObjectId(req.params.id) }, {$set: updates})
        .then(result => res.status(200).json(result))
        .catch(err => res.status(500).json({ error: 'Could not update the document' }))

})
