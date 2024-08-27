const launchesMongo=require('./launches.mongo')
const planets=require('./planets.mongo')
// const launches=new Map();

const launchesdata={
    flightNumber:100,
    mission:'Kepler Exploration X',
    rocket:'Explorer IS1',
    launchDate:new Date('December 27, 2030'),
    target:'Kepler-442 b',
    customer:['ZTM','NASA'],
    upcoming:true,
    success:true,
}

async function savelaunches(launch){
    const planet=await planets.findOne({keplerName:launch.target})
    if(!planet){
        throw new Error(`${launch.target} is not from listed planets`)
    }
    await launchesMongo.findOneAndUpdate({flightNumber:launch.flightNumber},launch,{upsert:true})
}
savelaunches(launchesdata)

async function initialFlightNum(){
    const flightNumber=await launchesMongo.findOne().sort('-flightNumber')
    if(!flightNumber){
        return 100;
    }
    return flightNumber.flightNumber;
}

async function getAllLaunches(){
    return await launchesMongo.find({},{'_id':0,'__v':0})
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
async function existsLaunchId(id){
    return await launchesMongo.findOne({flightNumber:id})
}

module.exports={
    getAllLaunches,
    saveNewLaunch,
    httpAbortLaunch,
    existsLaunchId
}