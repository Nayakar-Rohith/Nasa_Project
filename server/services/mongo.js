const mongoose=require('mongoose');
require('dotenv').config();
const MONGO_URL=process.env.MONGO_URL;

mongoose.connection.once('connected',()=>{
    console.log('Mongo Db is connected now');
});
mongoose.connection.on('error',(err)=>{
    console.log('Error:',err)
});

async function connectToMongo(){
    await mongoose.connect(MONGO_URL);
}
async function disconnectToMongo(){
    await mongoose.disconnect();
}

module.exports={
    connectToMongo,
    disconnectToMongo
}