require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');

const apiKeyRoutes = require('./src/routes/ApiToken');
const playerRoutes = require('./src/routes/Player');

const bodyParser = require('body-parser');

const db = require('./src/config/database');
const cookieParser = require('cookie-parser');
const initBackup = require('./backup');

const port = process.env.PORT || 3000;

//middleware
// app.set("view engine", "ejs");
// app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser())
app.use(bodyParser.json());
app.use(cors()); // Allow all origins (not recommended for production)

//routes
app.use('/api/user/', apiKeyRoutes);
app.use('/api/event/', playerRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

db.promise().execute(`
  CREATE TABLE IF NOT EXISTS 
    users (
      hashedpassword VARCHAR(50),
      admin BOOLEAN DEFAULT 0,
      
      id VARCHAR(36) NOT NULL,
      name LONGTEXT DEFAULT NULL,
      email VARCHAR(500) DEFAULT NULL,
      location VARCHAR(6) DEFAULT '000000',
      creator BOOLEAN DEFAULT 0,
      
      phone INT,
      address VARCHAR(50) DEFAULT '',

      PRIMARY KEY (id)
    ) ENGINE=INNODB;
`);

db.promise().execute(`
  CREATE TABLE IF NOT EXISTS events (
    eventId VARCHAR(36) NOT NULL,
    paymentId VARCHAR(36),
    createdBy VARCHAR(36),
    createTime bigint(20) DEFAULT 0,

    type LONGTEXT DEFAULT '[]',
    name INT DEFAULT 0,
    description LONGTEXT DEFAULT NULL,
    hasDate BOOLEAN DEFAULT 0,
    startDate bigint(20) DEFAULT 0,
    endDate bigint(20) DEFAULT 0,
    photos LONGTEXT DEFAULT '[]',
    location VARCHAR(6) DEFAULT '000000',

    PRIMARY KEY (id),
    FOREIGN KEY (player) REFERENCES PLAYERS(player)
  ) ENGINE=INNODB;
`);

initBackup();
