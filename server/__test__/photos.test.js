const request = require('supertest');
require('dotenv');

const createServer = require('../server');

async function setUp() {
  const app = await createServer({force: true});
  return app;
}
let app;
jest.setTimeout(30000);

const testId = 100;

const ensurePopExists = async () => {
    const response = await request(app).get("/populations");
    
    let exists = false;
    if(!!response.body) {
        let i = 0;
        while(i < response.body.length) {
            if(response.body[i].id == testId) {
                exists = true;
            }
            i++;
        }
    }

    if(!exists) {
        const popRes = await request(app).post("/populations").send({id: "100"});
        expect(popRes.statusCode).toBe(200);
    }
}

const ensureTestingGenIdExists = async () => {
    const response = await request(app).get("/genetic-id/100");

    if(response.statusCode !== 200) {
        //Creating geneticId to use with Photos
        const newGeneticId = {
            id: testId,
            geneticId: "123456789",
            progenyId: "A3",
            familyId: "51",
            rametId: null,
            species: "Test Species",
            yearPlanted: "1989",
            populationId: "100"
            };
        
        const createResponse = await request(app).post("/genetic-id").send(newGeneticId);
        expect(createResponse.statusCode).toBe(200);
    }
}

describe('Photos API', () => {
    beforeAll(async () => {
        app = await setUp();
        
        //Creating Population to use with Genetic Ids
        ensurePopExists();

        //Creating GeneticId to use with Photos
        ensureTestingGenIdExists();
    });

    test('GET should return 404, geneticId not found', async () => {
        const response = await request(app).get('/photos/101');
        expect(response.statusCode).toBe(404);
    });

    test('GET should return 200, empty photos response -- none created yet', async () => {
        const response = await request(app).get('/photos/100');
        expect(response.statusCode).toBe(200);
    });

    test('POST should return 400, bad request -- not photo data', async () => {
        const newPhoto = {
            materialGeneticId: 100
        };

        const response = await request(app).post('/photos').send(newPhoto);
        expect(response.statusCode).toBe(400);
    });

    test('POST should return 400, bad request -- no geneticId specified', async () => {
        const newPhoto = {
            photoData: 'xyzbytesandmorebytesdotphoto'
        };

        const response = await request(app).post('/photos').send(newPhoto);
        expect(response.statusCode).toBe(400);
    });

    test('POST should return 200, succesful creation response', async () => {
        const newPhoto = {
            materialGeneticId: 100,
            photoData: 'xyzbytesandmorebytesdotphoto'
        };

        const response = await request(app).post('/photos').send(newPhoto);
        expect(response.statusCode).toBe(200);
    });

    test('GET should return 200, should reflect newly added photo', async () => {
        const response = await request(app).get('/photos/100');
        expect(response.statusCode).toBe(200);
        expect(response.statusCode.body).toBe(
            [
                {
                    'materialGeneticId': '100',
                    'photoData': 'xyzbytesandmorebytesdotphoto'
                }
            ]);
    });

    test('POST should return 200, succesful addition of extra photo', async () => {
        const newPhoto = {
            materialGeneticId: 100,
            photoData: 'xyzbytesandmorebytesnumerodosdotphoto'
        };

        const response = await request(app).post('/photos').send(newPhoto);
        expect(response.statusCode).toBe(200);
    });

    test('GET should return 200, should reflect both photos', async () => {
        const response = await request(app).get('/photos/100');
        expect(response.statusCode).toBe(200);
        expect(response.statusCode.body).toBe(
            [
                {
                    'id': '1',
                    'materialGeneticId': '100',
                    'photoData': 'xyzbytesandmorebytesdotphoto'
                }, 
                {
                    'id': '2',
                    'materialGeneticId': '100',
                    'photoData': 'xyzbytesandmorebytesnumerodosdotphoto'
                }
            ]);
    });

    test('DELETE should return 404, Id not found', async () => {
        const response = await request(app).delete('/photos/100');
        expect(response.statusCode).toBe(404);
    });

    test('DELETE should return 200, deleting photo success', async () => {
        const response = await request(app).delete('/photos/2');
        expect(response.statusCode).toBe(200);
    });

    test('GET should return 200, should show one photo', async () => {
        const response = await request(app).get('/photos/100');
        expect(response.statusCode).toBe(200);
        expect(response.statusCode.body).toBe(
            [
                {
                    'materialGeneticId': '100',
                    'photoData': 'xyzbytesandmorebytesdotphoto'
                }
            ]);
    });

    test('DELETE should return 200, deleting photo success', async () => {
        const response = await request(app).delete('/photos/1');
        expect(response.statusCode).toBe(200);
    });

    test('DELETE should return 404, Id doesn\'t exist in database', async () => {
        const response = await request(app).delete('/photos/1');
        expect(response.statusCode).toBe(404);
    });

    test('GET should return 200, empty photos response -- none left', async () => {
        const response = await request(app).get('/photos/100');
        expect(response.statusCode).toBe(200);
        expect(response.body).toBe([]);
    });
});