const launches=new Map();

let initialFlightNum=100;
const launchesdata={
    flightNumber:initialFlightNum,
    mission:'Kepler Exploration X',
    rocket:'Explorer IS1',
    launchDate:new Date('December 27, 2030'),
    target:'Kepler-442 b',
    customer:['ZTM','NASA'],
    upcoming:true,
    success:true,
}
launches.set(launchesdata.flightNumber,launchesdata);


function getAllLaunches(){
    return Array.from(launches.values())
}
function postNewLaunch(launch){
    initialFlightNum++;
    launches.set(
        initialFlightNum,
        Object.assign(launch,{
            flightNumber:initialFlightNum,
            customer:['Zero to Master','NASA'],
            upcoming:true,
            success:true,
        })
    )
}
function httpAbortLaunch(id){
    const abort= launches.get(id);
    abort.upcoming=false;
    abort.success=false;
    return abort
    
}
function existsLaunchId(id){
    return launches.has(id)
}

module.exports={
    getAllLaunches,
    postNewLaunch,
    httpAbortLaunch,
    existsLaunchId
}