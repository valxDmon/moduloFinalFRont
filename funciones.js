const url = 'https://modulofinalff.onrender.com/listarVentas.html'
const listarVenta = async () => {
    let body = document.getElementById('contenido');
    if (body) {
        let mensaje = '';

        fetch(url)
            .then(res => res.json())
            .then(data => {
                const ventas = data.venta;
                ventas.map((venta) => {
                    const fecha_test = new Date(venta.fecha_ejecucion)
                    console.log(venta);

                    mensaje += `<tr><td>${venta.nombre_cliente}</td>` +
                        `<td>${venta.categoria}</td>` +
                        `<td>${fecha_test.getFullYear()}-${addZero(fecha_test.getMonth())}-${addZero(fecha_test.getDay())}</td>` +
                        `<td>${venta.precio}</td>` +
                        `<td>
                    <a class="waves-effect waves-light btn modal-trigger" href="#modal1" onclick='editar(${JSON.stringify(venta)})'>Editar</a>
                    <a class="waves-effect waves-light btn modal-trigger red" href="#" onclick='eliminar("${venta._id}")'>Eliminar</a>
                 </td></tr>`;
                    body.innerHTML = mensaje;
                });

            })
    }
};
listarVenta();

function addZero(number) {
    return number < 10 ? '0' + number : number
}

const registrarVenta = async () => {
    //Captura de valores de datos enviados desde el formulario
    const nombre_cliente = document.getElementById('nombre_cliente').value
    const categoria = document.getElementById('categoria').value
    const fecha_ejecucion = document.getElementById('fecha_ejecucion').value
    const precio = document.getElementById('precio').value

    let venta = {
        nombre_cliente: nombre_cliente,
        categoria: categoria,
        fecha_ejecucion: fecha_ejecucion,
        precio: precio
    }
    const expNombres = /^[a-zA-ZÀ-ÖØ-öø-ÿ\s'-]+$/;
    const expCategorias = /^[a-zA-ZÀ-ÖØ-öø-ÿ\s'-]+$/;
    const expPrecio = /^[0-9]+$/;

    if (nombre_cliente === '' || categoria === '' || precio === '' || fecha_ejecucion === '') {
        alert('Todos los campos son obligatorios')
        return
    }

    if (!expNombres.test(nombre_cliente)) {
         window.alert ('Nombres incorrectos. ¡Solo se permiten letras!')
        return
    }

    if (!expCategorias.test(categoria)) {
        alert ('categorias incorrectos. ¡Solo se permiten letras ')
        return
    }

    if(new Date(fecha_ejecucion) < new Date()){
        alert ('fecha incorrecta')
        return
    }

    if(precio <=0){
        alert('numero menor a 0 error')
        return
    }

    if (!expPrecio.test(precio) ) {
        alert ('precio incorrecto. ¡Solo se permiten numeros! ' )
        return

    
 }
    fetch(url, {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(venta),
        headers: { "Content-type": "application/json; charset=UTF-8" }
    })
        .then(response => response.json()) //La respuesta del método POST de la API
        .then(json => {
            alert(json.mensaje)
            window.location.href = "listarVentas.html";
        })
}

const editar = (venta) => {
    let _id = document.getElementById('_id').value = '';
    let nombre_cliente = document.getElementById('nombre_cliente').value = '';
    let categoria = document.getElementById('categoria').value = '';
    let fecha_ejecucion = document.getElementById('fecha_ejecucion').value = '';
    let precio = document.getElementById('precio').value = '';

    document.getElementById('_id').value = venta._id;
    document.getElementById('nombre_cliente').value = venta.nombre_cliente;
    document.getElementById('categoria').value = venta.categoria;
    document.getElementById('fecha_ejecucion').value = venta.fecha_ejecucion;
    document.getElementById('precio').value = venta.precio;
}
const actualizarVenta = async () => {
    let nombre_cliente = document.getElementById('nombre_cliente').value;
    let categoria = document.getElementById('categoria').value;
    let fecha_ejecucion = document.getElementById('fecha_ejecucion').value;
    let precio = document.getElementById('precio').value;

    let venta = {
        _id: document.getElementById('_id').value,
        nombre_cliente: nombre_cliente,
        categoria: categoria,
        fecha_ejecucion: fecha_ejecucion,
        precio: precio

    };


    if (nombre_cliente) {
        fetch(url, {
            method: 'PUT',
            mode: 'cors',
            body: JSON.stringify(venta),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })
            .then(response => response.json())
            .then(json => {
                alert(json.mensaje);
                alert("Se editó correctamente");
                window.location.href = "listarVentas.html";
            })

    } else {
        alert('No se pudo realizar la modificación');
    }
};

const eliminar = (_id) => {
    if (confirm('¿Está seguro de realizar la eliminación?')) {
        const venta = { _id: _id };

        fetch(url, {
            method: 'DELETE',
            mode: 'cors',
            body: JSON.stringify(venta),
            headers: { "Content-Type": "application/json" }
        })
            .then(response => response.json())
            .then(data => {
                alert(data.venta);
                window.location.href = "listarVentas.html";
            })
    }
};



if (document.querySelector('#btnRegistrar')) {
    document.querySelector('#formRegistrar').addEventListener('submit', e => e.preventDefault())
    document.querySelector('#btnRegistrar')
        .addEventListener('click', registrarVenta)

}

if (document.querySelector('#editar')) {
    document.querySelector('#editar')
        .addEventListener('click', editar)
    console.log(_id)

}
document.addEventListener('DOMContentLoaded', function () {
    const editarButton = document.querySelector('#btnEditar');
    document.querySelector('#formEditar').addEventListener('submit', e => e.preventDefault());

    if (editarButton) {
        editarButton.addEventListener('click', actualizarVenta);
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const registrarButton = document.querySelector('#btnRegistrar');
    document.querySelector('#formRegistrar').addEventListener('submit', e => e.preventDefault());

    if (registrarButton) {
        registrarButton.addEventListener('click', registrarVenta);
    }
});
