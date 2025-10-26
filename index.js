const http = require('http');
const os = require('os');

let time = 3000; 
let interval;

const server = http.createServer((req, res) => {

  if (req.url === '/') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end(`


      <label for="numero">Introduce un numero:</label> 
    
      <input type="number" id="numero" name="numero"></input>
      <button type="submit" id="boton">Enviar</button>

      <script>
        const boton = document.getElementById('boton');
        boton.addEventListener('click', () => {
          const numero = document.getElementById('numero').value;
          if(numero < 1) {
            alert('El numero debe ser mayor o igual a 1 segundo');
            return;
          }
          // Enviar el número al servidor
          fetch('/actualizar?time=' + numero)
            .then(res => res.text())
            .then(msg => alert(msg));
        });
      </script>
    `);
  }


  else if (req.url.startsWith('/actualizar')) {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const nuevoTiempo = parseInt(url.searchParams.get('time')) * 1000;

    if (isNaN(nuevoTiempo) || nuevoTiempo < 1000) {

      res.statusCode = 400;

      return res.end('El tiempo debe ser mayor o igual a 1 segundo');
    }

    time = nuevoTiempo;

    clearInterval(interval);

    startInterval();

    res.statusCode = 200;

    res.end('Tiempo actualizado a ' + (time / 1000) + ' segundos');
  }
});

function ejercicio() {
  const cpus = os.cpus();
  let idle = 0;

  let total = 0;

  for (let i = 0; i < cpus.length; i++) {

    const times = cpus[i].times;

    for (let t in times){ total = total+times[t]};

    idle = idle + times.idle;
  }

  const usage = (1 - idle / total) * 100;
  console.log('Uso de CPU: ' + usage + '%');

  const totalMem = os.totalmem();
  const freeMem = os.freemem();
  const usedMem = totalMem - freeMem;
  const usedPercent = (usedMem / totalMem) * 100;

  console.log('Porcentaje de memoria usada: ' + usedPercent + '%');

  console.log('Tiempo de procesamiento: ' + process.uptime() + ' segundos');  

  console.log('Tiempo de actividad del sistema: ' + os.uptime() + ' segundos');
  console.log('------------------------------------');
}

function startInterval() {
  ejercicio();
  
  interval = setInterval(ejercicio, time);
}

server.listen(3000, () => {
  console.log('New connection');
  startInterval();
});