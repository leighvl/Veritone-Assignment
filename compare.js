/** DevOps Coding Challenge for Veritone
 * 
 *  Inputs: GitHub Organization, Repository Name, Head commit, Base commit
 * 
 *  Output: comparison printout between the two commits
 * 
 *  Use Node and GitHub API must complete by Sunday
 * 
 *  Program flow
 *   1. Retrieve Input from user
 *   2. User axios (Also can use oxtokit) to request from https://api.github.com/${owner}/${reponame}/${branch}/${filepath}
 *   3.
 * 
 *   WIll need to use GitHub  Actions to test changes
 */
 
//Inputs read via dotenv
require('dotenv').config();

//Need to pass in process.env.TOKEN as a Header Authroization

//Axios for call
 var axios = require('axios');


// A Sample Zen call to GitHub
//  axios.get('https://api.github.com/zen', { headers: { 'Authorization': `${process.env.TOKEN}` } })
//    .then(function (response) {
//      console.log(response);
//    })
//    .catch(function (error) {
//      //Handle error
//      console.log(error);
//    })


//Get Branch Repo calls
//https://api.github.com/repos/${owner}/${reponame}/commits

let owner = 'geerlingguy';
let repo = 'ansible-for-devops';

axios.get(`https://api.github.com/repos/${owner}/${repo}/commits`, { headers: { 'Authorization': `${process.env.TOKEN}` } })
   .then(function (response) {
     console.log(response);
   })
   .catch(function (error) {
     //Handle error
     console.log('We could not find any information with the parameters provided' + error);
   })