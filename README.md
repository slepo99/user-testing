# User-Testing App

## Description

User-Testing App is an application that allows users to take professional tests related to their field. The project utilizes Node.js, Vite, and MongoDB as its dependencies.
## tech-stack

#### Node.js:
(To build server side logic and api by Express)
#### Vue.js:
 (Popular frontend framework)
#### MongoDB:
 (Database to resive user data)
#### JWT:
 (Authentication technology)
#### DOCKER:
 (software platform for rapid application development, testing and deployment)
#### Jest :
 (testing library)

## Features

User-Testing App comes with the following features:

- **User Registration:** Users can register for the app with a unique username and password.

- **User Authentication:** Secure user authentication with tokens for login.

- **Test Taking:** Registered users can take professional tests related to their field.

- **Score Tracking:** Users can view their test scores and monitor their progress.

- **Docker Support:** The project supports running in Docker containers for easy deployment.

- **Unit Tests:** The server-side code includes unit tests to ensure API functionality.

User-Testing App provides a seamless experience for users to enhance their professional knowledge and skills.


## Installation

To run the project, please follow these steps:

### Manual Installation

1. Clone the repository:

```bash
git clone git@github.com:slepo99/user-testing.git
```

2. Navigate to the client folder:

```bash
cd user-testing/client
``` 

3. Install client dependencies:

```bash
npm install
```

4. Start the client:
   
```bash
npm run dev
```
5. Go to the server directory:

```bash
cd ../server
```

7. Install server dependencies:

```bash
npm install
```


8. Start the server:
```bash
npm start
```
## Docker Installation
Ensure you have Docker installed on your computer. Follow these steps to run the project in Docker containers:

1. Build the client image:

```bash 
cd user-testing/client
docker build -t client .
```
2. Build the server image:

```bash 
cd ../server
docker build -t server .
```
3. Navigate to the project root directory:

```bash 
cd ..
```
4. Build the main project image:

```bash 
docker build -t user-testing .
```

Now you have deployed the project using Docker containers.

## Usage

To use the User-Testing App, follow these steps:

1. **Registration:**

   - Register as a new user :

     ```json
     {
       "username": "your_username",
       "password": "your_password",
       "roles": "USER",
     }
     ```

   - Upon successful registration, you will receive a message: "User successfully registered."

2. **Login:**

   - Log in as a registered user :

     ```json
     {
       "username": "your_username",
       "password": "your_password"
     }
     ```

   - You will receive a token upon successful login.

3. **Take Tests:**

   - Use your token to authenticate requests to take tests.

4. **View Your Score:**

   - After completing tests, you can view your score.

Now you can use the User-Testing App to register, log in, take tests, and monitor your score.

## Unit Testing

The server-side of this project includes unit tests to ensure the functionality of the API. To run these tests, navigate to the server directory and execute the following command:

```bash 
npm test
```
This will display the results of the unit tests.

### License

This project is licensed under the [Rhmanov Timur License]

