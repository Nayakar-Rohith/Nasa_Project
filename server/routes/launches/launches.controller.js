const {getAllLaunches,postNewLaunch,httpAbortLaunch,existsLaunchId}=require('../../models/launches.model')


function getlaunchesController(req,res){
    return res.status(200).json(getAllLaunches())
}
function postlaunchesController(req,res){
    const launch=req.body;
    if(!launch.launchDate|| !launch.mission ||!launch.rocket||!launch.target){
        return res.status(400).json({error:"there is an error in the request data"})
    }

    launch.launchDate=new Date(launch.launchDate)
    if (isNaN(launch.launchDate)){
        return res.status(400).json({error:"invalid date format"})
    }
    postNewLaunch(launch)
    return res.status(201).json(launch)
}
function abortlaunchesController(req,res){
    const launchId=Number(req.params.id);
    if(!existsLaunchId(launchId)){
        return res.status(404).json({error:'launch is not found'})
    }
    const abort=httpAbortLaunch(launchId);
    return res.status(200).json(abort)
    

}

module.exports={getlaunchesController,postlaunchesController,abortlaunchesController}