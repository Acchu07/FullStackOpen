import {after, describe, test} from 'node:test';
import mongoose from "mongoose";
import supertest from "supertest";
import app from "../app.js";
import assert from "node:assert";

const api = supertest(app);

describe('Check for Invalid User', () => {
    const user = {
        username: "Somebody",
        name: "name",
        password: "somePassword"
    };
    test('userName defined', async () => {
        const response = await api.post('/api/user')
            .send({name: user.name, password: user.password})
            .expect(400);

        assert.match(response.body.errorMessage, /Username or password missing/);
    });

    test('password defined', async () => {
        const response = await api.post('/api/user')
            .send({name: user.name, username: user.username})
            .expect(400);

        assert.match(response.body.errorMessage, /Username or password missing/);
    });

    test('user present in DB', async () => {
        await api.post('/api/user').send(user);
        const response = await api.post('/api/user')
            .send(user)
            .expect(400);
        assert.match(response.body.errorMessage, /Username already in DB/);
    });


});

after(async () => {
    await mongoose.connection.close();
});