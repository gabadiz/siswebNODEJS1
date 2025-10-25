
const http = require('http');
const os = require('os');
const time=3000;
const server = http.createServer((req, res) => {
    
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end(`
        <h1>Hello, World!</h1> 
        <label for="numero">Introduce un numero:</label> 
        <input type="number" id="numero" name="numero"></input>
        <button type="submit">Enviar</button>
    `);


    
});
server.listen(3000, () => {
    

    console.log('New connection')
    function ejercicio() {
        
        //console.log('Uso de CPU: '+JSON.stringify(os.cpus(), null, 1))const cpus = os.cpus();
        const cpus = os.cpus();
        let idle = 0;
        let total = 0;

        for (let i = 0; i < cpus.length; i++) {
            const times = cpus[i].times;
            for (let t in times) {
                total += times[t];
            }
            idle += times.idle;
        }

        const usage = (1 - idle / total) * 100;
        console.log('Uso de CPU: ' + usage + '%');

            

        const totalMem = os.totalmem();
        const freeMem = os.freemem();
        const usedMem = totalMem - freeMem;
        const usedPercent = (usedMem / totalMem) * 100;
        console.log('Porcentaje de memoria usada: ' + usedPercent + '%');

        console.log('Tiempo de procesamiento: ' + process.uptime()+' segundos');

        console.log('Tiempo de actividad del sistema: ' + os.uptime()+' segundos');
        

    }
    ejercicio();
    setInterval(ejercicio, time);
});