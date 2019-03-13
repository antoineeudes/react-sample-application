This software is an application powered by React and Go.

# Prerequisites
Install Docker

# Installation
To create an user allowed to access the database, run the following command :
```
docker-compose up db
```

Run all the containers together :
```
docker-compose up
```
Open a new terminal and create a user by running :
```
curl -X POST \
  http://127.0.0.1:8000/api/user/new \
  -H 'Cache-Control: no-cache' \
  -H 'Content-Type: application/json' \
  -d '{
	"email": "your.email@example.com",
	"password": "yoursecretpassword"
}'
```
Then, kill the container by pressing `Ctrl+C` or by running this command :
```
docker-compose kill
```

# Usage
Run the server with
```
docker-compose up
```
and browse http://localhost:3000/. You will see a form to sign in.

# Uninstall
Run 
```
docker-compose down
```
