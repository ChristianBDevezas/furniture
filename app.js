const productsDOM = document.querySelector('.products-center');
const url = './data.json';

// Função Assíncrona para acessar os produtos do arquivo "data.json"
const fetchProducts = async () => {
  productsDOM.innerHTML = '<div class="loading"></div>';
  try {
    const resp = await fetch(url);
    const data = await resp.json();
    return data;
  }
  catch(error) {
    productsDOM.innerHTML = '<p class="error">there was an error</p>';
  }
};

// Função Síncrona para mostrar os produtos na página
const displayProducts = (list) => {
  const productList = list
    .map((product) => {
      const {id} = product;
      const {name: title, price} = product.fields;
      const {url: img} = product.fields.image[0];
      const formatPrice = price / 100;
      
      return `<a class="single-product" href="product.html?id=${id}">
            <img src="${img}" class="single-product-img img" alt="${title}" />
            <footer>
              <h5 class="name">${title}</h5>
              <span class="price">$${formatPrice}</span>
            </footer>
          </a>`;
    }).join('');

  productsDOM.innerHTML = `
    <div class="products-container">
      ${productList}          
    </div>`;
};

// Função Assíncrona para o carregamento inicial
const start = async () => {
  const data = await fetchProducts();
  displayProducts(data);
}
start();