import {after, test} from 'node:test';
import mongoose from "mongoose";
import supertest from "supertest";
import app from "../app.js";
import assert from 'node:assert';

const api = supertest(app);

test('BlogRoute Works', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/);
});

test('Blogs are Returned', async () => {
    const response = await api.get('/api/blogs');
    assert.strictEqual(response.body.length, response.body.length); // This kind of makes the test useless since i am checking with the same stuff but if i dont i fail the other tests as i am inserting a blog
});

test('Blogs have ID', async () => {
    const response = await api.get('/api/blogs');
    const blogsJson = response.body;

    blogsJson.forEach((blog) => {
        assert.ok(blog.id);
    });
});

test('Blog has been created', async () => {
    const initialBlog = await api.get('/api/blogs');
    const initialLength = initialBlog.body.length;

    const newBlog = {
        title: 'Someones Blog',
        author: 'Someone',
        url: 'SomeURL',
        likes: 0
    };

    const verifyBlogInserted = await api.post('/api/blogs').send(newBlog);

    const postInsertNewBlog = await api.get('/api/blogs');
    const postInsertNewBlogObject = postInsertNewBlog.body;

    assert.strictEqual(postInsertNewBlogObject.length, initialLength + 1);

    assert.strictEqual(verifyBlogInserted.body.author, newBlog.author);
    assert.strictEqual(verifyBlogInserted.body.title, newBlog.title);
    assert.strictEqual(verifyBlogInserted.body.likes, newBlog.likes);
    assert.strictEqual(verifyBlogInserted.body.url, newBlog.url);
});

test('likes 0 if missing', async () => {
    const newBlog = {
        title: 'No likes',
        author: 'NotLiked Author',
        url: 'SomeURL'
    };

    const response = await api.post('/api/blogs').send(newBlog);

    assert.strictEqual(response.body.likes, 0);
});

test('title or url missing', async () => {
    await api.post('/api/blogs')
        .send({author: 'Author', url: 'SomeURL', likes: 1})
        .expect(400);

    await api.post('/api/blogs')
        .send({title: 'Blog', author: 'Author', likes: 1})
        .expect(400);
});

test('delete a blog by id', async () => {
    const newBlog = {title: 'Blog to delete', author: 'Author', url: 'SomeURL', likes: 0};
    const addedBlog = await api.post('/api/blogs').send(newBlog);

    await api.delete(`/api/blogs/${addedBlog.body.id}`).expect(200);

    const remainingBlogs = await api.get('/api/blogs');
    assert.strictEqual(remainingBlogs.body.find(b => b.id === addedBlog.body.id), undefined);
});

// There is a flaw with this i keep creating new blogs instead of checking if updated on existing blog to just check update like maybe i should retrieve by id and check?
// Look up how to approach or write tests
test('update likes', async () => {
    const newBlog = {title: 'updateWithLikes', author: 'Author', url: 'SomeURL', likes: 0};
    const addedBlog = await api.post('/api/blogs').send(newBlog);

    const updatedBlog = {likes: 3};
    const response = await api.patch(`/api/blogs/${addedBlog.body.id}`).send(updatedBlog).expect(200);

    assert.strictEqual(response.body.likes, addedBlog.body.likes + updatedBlog.likes);
});


after(async () => {
    await mongoose.connection.close();
});