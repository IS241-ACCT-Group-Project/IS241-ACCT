#!/bin/bash
# Do not print commands being executed - this does not work lolol !
#/dev/null

# replace localhost with IP address in browser-side files
HTMLFILES="../site/*.html"
for f in $HTMLFILES
do
    # echo $f
    sed -i "s/localhost/134.209.47.143/" $f
done

SCRIPTFILES="../site/scripts/*.js"
for f in $SCRIPTFILES
do
    sed -i "s/localhost/134.209.47.143/" $f
done

# Read lines of mysql_login.txt into an array that server.js can use
#setlocal enabledelayedexpansion
#COUNT=0
#
#while IFS='' read -r LineFromFile || [[ -n"{LineFromFile}" ]]; do
#
#    ((Counter++))
#    echo "Accessing line $COUNT: ${LineFromFile}"
#    var[$COUNT]=${LineFromFile}
#
#done < "$1"

#for /f "tokens=*" %%x in (mysql_login.txt) do (
#    set /a COUNT+=1
#    set var[!COUNT!]=%%x
#)

# echo %var[1]% %var[2]%

# change IP address back to localhost
function onEnd(){
    for f in $HTMLFILES
    do
        # echo $f
        sed -i "s/134.209.47.143/localhost/" $f
    done

    for f in $SCRIPTFILES
    do
        sed -i "s/134.209.47.143/localhost/" $f
    done

    #echo "pwease mr pwesident! don't kill me! i'll do anything!"
    #echo "Then perish. ( ͠° ͟ʖ ͡°)"
}
# catches the Ctrl+C command
trap onEnd SIGINT

# Create a database using the sql commands in create_db.sql
mysql --host=localhost --user='ACCT-remote' --password='kMJRbSNIKZaZ6bN5RE9z!' < create_db.sql #--sql

# Start server.js with the login credentials. server.js will stay running as long as the terminal is open
node ../site/scripts-server/server.js ACCT-remote kMJRbSNIKZaZ6bN5RE9z!