const request = require('supertest');
const {app,server} = require('../index');
const User = require('../Model/User.js');
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('sqlite::memory:', {
    logging: false,
});

let createdId = 0;

beforeAll(async () => {
    await sequelize.sync({ force: true});
});


describe('Get /users', () => {
    test('It should return a list of all users', async () => {
        const response = await request(app).get('/api/users');

        expect(response.status).toBe(200);
        expect(response.body[0].name).toEqual('Dutch');
    });
});

describe('Get Single User', () => {
    test('It should return a single user', async () => {
        const findId = 2;
        
        const response = await request(app).get(`/api/users/${findId}`);

        expect(response.status).toBe(200);
        expect(response.body.name).toEqual("Blaine");
    });
});

describe('Create New User', () => {
    test('It should create a new User', async () => {
        const newUser = {
            name: 'Dennis Jönsson',
            isAdmin: true,
            isBadass: false,
        };

        const response = await request(app).post('/api/users')
            .send(newUser)
            .set('Content-Type', 'application/json');

        expect(response.status).toBe(200);
        expect(response.body.name).toBe(newUser.name);
        expect(response.body.isAdmin).toBe(newUser.isAdmin);
        expect(response.body.isBadass).toBe(newUser.isBadass);

        createdId = response.body.id;
    });
});

describe('Update User', () => {
    test('It should update a user', async () => {
        const updatedUser = {
            name: 'Dennis Tyrebrant',
            isAdmin: true,
            isBadass: true,
        };
        const response = await request(app).put(`/api/users/${createdId}`)
            .send(updatedUser)
            .set('Content-Type', 'application/json');

        expect(response.status).toBe(200);
        expect(response.body.name).toBe(updatedUser.name);
        expect(response.body.isAdmin).toBe(updatedUser.isAdmin);
        expect(response.body.isBadass).toBe(updatedUser.isBadass);
    });
});

describe('Delete user', () => {
    test('It should remove a user', async () => {
        const response = await request(app).delete(`/api/users/${createdId}`);

        expect(response.status).toBe(200);
        expect(response.body.data).toBe(`The user with id of ${createdId} is removed.`)
    });
});



afterAll(async () => {
    await sequelize.close();
    server.close()
});