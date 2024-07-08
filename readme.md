### SpendWise - Personal Finance Management App

SpendWise is a personal finance management application that helps you track your income and expenses, categorize your transactions, and gain insights into your spending habits.

## Features

Track income and expenses
Categorize transactions
Gain insights into spending habits

### Authentication Routes

- **POST /api/auth/signup**

  Create a new user account.

- **POST /api/auth/login**

  Log in a user and create a session.

- **POST /api/auth/logout**

  Log out a user and destroy the session.

### Transaction Routes

- **POST /api/transactions/add**

  Add a new transaction. Requires user verification.

- **GET /api/transactions/view**

  View all transactions for a logged-in user. Requires user verification.

- **DELETE /api/transactions/delete/:id**

  Delete a transaction by ID. Requires user verification.

## Middleware

- **verifyUser**

  Middleware to verify if the user is authenticated before allowing access to certain routes.

More Routes will be added 

## Author

Bora Yaswanth Reddy