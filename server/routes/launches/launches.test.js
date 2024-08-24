const request=require('supertest')
const app=require('../../src/app')

const data={
    mission:'Kepler Exploration X',
    rocket:'Explorer IS1',
    launchDate:new Date('December 27, 2030'),
    target:'Kepler-442 b',
}

describe("testing GET /launches",()=>{
    test('testing status code 200 for succesfull get method',async ()=>{
        await request(app).get('/launches')
        .expect(200)
    })
})

describe("testing Post /launches",()=>{
    test('testing status code for invalid data',async ()=>{
        const response=await request(app).post('/launches')
        .send(data)
        .expect('Content-Type',/json/)
        .expect(201)

    });
    test('testing status code for invalid date format',async ()=>{
        const response=await request(app).post('/launches').send(Object.assign(data,{"launchDate":"December 27, 2030"}))
        .expect('Content-Type',/json/)
        console.log('response.body.launchDate',response.body.launchDate)
        console.log('new Date(December 27, 2030)',new Date('December 27, 2030'))
        expect(new Date(response.body.launchDate)).toEqual(new Date('December 27, 2030'))
    })
})