const {parse}=require("csv-parse")
const fs=require("fs")
const keplerData=[]

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
        .on('data',(planet)=>{
            if(habitablePlanets(planet)){
                keplerData.push(planet)
            }
        })
        .on('error',(error)=>{
            console.log(error)
            reject(error)
        })
        .on('end',()=>{
            resolve()
        })
            })
        }

module.exports={
    loadPlanetsData,
    planets:keplerData
}