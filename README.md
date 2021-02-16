# Code test for NENT Tech Trainee Programme 2021
## How to run
- Run the api and mongodb instance by calling the following command in the root folder. (The api server will occupy port 3000).
  - `docker-compose up --build`
- Run tests by calling the following command in the root folder.
  - `yarn test`
  
- Toolset versions
  - node v15.7.0
  - mongo v4.4.3
  - yarn v1.22.10
  - docker v20.10.2
  - docker-compose version 1.27.4
  - For installed packages check package.json

## Features completed/attemted 
[x] Endpoint that fetches all restaurants. 

[x] Endpoint that fetches a specific restaurant by ID. 

[x] Endpoint that creates a new restaurant and inserts it into the database. 

[x] Endpoint that updates updates the content of a restaurant with a certain ID. 

[x] Endpoint that deletes a specific restaurant by ID. 

[x] Can query to sort the retrieved restaurants by name | price_level | rating. 

[x] Can query to filter the retrieved restaurants by some name. 

[x] Basic error handling. 

[x] Completely dockerized. 

[x] Added sanitize-inputs middleware for mongodb (I took a cyber security course so.....). 

[x] small unittests using Jest.


## Future work and improvements

- `testing backend`
  - Unfortunately, I have no experience in actually testing the backend functionality of an API. I would probably create a mock database to run integration tests on since we don't want to mess with any "real" database. Then test that running requests on different endpoints will actually do what they are supposed to do. Perhaps also test that we send back the appropriate status codes etc.

- `more filters / complex filtering`
  - Because of time constraint (and course work) I didn't add the possibility to filter the fetched restaurant list by some criteria other than the "name" attribute. E.g. `....?price_level[gte]=3` should return a list of restaurants with price level larger and equal to 3 etc.

- `Proper status codes`
  - I'm heavily relying on status code 500 on multiple errors gotten in the backend. Better would be to provide the appropriate status codes for each respective error. I'm however not that familiar with mongodb except for a db design course I took so I need more time to understand the error codes mongodb uses and be able to translate them to some HTTP status code.

- `modular error handler (as middleware)`
  - My error handling is baked in to the controller that handles the db functionality. This works fine, however a much better approach would be to use some kind of generic error handler class and extend new specific error classes on that (eg 404NotFoundError extends GenericError) and in the end have it run as a middleware for the express app. (I might do this if I get time during the week, in a separate branch ofcourse as to not cheat the deadline :) )

## Bugs
My unit tests found some bug in the filter method which I solved. However I think the rest is alright. Ofcourse a thorough testing on the backend is needed to absolutely be sure that the implementation is bug-free. I've tested the endpoints using curl commands in the terminal and Postman to make sure that I get the expected result.

## Talking Design
- I focused heavily on making the code modular (by following separation of concerns methodology) to make extending on the API as easy as possible (except for the error handler as mentioned earlier..). The endpoints are defined in the `routes` folder. The functionality/communication to the database is handled by a specific controller that is defined in the `controllers` folder. Utility/helper functions are defined in separate files in the `utils` folder. Each schema for the database can be found in the `models` folder.
- I try to focus on self-descriptive code instead of having to rely heavily on documentation. It's really "expensive" to change documentation on implementation changes rather than taking the extra mile to write descriptive code. However, ofcouse documentation is provided to functions etc when necessary.
- Followed https://restfulapi.net/resource-naming/ for naming conventions.

## Ending thoughts
I started on the frontend code test but wasn't satisfied with how it ended up being so I jumped on the backend code test. I guess I might have shot myself in the foot by not focusing on only one of them but hey, all experience is good experience I guess!

Now my API design is limited to this one react+nodejs tutorial I took last year (a part of mooc.fi fullstack course) and a simple python flask API that only handles one POST and one GET request. In the later interview I understood that you focus on Nodejs and some own fork of the express library so I wanted to try that out. I think my implementation ended up ok!

## API DOCUMENTATION
### Get list of restaurants
----
  Returns json data containing a list of restaurants.

* **URL**

  /api/restaurants

* **Method:**

  `GET`
  
*  **URL Params**

   **Optional:**
 
   `sortBy=[name]`
   `sortBy=[price_level]`
   `sortBy=[rating]`
   `name=<string>`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{[<restaurants>]}`
 
* **Error Response:**

  * **Code:** 500 <br />
    **Content:** `{ error: "Couldn't fetch all restaurants from database." }`

### Get specific restaurant
----
  Returns json data containing information on the specific restaurant.

* **URL**

  /api/restaurants/:id

* **Method:**

  `GET`
  
*  **URL Params**

  **Required**
  
  `id=[integer]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{<restaurant>}`
 
* **Error Response:**
  
  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Restaurant with <id> was not found!" }`

  OR

  * **Code:** 500 <br />
    **Content:** `{ error }`


### Update specific restaurant
----
  Update the contents of a specific restaurant

* **URL**

  /api/restaurants/:id

* **Method:**

  `PUT`
  
*  **URL Params**
  
  **Required**
  
  `id=[integer]`
  
* **Data Params**
  
  json object containing valid properties of a restaurant to be updated. 

* **Success Response:**

  * **Code:** 202 <br />
 
* **Error Response:**
  
  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Restaurant with <id> was not found!" }`

  OR

  * **Code:** 500 <br />
    **Content:** `{ error }`

### Delete specific restaurant
----
  Deletes the specific restaurant from the database.

* **URL**

  /api/restaurants/:id

* **Method:**

  `DELETE`
  
*  **URL Params**
  
  **Required**
  
  `id=[integer]`

* **Data Params**
  
  None

* **Success Response:**

  * **Code:** 204 <br />
 
* **Error Response:**
  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Restaurant with <id> was not found!" }`

  OR

  * **Code:** 500 <br />
    **Content:** `{ error }`
    
### Create a restaurant
----
  Inserts a new restaurant into the database

* **URL**

  /api/restaurants

* **Method:**

  `POST`
  
*  **URL Params**

   None

* **Data Params**
  
  json object containing contents of the restaurant to be added to the database.
  - required properties
    - id, name, opening_hours, address, phone_number

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `{<the inserted restaurant>}`
 
* **Error Response:**
  
  * **Code:** 500 <br />
    **Content:** `{ error }`

### Examples of API requests 
- fetch all restaurants 
  - `curl http://localhost:3000/api/restaurants`
- fetch specific restaurant 
  - `curl http://localhost:3000/api/restaurants/<restaurantId>` where <restaurantId> is a valid id
- create and insert a new restaurant 
  - `curl -X POST http://localhost:3000/api/restaurants -H "Content-Type: application/json" -d '{"id":100,"name":"VegoHotDogs", "opening_hours":["Wednesday: 8:00 AM 9:00 PM"],"address":"brakmakargatan 14","phone_number":"0709998880"}'` 
- update restaurant content 
  - `curl -X PUT http://localhost:3000/api/restaurants/100 -H "Content-Type: application/json" -d '{"address":"hogwarts"}'`
- delete restaurant 
  - `curl -X DELETE http://localhost:3000/api/restaurants/100`
- fetch all restaurants but sorted by name (ascending) 
  - `curl http://localhost:3000/api/restaurants?sortBy=name` 
- fetch all restaurants whose names include "bar" 
  - `curl http://localhost:3000/api/restaurants?name=bar`
