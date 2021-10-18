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
//Need alternative header if TOKEN is not set

axios.get(`${ghAPI}/repos/${owner}/${repo}/tags`, { headers: { 'Authorization': `token ${process.env.TOKEN}` } })
  .then(function (response){
    var tagsObject = response.data;
    //console.log(tagsObject[Object.keys(tagsObject)[Object.keys(tagsObject).length - 1 ]])

    //Get first(base) and last(head) entries in object
    let head_tag = response.data[0].name
    let base_tag = tagsObject[Object.keys(tagsObject)[Object.keys(tagsObject).length - 1 ]].name
    

    console.log(`Found Head: ${head_tag} & Base: ${base_tag}`)

    // Do Second get here to compare the commits (Can optimize with Promise.all)
    //Will also need a check to see if range is too large to even compare

    //https://api.github.com/repos/${owner}/${reponame}/compare/{base}...{head}  where {base} and {head} are branch names/commits, oldest first
      axios.get(`${ghAPI}/repos/${owner}/${repo}/compare/${base_tag}...${head_tag}`, { headers: { 'Authorization': `token ${process.env.TOKEN}` } })
      .then( function (response) {
        //Would this be the second get | put the compare code here
        if (response.status == 200 ) {
          //Get list of commits messages via response.data.commits[0].commit.message


          console.log(response.data)
          var commitObject = response.data.commits;
          
         
          // for ( var i in commitObject) {
          //   // if (commitObject.hasOwnProperty(i)) {
          //   //     console.log(`Commit.${i} = ${commitObject[i]}\n`)
          //   // }
          //  // Log messages
          //   console.log(response.data.commits[i].commit.message)
          // }
        
          console.log(`More detailed of file changes can be access via ${response.data.diff_url}`)
        }
      }
      )


    //Consider using .Diff option  on response.data.diff_url

  })
  .catch(function (error) {
         //Handle error
         console.log('We could not find any information with the parameters provided: \n' + error);
       });
  






