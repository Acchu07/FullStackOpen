import express from "express";
import Blog from "../models/blog.js";
import user from "../models/users.js";
import {getUserFromToken} from "../utils/Extractor.js";


const blogRouter = express.Router();

blogRouter.get('/', async (request, response) => {
    const allBlogs = await Blog.find({}).populate("user", {username: 1, _id: 1});
    response.status(200).json(allBlogs);
});
//
blogRouter.post('/', getUserFromToken, async (request, response) => {
    if (!request.body.title || !request.body.url) {
        return response.status(400).json({message: 'Title or URL is missing'});
    }

    const tempAuthor = await user.findById({_id: request.id}, {_id: 1, blogs: 1});
    const blog = new Blog({
        title: request.body.title,
        author: request.body.author,
        url: request.body.url,
        likes: request.body.likes,
        user: tempAuthor._id,
    });
    const _id = blog.id;
    tempAuthor.blogs = tempAuthor.blogs.concat(_id);
    const blogCreated = await blog.save();
    await tempAuthor.save();
    response.status(200).json(blogCreated);
});

blogRouter.delete('/:id', getUserFromToken, async (request, response) => {
    const blog = await Blog.findById(request.params.id);

    if (blog.user.toString() !== request.id.toString()) {
        return response.status(401).json({error: 'not authorized to delete this blog'});
    }
    await user.findByIdAndUpdate({_id: request.id}, {$pull: {blogs: request.params.id}});
    const deletedDoc = await Blog.findByIdAndDelete(request.params.id);
    response.status(200).json(deletedDoc);
});

blogRouter.patch('/:id', async (request, response) => {
    const updateBlog = await Blog.findById(request.params.id);
    if (!updateBlog) {
        return response.status(404).end();
    }

    updateBlog.likes += request.body.likes;

    const updatedBlog = await updateBlog.save();
    response.json(updatedBlog);
});


export default blogRouter;