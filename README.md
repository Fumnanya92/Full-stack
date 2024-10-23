# Project Setup and Deployment Documentation

## Table of Contents
- [Repository Setup](#repository-setup)
- [Backend Setup](#backend-setup)
  - [Backend `index.js` File](#backend-indexjs-file)
  - [Backend Dockerfile](#backend-dockerfile)
- [Frontend Setup](#frontend-setup)
  - [Creating the React App](#creating-the-react-app)
  - [React Code for Congratulations Component](#react-code-for-congratulations-component)
  - [Frontend Dockerfile](#frontend-dockerfile)
- [Fixing Missing Scripts and Files](#fixing-missing-scripts-and-files)
  - [Correcting the Missing Scripts in `package.json`](#correcting-the-missing-scripts-in-packagejson)
  - [Ensuring the React `index.html` File Exists](#ensuring-the-react-indexhtml-file-exists)
- [GitHub Actions Workflow for CI/CD](#github-actions-workflow-for-cicd)
- [Running the Application](#running-the-application)

---

## Repository Setup

1. **Create a New GitHub Repository**:
   - Create a new repository on GitHub.
   - Clone the new repository to your local machine:

   ```bash
   git clone <your-repo-url>
   ```

2. **Make Directories**:
   - Inside your project directory, create two folders: one for the backend and one for the frontend.

   ```bash
   mkdir backend-api
   mkdir frontend-webapp
   ```

---

## Backend Setup

### 1. Initialize the Backend
- Navigate to the `backend-api` directory and initialize a new Node.js project.

  ```bash
  cd backend-api
  npm init -y
  ```

### 2. Install Dependencies
- Install `express` to build the server:

  ```bash
  npm install express
  ```

- Optionally, install development dependencies like `nodemon` for easier development:

  ```bash
  npm install --save-dev nodemon
  ```

### 3. Backend `index.js` File

- In the `backend-api` directory, create a file called `index.js` with the following content:

```javascript
// Import the express module
const express = require('express');

// Create an instance of express
const app = express();

// Define a port to listen on
const port = 3000;

// Define a route for the root URL
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start the server and listen on the specified port.
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
```

### 4. Backend Dockerfile

- In the `backend-api` directory, create a `Dockerfile` with the following content:

```dockerfile
FROM node:14
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["node", "index.js"]
```

---

## Frontend Setup

### 1. Create React App
- Navigate to the `frontend-webapp` directory and create a React app:

  ```bash
  cd ../frontend-webapp
  npx create-react-app webapp-frontend
  ```

- Install Axios for making HTTP requests:

  ```bash
  cd webapp-frontend
  npm install axios
  ```

### 2. React Code for Congratulations Component

- Modify the `src/App.js` file in the React app to include a congratulatory message:

```jsx
import React from 'react';
import Congratulations from './Congratulations';

function App() {
  return (
    <div>
      <Congratulations />
    </div>
  );
}

export default App;
```

- Create a new file called `src/Congratulations.js` and add the following content:

```jsx
import React from 'react';

function Congratulations() {
  return (
    <div style={styles.container}>
      <h1>Congratulations!</h1>
      <p>You have achieved your goal!</p>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f0f0f0',
    color: '#333',
  }
};

export default Congratulations;
```

### 3. Frontend Dockerfile

- In the `webapp-frontend` directory, create a `Dockerfile`:

```dockerfile
FROM node:14
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
```

---

## Fixing Missing Scripts and Files

### 1. Correcting the Missing Scripts in `package.json`

- During the backend setup, an error occurred when trying to run `npm run build` because there was no `"build"` script defined in the `package.json`.

- Solution: No `"build"` script is needed in the `package.json` for the backend API unless you're using a tool like TypeScript.

#### Final `package.json` for the Backend:

```json
{
  "name": "backend-api",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "dependencies": {
    "express": "^4.21.1"
  },
  "devDependencies": {
    "nodemon": "^3.1.7"
  }
}
```

### 2. Ensuring the React `index.html` File Exists

- The React app might run into issues if the `public/index.html` file is missing.

- Solution: Ensure the file exists with the following content:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>React App</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

---

## GitHub Actions Workflow for CI/CD

- To automate the build and deployment process for both backend and frontend projects, set up the following GitHub Actions workflow.

```yaml
name: Deploy Fullstack App

on:
  push:
    branches:
      - main  

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout code
      uses: actions/checkout@v3

    - name: Set up Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'

    - name: Install backend dependencies
      working-directory: ./backend-api
      run: |
        npm install

    - name: Build and push backend Docker image
      run: |
        docker build ./backend-api --file ./backend-api/Dockerfile --tag backend-api:$(date +'%Y%m%d%H%M')

    - name: Install frontend dependencies
      working-directory: ./frontend-webapp/webapp-frontend
      run: |
        npm install

    - name: Build frontend
      working-directory: ./frontend-webapp/webapp-frontend
      run: |
        npm run build

    - name: Build and push frontend Docker image
      run: |
        docker build ./frontend-webapp/webapp-frontend --file ./frontend-webapp/webapp-frontend/Dockerfile --tag frontend-webapp:$(date +'%Y%m%d%H%M')
```

---

## Running the Application

### 1. Backend
- To run the backend locally, use:

  ```bash
  npm start
  ```

- Optionally, use `nodemon` to automatically restart the server on changes:

  ```bash
  npx nodemon index.js
  ```

### 2. Frontend
- Start the React app:

  ```bash
  npm start
  ```

- Open the app in a browser to see the congratulatory message at `http://localhost:3000`.

---

## Conclusion

This documentation covers the complete setup of a full-stack application with a Node.js backend and React frontend, along with Dockerfile creation, GitHub Actions setup for CI/CD, and resolving file structure and script issues.