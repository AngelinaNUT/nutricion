document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('search');
    const productList = document.getElementById('product-list');
    const products = productList.getElementsByClassName('product');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    // Filtro de productos
    searchInput.addEventListener('input', function () {
        const filter = searchInput.value.toLowerCase();

        Array.from(products).forEach(function (product) {
            const productName = product.getAttribute('data-product-name').toLowerCase();

            product.style.display = productName.includes(filter) ? '' : 'none';
        });
    });

    // Manejo del clic en productos
    productList.addEventListener('click', function (e) {
        if (e.target.tagName === 'INPUT' && e.target.type === 'checkbox') {
            const checkbox = e.target;
            const productContent = checkbox.closest('.product-content');
            const productName = productContent.querySelector('h3').textContent;
            const productPrice = parseFloat(productContent.querySelector('p').textContent.match(/\$([\d.]+)/)[1]);

            checkbox.checked ? addProductToCart(productName, productPrice) : removeProductFromCart(productName);
        }
    });

    // Función para añadir producto al carrito
    function addProductToCart(name, price) {
        let existingItem = cartItems.querySelector(`li[data-product-name="${name}"]`);
        if (existingItem) {
            let quantityInput = existingItem.querySelector('.quantity');
            quantityInput.value = parseInt(quantityInput.value) + 1;
        } else {
            const newItem = document.createElement('li');
            newItem.setAttribute('data-product-name', name);
            newItem.innerHTML = `
                ${name} - $${price.toFixed(2)} 
                <input type="number" class="quantity" name="quantity_${name}" value="1" min="1">
                <button class="remove-item">Eliminar</button>
            `;
            cartItems.appendChild(newItem);
        }
        updateTotal();
    }
    

    // Función para eliminar producto del carrito
    function removeProductFromCart(name) {
        let existingItem = cartItems.querySelector(`li[data-product-name="${name}"]`);
        if (existingItem) {
            cartItems.removeChild(existingItem);
        }
        updateTotal();
    }

    // Actualizar el total
    function updateTotal() {
        let total = 0;
        cartItems.querySelectorAll('li').forEach(item => {
            const price = parseFloat(item.textContent.match(/\$([\d.]+)/)[1]);
            const quantity = item.querySelector('.quantity').value;
            total += price * quantity;
        });
        cartTotal.textContent = `$${total.toFixed(2)}`;
    }

    // Manejo del clic en el botón "Eliminar"
    cartItems.addEventListener('click', function (e) {
        if (e.target.classList.contains('remove-item')) {
            const item = e.target.closest('li');
            const productName = item.getAttribute('data-product-name');
            removeProductFromCart(productName);
        }
    });

    // Manejo de cambio en la cantidad de productos
    cartItems.addEventListener('input', function (e) {
        if (e.target.classList.contains('quantity')) {
            updateTotal();
        }
    });
});
