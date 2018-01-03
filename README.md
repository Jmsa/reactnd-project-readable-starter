## Readable Project Installation and Running
* Clone project `git clone https://github.com/Jmsa/reactnd-project-readable-starter`
* Install and run the server and frontend by running `yarn start` in the root.
    * This will install both server and frontend dependencies and start the server and frontend.

## Todos
General improvements and areas for better practice:
* Add transitions and transition groups
* Add validation - ensuring not just any post gets through
* Add more loading states - like when changing category or updating a post/comment
* Limit voting to once per session/user
* Make sure that comments are refreshed after removal
* Look into the all post category selection - seems buggy
* Couple only the top level app to state - make other components stateless
* ~~Move from thunk to redux-saga~~
* ~~Clean up menu - because it uses Navlink + Dropdown the item with the click action doesn't take up all the space - meaning you can make a selection without getting the desired result~~
