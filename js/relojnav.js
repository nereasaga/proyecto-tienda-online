 // Actualizar la fecha y la hora
 function F5time() {
    const fechaElemento = document.getElementById("fecha");
    const horaElemento = document.getElementById("hora");

    // Fecha y la hora actuales en variable
    const ahora = new Date();

    // Formatear la fecha dia, fecha, mes, año
    const opcionesFecha = { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' };
    const fechaFormateada = ahora.toLocaleDateString('es-ES', opcionesFecha);

    // Formatear la hora con segundos (Ej: 12:00:45)
    const horaFormateada = ahora.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    // Actualizar el contenido de los elementos
    fechaElemento.textContent = fechaFormateada.charAt(0).toUpperCase() + fechaFormateada.slice(1);
    horaElemento.textContent = horaFormateada;
    }

    // Llamar a la función al cargar la página
    F5time();

    // Actualizar la hora cada segundo
    setInterval(F5time, 1000);