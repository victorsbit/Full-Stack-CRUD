export const seedString = `USE crud_db;

CREATE TABLE User (
    ID int NOT NULL AUTO_INCREMENT,
    FirstName varchar(255) NOT NULL,
    LastName varchar(255) NOT NULL,
    Email varchar(255) NOT NULL,
    Password varchar(255) NOT NULL,
    PRIMARY KEY (ID)
);`;
