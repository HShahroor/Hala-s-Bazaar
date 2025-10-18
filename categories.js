const params = new URLSearchParams(window.location.search);
const category = params.get('cat');
const titleElement = document.getElementById('category-title');
if (category) {
    titleElement.textContent = category.toUpperCase();
}

  
  const getCategoryProducts = async () => {
    const response = await axios.get(`https://dummyjson.com/products/category/${category}`);
    const products = response.data.products;

    const result = products.map(product => `
      <div class='col-6 col-md-3 mb-4'>
        <div class="card">
          <img src="${product.thumbnail}" class="card-img-top" alt="${product.title}">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title text-center">${product.title}</h5>
            <p class="card-text fw-bold text-danger text-center">$${product.price}</p>
            <button class="btn btn-warning mt-auto details-btn" data-id="${product.id}">Details</button>
          </div>
        </div>
      </div>
    `).join('');

    document.querySelector(".products").innerHTML = result;
      document.querySelectorAll('.details-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const productId = e.target.getAttribute('data-id');
      window.location.href = `details.html?id=${productId}`;
    });
  });
  };

  getCategoryProducts();

