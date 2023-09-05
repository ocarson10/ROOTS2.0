const request = require('supertest');
require('dotenv');
process.env.NODE_ENV = "testing";

const createServer = require('../server');

async function setUp() {
  const app = await createServer();
  return app;
}
let app;
jest.setTimeout(15000);

describe("tests location API", () => {

  beforeAll(async () => {
    
    app = await setUp();
  });

  test("POST /locations", async()=>{

    const newLocation = {
      location: "Laboratory",
      shorthand: "LAB"
    };

    const response = await request(app).post("/locations").send(newLocation);
    expect(response.statusCode).toBe(200);
  });

  test("GET /locations", async()=>{
    const response = await request(app).get("/locations");
    expect(response.statusCode).toBe(200);
  })

  test("DELETE /locations", async()=>{
    const response = await request(app).delete("/locations").send(
      {
      location: "Laboratory",
    });
    expect(response.statusCode).toBe(200);
  });
})