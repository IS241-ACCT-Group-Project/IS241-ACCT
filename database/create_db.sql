DROP DATABASE IF EXISTS VaxTest2;

CREATE DATABASE VaxTest2;
USE VaxTest2;

CREATE TABLE SITE(
    SiteID int NOT NULL AUTO_INCREMENT, 
    SiteName varchar(50) NOT NULL, 
    SiteAddress varchar(255), 
    SiteZipCode varchar(5), 
    SitePhoneNumber char(10), /* does not account for extenstions */
    PRIMARY KEY (SiteID)
);

INSERT INTO SITE(SiteName, SiteAddress, SiteZipCode, SitePhoneNumber) VALUES ('The First Site', '123 Easy St', '12345', '6365551234');
INSERT INTO SITE(SiteName, SiteAddress, SiteZipCode, SitePhoneNumber) VALUES ('The Second Site', '567 Very Cool Ave', '12345', '3141592653');
INSERT INTO SITE(SiteName, SiteAddress, SiteZipCode) VALUES ('Third Site', '333 Three Ln', '12345');
INSERT INTO SITE(SiteName, SiteZipCode) VALUES ('Site Number Four', '89012');
INSERT INTO SITE(SiteName, SiteAddress, SitePhoneNumber) VALUES ('Site the Fifth', '5555 Five Dr', '3145555555');
INSERT INTO SITE(SiteName, SiteAddress) VALUES ('Sixth Sense Site', '666 Suspisious Way');


CREATE TABLE INJECTOR (
    InjectorID int NOT NULL AUTO_INCREMENT, 
    FirstName varchar(30) NOT NULL, 
    LastName varchar(30) NOT NULL, 
    SiteID int, 
    PRIMARY KEY (InjectorID)
);

INSERT INTO INJECTOR (FirstName, LastName, SiteID) VALUES ('Elise', 'Berry', '1');
INSERT INTO INJECTOR (FirstName, LastName, SiteID) VALUES ('Marcus', 'Woodley', '2');
INSERT INTO INJECTOR (FirstName, LastName, SiteID) VALUES ('Sarah', 'Gates', '2');
INSERT INTO INJECTOR (FirstName, LastName, SiteID) VALUES ('Nabeel', 'Deleon', '3');
INSERT INTO INJECTOR (FirstName, LastName, SiteID) VALUES ('Oliver', 'Duran', '1');
INSERT INTO INJECTOR (FirstName, LastName, SiteID) VALUES ('Kathryn', 'Devine', '3');
INSERT INTO INJECTOR (FirstName, LastName, SiteID) VALUES ('Sarah', 'Feeny', '2');
INSERT INTO INJECTOR (FirstName, LastName, SiteID) VALUES ('Sarah', 'Higgins', '4');
INSERT INTO INJECTOR (FirstName, LastName, SiteID) VALUES ('Roy', 'Duran', '4');
INSERT INTO INJECTOR (FirstName, LastName) VALUES ('Emily', 'Brooks');
INSERT INTO INJECTOR (FirstName, LastName) VALUES ('Leonardo', 'Berry');


CREATE TABLE PATIENT_INFO(
    PatientID int NOT NULL AUTO_INCREMENT, 
    FirstName varchar(30) NOT NULL, 
    LastName varchar(30) NOT NULL, 
    PatientAddress varchar(60), 
    ZipCode varchar(5), 
    PRIMARY KEY (PatientID)
);

/* 
Add dummy values using a name generator. 
Have at least 10 entries. 
Make sure to add duplicates of first/last names, addresses, and zip codes for more thorough testing. 
Make sure to have fields in some entries blank as allowed by the database. 

This data cannot have errors! Inserting data this way bypasses all error checking!
*/

INSERT INTO PATIENT_INFO (FirstName, LastName, PatientAddress, ZipCode) VALUES ('Gonzalez', 'Jose', '1234 Main St, Webster Groves, MO', '63119');
INSERT INTO PATIENT_INFO (FirstName, LastName, PatientAddress, ZipCode) VALUES ('Gonzalez', 'Maria', '1234 Main St, Webster Groves, MO', '63119');
INSERT INTO PATIENT_INFO (FirstName, LastName, PatientAddress, ZipCode) VALUES ('Gonzalez', 'Naomi', '1234 Main St, Webster Groves, MO', '63119');
INSERT INTO PATIENT_INFO (FirstName, LastName, PatientAddress, ZipCode) VALUES ('Gonzalez', 'Guillermo', '1234 Main St, Webster Groves, MO', '63119');
-- INSERT INTO PATIENT_INFO (FirstName, LastName, PatientAddress, ZipCode) VALUES ('Gonzalez', 'Fernando Valentin Romero Moctezuma', '1234 Main St, Webster Groves, MO', '63119');
INSERT INTO PATIENT_INFO (FirstName, LastName, PatientAddress, ZipCode) VALUES ('Rodriguez', 'Jose', ' ', '63119');
INSERT INTO PATIENT_INFO (FirstName, LastName, PatientAddress, ZipCode) VALUES ('Rodriguez', 'Federico', '1234 Main St, Webster Groves, MO', ' ');
INSERT INTO PATIENT_INFO (FirstName, LastName, PatientAddress, ZipCode) VALUES ('Rodriguez', 'Jose', '1234 Main St, Webster Groves, MO', 'abcde');
INSERT INTO PATIENT_INFO (FirstName, LastName, PatientAddress, ZipCode) VALUES ('Rodriguez', 'Jose', '1234 Main St, Webster Groves, MO', '63119');
INSERT INTO PATIENT_INFO (FirstName, LastName, PatientAddress, ZipCode) VALUES ('Rodriguez', 'Jose', '1234 Main St, Webster Groves, MO', '63119');


CREATE TABLE PATIENT_VACCINATION(
    PatientID int NOT NULL, 
    VaccinationDate date NOT NULL, /* In the format of YYYY-MM-DD */
    InjectorID int NOT NULL, 
    VaccinationType varchar(30), /* For now, choose from either "Pfizer-BioNTech", "Moderna", or "Johnson & Johnson's Janssen" */
    LotNumber varchar(20), /* For now, let's say lot numbers are strings of 5 digits e.g. 00001, 12345, 19293 */
    PRIMARY KEY (PatientID, VaccinationDate)
);

/* 
Add dummy values. 
Make sure to have at least 10 entries. 
Make sure all PatientIDs are 0-9 and all InjectorIDs are 0-10 so we know the ID exists. 
Keep all date values between Nov 1, 2021 and yesterday (no future vaccinations).
Make sure to add multiple vaccinations for some but not all patients. 
Make sure to have fields in some entries blank as allowed by the database. 

This data cannot have errors! Inserting data this way bypasses all error checking!
*/


CREATE TABLE ACCOUNT(
    AccountID int NOT NULL AUTO_INCREMENT, 
    AssociatedType varchar(10) NOT NULL, /* choose from "site", "injector", "CDC" */
    AssociatedID int, 
    AccountUsername varchar(30) NOT NULL, 
    AccountPassword varchar(100) NOT NULL, /* HOW LONG SHOULD THIS BE */
    PRIMARY KEY (AccountID)
);

INSERT INTO ACCOUNT (AssociatedType, AssociatedID, AccountUsername, AccountPassword) VALUES ("injector", 1, "injector1", "$2b$10$T612RUY3E42znQdt26RYGukTVF6EFv4ith008QnWQbt6ZikRTusfG"); --PW: password