const url = 'https://modulofinalbb.onrender.com/api/servicio'
const listarServicio = async () => {
    let body = document.getElementById('contenido');
    if (body) {
        let mensaje = '';

        fetch(url)
            .then(res => res.json())
            .then(data => {
                const servicios = data.servicio;
                servicios.map((servicio) => {
                    console.log(servicio);

                    mensaje += `<tr><td>${servicio.nombre_servicio}</td>` +
                        `<td>${servicio.descripcion}</td>` +
                        `<td>${servicio.precio}</td>` +
                        `<td>${servicio.estado}</td>` +
                        `<td>
                    <a class="waves-effect waves-light btn modal-trigger" href="#modal1" onclick='editar(${JSON.stringify(servicio)})'>Editar</a>
                    <a class="waves-effect waves-light btn modal-trigger red" href="#" onclick='eliminar("${servicio._id}")'>Eliminar</a>
                 </td></tr>`;
                    body.innerHTML = mensaje;
                });

            })
    }
};
listarServicio();

const registrarServicio = async() =>{
    //Captura de valores de datos enviados desde el formulario
    const nombre_servicio = document.getElementById('nombre_servicio').value
    const descripcion = document.getElementById('descripcion').value
    const precio = document.getElementById('precio').value
    const estado = document.getElementById('estado').value

    let servicio = {
        nombre_servicio: nombre_servicio,
        descripcion: descripcion,
        precio: precio,
        estado: estado
    }
    const expNombre = /^[a-zA-Z\s]+$/;
    const expPrecio = /^[0-9\s]+$/;
    const expDescripcion =  /^[a-zA-Z\s]+$/;

    if(nombre_servicio == ''|| precio == '' || descripcion ==''){
        alert( 'Todos los campos son obligatorio')
        return
    }
    if (!expNombre.test(nombre_servicio)){
        alert( 'Nombre incorrecto !solo se permiten letras')
        return
    }
    if (precio <=0 ){
        alert('el precio debe ser mayor a 0')
        return
    }
    if (!expPrecio.test(precio)){
        alert( 'Precio incorrecto !solo se permiten numeros')
        return
    }
    if (!expDescripcion.test(descripcion)){
        alert( 'Descripción incorrecta !solo se permiten letras')
        return
    }
        fetch(url, {
            method: 'POST',
            mode: 'cors',
            body:JSON.stringify(servicio),
            headers: {"Content-type": "application/json; charset=UTF-8"}     
        })
        .then(response => response.json()) //La respuesta del método POST de la API
        .then(json => {
           alert(json.mensaje)
           window.location.href = "listarServicios.html";

        })
    }

const editar = (servicio) => {
    let _id = document.getElementById('_id').value = '';
    let nombre_servicio = document.getElementById('nombre_servicio').value = '';
    let descripcion = document.getElementById('descripcion').value = '';
    let precio = document.getElementById('precio').value = '';
    let estado = document.getElementById('estado').value = '';

    document.getElementById('_id').value = servicio._id;
    document.getElementById('nombre_servicio').value = servicio.nombre_servicio;
    document.getElementById('descripcion').value = servicio.descripcion;
    document.getElementById('precio').value = servicio.precio;
    document.getElementById('estado').value = servicio.estado;
}
const actualizarServicio = async () => {
    let nombre_servicio = document.getElementById('nombre_servicio').value;
    let descripcion = document.getElementById('descripcion').value;
    let precio = document.getElementById('precio').value;
    let estado= document.getElementById('estado').value;

    let servicio = {
        _id: document.getElementById('_id').value,
        nombre_servicio: nombre_servicio,
        descripcion: descripcion,
        precio: precio,
        estado: estado

    };
    const expNombre = /^[a-zA-Z\s]+$/;
    const expPrecio = /^[0-9\s]+$/;
    const expDescripcion =  /^[a-zA-Z\s]+$/;

    if(nombre_servicio == ''|| precio == '' || descripcion ==''){
        alert( 'Todos los campos son obligatorio')
        return
    }
    if (!expNombre.test(nombre_servicio)){
        alert( 'Nombre incorrecto !solo se permiten letras')
        return
    }
    if (precio <=0 ){
        alert('el precio debe ser mayor a 0')
        return
    }
    if (!expPrecio.test(precio)){
        alert( 'Precio incorrecto !solo se permiten numeros')
        return
    }
    if (!expDescripcion.test(descripcion)){
        alert( 'Descripción incorrecta !solo se permiten letras')
        return
    }


    if (nombre_servicio) {
        fetch(url, {
            method: 'PUT',
            mode: 'cors',
            body: JSON.stringify(servicio),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })
            .then(response => response.json())
            .then(json => {
                alert(json.mensaje);
                alert("Se editó correctamente");
                window.location.href = "listarServicios.html";
            })

    } else {
        alert('No se pudo realizar la modificación');
    }
};

const eliminar = (_id) => {
    if (confirm('¿Está seguro de realizar la eliminación?')) {
        const servicio = { _id: _id };

        fetch(url, {
            method: 'DELETE',
            mode: 'cors',
            body: JSON.stringify(servicio),
            headers: { "Content-Type": "application/json" }
        })
            .then(response => response.json())
            .then(data => {
                alert(data.servicio);
                window.location.href = "listarServicios.html";
            })
    }
};



if (document.querySelector('#btnRegistrar')) {
    document.querySelector('#formRegistrar').addEventListener('submit', e => e.preventDefault())
    document.querySelector('#btnRegistrar')
        .addEventListener('click', registrarServicio)

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
        editarButton.addEventListener('click', actualizarServicio);
    }
});
    

document.addEventListener('DOMContentLoaded', function () {
    const registrarButton = document.querySelector('#btnRegistrar');
    if(document.querySelector('#formRegistrar')){
        document.querySelector('#formRegistrar').addEventListener('submit', e => e.preventDefault());
    }
    
    if (registrarButton) {
        registrarButton.addEventListener('click', registrarServicio);
    }
});
