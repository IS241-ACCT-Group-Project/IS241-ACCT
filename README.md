# IS241-ACCT
IS241 ACCT group project
write to README test: wbh
this is xiomara

This is a school project to create a website that tracks dummy vaccination data to report to the CDC.

## Getting Set Up
### MySQL
This project uses MySQL. You can download it here: https://dev.mysql.com/downloads/ 
If given the choice, select the 'community' option and not 'web community.' It's not necessary to create an account; there should be a skip button at the bottom. 
Select the 'Developer Default' setup type. You may also have to download Python. 
#### Type and Networking
Choose 'Development Computer' and keep the default connectivity settings.
#### Authentication Method
Use strong password encryption for authentication.
#### Accounts and Roles
I made a user in addition to the root user, but I don't think it's required.

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
$ node -v
$ npm -v
```

Next, navigate to the `site/` folder and install the packages referenced in `package.json`:
```batch
$ npm install
```
This should create a `node_modules/` folder and put the packages in there. This folder is ignored by the git repository.

### Start MySQL and Create a Local Database
Next, you'll give your MySQL account priveleges to access the database. Replace `YOUR_USERNAME` and `YOUR_PASSWORD` with the username and password you created:
```batch
$ mysqlsh --sql --host=localhost --user=YOUR_USERNAME --password=YOUR_PASSWORD
```
That should put you in a MySQL prompt. In that prompt, run this. Remember to replace the placeholders with your username and password:
```sql
alter user 'YOUR_USERNAME' identified with mysql_native_password by 'YOUR_PASSWORD';
```

<br>

Now, you should be able to run the batch file. The batch file depends on the `sql_login.txt` file you made earlier, so make sure that it's correct. 
Batch files only work on Windows, so Mac/Linux users will have to create a `.sh` file. 
In the database folder, run this command: 
```batch
$ ./create_db.bat
```
You should now have a vaccinator database with dummy data created and able to be modified from HTML. 

### Testing the Database
To make sure everything is working, open `site/index.html` in a web browser. 

- The `Show DB` button will print the database to the browser console. F12 opens the console.
- Clicking the `Submit` text will add an entry to the database with the data in the three textarea elements.