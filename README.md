# Fast-Food-Fast
A food delivery service application for a restaurant, to enable a restaurant manage customer orders better and deliver fast food items to customers in a 'Split Second'.

# Badges
[![Build Status](https://travis-ci.org/oluwajuwon/Fast-Food-Fast.svg?branch=feature-api-v1)](https://travis-ci.org/oluwajuwon/Fast-Food-Fast)
[![Coverage Status](https://coveralls.io/repos/github/oluwajuwon/Fast-Food-Fast/badge.svg?branch=feature-api-v1)](https://coveralls.io/github/oluwajuwon/Fast-Food-Fast?branch=feature-api-v1)
[![Maintainability](https://api.codeclimate.com/v1/badges/af624e941c61eb48c035/maintainability)](https://codeclimate.com/github/oluwajuwon/Fast-Food-Fast/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/af624e941c61eb48c035/test_coverage)](https://codeclimate.com/github/oluwajuwon/Fast-Food-Fast/test_coverage)

FFF has 2 categories of users - Admin and Customers

# Features
 ## Admin features
   - Add, edit or delete the fast-food items
   - See a list of all fast-food items
   - See a list of orders
   - Accept and decline orders
   - Mark orders as completed
    
 ## Customer features
   - Create an account and log in
   - Ability to order for food
   - Ability to see history of ordered foods

The API endpoint for orders is hosted on Heroku, follow link below:
https://fastfood-fast-app.herokuapp.com/api/v1/orders

## UI Template
To view the UI template designs, follow the link below:
https://oluwajuwon.github.io/Fast-Food-Fast/UI/index.html
 
## Pivotal Tracker 
The project is being managed using pivotal tracker management tool, click the link below to view the stories:
https://www.pivotaltracker.com/n/projects/2193674
    
## Technology
  - Frontend - 
      - HTML
      - CSS
      - javascript
  - Serverside
      - Node Js - is an open source server environment built on Chrome's V8 JavaScript engine
      - Express js -  A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. This is used in this application for routing to endpoints.
  
## How to install
  ```
  //  Clone the app
  git clone https://github.com/oluwajuwon/Fast-Food-Fast.git
    
  //  Switch to directory
  cd Fast-Food-Fast

  //  Install Package dependencies
  npm install

  //  Start the application
  npm run start

  //  View, test and use the API endpoints
  navigate to localhost:3000/api/v1/ 
  
```
## Testing
  To test the API endpoints Run `npm run test`
