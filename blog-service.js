const fs = require("fs/promises");


module.exports = class BlogSerice {
    constructor() {
        this.posts = null;
        this.categories = null;
    }
    initialize() {
        return new Promise(async (resolve, reject) => {
            try {
                const posts = await fs.readFile('./data/posts.json', { encoding: 'utf8' });
                const categories = await fs.readFile('./data/categories.json', { encoding: 'utf8' });
                this.posts = JSON.parse(posts);
                this.categories = JSON.parse(categories);
                resolve()
            } catch (err) {
                reject(err);
            }
        });
    }
    async getAllPosts() {
        if (this.posts?.length > 0) {
            return Promise.resolve(this.posts);
        } else {
            return Promise.reject(new Error('no results returned'));
        }
    }
    async getPostsByCategory(category) {
        if (this.posts.filter((e) => e.category == category)?.length > 0) {
            return Promise.resolve(this.posts.filter((e) => e.category == category));
        } else {
            return Promise.reject(new Error('no results returned'));
        }
    }
    async getPostsByMinDate(minDateStr) {
        if (this.posts.filter((e) => new Date(e.postDate) >= new Date(minDateStr))?.length > 0) {
            return Promise.resolve(this.posts.filter((e) => new Date(e.postDate) >= new Date(minDateStr)));
        } else {
            return Promise.reject(new Error('no results returned'));
        }
    }
    async getPostById(id) {
        if (this.posts.find((e) => e.id === parseInt(id))) {
            return Promise.resolve(this.posts.find((e) => e.id === parseInt(id)));
        } else {
            return Promise.reject(new Error('no results returned'));
        }
    }
    async getPublishedPosts() {
        if (this.posts?.length > 0) {
            return Promise.resolve(this.posts.filter((e) => e.published === true));
        } else {
            return Promise.reject(new Error('no results returned'));
        }
    }
    async getCategories() {
        if (this.categories?.length > 0) {
            return Promise.resolve(this.categories);
        } else {
            return Promise.reject(new Error('no results returned'));
        }
    }
    async addPost(postData) {
        if (postData) {
            return Promise.resolve(this.posts.push({
                ...postData, ...{
                    id: this.posts.length + 1,
                    published: postData.published ? true : false,
                    postDate: new Date().toISOString().split('T')[0],
                    category: parseInt(postData.category) || 1
                }
            }))
        } else {
            return Promise.reject(new Error('no results returned'));
        }
    }
}