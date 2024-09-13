const { query } = require('express');
const launchesMongo=require('./launches.mongo')
const planets=require('./planets.mongo')
const axios=require('axios');
// const launches=new Map();

// const launchesdata={
//     flightNumber:100,
//     mission:'Kepler Exploration X',
//     rocket:'Explorer IS1',
//     launchDate:new Date('December 27, 2030'),
//     target:'Kepler-442 b',
//     customer:['ZTM','NASA'],
//     upcoming:true,
//     success:true,
// }

async function savelaunches(launch){
    await launchesMongo.findOneAndUpdate({flightNumber:launch.flightNumber},launch,{upsert:true})
}
// savelaunches(launchesdata)

const SpaceX_API='https://api.spacexdata.com/v4/launches/query';
async function fetchLaunchesSpaceX(){
    const response=await axios.post(SpaceX_API,{
        query:{},
        options:{
        pagination:false,
        populate:[
            {path:'rocket',
            select:{
                name:1
            }
            },
            {
                path:'payloads',
                select:{
                    customers:1
                }
            }
        ]
    }
    })
    const SpaceX_launches= response.data.docs;
    for (const payload of SpaceX_launches){
        const customers=payload.payloads.flatMap(payload=>{
            return payload.customers
        })
        const launch={    
            flightNumber:payload.flight_number,
            mission:payload.name,
            rocket:payload.rocket.name,
            launchDate:payload.date_local,
            customer:customers,
            upcoming:payload.upcoming,
            success:payload.success,        
        }
    await savelaunches(launch)
     console.log(`${launch.flightNumber} - ${launch.customer}`)
    }
}
async function loadLaunchesData(){
    const spaceLaunch={
        flightNumber:2,
        mission:"DemoSat",
        customer:['DARPA']
    }
    const launchexists=await existsLaunch(spaceLaunch)
    if(launchexists){
        console.log(`spaceX data is already loaded....`)
    }
    else{
    console.log('loading launches data from space X API........');
     await fetchLaunchesSpaceX()
    }
       
}

async function initialFlightNum(){
    const flightNumber=await launchesMongo.findOne().sort('-flightNumber')
    if(!flightNumber){
        return 100;
    }
    return flightNumber.flightNumber;
}

async function getAllLaunches(skip,limit){
    return await launchesMongo.find({},{'_id':0,'__v':0})
    .skip(skip)
    .limit(limit)
}
// function postNewLaunch(launch){
//     initialFlightNum++;
//     launches.set(
//         initialFlightNum,
//         Object.assign(launch,{
//             flightNumber:initialFlightNum,
//             customer:['Zero to Master','NASA'],
//             upcoming:true,
//             success:true,
//         })
//     )
// }
async function saveNewLaunch(launch){
    const planet=await planets.findOne({keplerName:launch.target})
    if(!planet){
        throw new Error(`${launch.target} is not from listed planets`)
    }
    const newlaunch=Object.assign(launch,{
        flightNumber:(await initialFlightNum())+1,
        customer:['Zero to Master','NASA'],
        upcoming:true,
        success:true,
    })
    await savelaunches(newlaunch)

}
async function httpAbortLaunch(id){

    const abort=await launchesMongo.updateOne({
        flightNumber:id
    },{
    upcoming:false,
    success:false
    })
    return abort
    // const abort= launches.get(id);
    // abort.upcoming=false;
    // abort.success=false;
    // return abort
    
}
async function existsLaunch(launch){
    return await launchesMongo.findOne(launch)
}
async function existsLaunchId(id){
    return await existsLaunch({flightNumber:id})
}

module.exports={
    loadLaunchesData,
    getAllLaunches,
    saveNewLaunch,
    httpAbortLaunch,
    existsLaunchId
}