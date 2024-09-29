# The Odin Project Members Only

This project is part of TOP to learn to practice authentication. See [project details here](https://www.theodinproject.com/lessons/node-path-nodejs-members-only)


### Live Demo
You can access the live version [here](https://top-members-only-purple-glitter-9186.fly.dev/)

To become a secret member you need to know the secret code! Otherwise, you will not be able to see the names of who posted messages, or the time they were posted. 

Non members can still post once they have signed up. 

### Features

- User registration with secure password saving
- Creating messages
- Becoming a member to see more details of other user's posts
- Admin priviledges to delete any messages

### Technologies users
- NodeJS
- Express
- PostgreSQL
- EJS
- Passport.js
- Bcrypt.js
- dotenv

### Getting started

To get a local copy of this project up and running, follow these steps:

1. **Clone the Repository**

   ```bash
   git clone https://github.com/cdevelopment010/TOP-members-only.git
   ```

2. **Navigate to the Project Directory**

   ```bash
   cd TOP-members-only
   ```

3. **Install Dependencies**

   ```bash
   npm install
   ```

4. **Set Up the Database**

   Ensure you have PostgreSQL installed and create a database. Update the database connection details in your environment variables.

5. **Run Database Seed Script**

   Populate the database with initial data:

   ```bash
   node db/populatedb.js
   ```

6. **Start the Application**

   ```bash
   node --watch app.js 
   ```

   The application should now be running at `http://localhost:3000`.

## Environment Variables

Ensure you have the following environment variables set in your `.env` file:

- `DATABASE_URL`: Connection string for PostgreSQL.
- `ADMIN_SECRET`: Secret passcode to become an admin.
- `MEMBER_SECRET`: A secret passcode to become a member.