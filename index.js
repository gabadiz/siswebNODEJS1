const { set } = require('express/lib/application');
const http = require('http');
const os = require('os');

const server = http.createServer((req, res) => {
    
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<h1>Hello, World!</h1>');

    
});
server.listen(3000, () => {
    function ejercicio() {
        console.log('New connection')
    
        //console.log('Uso de CPU: '+JSON.stringify(os.cpus(), null, 1))

        const totalMem = os.totalmem();
        const memory = process.memoryUsage();
        const memoryUsage = (memory.rss / totalMem) * 100;
        console.log('Porcentaje de memoria usada: ' + memoryUsage + '%');

        console.log('Tiempo de procesamiento: ' + process.uptime())

        console.log('Tiempo de actividad del sistema: ' + os.uptime())
    }
    ejercicio();
    setInterval(ejercicio, 3000);
});