const { Client } = require("pg");
require("dotenv").config();

const SQL = `

    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        firstname VARCHAR(255) NOT NULL,
        lastname VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        admin BOOLEAN DEFAULT FALSE,
        membershipstatus BOOLEAN DEFAULT FALSE,
        created TIMESTAMP DEFAULT NOW(),
        lastlogin TIMESTAMP DEFAULT NOW(),
        updated TIMESTAMP DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        title VARCHAR(255) NOT NULL,
        text TEXT NOT NULL,
        created TIMESTAMP DEFAULT NOW(),
        user_id INTEGER NOT NULL
    );

    ALTER TABLE messages 
        ADD CONSTRAINT fk_messages_users
        FOREIGN KEY (user_id)
        REFERENCES users (id);
`; 

async function main() {
    console.log("seeding...");  
    const client = new Client({
        connectionString: process.env.DATABASE_URL
    })
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log("done!");
}

main(); 
