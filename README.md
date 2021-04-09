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
* **Packages**
  > Before running the project, you'll need to have the following packages installed:
  * Install [Node.js](https://nodejs.org/en/)
  * Install and setup [MongoDB](https://www.mongodb.com/)
* **Accounts**
  > You'll also need to create the following accounts to use full services of Squadrone and connect it to your drone:
  * Sign up for a [Twilio](https://www.twilio.com/) account and create a TwiML App under Programmable Voice service. In the next section you can see how to use the credentials of your TwiML App in the project.  
  Squadrone creates and handles VoIP calls through Twilio so you need to have the credentials and replace them in project for voice calls to work.
  * To connect the software to your drone, Sign up in [FlytBase](https://flytbase.com/flytcloud/) and add your drone to FlytCloud.  In the next section you can see how to use the credentials of your drone in FlytBase in the project.  
  Squadrone's web application will then connect to the drone through FlytBase to enable control and collaborative remote services to work while the drone is flying.
# Running the project
**Procedure**: 

**A.** Add your credential values as environment variables to the `.env` file in the root directory. It should look like the following:
```
MONGO_URI=mongodb://127.0.0.1:27017/[REPLACE WITH PREFERRED DATABASE NAME]
TWILIO_SID=[REPLACE WITH YOUR TWILIO ACCOUNT SID]
TWILIO_AUTH_TOKEN=[REPLACE WITH YOUR TWILIO ACCOUNT AUTH TOKEN]
TWILIO_APP_SID=[REPLACE WITH YOUR TwiML APP SID]
CALLER_ID=[REPLACE WITH YOUR TwiML CALLER ID]
```
**B.** Install packages by running the following npm command in the root directory.  
``` 
npm install
```
**C.** Run the server with following command in the root directory. By default the server will listen on port 5000, you can change this by adding your preferred port to PORT environment variable.  
```
node index.js
```
**D.** Set up TwiML App Voice REQUEST URL. To do so you can go to your TwiML App settings and add Squadrone's voice API which is a `POST` request to `/api/voice`.   

You need to have a public URL to your localhost with a secure tunnel enable TwiML to send the request to Squadrone's running server on localhost 5000. To do so, you can use ngrok. Following is a picture of how the related setting should look like in TwiML App setting:

<img width="1311" alt="Screen Shot 2021-04-09 at 1 07 30 PM" src="https://user-images.githubusercontent.com/76855437/114216647-db9f4580-996f-11eb-88c1-82265f715958.png">


# API documentation
