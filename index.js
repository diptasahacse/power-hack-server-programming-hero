const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;



// Middleware
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.MONGODB_USER_NAME}:${process.env.MONGODB_PASSWORD}@cluster0.rg8j4.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });


const run = async () => {
  try {
    await client.connect();
    const userCollection = client.db('powerHack').collection('users');

    // // user registration get
    // app.get('/registration', async (req, res) => {
    //   const userInfo = req.body;
    //   const email = userInfo.email
    //   const result = userCollection.findOne({ email })
    //   res.send(result)

    // })

    // user registration
    app.post('/registration', async (req, res) => {
      const userInfo = req.body;

      const email = userInfo.email
      const exist = await userCollection.findOne({ email })
      if (!exist) {
        const result = await userCollection.insertOne(userInfo);
        res.send(result)
      }
      else{
        res.send({acknowledged: false})

      }



      

    })




  }
  finally {
    // await client.close();

  }

}
run().catch(console.dir);
















app.get('/', (req, res) => {
  res.send('Hello Power hack!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})