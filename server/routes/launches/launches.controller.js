const {getAllLaunches,saveNewLaunch,httpAbortLaunch,existsLaunchId}=require('../../models/launches.model')
const {getPagination}=require('../../services/query')

async function getlaunchesController(req,res){
    const {skip,limit}=getPagination(req.query)
    return res.status(200).json(await getAllLaunches(skip,limit))
}
async function postlaunchesController(req,res){
    const launch=req.body;
    if(!launch.launchDate|| !launch.mission ||!launch.rocket||!launch.target){
        return res.status(400).json({error:"there is an error in the request data"})
    }

    launch.launchDate=new Date(launch.launchDate)
    if (isNaN(launch.launchDate)){
        return res.status(400).json({error:"invalid date format"})
    }
    await saveNewLaunch(launch)
    return res.status(201).json(launch)
}
async function abortlaunchesController(req,res){
    const launchId=Number(req.params.id);
    const exists=await existsLaunchId(launchId);

    if(!exists){
        return res.status(404).json({error:'launch is not found'})
    }
    const abort=await httpAbortLaunch(launchId);
    return res.status(200).json(abort)
    

}

module.exports={getlaunchesController,postlaunchesController,abortlaunchesController}