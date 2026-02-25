const products = [
    { name: 'DrPepper 64 pack', price: 65.99, description: 'Best darn dr pepper youll ever have', category: 'drinks', inStock: true},
    { name: 'Kidney', price: 6500.99, description: 'Need a kidney? Look no further!', category: 'body parts', inStock: false},
    { name: 'Used Kidney', price: 4999.99, description: 'Bought a kidney, dont need it anymore', category: 'body parts', inStock: true}
]

function formatPrice(price) {
    const formattedPrice = price.toFixed(2);
    return `$${formattedPrice}`;

}

function createProductCard(product) {
    let stocked = product.inStock ? 'stock-status in-stock' : 'stock-status out-of-stock';
    let stocked2 = product.inStock ? 'In Stock' : 'Out Of Stock'
    return (
        `
        <div class="product-card">
            <h2>${product.name}</h2>
            <div>${formatPrice(product.price)}</div>
            <p>${product.description}</p>
            <span>${product.category}</span>
            <div class="${stocked}">${stocked2}</div>
        </div>
        `
    )
}

function renderproducts() {
    const productGrid = document.querySelector("#productGrid")
    productGrid.innerHTML = '';
    for (let i = 0; i < products.length; i++){
        const string = createProductCard(products[i]);
        productGrid.insertAdjacentHTML("beforeend",string)
    }
}

function addItemToList(event) {
    // Prevent the default form submission behavior (which would reload the page)
    event.preventDefault();
    const productName = document.querySelector("#productName").value;
    const productPrice = document.querySelector("#productPrice").value;
    const productDescription = document.querySelector("#productDescription").value;
    const productCategory = document.querySelector("#productCategory").value;
    const productInStock = document.querySelector("#productInStock").checked;

    products.push({name:productName, price:Number(productPrice), description:productDescription, category:productCategory, inStock:productInStock});

    renderproducts();

    productForm = document.querySelector("#productForm");
    productForm.reset();
    
  }
  
productForm.addEventListener('submit', addItemToList);

renderproducts()