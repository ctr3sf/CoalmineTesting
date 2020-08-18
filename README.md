# CoalmineTesting

When running the project, please make sure that you declare the environment variables username and password in the line that you open Cypress in.

For me on a Windows machine in PowerShell, this was done with the following: 

    ./node_modules/.bin/cypress open --env "username=username,password=password"

The testing code to run is login_and_comment.js
