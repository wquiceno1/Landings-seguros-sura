// -------------------------------------------------------- contador de caracteres de cuadro de texto
const mensaje = document.getElementById('message');
const contador = document.getElementById('counter');
mensaje.value = '';
mensaje.addEventListener('input', function (e) {
    const target = e.target;
    const longitudMax = target.getAttribute('maxlength');
    const longitudAct = target.value.length;
    contador.innerHTML = `${longitudAct}/${longitudMax}`;

});
// ------------------------------------------------------- fin contador de caracteres de cuadro de texto


// se marcan el cliente y el nuevo caso por defecto
// para solucionar problema de no marcado de sitefinity
function marcarCliente() {
    document.querySelector('#typeCliente').checked = true;
    document.querySelector('#typeNewCase').checked = true;
    console.log('se marco el cliente');

    const cliente = document.querySelector('#typeCliente');
    const corredor = document.querySelector('#typeCorredor');

    const newCase = document.querySelector('#typeNewCase');
    const caseJoined = document.querySelector('#typeCaseJoined');

    const rutCliente = document.querySelector('#rut-cliente');
    const rutCorredor = document.querySelector('#rut-corredor');

    // se ocultan las opciones de corredor y caso ingresado
    if (newCase.checked) {
        rutCorredor.style.display = 'none';

        document.getElementById('state-case').style.display = 'none';
        document.querySelector('.case-admitted__title').style.display = 'none';
        document.getElementById('view-case').style.display = 'none';
    }

    cliente.addEventListener('change', function (e) {
        rutCliente.style.display = 'flex';

        rutCorredor.style.display = 'none';
    });

    corredor.addEventListener('change', function (e) {
        // rutCliente.style.display = 'none';

        rutCorredor.style.display = 'flex';

    });

    // listener caso nuevo
    newCase.addEventListener('change', function (e) {

        // se muestran las opciones de caso nuevo, si estan ocultas
        

        document.getElementById('select-cat').style.display = 'flex';
        document.getElementById('select-opc').style.display = 'flex';
        document.getElementById('zona-carga').style.display = 'flex';

        // se ocultan las opciones de caso ingresado, si se estan mostrando
        

        document.getElementById('state-case').style.display = 'none';
        document.querySelector('.case-admitted__title').style.display = 'none';
        document.getElementById('view-case').style.display = 'none';
    });

    // listener para caso ingresado
    caseJoined.addEventListener('change', function (e) {
        // se ocultan las opciones de caso nuevo, si estan visibles
        document.getElementById('select-cat').style.display = 'none';
        document.getElementById('select-opc').style.display = 'none';
        document.getElementById('zona-carga').style.display = 'none';
        // se muestran las opciones de caso ingresado, si estan ocultas

        document.getElementById('state-case').style.display = 'flex';
        document.querySelector('.case-admitted__title').style.display = 'block';
        document.getElementById('view-case').style.display = 'flex';
    });

}
window.onload = marcarCliente();




// ----------------- arrastar y soltar archivos -----------------
const dropArea = document.querySelector('.drop-area');
const dragText = document.querySelector('.drop-area__title');
const button = document.querySelector('.drop-area__button');
const input = document.querySelector('#input-file');

button.addEventListener('click', (e) => {
    input.click();
});

input.addEventListener("change", (e) => {
    files = e.target.files;
    dropArea.classList.add("active");
    showFiles(files);
    dropArea.classList.remove("active");
});

dropArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropArea.classList.add("active");
    dragText.innerHTML = "<strong>Suelta para subir los archivos</strong>";
});

dropArea.addEventListener('dragleave', (e) => {
    e.preventDefault();
    dropArea.classList.remove("active");
    dragText.innerHTML = "Puedes <strong> arrastrar tus archivos</strong> aquí";
});

dropArea.addEventListener('drop', (e) => {
    e.preventDefault();
    files = e.dataTransfer.files;
    showFiles(files);
    // console.log(files);
    dropArea.classList.remove("active");
    dragText.innerHTML = "Puedes <strong> arrastrar tus archivos</strong> aquí";

});

// verificar cuantos archivos se estan cargando
function showFiles(files) {
    if (files.length === undefined) {
        // proceso un solo archivo
        processFile(files);
    } else {
        // se procesan todos los archivos cargados
        for (const file of files) {
            processFile(file);
        }
    }
}

// funcion para validar las extenciones aceptadas
function processFile(file) {
    const docType = file.type;
    const validExtensions = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'application/pdf'];

    if (validExtensions.includes(docType)) {
        // archivo valido
        alert('Archivo valido');
    } else {
        // archivo invalido
        alert('Archivo invalido');
    }
}