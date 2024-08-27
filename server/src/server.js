const http=require('http')
const app=require('./app')
const {loadPlanetsData}=require('../models/planets.model')
const mongoose=require('mongoose');
const {connectToMongo}=require('../services/mongo')
const PORT=process.env.PORT || 8000

const server= http.createServer(app);

async function loadServer(){
    await connectToMongo();
    await loadPlanetsData();
    server.listen(PORT,()=>{
        console.log(`server is listening to port number ${PORT}............`)
    })
}
loadServer()