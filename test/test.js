const request = require('supertest')("https://api.github.com");
const expect = require("chai").expect;
require('dotenv').config();


describe('GET /repos', () => {
    it('responds successfully ', async() => {
      //get repo
          const response = await request
                          .get(`/repos/${process.env.GITHUB_ORG}/${process.env.REPO}/compare/${process.env.BASE_COMMIT}...${process.env.HEAD_COMMIT}`)
                          .set('User-Agent','request');


          //console.log(response)
          expect(response.status).to.eql(200);

      //expect
      

    });
});