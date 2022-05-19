// Required Modules
const http = require('http'),
    url = require('url'),
    fs = require('fs');

// HTTP Module
http.createServer((request, response) => {
    
    // Parsing user-genereated URLs
    let addr = request.url,
        q = url.parse(addr, true),
        filePath = '';
        
    // Create log of requests made to server in log.txt file
    fs.appendFile('log.txt', 'URL: ' + addr + '\nTimestamp: ' + new Date() + '\n\n' , (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Added to log.');
        }
    });

    // File path if/else statement
    if (q.pathname.includes('documentation')) {
        filePath = (__dirname + '/documentation.html');
    } else {
        filePath = 'index.html';
    }

    // File System Module manages the file in/output.
    fs.readFile(filePath, (err, data) => {
        if (err) {
            throw err;
        }
        
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write(data);
    response.end();

    });

}).listen(8080);

console.log('My first Node test server is running on Port 8080.');