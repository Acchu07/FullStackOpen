function dummy(blogs) {
    return 1;
}

function calculateTotalLikes(blogsArray) {
    if (blogsArray.length === 0) return 0;
    return blogsArray.reduce((totalLikes, blog) => {
        return totalLikes + blog.likes;
    }, 0);
}

function findFavoriteBlog(blogsArray) {
    if (blogsArray.length === 0) return 0;

    return blogsArray.reduce((currentFavoriteBlog, blog) => {
        return currentFavoriteBlog.likes > blog.likes ? currentFavoriteBlog : blog;
    });
}

function mostLikes(blogsArray) {
    if (blogsArray.length === 0) return 0;

    const uniqueAuthors = new Map();
    for (const blog of blogsArray) {
        if (uniqueAuthors.has(blog.author)) {
            const currentAuthor = uniqueAuthors.get(blog.author);
            uniqueAuthors.set(blog.author, {author: blog.author, likes: currentAuthor.likes + blog.likes});
            continue;
        }
        uniqueAuthors.set(blog.author, {author: blog.author, likes: blog.likes});
    }
    
    let mostLikedAuthor = {
        author: 'someName',
        likes: 0
    };
    uniqueAuthors.forEach(author => {
        mostLikedAuthor = mostLikedAuthor.likes < author.likes ? author : mostLikedAuthor;
    });
    return mostLikedAuthor;
}

function mostBlogsAuthor(blogsArray) {
    if (blogsArray.length === 0) return 0;

    const tempAuthorArray = [];
    for (const blog of blogsArray) {
        const indexOfAuthor = tempAuthorArray.findIndex((object) => object.author === blog.author);
        if (indexOfAuthor !== -1) {
            tempAuthorArray[indexOfAuthor].blogs += 1;
            continue;
        }
        tempAuthorArray.push({author: blog.author, blogs: 1});
    }
    tempAuthorArray.sort((a, b) => b.blogs - a.blogs);
    return tempAuthorArray[0];
}

export {dummy, calculateTotalLikes, findFavoriteBlog, mostLikes, mostBlogsAuthor};