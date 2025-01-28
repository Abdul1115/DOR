// Selección de elementos
const cambiarTema = document.getElementById('cambiar-tema');
const iconoTema = document.getElementById('icono-tema');
const body = document.body;

// Detectar el tema preferido del navegador
const temaPreferido = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'nocturno' : 'diurno';

// Verificar si hay un tema guardado en localStorage
const temaGuardado = localStorage.getItem('tema');

// Aplicar el tema guardado o el del navegador al cargar la página
const temaInicial = temaGuardado || temaPreferido;
body.classList.add(temaInicial);
iconoTema.innerHTML = temaInicial === 'nocturno' ? obtenerIconoLuna() : obtenerIconoSol();
cambiarTema.setAttribute('aria-pressed', temaInicial === 'nocturno');

// Función para alternar el tema
cambiarTema.addEventListener('click', () => {
    if (body.classList.contains('diurno')) {
        body.classList.replace('diurno', 'nocturno');
        iconoTema.innerHTML = obtenerIconoLuna();
        cambiarTema.setAttribute('aria-pressed', 'true');
        localStorage.setItem('tema', 'nocturno'); // Guardar el tema nocturno
    } else {
        body.classList.replace('nocturno', 'diurno');
        iconoTema.innerHTML = obtenerIconoSol();
        cambiarTema.setAttribute('aria-pressed', 'false');
        localStorage.setItem('tema', 'diurno'); // Guardar el tema diurno
    }
});

// Funciones para obtener los íconos
function obtenerIconoSol() {
    return `
      <circle cx="50" cy="50" r="20" fill="yellow"></circle>
      <line x1="50" y1="10" x2="50" y2="0" stroke="yellow" stroke-width="5"></line>
      <line x1="50" y1="90" x2="50" y2="100" stroke="yellow" stroke-width="5"></line>
      <line x1="10" y1="50" x2="0" y2="50" stroke="yellow" stroke-width="5"></line>
      <line x1="90" y1="50" x2="100" y2="50" stroke="yellow" stroke-width="5"></line>
    `;
}

function obtenerIconoLuna() {
    return `
      <path d="M50 10A40 40 0 0 1 50 90A30 30 0 1 1 50 10Z" fill="gray"></path>
    `;
}



/*Imagenes Portada*/
let currentSlide = 0;

function moveSlide(direction) {
  const carousel = document.querySelector('.carousel');
  const slides = document.querySelectorAll('.carousel-item');
  const totalSlides = slides.length;

  currentSlide = (currentSlide + direction + totalSlides) % totalSlides;

  carousel.style.transform = `translateX(-${currentSlide * 100}%)`;

  updateIndicators();
}

function setSlide(index) {
  currentSlide = index;

  const carousel = document.querySelector('.carousel');
  carousel.style.transform = `translateX(-${currentSlide * 100}%)`;

  updateIndicators();
}

function updateIndicators() {
  const dots = document.querySelectorAll('.carousel-indicators .dot');
  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentSlide);
  });
}

setInterval(() => {
  moveSlide(1);
}, 5000);
/*Tamaño de letra*/
const aumentarLetra = document.getElementById('aumentar-letra');
const disminuirLetra = document.getElementById('disminuir-letra');
const resetearLetra = document.getElementById('resetear-letra');
const htmlElement = document.documentElement;

// Valores iniciales
let tamañoLetra = 16; // Tamaño base en píxeles
const incremento = 2; // Incremento de tamaño en píxeles
const tamañoMinimo = 12; // Tamaño mínimo permitido
const tamañoMaximo = 24; // Tamaño máximo permitido

// Aplicar el tamaño inicial al cargar
htmlElement.style.fontSize = `${tamañoLetra}px`;

// Aumentar el tamaño de la letra
aumentarLetra.addEventListener('click', () => {
  if (tamañoLetra < tamañoMaximo) {
    tamañoLetra += incremento;
    htmlElement.style.fontSize = `${tamañoLetra}px`;
  }
});

// Disminuir el tamaño de la letra
disminuirLetra.addEventListener('click', () => {
  if (tamañoLetra > tamañoMinimo) {
    tamañoLetra -= incremento;
    htmlElement.style.fontSize = `${tamañoLetra}px`;
  }
});

// Restablecer el tamaño de la letra al valor inicial
resetearLetra.addEventListener('click', () => {
  tamañoLetra = 16; // Valor base
  htmlElement.style.fontSize = `${tamañoLetra}px`;
});
/*Cesta*/
// Variables
const cartContainer = document.querySelector('.cart-section');
const subtotalElement = document.querySelector('.subtotal');
const igicElement = document.querySelector('.igic');
const totalElement = document.querySelector('.total');
const checkoutButton = document.querySelector('.checkout-button');
const emptyCartButton = document.querySelector('.empty-cart-button');
const saveListButton = document.querySelector('.save-list-button');
const recommendedProducts = document.querySelectorAll('.add-to-cart');

// Manejo de Cantidad
function attachCartItemEvents(cartItem) {
    const quantityInput = cartItem.querySelector('.quantity-input');
    const decreaseButton = cartItem.querySelector('.quantity-decrease');
    const increaseButton = cartItem.querySelector('.quantity-increase');
    const removeButton = cartItem.querySelector('.remove-button');
    const selectProduct = cartItem.querySelector('.select-product');

    // Aumentar cantidad
    increaseButton?.addEventListener('click', () => {
        const currentQuantity = parseInt(quantityInput.value, 10);
        quantityInput.value = currentQuantity + 1;
        updateTotals();
    });

    // Disminuir cantidad
    decreaseButton?.addEventListener('click', () => {
        const currentQuantity = parseInt(quantityInput.value, 10);
        if (currentQuantity > 1) {
            quantityInput.value = currentQuantity - 1;
            updateTotals();
        }
    });

    // Eliminar producto
    removeButton?.addEventListener('click', () => {
        cartItem.remove();
        updateTotals();
    });

    // Selección de producto
    selectProduct?.addEventListener('change', updateTotals);
}

// Vaciar carrito
emptyCartButton.addEventListener('click', () => {
    const allCartItems = document.querySelectorAll('.cart-item');
    allCartItems.forEach((item) => item.remove());
    updateTotals();
});

// Guardar lista (simulación)
saveListButton.addEventListener('click', () => {
    alert('Lista guardada con éxito.');
});

// Función para añadir productos al carrito
function addProductToCart(product) {
    const cartActions = document.querySelector('.cart-actions');

    // Crear nuevo elemento de carrito
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.innerHTML = `
        <input type="checkbox" class="select-product" checked>
        <img src="${product.image}" alt="${product.name}" class="cart-item-image">
        <div class="cart-item-details">
            <h2>${product.name}</h2>
            <p class="price">${product.price.toFixed(2)}€</p>
            <p class="delivery-info">Recíbelo entre el viernes 9 y el sábado 10</p>
            <p class="seller">Vendido por GAME</p>
            <button class="remove-button">🗑 Eliminar</button>
        </div>
        <div class="cart-item-quantity">
            <button class="quantity-decrease">-</button>
            <input type="number" value="1" class="quantity-input">
            <button class="quantity-increase">+</button>
        </div>
    `;

    // Insertar antes de las acciones del carrito
    cartContainer.insertBefore(cartItem, cartActions);

    // Añadir eventos al nuevo producto
    attachCartItemEvents(cartItem);

    // Actualizar totales
    updateTotals();
}

// Añadir productos recomendados al carrito
recommendedProducts.forEach((button) => {
    button.addEventListener('click', () => {
        const product = {
            id: button.getAttribute('data-id'),
            name: button.getAttribute('data-name'),
            price: parseFloat(button.getAttribute('data-price')),
            image: button.getAttribute('data-image'),
        };
        addProductToCart(product);
        alert(`${product.name} añadido al carrito.`);
    });
});

// Actualización de Totales
function updateTotals() {
    let subtotal = 0;

    // Seleccionar todos los productos del carrito
    const allCartItems = document.querySelectorAll('.cart-item');
    allCartItems.forEach((cartItem) => {
        const quantityInput = cartItem.querySelector('.quantity-input');
        const priceElement = cartItem.querySelector('.price');
        const selectProduct = cartItem.querySelector('.select-product');

        if (selectProduct && selectProduct.checked) {
            const quantity = parseInt(quantityInput.value, 10);
            const price = parseFloat(priceElement.textContent.replace('€', ''));
            subtotal += quantity * price;
        }
    });

    const igic = subtotal * 0.07;
    const total = subtotal + igic;

    subtotalElement.textContent = `${subtotal.toFixed(2)}€`;
    igicElement.textContent = `${igic.toFixed(2)}€`;
    totalElement.textContent = `${total.toFixed(2)}€`;

    // Deshabilitar continuar si el carrito está vacío o no hay productos seleccionados
    const hasProducts = document.querySelectorAll('.select-product:checked').length > 0;
    checkoutButton.disabled = !hasProducts;
}

// Adjuntar eventos a productos iniciales (predefinidos en el HTML)
const initialCartItems = document.querySelectorAll('.cart-item');
initialCartItems.forEach((cartItem) => attachCartItemEvents(cartItem));

// Actualizar totales al cargar la página
updateTotals();


/*Datos Cliente*/
// Controlar si los datos de facturación son iguales a los de envío
document.getElementById('usar-envio-facturacion').addEventListener('change', (e) => {
  const facturacionDiferente = document.getElementById('facturacion-diferente');
  facturacionDiferente.style.display = e.target.checked ? 'none' : 'block';
});

// Validar zona de envío y método de envío
document.getElementById('customer-data-form').addEventListener('submit', (e) => {
  const zonaEnvio = document.getElementById('zona-envio').value;
  const metodoEnvio = document.getElementById('metodo-envio').value;

  if (zonaEnvio === 'zona-3') {
      e.preventDefault();
      alert('No realizamos envíos a la zona seleccionada.');
  } else if (!metodoEnvio) {
      e.preventDefault();
      alert('Seleccione un método de envío.');
  }
});
