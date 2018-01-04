# Udacity React NanoDegree Project - Readable 
 
##Installation and Running
* Clone project `git clone https://github.com/Jmsa/reactnd-project-readable-starter`
* Install and run with `yarn start` in the root.
    * This will install both server and frontend dependencies and start the server and frontend.

##Usage
Because this project was meant as a learning experience there it isn't a ton of use on its own. If however you are interested in a quick local blog or learning more about React & Redux have at it. Some of the features include:
* Listing posts with sorting options
* Listing posts by category
* Adding/editing/removing posts
* Listing comments for posts
* Adding/editing/removing comments
* Expose a vote option for posts to change the ranking - aka voteScore

##Implementation principles
* Avoid using arrays - instead store data sets as objects to avoid needing to loop over them all over the place
* Try to keep async workflows "pure" - sagas
*

## Contributing
Contributions are not currently being accepting to this repo. This repo is closed and solely for the purpose of completing Udacity's React NanoDegree course. 

## License
The repo is licensed under The MIT License (MIT)

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
