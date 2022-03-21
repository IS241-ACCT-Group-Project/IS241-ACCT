const {
    exec
} = require('child_process');
var fs = require('fs')
var spawnSync = require('child_process').spawnSync;

// const dir = fs.opendirSync('./site/scripts/')
// let dirent
// while ((dirent = dir.readSync()) !== null) {
//     console.log(dirent.name)
//     var file = dirent.name
//     replace(file);
// }
// dir.closeSync()

// function replace(filePath) {
//     fs.readFile("./site/scripts/" + filePath, 'utf8', function (err, data) {
//         if (err) {
//             return console.log(err);
//         }
//         // var result = data.replace("server.acct-vaxtest.me", "localhost:8081");
//         var result = data.replace("localhost:8081", "server.acct-vaxtest.me");

//         fs.writeFile("./site/scripts/" + filePath, result, 'utf8', function (err) {
//             if (err) return console.log(err);
//         });
//     });
// }

function replace(filePath) {
    var str = fs.readFileSync("./site/scripts/" + filePath, 'utf8');

    // var result = str.replace("server.acct-vaxtest.me", "localhost:8081");
    var result = str.replace("localhost:8081", "server.acct-vaxtest.me");

    fs.writeFileSync("./site/scripts/" + filePath, result, 'utf8');
}

function execProcess(command, args) {
    var result = spawnSync(command, args);
    if (result.status != 0) {
        console.log(new TextDecoder().decode(result.stderr));
        console.log(new TextDecoder().decode(result.stdout));
        return false;
    } else {
        var out = command;
        args.forEach(function (item, index, arr) {
            out += " " + JSON.stringify(item);
        });
        console.log(out);
        console.log(new TextDecoder().decode(result.stdout));
        return true;
    }
}

execProcess("git", ["branch", "-D", "deployment"]);
if (!execProcess("git", ["switch", "-c", "deployment"])) {
    return;
}
if (true) {
    const dir = fs.opendirSync('./site/scripts/')
    let dirent
    while ((dirent = dir.readSync()) !== null) {
        // console.log(dirent.name)
        var file = dirent.name
        replace(file);
    }
    dir.closeSync()
}
if (!execProcess("git", ["add", "-A"])) {
    return;
}
if (!execProcess("git", ["commit", "-m", "Deploy Main branch"])) {
    return;
}
if (!execProcess("git", ["push", "-f", "--set-upstream", "origin", "deployment"])) {
    return;
}
if (!execProcess("git", ["switch", "main"])) {
    return;
}
console.log("\nSuccessfully pushed to deployment.");