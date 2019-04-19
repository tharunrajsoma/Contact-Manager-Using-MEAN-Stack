# Contact-Manager-Using-MEAN-Stack
Contact list manager web app using  MongoDB, Express.js, AngularJS, and Node.js (MEAN stack)

## Before you begin

Before you begin I recommend you to read about the basic building blocks that assemble a MEAN.JS application.

- MongoDB - Go through [MongoDB Official Website](https://www.mongodb.com/) and proceed to their [Official Manual](https://docs.mongodb.com/manual/), which should help you understand NoSQL and MongoDB better.
- Express - The best way to understand express is through its [Official Website](https://expressjs.com/), which has a [Getting Started guide](http://expressjs.com/en/starter/installing.html), as well as an [ExpressJS guide](http://expressjs.com/en/guide/routing.html) for general express topics
- AngularJS - Angular's [Official Website](https://angular.io/) is a great starting point. You can also use [Thinkster Popular Guide](https://thinkster.io/), and [Egghead Videos](https://egghead.io/).
- Node.js - Start by going through Node.js [Official Website](https://nodejs.org/en/) and this [StackOverflow Thread](https://stackoverflow.com/questions/2353818/how-do-i-get-started-with-node-js), which should get you going with the Node.js platform in no time.

## Installation

### Platform and Tools
- Node.js - [Download & Install Node.js](https://nodejs.org/en/) and the npm package manager. 
- MongoDB - [Download & Install MongoDB](https://www.mongodb.com/download-center), and make sure it's running on the default port (27017). Server download is recommended.

### MongoDB setup
- Create a database directory - Create the data directory where MongoDB stores data. MongoDB’s default data directory path is the absolute path \data\db on the drive from which you start MongoDB.
```
  cd C:\
  md "\data\db"
```

### Get the Code
Either clone this repository or fork it on GitHub and clone your fork.
```
  git clone https://github.com/tharunrajsoma/Contact-Manager-Using-MEAN-Stack.git
  cd contact-list-application
```

### Get the Dependencies
- mongoose - It is a object document mapper for using MongoDB.
- body-parser - It is used for parsing the incoming json data.
- cors - As we will be having our server code running on port 3000 where as our client code running on port 4200. So we need to enable cors inorder to remove any error that may occur.
```
  npm install mongoose cors body-parser --save
```

### Nodemon Installation
- Everytime we make changes to server side code there is a need to restart the server. Instead we can install **nodemon** which will continuously watches for any source code file changes and restarts the server.
```
  npm install -g nodemon
```

### App Server
The application server is a NodeJS application that relies upon some 3rd Party npm packages.

- Install local dependencies (from the project root folder).
```
  cd Contact-Manager-Using-MEAN-Stack
  npm install
```
(This will install the dependencies declared in the package.json file)

### Client Dependencies

Even for client side dependencies go to client folder in the root folder and perform below command.
```
  cd client
  npm install
```
(This will install the dependencies declared in the package.json file)

## Running the App

Open Node.js command prompt in project root directory.
- Start your MongoDB database
```
  "C:\Program Files\MongoDB\Server\4.0\bin\mongod.exe" --dbpath="c:\data\db"
```

- Start Node.js server on port: 3000.
```
  nodemon
```

- Start client on port: 4200.
```
  cd client
  npm start
```
- Open [http:/localhost:4200](http:/localhost:4200) to view your app.

### Contact List App UI

<p align = 'center'>
  <img src = '/images/contact_list_app.png'>
</p>

#### Congratulations you can now run your contact list manager app using MEAN stack.


