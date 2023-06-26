const url = 'https://modulofinalff.onrender.com/listarEventos.html'
const listarEvento = async () => {
    let body = document.getElementById('contenido');
    if (body) {
        let mensaje = '';

        fetch(url)
            .then(res => res.json())
            .then(data => {
                const eventos = data.evento;
                eventos.map((evento) => {
                    const fecha_test = new Date(evento.fecha_ejecucion)
                    console.log(evento);
                    const fecha = new Date(evento.fecha).toLocaleDateString();

                    mensaje += `<tr><td>${evento.nombre_cliente}</td>` +
                        `<td>${evento.categoria}</td>` +
                        `<td>${fecha_test.getFullYear()}-${addZero(fecha_test.getMonth())}-${addZero(fecha_test.getDay())}</td>` +
                        `<td>${evento.direccion}</td>` +
                        `<td>${evento.precio}</td>` +
                        `<td>${evento.pagado}</td>` +
                        `<td>${evento.por_cobrar}</td>` +
                        `<td>
                    <a class="waves-effect waves-light btn modal-trigger" href="#modal1" onclick='editar(${JSON.stringify(evento)})'>Editar</a>
                    <a class="waves-effect waves-light btn modal-trigger red" href="#" onclick='eliminar("${evento._id}")'>Eliminar</a>
                 </td></tr>`;
                    body.innerHTML = mensaje;
                });

            })
    }
};
listarEvento();
function addZero(number){
    return number < 10 ? '0' + number : number
}

const registrarEvento = async() =>{
    //Captura de valores de datos enviados desde el formulario
    const nombre_cliente = document.getElementById('nombre_cliente').value
    const categoria = document.getElementById('categoria').value
    const fecha_ejecucion = document.getElementById('fecha_ejecucion').value
    const direccion = document.getElementById('direccion').value
    const precio = document.getElementById('precio').value
    const pagado = document.getElementById('pagado').value
    const por_cobrar = document.getElementById('por_cobrar').value


    let evento = {
        nombre_cliente: nombre_cliente,
        categoria: categoria,
        fecha_ejecucion: fecha_ejecucion,
        direccion: direccion,
        precio: precio,
        pagado: pagado,
        por_cobrar: por_cobrar
    }
    const expNombres = /^[a-zA-ZÀ-ÖØ-öø-ÿ\s'-]+$/;
    const expCategorias = /^[a-zA-ZÀ-ÖØ-öø-ÿ\s'-]+$/;
    const expDireccion = /^[a-zA-Z0-9\s\.,#-]+$/;
    const expPrecio = /^[0-9]+$/;
    const expPagado = /^[0-9]+$/;
    const expPorCobrar = /^[0-9]+$/;

    if (nombre_cliente === '' || categoria === '' || fecha_ejecucion === '' || direccion === '' || precio === ''|| pagado === ''|| por_cobrar === '') {
        alert( 'Todos los campos son obligatorios')
        return
    }

    if (!expNombres.test(nombre_cliente)) {
        alert( 'Nombre incorrecto. ¡Solo se permiten letras!')
        return
    }

    if (!expCategorias.test(categoria)) {
        alert( 'categoria incorrecta. ¡Solo se permiten letras!')
        return
    }

    if (!expDireccion.test(direccion)) {
        alert( 'dirección incorrecta.')
        return
    }
    if(new Date(fecha_ejecucion) < new Date()){
        alert( 'fecha incorrecta ')
        return
    }

    if (!expPrecio.test(precio)) {
        alert( 'precio incorrecto. ¡Solo se permiten numeros!')
        return
    } 

    if (!expPagado.test(pagado)) {
        alert( 'pagado incorrecto. ¡Solo se permiten numeros!')
        return
    }
    if (pagado > precio) {
        alert( 'no puede pagar mas de lo que costo el precio')
        return
    }
    if (por_cobrar > precio) {
        alert( 'no puede cobrar mas de lo que costo el precio')
        return
    }

    if (!expPorCobrar.test(por_cobrar) || por_cobrar > precio) {
        alert( 'por cobrar incorrecto. ¡Solo se permiten numeros!')
return
    }
    
        fetch(url, {
            method: 'POST',
            mode: 'cors',
            body:JSON.stringify(evento),
            headers: {"Content-type": "application/json; charset=UTF-8"}     
        })
        .then(response => response.json()) //La respuesta del método POST de la API
        .then(json => {
            console.log(json)
           alert(json.mensaje.message)
           window.location.href = "listarEventos.html";
        })
    }


const editar = (evento) => {
    let _id = document.getElementById('_id').value = '';
    let nombre_cliente = document.getElementById('nombre_cliente').value = '';
    let categoria = document.getElementById('categoria').value = '';
    let fecha_ejecucion = document.getElementById('fecha_ejecucion').value = '';
    let direccion= document.getElementById('direccion').value = '';
    let precio = document.getElementById('precio').value = '';
    let pagado = document.getElementById('pagado').value = '';
    let por_cobrar = document.getElementById('por_cobrar').value = '';

    document.getElementById('_id').value = evento._id;
    document.getElementById('nombre_cliente').value = evento.nombre_cliente;
    document.getElementById('categoria').value = evento.categoria;
    document.getElementById('fecha_ejecucion').value = evento.fecha_ejecucion;
    document.getElementById('direccion').value = evento.direccion;
    document.getElementById('precio').value = evento.precio;
    document.getElementById('pagado').value = evento.pagado;
    document.getElementById('por_cobrar').value = evento.por_cobrar;

    
}
const actualizarEvento = async () => {
    let nombre_cliente = document.getElementById('nombre_cliente').value;
    let categoria = document.getElementById('categoria').value;
    let fecha_ejecucion = document.getElementById('fecha_ejecucion').value;
    let direccion= document.getElementById('direccion').value;
    let precio = document.getElementById('precio').value;
    let pagado = document.getElementById('pagado').value ;
    let por_cobrar = document.getElementById('por_cobrar').value ;

    let evento = {
        _id: document.getElementById('_id').value,
        nombre_cliente: nombre_cliente,
        categoria: categoria,
        fecha_ejecucion: fecha_ejecucion,
        direccion: direccion,
        precio: precio,
        pagado: pagado,
        por_cobrar: por_cobrar

    };

    const expNombres = /^[a-zA-ZÀ-ÖØ-öø-ÿ\s'-]+$/;
    const expCategorias = /^[a-zA-ZÀ-ÖØ-öø-ÿ\s'-]+$/;
    const expDireccion = /^[a-zA-Z0-9\s\.,#-]+$/;
    const expPrecio = /^[0-9]+$/;
    const expPagado = /^[0-9]+$/;
    const expPorCobrar = /^[0-9]+$/;

    if (nombre_cliente === '' || categoria === '' || fecha_ejecucion === '' || direccion === '' || precio === ''|| pagado === ''|| por_cobrar === '') {
        alert( 'Todos los campos son obligatorios')
        return
    }

    if (!expNombres.test(nombre_cliente)) {
        alert( 'Nombre incorrecto. ¡Solo se permiten letras!')
        return
    }

    if (!expCategorias.test(categoria)) {
        alert( 'categoria incorrecta. ¡Solo se permiten letras!')
        return
    }

    if (!expDireccion.test(direccion)) {
        alert( 'dirección incorrecta.')
        return
    }
    if(new Date(fecha_ejecucion) < new Date()){
        alert( 'fecha incorrecta ')
        return
    }

    if (!expPrecio.test(precio)) {
        alert( 'precio incorrecto. ¡Solo se permiten numeros!')
        return
    } 

    if (!expPagado.test(pagado)) {
        alert( 'pagado incorrecto. ¡Solo se permiten numeros!')
        return
    }
    if (pagado > precio) {
        alert( 'no puede pagar mas de lo que costo el precio')
        return
    }
    if (por_cobrar > precio) {
        alert( 'no puede cobrar mas de lo que costo el precio')
        return
    }

    if (!expPorCobrar.test(por_cobrar) ) {
        alert( 'por cobrar incorrecto. ¡Solo se permiten numeros!')
return
    }


    if (nombre_cliente) {
        fetch(url, {
            method: 'PUT',
            mode: 'cors',
            body: JSON.stringify(evento),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })
            .then(response => response.json())
            .then(json => {
                alert(json.mensaje);
                alert("Se editó correctamente");
                window.location.href = "listarEventos.html";
            })

    } else {
        alert('No se pudo realizar la modificación');
    }
};

const eliminar = (_id) => {
    if (confirm('¿Está seguro de realizar la eliminación?')) {
        const evento = { _id: _id };

        fetch(url, {
            method: 'DELETE',
            mode: 'cors',
            body: JSON.stringify(evento),
            headers: { "Content-Type": "application/json" }
        })
            .then(response => response.json())
            .then(data => {
                alert(data.evento);
                window.location.href = "listarEventos.html";
            })
    }
};



if (document.querySelector('#btnRegistrar')) {
    document.querySelector('#formRegistrar').addEventListener('submit', e => e.preventDefault())
    document.querySelector('#btnRegistrar')
        .addEventListener('click', registrarEvento)

}

if (document.querySelector('#editar')) {
    document.querySelector('#editar')
        .addEventListener('click', editar)
    console.log(_id)

}
document.addEventListener('DOMContentLoaded', function () {
    const editarButton = document.querySelector('#btnEditar');
    if(document.querySelector('#formEditar')){
        document.querySelector('#formEditar').addEventListener('submit', e => e.preventDefault());

    }
    
    if (editarButton) {
        editarButton.addEventListener('click', actualizarEvento);
    }
});
    

document.addEventListener('DOMContentLoaded', function () {
    const registrarButton = document.querySelector('#btnRegistrar');
    if(document.querySelector('#formRegistrar')){
        document.querySelector('#formRegistrar').addEventListener('submit', e => e.preventDefault());
    }
    
    if (registrarButton) {
        registrarButton.addEventListener('click', registrarEvento);
    }
});
