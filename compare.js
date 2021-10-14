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
 *   2. User axios (Also can use oxtokit) to request
 *   3.
 * 
 *   WIll need to use GitHub  Actions to test changes
 */
 
//Inputs read via dotenv
require('dotenv').config();

//Axios for call
 var axios = require('axios');


 //Sample Get to GitHub
 axios.get('https://api.github.com/zen')
   .then(function (response) {
     console.log(response.data);
   })
   .catch(function (error) {
     //Handle error
     console.log(error);
   })