import { Anuncio } from "./anuncio.js";
import { Anuncio_Autos } from "./anuncio_auto.js";


////////////////////////////////////////////////////////////////////////////////////
// const a = new Anuncio_Autos(1, "titulo", "transaccion", "descripcion", "500,50", 2, 3, 4);
const nuevoAnuncio = new Anuncio_Autos(1, "titulo", "transaccion", "descripcion", "500,50", 2, 3, 4);
console.log(nuevoAnuncio);
////////////////////////////////////////////////////////////////////////////////////

const anuncios = JSON.parse(localStorage.getItem("lista")) || [];

window.addEventListener("DOMContentLoaded", () => {

    document.forms[0].addEventListener("submit", handlerSubmit);
    document.addEventListener("click", handlerClick);

    if (anuncios.length > 0) {
        handlerLoadList(anuncios);
    }
})

function limpiarFormulario(frm) {
    document.forms[0].reset;
    document.getElementById("btnEliminar").classList.add("oculto");
    document.getElementById("btnSubmit").value = "Alta anuncio";
    //document.forms[0].id.value = "";
}

function handlerSubmit(e) {
    e.preventDefault();
    if (e.target.id.value) {
        const anuncioEditado = new Anuncio_Autos(
            parseInt(e.target.id.value),
            e.target.titulo.value,
            e.target.transaccion.value,
            e.target.descripcion.value,
            e.target.precio.value,
            e.target.puertas.value,
            e.target.kms.value,
            e.target.potencia.value
        );

        if (confirm("Confirma modificacion?")) {
            modificarAnuncio(anuncioEditado);
        }
    } else {
        //titulo, transaccion, descripcion, precio, puertas, kms, potencia
        console.log("Realizando alta");
        const nuevoAnuncio = new Anuncio_Autos(
            Date.now(),
            e.target.titulo.value,
            e.target.transaccion.value,
            e.target.descripcion.value,
            e.target.precio.value,
            e.target.puertas.value,
            e.target.kms.value,
            e.target.potencia.value
        );
        altaAnuncio(nuevoAnuncio);
    }
}

function modificarAnuncio(p) {
    let index = anuncios.findIndex((per) => {
        return per.id == p.id;
    });
    anuncios.splice(index, 1, p);
    almacenarDatos(anuncios);
}

function almacenarDatos(data) {
    agregarSpinner();
    setTimeout(() => {
        localStorage.setItem("lista", JSON.stringify(data));
        handlerLoadList();
        eliminarSpinner();
    }, 3000);
}

function altaAnuncio(p) {
    anuncios.push(p);
    almacenarDatos(anuncios);
}

function handlerLoadList(e) {

    renderizarLista(crearTabla(anuncios), document.getElementById("divLista"));
}

function renderizarLista(lista, contenedor) {
    while (contenedor.hasChildNodes()) {
        contenedor.removeChild(contenedor.firstChild);
    }
    if (lista)
        contenedor.appendChild(lista);
}

function crearTabla(items) {
    const tabla = document.createElement("table");
    tabla.appendChild(crearThead(items[0]));
    tabla.appendChild(crearTbody(items));
    return tabla;
}

function crearThead(item) {
    const thead = document.createElement("thead");
    const tr = document.createElement("tr");
    tr.style.backgroundColor = "blue";

    for (const key in item) {
        if (key !== "id") {
            const th = document.createElement("th");
            th.textContent = key;
            tr.appendChild(th);
        }
    }
    thead.appendChild(tr);
    return thead;
}

function crearTbody(items) {
    const tbody = document.createElement("tbody");
    items.forEach(item => {
        const tr = document.createElement("tr");
        for (const key in item) {
            if (key === "id") {
                tr.setAttribute("data-id", item[key]);
            }
            else {
                const td = document.createElement("td");
                td.textContent = item[key];
                tr.appendChild(td);
            }
        }
        tbody.appendChild(tr);
    });
    return tbody;
}

function handlerClick(e) {
    if (e.target.matches("td")) {
        let id = e.target.parentNode.dataset.id;
        cargarFormulario(id);
    }
    else if (e.target.matches("#btnEliminar")) {
        let id = parseInt(document.forms[0].id.value);
        if (confirm("Confirma baja?")) {


            let index = anuncios.findIndex((el) => el.id == id);
            anuncios.splice(index, 1);
            almacenarDatos(anuncios);


        }
        limpiarFormulario(document.forms[0]);
    }
}

function cargarFormulario(id) {
    const { titulo, transaccion, descripcion, precio, num_puertas, num_kms, potencia } = anuncios.filter(p => p.id === parseInt(id))[0];
    document.forms[0].titulo.value = titulo;
    document.forms[0].transaccion.value = transaccion;
    document.forms[0].descripcion.value = descripcion;
    document.forms[0].precio.value = precio;
    document.forms[0].puertas.value = num_puertas;
    document.forms[0].kms.value = num_kms;
    document.forms[0].potencia.value = potencia;
    document.forms[0].id.value = id;

    document.getElementById("btnSubmit").value = "Modificar";
    document.getElementById("btnEliminar").classList.remove("oculto");
}

function agregarSpinner() {
    let spinner = document.createElement("img");
    spinner.setAttribute("src", "./assets/spinner.gif");
    spinner.setAttribute("alt", "imagen spiner");
    document.getElementById("spinnerContainer").appendChild(spinner);
}

function eliminarSpinner() {
    document.getElementById("spinnerContainer").innerHTML = "";
}
