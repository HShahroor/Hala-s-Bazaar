const params = new URLSearchParams(window.location.search);
const category = params.get('cat');
const titleElement = document.getElementById('category-title');
  
  const getCategoryProducts = async () => {
    const response = await axios.get(`https://dummyjson.com/products/category/${category}`);
    const products = response.data.products;

    const result = products.map(product => `
      <div class='col-6 col-md-3 mb-4'>
        <div class="card">
          <img src="${product.thumbnail}" class="card-img-top" alt="${product.title}">
          <div class="card-body">
            <h5 class="card-title">${product.title}</h5>
            <p class="card-text">${product.description}</p>
          </div>
        </div>
      </div>
    `).join('');

    document.querySelector(".products").innerHTML = result;
  };

  getCategoryProducts();

