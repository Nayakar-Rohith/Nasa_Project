const {parse}=require("csv-parse")
const fs=require("fs")
const planets=require('./planets.mongo')

const habitablePlanets=(planet)=>{
    return planet['koi_disposition']==='CONFIRMED' && 
    planet['koi_insol']>0.36 && planet['koi_insol']<1.11 &&
    planet['koi_prad']<1.6;
}
function loadPlanetsData(){
    return new Promise((resolve,reject)=>{
        fs.createReadStream(`${__dirname}/../data/kepler_data.csv`)
        .pipe(parse({
            comment:'#',
            columns:true
        }))
        .on('data', async (planet)=>{
            if(habitablePlanets(planet)){ 
                await saveAllPlanets(planet);
            }
        })
        .on('error',(error)=>{
            console.log(error)
            reject(error)
        })
        .on('end',async ()=>{
            const countPlanets=(await getAllPlanets()).length 
            console.log(`there are ${countPlanets} planets`)
            resolve()
        })
            })
        }
async function getAllPlanets(){
    return await planets.find({},{
        '_id':0,'__v':0
    });
}
async function saveAllPlanets(planet) {
    try {
        await planets.updateOne(
            { keplerName: planet.kepler_name },
            { keplerName: planet.kepler_name  }, 
            { upsert: true }
        );

    } catch (error) {
        console.error(`There is an error in the code ${error}`);
    }
}
module.exports={
    loadPlanetsData,
    getAllPlanets,
}