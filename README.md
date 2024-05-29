# WebSecy Task

First clone the repository
```bash
git clone https://github.com/Abhimanyu-dev/WebSecy.git
cd WebSecy
```

## Backend
While in WebSecy directory run the following commands:
```bash
cd backend
npm install
npm run dev
```

## Frontend
While in WebSecy directory run the following commands:
```bash
cd frontend
npm install
npm run dev
```

The frontend is not completely functional though you can use postman to access all the backend routes.

#### Available backend routes:
Primary Route: http://localhost:8080/api/
* /user/ : post request to create a user with email and password
* /user/login : post request to get a user and token
* /user/:user_id : delete request to delete a user

###### To access the following tasks you must pass a jwt token that you received upon login

* /task/ : get request to get all the tasks belonging to a user 
* /task/ : post request to create a new task
* /task/:task_id : put request to update a task
* /task/:task_id : delete request to delete a task

