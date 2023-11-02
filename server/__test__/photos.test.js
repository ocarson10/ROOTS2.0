const request = require('supertest');
require('dotenv');

const createServer = require('../server');

async function setUp() {
  const app = await createServer({force: true});
  return app;
}
let app;
jest.setTimeout(30000);

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
    const response = await request(app).get("/genetic-id/1");

    if(response.statusCode !== 200) {
        //Creating geneticId to use with Photos
        const newGeneticId = {
            geneticId: "1",
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

const ensureLocationExists = async () => {
    const response = await request(app).get("/locations/t3st");

    if(!response) {
        const newLocation = {
            location: 't3st',
            shorthand: 't3st'
        };

        const createResponse = await request(app).post('/locations').send(newLocation);
        expect(createResponse.statusCode).toBe(200);
    }
}

const ensureTreeExists = async () => {
    const response = await request(app).get("/trees/1");

    if(!response) {
        const newTree = {
            treeId: '1',
            gps: 'testGPS123',
            locationId: 't3st',
            treeGeneticId: '1'
        }

        const createResponse = await request(app).post('/trees').send(newTree);
        expect(createResponse.statusCode).toBe(200);
    }
}

describe('Photos API', () => {
    beforeAll(async () => {
        app = await setUp();
        
        //Creating Population to use with Genetic Ids
        await ensurePopExists();

        //Creating GeneticId to use with Photos
        await ensureTestingGenIdExists();

        //Creating tree requires location
        await ensureLocationExists();

        //Creating tree
        await ensureTreeExists();
    });

    afterAll(async() => {
        /**await request(app).delete('/populations').send({id: '100'});
        await request(app).delete('/genetic-id').send({id: 1});
        await request(app).delete('/locations').send({location: 't3st'});
        await request(app).delete('trees').send({id: 1});*/
    });

    test('GET should return 404, geneticId not found', async () => {
        const response = await request(app).get('/photos/tree/101');
        expect(response.statusCode).toBe(404);
    });

    test('GET should return 404, no photos created yet', async () => {
        const response = await request(app).get('/photos/tree/1');
        expect(response.statusCode).toBe(404);
    });

    test('POST should return 400, bad request -- not photo data', async () => {
        const newPhoto = {
            materialId: 100, 
            materialType: 'tree'
        };

        const response = await request(app).post('/photos').send(newPhoto);
        expect(response.statusCode).toBe(400);
    });

    test('POST should return 400, bad request -- not photo/type data', async () => {
        const newPhoto = {
            materialId: 100
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

    test('POST should return 400, no material type', async () => {
        const newPhoto = {
            materialId: 1,
            photoData: 'xyzbytesandmorebytesdotphoto'
        };

        const response = await request(app).post('/photos').send(newPhoto);
        expect(response.statusCode).toBe(400);
    });

    test('POST should return 200, succesful creation response', async () => {
        const newPhoto = {
            materialId: 1,
            photoData: 'xyzbytesandmorebytesdotphoto', 
            materialType: 'tree'
        };

        const response = await request(app).post('/photos').send(newPhoto);
        console.log(response);
        console.log(response.error);
        expect(response.statusCode).toBe(200);
    });

    test('GET should return 200, should reflect newly added photo', async () => {
        const response = await request(app).get('/photos/tree/1');
        expect(response.statusCode).toBe(200);
        expect(response.body[0].associatedMaterial).toBe(1);
        expect(response.body[0].photoId).toBe(1);
    });

    test('POST should return 200, succesful addition of extra photo', async () => {
        const newPhoto = {
            materialId: 1,
            photoData: 'xyzbytesandmorebytesnumerodosdotphoto', 
            materialType: 'tree'
        };

        const response = await request(app).post('/photos').send(newPhoto);
        expect(response.statusCode).toBe(200);
    });

    test('GET should return 200, should reflect both photos', async () => {
        const response = await request(app).get('/photos/tree/1');
        expect(response.statusCode).toBe(200);
        expect(response.body[0].associatedMaterial).toBe(1);
        expect(response.body[0].photoId).toBe(1);
        expect(response.body[1].associatedMaterial).toBe(1);
        expect(response.body[1].photoId).toBe(2);
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
        const response = await request(app).get('/photos/tree/1');
        expect(response.statusCode).toBe(200);
        expect(response.body[0].associatedMaterial).toBe(1);
        expect(response.body[0].photoId).toBe(1);
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
        const response = await request(app).get('/photos/tree/1');
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual([]);
    });
});