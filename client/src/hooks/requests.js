const API_URL='http://localhost:8000/v1';

async function httpGetPlanets() {
  // TODO: Once API is ready.
  // Load planets and return as JSON.
  const planets=await fetch(`${API_URL}/planets`)
  return await planets.json()
}

async function httpGetLaunches() {
  // TODO: Once API is ready.
  // Load launches, sort by flight number, and return as JSON.
  const launches=await fetch(`${API_URL}/launches`)
  const fetchedLaunches=await launches.json()
  return fetchedLaunches.sort((a,b)=>{
    return a.flightNumber-b.flightNumber
  })

}
// TODO: Once API is ready.
  // Submit given launch data to launch system.
async function httpSubmitLaunch(launch) {
  try{
    return await fetch(`${API_URL}/launches`,{
      method:'post',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(launch),
    })
  }
  catch(error){
    return {ok:false}
  }
}
// TODO: Once API is ready.
  // Delete launch with given ID.

async function httpAbortLaunch(id) {
  try{
    return await fetch(`${API_URL}/launches/${id}`,{
      method:'delete'
    })
  }
  catch(error){
    return {
      ok:false
    }
  }
}
export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
};