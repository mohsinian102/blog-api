const app = require('./app');
require('dotenv').config({ path:'../.env' });

const port = process.env.PORT;

app.listen(port, ()=>{
    console.log(`Server started at ${port}`);
})