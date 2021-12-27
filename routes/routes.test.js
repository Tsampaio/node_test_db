// This file will contains all the application integration tests for the express REST API app
// Let's laod the server object and other modules.
// I need to run and close the server after each test, if not Jest will throw some errors
const router = require('../routes/clusters');
// naming convention for supertest is request
const request = require('supertest');
//const express = require('express');
// I used destructuring syntax to get the Vms property
const Vms = require('../models/vms');
const server = require('../server');
const db = require('./db-test');

//first test suite, which will contain other test suites (GET, POST, DELETE, and PATCH routes)
describe('/routes/clusters', () => {
  // Jest has an utility function called beforeEach() which takes a callback. Jest will call this
  // function before each test inside the test suite. This will start the server.
  //   beforeEach(() => {
  //     server = require('../app1');
  //   });
  //   // This utility will close the server
  //   afterEach(async () => {
  //     server.close();
  //     await Vms.remove({});
  //   });
  beforeAll(async () => await db.connect('test_users'));
  afterEach(async () => await db.clear());
  afterAll(async () => await db.close());

  describe('GET /vms', () => {
    it('should return all vms', async () => {
      // as an argument, I pass the server object and depending on the method,
      // will use either the get or post or delete or patch.
      // This returns a promise, so await is required.
      const virtual = [
        { cluster_name: 'vm1', platform: 'x', total_disk: '100', username: 'user1' },
        { cluster_name: 'vm2', platform: 'z', total_disk: '200', username: 'user2' },
      ];

      const res = await Vms.insertMany(virtual);

      console.log('my res is');
      console.log(res);
      //   const res = await request(server).get('/vms');

      //   expect(res.status).toBe(200);
      expect(res.length).toBe(2);
      // variable c for cluster_name
      expect(res.some((c) => c.cluster_name === 'vm1')).toBeTruthy();
      expect(res.some((c) => c.cluster_name === 'vm2')).toBeTruthy();
    });
  });

  // get endpoint with id parameter
  describe('GET /vms/:id', () => {
    it('should return a vm if a valid id is passed', async () => {
      // can add a single vm in the MongoDB to test the endpoint
      const virtual = new Vms({
        cluster_name: 'vm1',
        platform: 'x',
        total_disk: '10',
        username: 'user1',
        location_name: 'Barcelona',
      });
      // this returns a promise, so need to mark it as await
      await virtual.save();

      // now need to call the endpoint. This returns a promise - so await is required
      const res = await request(server).get('/clusters/vms/' + virtual._id);

      expect(res.status).toBe(200);
      // with Mongoose model, the _id assigned is an ObjectId. However when it is read, it is retrieved as
      // a string. So need to use toHaveProperty expectation with 2 properties (name and its value)
      expect(res.body).toHaveProperty('cluster_name', 'vm1');
    });
  });

  describe('POST /vms', () => {
    // beforeEach(async () => {
    //   const virtual = new Vms({ cluster_name: 'vm1' });
    //   await virtual.save();
    // });
    // This endpoint should return a 201 response.
    it('should return a 201 and a vm id if valid vms details are passed', async () => {
      const res = await request(server).post('/clusters/vms').send({
        cluster_name: 'vm1',
        platform: 'aws',
        total_disk: '1000',
        username: 'John',
        location_name: 'United Kingdom',
      });

      expect(res).not.toBeNull();
      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('_id');
      expect(res.body).toHaveProperty('cluster_name', 'vm1');
    });
  });

  describe('PATCH /vms/:id', () => {
    // beforeEach(async () => {
    //   // Before each test I need to create a vm and save it in the db.
    //   const virtual = new Vms({ cluster_name: 'vm1' });
    //   await virtual.save();

    //   const id = virtual._id;
    //   const updatedVm = 'updatedVm';
    // });
    // This endpoint should return a 201 response.
    it('should update the vms and return a 201 if valid vms id is passed', async () => {
      const mydata = await request(server).post('/clusters/vms').send({
        cluster_name: 'vm1',
        platform: 'aws',
        total_disk: '1000',
        username: 'John',
        location_name: 'United Kingdom',
      });

      const res = await request(server)
        .patch('/clusters/vms/' + mydata.body._id)
        .send({ cluster_name: 'vmx' });

      const updatedVm = await Vms.findById(mydata.body._id);
      expect(updatedVm.cluster_name).toBe('vmx');
    });

    // it('should return the updated vm if it is valid', async () => {
    //   const res = await request(server)
    //     .patch('/vms/:id' + id)
    //     .send({ cluster_name: updatedVm });

    //   expect(res.status).toBe(201);
    //   expect(res.body).toHaveProperty('_id');
    //   expect(res.body).toHaveProperty('cluster_name', updatedVm);
    // });
  });

  //   describe('DELETE /vms/:id', () => {
  //     beforeEach(async () => {
  //       // Before each test I need to create a vm and save it in the db.
  //       const virtual = new Vms({ cluster_name: 'vm1' });
  //       await virtual.save();

  //       const id = virtual._id;
  //     });
  //     // This endpoint should return a 201 response.
  //     it('should return a 200 and delete the vm if input is valid', async () => {
  //       const res = await request(server)
  //         .delete('/vms/' + id)
  //         .send();

  //       const virtualInDb = await Vms.findById(id);

  //       expect(res.status).toBe(200);
  //       expect(virtualInDb).toBeNull();
  //       expect(res.body).toHaveProperty('_id', virtual._id);
  //       expect(res.body).toHaveProperty('cluster_name', virtual.cluster_name);
  //     });
  //   });
});
