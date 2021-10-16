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

 var axios = require('axios');
 var ghAPI = 'https://api.github.com';




//Get Repo commit calls using GitHub API

// //https://api.github.com/repos/${owner}/${repo}/commits
// let owner = 'geerlingguy';
// let repo = 'ansible-for-devops';

// axios.get(`https://api.github.com/repos/${owner}/${repo}/commits`, { headers: { 'Authorization': `token ${process.env.TOKEN}` } })
//    .then(function (response) {
//     if (response.status == 200 ) {
//       //Put response.data [Object]
//       var commits = response.data;
//       console.log(commits)
//       //Traverse object
//       // for (let [key,obj] of Object.entries(commits)) {
        
//       //   for (let [key,value] of Object.entries(obj)) {
//       //      console.log(`${key}: ${value}`)
//       //     }
//       // }
      
//       //Determine the head and base commit respectively

//     } 
//     //Not found
    

//    })
//    .catch(function (error) {
//      //Handle error
//      console.log('We could not find any information with the parameters provided' + error);
//    })


//Get Repo ccompare two Commits
//Need to get base commit and head commit values.


//https://api.github.com/repos/${owner}/${reponame}/compare/{basehead}
let owner = 'geerlingguy';
let repo = 'ansible-for-devops';
let basehead = 'basehead'; // the names of the branch names

axios.get(`https://api.github.com/repos/${owner}/${repo}/compare/${basehead}`, { headers: { 'Authorization': `token ${process.env.TOKEN}` } })
   .then(function (response) {
    if (response.status == 200 ) {
      //Put response.data [Object]
      var commits = response.base_commit;
      console.log(commits)
      //Traverse object
      // for (let [key,obj] of Object.entries(commits)) {
        
      //   for (let [key,value] of Object.entries(obj)) {
      //      console.log(`${key}: ${value}`)
      //     }
      // }
      
      //Determine the head and base commit respectively

    } 
    //Not found
    

   })
   .catch(function (error) {
     //Handle error
     console.log('We could not find any information with the parameters provided' + error);
   })




// var head_commit = axios.get(

// );