#!/bin/bash
# Do not print commands being executed - this does not work !
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
PASS=`cat mysql_login.txt`

# echo $PASS

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
mysql --host=localhost --user='ACCT-remote' --password=$PASS < create_db.sql #--sql

# Start server.js with the login credentials. server.js will stay running as long as the terminal is open
node ../site/scripts-server/server.js ACCT-remote $PASS