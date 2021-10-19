#!/usr/bin/env node
/** DevOps Coding Challenge for Veritone
 * 
 *  Inputs: GitHub Organization, Repository Name, Head commit, Base commit
 * 
 *  Output: comparison printout between the two commits
 * 
 *  TODO:
 *    Add yargs for parametets and update code accordingly
 *     defiine usage message
 *    Will also need a check to see if range is too large to even compare
 *    Add Tests through supertest suite

 *   node index.js --owner=<Github owner> --repo=<repo name> --base=<base tag> --head=<head tag> --token=<Github Token>
 */
 
//Inputs read via dotenv for test
require('dotenv').config();
//passed in via command line in prod
const yargs = require('yargs')(process.argv.slice(2));

// const { hideBin } = require('yargs/helpers');
var argv =  yargs.argv



//Need to pass in process.env.TOKEN as a Header Authroization, other variables as well

 var axios = require('axios');
 var ghAPI = 'https://api.github.com';
 let owner = argv.owner || process.env.GITHUB_ORG; //argv.owner
 let repo = argv.repo || process.env.REPO;
 let base_tag = argv.base || process.env.BASE_COMMIT;
 let head_tag = argv.head || process.env.HEAD_COMMIT;
 const token = argv.token || process.env.TOKEN;



 console.log(argv)

 //Do Checks on parameters passed, error if missing owner, repo or token

if (!token) {
  console.error('Missing token, exiting program');
  process.exit(401); 
}

//Check if head_tag && base_tag
if ( (base_tag > head_tag) || (!base_tag) || (!head_tag)) {
  console.error('Error with Tags, existing program');
  process.exit(401); 

}

//Get Repo commit tags
const compareCommits = () => {
        

              console.log(`Found Head: ${head_tag} & Base: ${base_tag}`)

              // Get here to compare the commits (Can optimize with Promise.all)
              //Will also need a check to see if range is too large to even compare

              //https://api.github.com/repos/${owner}/${reponame}/compare/{base}...{head}  where {base} and {head} are branch names/commits, oldest first
                axios.get(`${ghAPI}/repos/${owner}/${repo}/compare/${base_tag}...${head_tag}`, { headers: { 'Authorization': `token ${token}` } })
                .then( function (response) {
                  if (response.status == 200 ) {
                    //Get list of commits messages via response.data.commits[count].commit.message

                    var commitObject = response.data.commits;
                  
                  
                    for ( var i in commitObject) {
                     // Log messages in each commit
                      console.log(` ${i} :- ${response.data.commits[i].commit.message}`)
                    }
                     //Consider using .Diff option  on response.data.diff_url

                    console.log(`More detailed of file changes can be access via ${response.data.diff_url}`)
                  }
                }
                )
            .catch(function (error) {
                  //Handle error
                  console.log('We could not find any information with the parameters provided: \n' + error);
                });
            


      };


module.exports.compare = compareCommits();
