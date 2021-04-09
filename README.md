# Squadrone
Squadrone is an aerial drone-based telepresence platform that supports remote collaboration. Squadrone's software is a web application that provides a user interface with a server that can connect to drones and deliver remote connection and collaborative features to remote users. Squadrone's server has a RESTful API package that can be used for developing future drone-based applications.
# General Structure
> On Client side, Squadrone delivers a web application that is developed using React.js. On Server side, Squadrone has a Node.js server developed with Express. Squdrone's database is developed with MongoDB and Mongoose as ODM.

> This is a general overview of main folders in the project:
```
  .
  ├── models                      # Schemas defined for Mongoose models
  ├── services                    # Service files mainly for passport authentication
  ├── routes                      # Server-side routes
  ├── middlewares
  └──client                       # Contains all client-side codes
      ├── actions                 # Redux actions and API calls
      ├── components              # Main React components of the application
      └── reducers                # Redux reducers 
```
# Prerequisites
# Running the project
# API documentation
