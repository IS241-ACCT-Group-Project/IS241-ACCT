:: Do not print commands being executed
@echo off

:: Read lines of mysql_login.txt into an array that server.js can use
setlocal enabledelayedexpansion
set count=0

for /f "tokens=*" %%x in (mysql_login.txt) do (
    set /a count+=1
    set var[!count!]=%%x
)

:: echo %var[1]% %var[2]%

:: Create a database using the sql commands in create_db.sql
mysqlsh --sql --host=localhost --user=%var[1]% --password=%var[2]% --file create_db.sql

:: Start server.js with the login credentials. server.js will stay running as long as the terminal is open
node ../site/scripts-server/start-http-local.js %var[1]% %var[2]%