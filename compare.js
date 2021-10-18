#!/usr/bin/env node
/** DevOps Coding Challenge for Veritone
 * 
 *  Inputs: GitHub Organization, Repository Name, Head commit, Base commit
 * 
 *  Output: comparison printout between the two commits
 * 
 *  Send link to Karma
 * 
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

const compareCommits = ( ghAPI = 'https://api.github.com' , owner, repo ) => {
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


                   
                    var commitObject = response.data.commits;
                    var commitAuthorObject = response.data.commits;
                    //console.log(commitObject)
                  
                    for ( var i in commitObject) {
                      // if (commitObject.hasOwnProperty(i)) {
                      //     console.log(`Commit.${i} = ${commitObject[i]}\n`)
                      // }
                     // Log messages
                      console.log(response.data.commits[i].commit.message)
                    }
                  
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
            


      };


compareCommits(ghAPI, owner, repo)
