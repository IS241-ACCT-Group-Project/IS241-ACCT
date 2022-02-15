DROP DATABASE IF EXISTS VaxTest2;

CREATE DATABASE VaxTest2;
USE VaxTest2;

CREATE TABLE CLINIC(
    ClinicID int NOT NULL AUTO_INCREMENT, 
    ClinicName varchar(50) NOT NULL, 
    ClinicAddress varchar(255), 
    ClinicZipCode int(5), 
    PRIMARY KEY (ClinicID)
);

INSERT INTO CLINIC(ClinicName, ClinicAddress, ClinicZipCode) VALUES ('The First Clinic', '123 Easy St', '12345');
INSERT INTO CLINIC(ClinicName, ClinicAddress, ClinicZipCode) VALUES ('The Second Clinic', '567 Very Cool Ave', '12345');
INSERT INTO CLINIC(ClinicName, ClinicAddress, ClinicZipCode) VALUES ('Third Clinic', '333 Three Ln', '12345');
INSERT INTO CLINIC(ClinicName, ClinicZipCode) VALUES ('Clinic Number Four', '89012');
INSERT INTO CLINIC(ClinicName, ClinicAddress) VALUES ('Clinic the Fifth', '5555 Five Dr');
INSERT INTO CLINIC(ClinicName, ClinicAddress) VALUES ('Sixth Sense Clinic', '666 Suspisious Way');


CREATE TABLE VACCINATOR (
    VaccinatorID int NOT NULL AUTO_INCREMENT, 
    FirstName varchar(30) NOT NULL, 
    LastName varchar(30) NOT NULL, 
    ClinicID int, 
    PRIMARY KEY (VaccinatorID)
);

INSERT INTO VACCINATOR (FirstName, LastName, ClinicID) VALUES ('Elise', 'Berry', '1');
INSERT INTO VACCINATOR (FirstName, LastName, ClinicID) VALUES ('Marcus', 'Woodley', '2');
INSERT INTO VACCINATOR (FirstName, LastName, ClinicID) VALUES ('Sarah', 'Gates', '2');
INSERT INTO VACCINATOR (FirstName, LastName, ClinicID) VALUES ('Nabeel', 'Deleon', '3');
INSERT INTO VACCINATOR (FirstName, LastName, ClinicID) VALUES ('Oliver', 'Duran', '1');
INSERT INTO VACCINATOR (FirstName, LastName, ClinicID) VALUES ('Kathryn', 'Devine', '3');
INSERT INTO VACCINATOR (FirstName, LastName, ClinicID) VALUES ('Sarah', 'Feeny', '2');
INSERT INTO VACCINATOR (FirstName, LastName, ClinicID) VALUES ('Sarah', 'Higgins', '4');
INSERT INTO VACCINATOR (FirstName, LastName, ClinicID) VALUES ('Roy', 'Duran', '4');
