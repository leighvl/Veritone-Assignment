/** DevOps Coding Challenge for Veritone
 * 
 *  Inputs: GitHub Organization, Repository Name, Head commit, Base commit
 * 
 *  Output: comparison printout between the two commits
 * 
 *  Use Node and GitHub API must complete by Sunday
 * 
 *  Program flow
 *   1. Retrieve Input from user repositor
 *   2. GET list of tags for repo
 *   3. store latest and oldest commits
 *   4. Run another GET request with commit info
 *   5. Parse JSON
 *   2. User axios (Also can use oxtokit) to request from https://api.github.com/${owner}/${reponame}/${branch}/${filepath}
 *   3.
 * 
 *   WIll need to use GitHub  Actions to test changes
 */
 
//Inputs read via dotenv
require('dotenv').config();

//Need to pass in process.env.TOKEN as a Header Authroization, other variables as well

 var axios = require('axios');
 var ghAPI = 'https://api.github.com';
 let owner = 'geerlingguy';
 let repo = 'ansible-for-devops';




//Get Repo commit tags

axios.get(`${ghAPI}/repos/${owner}/${repo}/tags`, { headers: { 'Authorization': `token ${process.env.TOKEN}` } })
  .then(function (response){
    var tagsObject = response.data;
    //console.log(tagsObject[Object.keys(tagsObject)[Object.keys(tagsObject).length - 1 ]])

    //Get first(base) and last(head) entries in object
    let head_tag = response.data[0].name
    let base_tag = tagsObject[Object.keys(tagsObject)[Object.keys(tagsObject).length - 1 ]].name
    

    console.log(`${head_tag} & ${base_tag}`)

    // Do Second get here to compare the commits (Can optimize with Promise.all)

    //https://api.github.com/repos/${owner}/${reponame}/compare/{base}...{head}  where {base} and {head} are branch names/commits, oldest first
      axios.get(`${ghAPI}/repos/${owner}/${repo}/compare/${base_tag}...${head_tag}`, { headers: { 'Authorization': `token ${process.env.TOKEN}` } })
      .then( function (response) {
        //Would this be the second get | put the compare code here
        if (response.status == 200 ) {
          console.log(response.data)
          //Work with commit   data  here
        }
      }
      )
  })
  .catch(function (error) {
         //Handle error
         console.log('We could not find any information with the parameters provided' + error);
       });
  

// let owner = 'geerlingguy';
// let repo = 'ansible-for-devops';
// let base = 'master'; //oldest branch
// let head = 'basehead'; //latest branch

// axios.get(`https://api.github.com/repos/${owner}/${repo}/compare/${basehead}`, { headers: { 'Authorization': `token ${process.env.TOKEN}` } })
//    .then(function (response) {
//     if (response.status == 200 ) {
//       //Put response.data [Object]
//       var commits = response.base_commit;
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




