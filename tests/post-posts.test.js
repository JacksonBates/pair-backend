const request = require('supertest');
const expect = require('expect');
// const {ObjectID} = require('mongodb');

const app = require('./../server');
const Post = require('./../models/post.model');
const {posts, populatePosts} = require('./seed/seed');



describe('POST /posts', () => {

  beforeEach(populatePosts);

  it('should create a new post', (done) => {
    const newPost = {
      username: 'Gauja',
      availableTime: '1:00',
    }

    request(app)
      .post('/api/v1/posts')
      .send(newPost)
      .expect(201)
      .expect(res => {
        // Check returned data
        expect(res.body).toBeA('object');
        expect(res.body.status).toBe(201);
        expect(res.body.data).toExist();
        expect(res.body.data.username).toBe(newPost.username);
        expect(res.body.data.endTime - res.body.data.postTime).toBe(3600000);

        // Check if default data created
        expect(res.body.data.setup).toExist();
        expect(res.body.data.setup).toBeA('array');
        expect(res.body.data.setup.length).toBe(0);
        expect(res.body.data.interests).toExist();
        expect(res.body.data.interests).toBeA('string');
        expect(res.body.data.interests.length).toBe(0);
      })
      .end((err, res) => {
        if (err) return done(err);
        // Check db
        Post.find().then(res => {
          expect(res.length).toBe(4);
        }).catch(e => done(e));

        Post.find({username: newPost.username}).then(res => {
          expect(res[0].username).toBe(newPost.username);
          done();
        }).catch(e => done(e));
      });
  });

  it('should respond with 400 if availableTime missing', (done) => {
    const newPost = {
      username: 'Venta'
    }

    request(app)
      .post('/api/v1/posts')
      .send(newPost)
      .expect(400)
      .expect(res => {
        // Check response
        expect(res.body.status).toExist();
        expect(res.body.status).toBe(400);
        expect(res.body.error).toExist();
        expect(res.body.error).toBeA('string');
        expect(res.body.data).toNotExist();
      })
      .end((err, res) => {
        if (err) return done(err);
        // Check db
        Post.find().then(res => {
          expect(res.length).toBe(3);
        }).catch(e => done(e));
        Post.find({username: newPost.username}).then(res => {
          expect(res.length).toBe(0);
          done();
        }).catch(e => done(e));
      });
  });

  it('should respond with 400 if username missing', (done) => {
    // TODO
    throw new Error;
    done();
  });

  it('should respond with 400 if setup is not an array', (done) => {
    // TODO
    throw new Error;
    done();
  });

  it('should respond with 400 if interests is not a string', (done) => {
    // TODO
    throw new Error;
    done();
  })
});
