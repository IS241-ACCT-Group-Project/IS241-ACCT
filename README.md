# IS241-ACCT
This is a school project to create a website that tracks dummy vaccination data to report to the CDC.

## [View Website](https://acct-vaxtracker.me/site/index.html)

#### Table of Contents
[Getting Set Up](#getting-set-up)

[Update Log](#update-log)

<br>

## Getting Set Up
### MySQL
This project uses MySQL. You can download it here: https://dev.mysql.com/downloads/ 

If on Windows, click `MySQL Installer for Windows`.
On the next page, if given the choice, select the 'community' option and not 'web community.' It's not necessary to create an account; there should be a skip button at the bottom. 

Select the 'Developer Default' setup type. You may also have to download Python. 
#### Type and Networking
Choose 'Development Computer' and keep the default connectivity settings.
#### Authentication Method
Use strong password encryption for authentication.
#### Accounts and Roles
Make a user in addition to the root user. This will be the user that logs into the database. 
**Please don't have any special characters in your username or password!**

At this point, create a `mysql_login.txt` file with the username and password you created. Put this file in the database folder. This file will be ignored in the git repository and will be used locally to log you in later.

The file should have your username on the first line and your password on the second. It should look like this: 
```txt
myusername
mypassword
```
#### Windows Service
Keep the defaults.
#### Apply the Configuration.
#### MySQL Router Configuration
I don't think you need to set this up.
#### Apply the Configuration.

### Node.js
This project uses Node.js. You can download it here: https://nodejs.org/en/download/ 

We're using the Long Term Support version 16.14.0.
#### Custom Setup
The defaults for this are fine.
#### Tools for Native Modules
Not sure if it's required, but I checked the box to automatically install the necessary tools.

If something fails during the installation, you can open the installer again and select 'repair' from the options.

<br>

To verify everything is installed, both these commands should return a version number: 
```batch
node -v
npm -v
```

Next, navigate to the `site/` folder and install the packages referenced in `package.json`:
```batch
npm install
```
This should create a `node_modules/` folder and put the packages in there. This folder is ignored by the git repository.

### Start MySQL and Create a Local Database
Next, you'll give your MySQL account priveleges to access the database. Replace `YOUR_USERNAME` and `YOUR_PASSWORD` with the username and password you created:
```batch
mysqlsh --sql --host=localhost --user=YOUR_USERNAME --password=YOUR_PASSWORD
```
That should put you in a MySQL prompt. In that prompt, run this. Remember to replace the placeholders with your username and password:
```sql
alter user 'YOUR_USERNAME' identified with mysql_native_password by 'YOUR_PASSWORD';
```

<br>

Now, you should be able to run the batch file. The batch file depends on the `sql_login.txt` file you made earlier, so make sure that it's correct. 
Batch files only work on Windows, so Mac/Linux users will have to create a `.sh` file. 

**In the database folder**, run this command: 
```batch
./create_db.bat
```
You should now have a vaccinator database with dummy data created and able to be modified from HTML. If this worked, you can continue on to [Testing the Database](#testing-the-database)

<br>

If this didn't work, your account may not have the privileges to edit the database. Another way to give your account privileges is to create the database for the first time in MySQL and give your user elevated privileges from there. This will have to be redone if the database name is later changed, so it's not ideal.

Open MySQL Workbench. On the home screen, double click the `Local instance MySQL80` button. On the left side of MySQL Workbench, there is a panel called `Navigator`. On the bottom of this panel there are tabs for `Administration` and `Schemas`. Click the Schemas tab. If there is not a `vaxtest2` database listed, right click in the blank space and select `Create Schema...`. Create a schema called `vaxtest2` with all the default settings. 

Back in the Navigator panel, double click any other schema and then double click `vaxtest2` to reload it. Now, in the `Query` window in the center of MySQL Workbench, write the following command:
```sql
GRANT ALL PRIVILEGES ON vaxtest2.* TO 'YOUR_USERNAME'@'localhost';
```
Lastly, click the lightning bolt icon just below `Query1` to execute the SQL command. The output of this command, found below Query1, should not show any errors. Retry running `create_db.bat`.

### Testing the Database
To make sure everything is working, open `site/index.html` in a web browser. 

- The `Show DB` button will print the database to the browser console. F12 opens the console.
- Clicking the `Submit` text will add an entry to the database with the data in the three textarea elements.


## Update Log
2.15.22: uploade are
	- the log in page
		- a user can log in to and get a succesful log in alert
		- a user can select the registration link, which takes them to the new clinic form
	-  the new clinic page
		-contains a form with CDC required information about facilities and registered providers.