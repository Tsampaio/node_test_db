// importing the JS router function, supertest and express
const router = require('../routes/clusters');
// naming convention for supertest is request
const request = require('supertest');
const express = require('express');
const { vmsSchema } = require('../models/vms');
const createServer = require('../app');

//const app = express();

//describe is a test suite!
describe('API routes have the required functions Get, Post, Update and Delete', () => {
    test('the get request route', () => {
        // assert
        expect(typeof router.get).toBe('function');
    });

    test('the post request route', () => {
        // assert
        expect(typeof router.post).toBe('function');
    });

    test('the patch request route', () => {
        // assert
        expect(typeof router.patch).toBe('function');
    });

    test('the delete request route', () => {
        // assert
        expect(typeof router.delete).toBe('function');
    });

});

//testing the schema data types and required properties (true / false)
describe('vmsSchema data types', () => {
    it('should return two types of datatype - string and date', () => {
        const vmsSchemaObject = vmsSchema.obj;
        expect(vmsSchemaObject.cluster_name.type).toBe(String);
        expect(vmsSchemaObject.cluster_name.required).toBe(true);
        expect(vmsSchemaObject.platform.type).toBe(String);
        expect(vmsSchemaObject.platform.required).toBe(true);
        expect(vmsSchemaObject.created.type).toBe(Date);
        expect(vmsSchemaObject.created.required).toBe(true);
        expect(vmsSchemaObject.total_disk.type).toBe(String);
        expect(vmsSchemaObject.total_disk.required).toBe(true);
        expect(vmsSchemaObject.username.type).toBe(String);
        expect(vmsSchemaObject.username.required).toBe(true);
        expect(vmsSchemaObject.location_name.type).toBe(String);
        expect(vmsSchemaObject.location_name.required).toBe(false);
    });
});

//testing jest string matcher for the homepage endpoint
describe('When a Get request is sent to the home page end point, it should return a string', () => {
    it("should return: 'Hello, this is the homepage for the REST API project'", () => {
        const answer = router.get('/', (req, res) => {
            res.send('Hello, this is the home page for the REST API project')
            expect(answer).toContain('homepage');
        });
    });
});

// new test case for the various endpoints:
describe('When a Get request is sent to the homepage end point', () => {
    it('should returns a json file', () => {
        const answer = router.get('/', (req, res) => {
            res.json('Hello, this is the home page for the REST API project')
            expect('Content-Type', /json/);
        });
    });
});

// new test case for the various endpoints & assertions about the http status codes:
describe('Test Handlers', () => {
    it('should return status code of 200 when a GET request is sent for a list of Vms', () => {
        const answer =  router.get('/vms', function(req, res) {
            res.sendStatus(200).json({ cluster_name: 'vm1'}, { cluster_name: 'vm2'});
        });

        request(router)
        .get('/vms')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) throw err;
      });
    });
    it('should return status code of 200 when a GET request is sent for a single Vm id', () => {
        router.get('/vms/:id', function(req, res) {
            res.sendStatus(200).json({ cluster_name: 'vm1'});
        });

        request(router)
        .get('/vms/:id')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
            if (err) throw err;
        });
    });
});

describe('When an id is missing in the get method single vm by id', () => {
    it('should respond with a status code of 400', () => {
        router.get('/vms/:id', function(req, res) {
            res.sendStatus(400).json({});
        });
        request(router)
        .get('/vms/:id')
        .expect(400)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
            if (err) throw err;
        });
    });
});