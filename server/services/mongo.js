const mongoose=require('mongoose');

const MONGO_URL='mongodb+srv://nasa_api:wdDeq15zZtfLgYMr@nasacluster.sys5e.mongodb.net/nasa?retryWrites=true&w=majority';

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