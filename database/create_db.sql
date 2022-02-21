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
