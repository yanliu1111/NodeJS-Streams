# How To Code A Video Stream using MongoDB

- GridFS can store files greater than 16MB in MongoDB. It does this by splitting the file into smaller chunks and storing each chunk as a separate document.
- other useful feature of gridFS is that we can ask it for a file stream from the database and pipe it to a writable stream, such as an HTTP response.

```js
const bucket = new mongodb.GridFSBucket(db)
const downloadStream = bucket.openDownloadStreamByName('bigBuck',{start})
```

you dont need to load the entire file into memory, you can just pipe the stream to the response object.


- This is particularly useful for serving large files, such as videos, directly from the database without having to load the entire file into memory.