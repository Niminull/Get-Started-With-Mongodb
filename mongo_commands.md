# Mongodb tutorial  

<!-- TODO: add examples for each command -->

<img src="./img/mongo-db.png" width="250" height="250">

[watch the full tutorial from **Net Ninja** channel](https://www.youtube.com/watch?v=ExcRbA7fy_A&list=PL4cUxeGkcC9h77dJ-QJlwGlZlTd4ecZOA&pp=iAQB)

> Please note that the given parameters should be in [**JSON**](https://www.json.org/json-en.html) format

### To show databases  

` show dbs `

\- it shows all the databases that you already have

---

### To use a database  

` use <database> `

\- use a database to start working with or switch to another one

---

### To clear the screen  

` cls `

\- use this command to clear the screen so you have more room to play with

---

### To see the current database name  

` db `

\- this command shows to current using database  

> we can also see current database name on the left side while using the command prompt, so we usually don't use this command

---

### To show collections  

` show collections `

\- after you switched to your database this command will list out all the collections inside the current database that you're in

---

### Help  

` help `

\- this command list out all the commands you can use and what they mean

---

### To quit (exit) the shell  

` exit ` or ` quit `

\- both commands do the same thing and quit the shell

---

> switch to the specific database you want to use before this commands  

### To add new document(s)  

` db.<collection>.insertOne(<object>) `

\- by using this command you can add a new document to your desired collection

Parameters: 

1. Object

` db.<collection>.insertMany(<array>) `

\- by using this command you can add multiple new documents to your desired collection

> tip: mongodb automatically generate a unique id and add it to each document

Parameters: 

1. Array

### To fetch document(s)  

` db.<collection>.find(<object>, <object>) `

\- fetch document(s) by using this method

Parameters: 

1. Object: filter documents (Obtional)
2. Object: filter fields of documents (Obtional)

> tip: in the second parameter assign the number 1 to each key you want to filter by

> tip: you can also use findOne method to fetch the first matching document

> note that the find method only show the first 20 documents  
> to see the next 20 documents use the ` it ` command

> tip: find method returns all documents if no parameter is passed

> tip: find method returns all documents if the given object is empty

### Some useful methods:  

` db.<collection>.count() `

\- shows the count of results (filtered documents)

---

` db.<collection>.limit(<number>) `

\- limits the number of results to the given number

---

` db.<collection>.sort(<object>) `

\- sorts results by the given object key

> tip: assign 1 for ascending or -1 for descending order to each key you want to sort by

---

### To delete document(s)  

` db.<collection>.deleteOne(<object>) `

\- this will remove a document from your database

Parameters: 

1. Object

> tip: use unique property like _id to remove a document

Parameters: 

1. Object

` db.<collection>.deleteMany(<object>) `

\- this will remove filtered documents from your database

### To edit document(s)  

` db.<collection>.updateOne(<object>, <object>) `

\- to edit a document

Parameters: 

1. Object: to select a specific document
2. Object: must use $set operator for second parameter to edit

> tip: use unique property like _id to edit a document

` db.<collection>.updateMany(<object>, <object>) `

\- to edit multiple documents

Parameters: 

1. Object: to select some documents
2. Object: must use $set operator for second parameter to edit

### Nest documents  

    {
        _id: ObjectId("..."), 
        key1: 'value 1', 
        key2: 'value 2', 
        key3: [{ sub_key1: 'value' , ... }]
    }

the object above is an example of nested document

### Operators & complex queries  

#### Operators:  

find: 
- ` $gt ` : greater than
- ` $lt ` : less than
- ` $gte ` : greater than or equal to
- ` $lte ` : less than or equal to
- ` $or ` : either this or that
- ` $in ` : if the value of document's property is in array
- ` $nin ` : if the value of document's property is in **not** array
- ` $all ` : if the given values (as an array) are in the array type property of document

update: 
- ` $set `: to set new data for documents while editing
- ` $inc `: to increase or decrease data of documents while editing
- ` $pull `: to remove (pull) a value from an array
- ` $push `: to add (push) a value to an array
- ` $each `: to add several values to an array

#### To Query based on nested documents  

> note that there is a difference between 'value 1' and ['value 1'] for an array type property which effect the query    
>
> imagine you want to filter documents by a specific property with array type
>>  
>> if you want to look for some documents with a specific value in the array type property, you would use 'value 1'. this means is doesn't matter how many items this array have, mongodb just looks for the exact match value
>>  
>> however if you look for some documents with the exact array, you would use ['value 1'] property which means that your looking for an array with having only one item with value 'value 1'  

    {
        _id: ObjectId("..."), 
        key1: "value 1", 
        key2: "value 2", 
        key3: {
            sub_key1: "value 1", 
            sub_key2: "value 2", 
            ...
        }
    }

if you wanted to fetch the document above by "sub_key1" property you would use this command:  

` db.<collection>.find({ "key3.sub_key1": "value 1" }) `

> note that you must put the key3.sub_key1 property in quotations

### Indexes  

> with indexes mongodb find wanted documents more easily and more quickly when a have a large mount of documents

` db.<collection>.find({ ... }).explain('executionStats') `

> run the command above by filtering whatever documents you want and check ` nReturned ` and ` docsExamined ` properties. you can see how many documents did mongodb has returned and how many documents examined. for large data, indexes used to make the process faster

` db.<collection>.createIndex(<object>) `

\- this is how to create an index

Parameters: 
1. Object: must contains a document field with it's value

` db.<collection>.getIndexes() `

\- get the indexes

` db.<collection>.dropIndex(<object>) `

\- this is how to drop an index

Parameters: 
1. Object: must contains a document field with it's value

[watch the full tutorial from **Net Ninja** channel](https://www.youtube.com/watch?v=ExcRbA7fy_A&list=PL4cUxeGkcC9h77dJ-QJlwGlZlTd4ecZOA&pp=iAQB)
