const express=require('express')
const {getlaunchesController,postlaunchesController,abortlaunchesController}=require('./launches.controller')

const launchesRouter=express.Router()

launchesRouter.get('/',getlaunchesController)
launchesRouter.post('/',postlaunchesController)
launchesRouter.delete('/:id',abortlaunchesController)

module.exports=launchesRouter