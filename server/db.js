
const {Client} = require('pg')

// Database Connection

const client = new Client({
  user:process.env.DB_USER,
  password:process.env.DB_PASSWORD,
  host:process.env.DB_HOST,
  port:process.env.DB_PORT,
  database:process.env.DB_NAME
})

client.connect()
.then(()=>console.log("Connected"))
.catch(e=>console.log(e))

module.exports = client;