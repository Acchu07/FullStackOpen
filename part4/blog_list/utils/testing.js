import {calculateTotalLikes, dummy, findFavoriteBlog, mostBlogsAuthor, mostLikes} from "./list_helper.js";
import {describe, test} from "node:test";
import assert from "node:assert";
import {blogs, emptyBlogList, listWithOneBlog} from "./dummyData.js";

test('dummy', () => {
    const blogs = [];

    const result = dummy(blogs);
    assert.strictEqual(result, 1);
});

describe('total likes', () => {
    test('checkTotalLikes', () => {
        const result = calculateTotalLikes(blogs);
        assert.strictEqual(result, 36);
    });


    test('list is empty', () => {
        const result = calculateTotalLikes(emptyBlogList);

        assert.strictEqual(result, 0);
    });

    test('list has one blog', () => {
        const result = calculateTotalLikes(listWithOneBlog);
        assert.strictEqual(result, 5);
    });
});

describe('favorite blog', () => {
    test('current Favorite blog', () => {
        const result = findFavoriteBlog(blogs);
        assert.deepStrictEqual(result, blogs[2]);
    });

    test('current Favorite blog but empty list', () => {
        const result = findFavoriteBlog(emptyBlogList);
        assert.deepEqual(result, 0);
    });
});

describe('Most Liked Author', () => {
    test('Current Most Liked Author', () => {
        const result = mostLikes(blogs);
        assert.deepStrictEqual(result, {author: "Edsger W. Dijkstra", likes: 17});
    });

});

describe('Most Blogs Author', () => {
    test('Author With Most Blogs', () => {
        const result = mostBlogsAuthor(blogs);
        assert.deepStrictEqual(result, {author: "Robert C. Martin", blogs: 3});

    });
});