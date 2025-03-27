require("dotenv").config();
const mysql = require("mysql2");

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    multipleStatements: true, // Enable multiple statements
});

db.connect(async (err) => {
    if (err) {
        console.error("❌ Database connection error:", err);
        process.exit(1);
    }
    console.log("✅ Connected to MySQL");

    db.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`, (err) => {
        if (err) {
            console.error("❌ Error creating database:", err);
            process.exit(1);
        }
        console.log(`✅ Database '${process.env.DB_NAME}' is ready`);

        // Switch to the database
        const dbWithDatabase = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
            multipleStatements: true, // Enable multiple statements
        });

        dbWithDatabase.connect();

        const createTablesSQL = `
            CREATE TABLE IF NOT EXISTS Districts (
                                                     id INT AUTO_INCREMENT PRIMARY KEY,
                                                     name VARCHAR(100) NOT NULL,
                specialty VARCHAR(255)
                );

            CREATE TABLE IF NOT EXISTS Tributes (
                                                    id INT AUTO_INCREMENT PRIMARY KEY,
                                                    name VARCHAR(100) NOT NULL,
                age INT,
                district_id INT,
                kills INT DEFAULT 0,
                status ENUM('Alive', 'Deceased') DEFAULT 'Alive',
                FOREIGN KEY (district_id) REFERENCES Districts(id) ON DELETE CASCADE
                );

            CREATE TABLE IF NOT EXISTS Games (
                                                 id INT AUTO_INCREMENT PRIMARY KEY,
                                                 year INT NOT NULL,
                                                 winner_id INT,
                                                 FOREIGN KEY (winner_id) REFERENCES Tributes(id) ON DELETE SET NULL
                );

        CREATE TABLE IF NOT EXISTS Gifts (
            id INT AUTO_INCREMENT PRIMARY KEY,
            giftname VARCHAR(100) NOT NULL,
            giftprice INT NOT NULL,
            giftdescription VARCHAR(255) NOT NULL,
            giftrecipient INT,
            FOREIGN KEY (giftrecipient) REFERENCES Tributes(id)
            
        );
        `;

        dbWithDatabase
            .promise()
            .query(createTablesSQL)
            .then(() => {
                console.log("✅ Tables are ready");
                dbWithDatabase.end();
            })
            .catch((err) => {
                console.error("❌ Error creating tables:", err);
                process.exit(1);
            });
    });
});

module.exports = db;