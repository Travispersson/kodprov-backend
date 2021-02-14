# Code test for NENT Tech Trainee Programme 2021
## Instructions

### API
### Examples of API requests 
- fetch all restaurants `curl http://localhost:3000/api/restaurants`
- fetch specific restaurant `curl http://localhost:3000/api/restaurants/<restaurantId>` where <restaurantId> is a valid id
- create and insert a new restaurant `curl -X POST http://localhost:3000/api/restaurants -H "Content-Type: application/json" -d '{"id":100,"name":"VegoHotDogs", "opening_hours":["Wednesday: 8:00 AM – 9:00 PM"],"address":"brakmakargatan 14","phone_number":"0709998880"}'` 
- update restaurant content `curl -X PUT http://localhost:3000/api/restaurants/100 -H "Content-Type: application/json" -d '{"address":"hogwarts"}'`
- delete restaurant `curl -X DELETE http://localhost:3000/api/restaurants/100`
- fetch all restaurants but sorted by name (ascending) `curl http://localhost:3000/api/restaurants?sortBy=name` 
- fetch all restaurants whose names include "bar" `curl http://localhost:3000/api/restaurants?name=bar`

## Features completed/attemted 
[x] Endpoint that fetches all restaurants
[x] Endpoint that fetches a specific restaurant by ID
[x] Endpoint that creates a new restaurant and inserts it into the database
[x] Endpoint that updates updates the content of a restaurant with a certain ID
[x] Endpoint that deletes a specific restaurant by ID
[x] Can query to sort the retrieved restaurants by name | price_level | rating
[x] Can query to filter the retrieved restaurants by some name
[x] Basic error handling
[x] Completely dockerized
[x] Added sanitize-inputs middleware for mongodb (I took a cyber security course so this is important to me, atleast for SQL...)

## Future work, improvements and bugs
- TODO Filter by price_level and ratings (I did it for the frontend code test so should be relative easy..)
- TODO Testing (maybe add a "test"-db to operate on in some kind of test-environment?)
- TODO Proper status codes given the type of error. Do not rely heavily on answering with 500 (proper statuscodes === BETTER!)
- TODO Validation that data sent from client in POST/PUT requests only contained data that is 

## Ending thoughts
