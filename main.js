const getCategories = async () => {
    const response = await axios.get('https://dummyjson.com/products/category-list');
    const categories = response.data;
    const wrapper = document.getElementById("categories-wrapper");

    wrapper.innerHTML = categories.map(cat => `
      <div class="swiper-slide">
        <div class="p-3 text-center bg-warning rounded shadow-sm category-slide">
          ${cat}
        </div>
      </div>
    `).join('');

    document.querySelectorAll('.category-slide').forEach(slide => {
      slide.addEventListener('click', (e) => {
        const categoryName = e.target.textContent.trim();
        window.location.href = `categories.html?cat=${categoryName}`;
      });
    });

    new Swiper('.swiper', {
      slidesPerView: 5,
      spaceBetween: 20,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });

  } 
getCategories()


const getproducts = async () => {
  const response = await axios.get(`https://dummyjson.com/products`);
  const allProducts = response.data.products;
  const first9 = allProducts.slice(0, 9);

  const result = first9.map(product => {
    return `
      <div class='col-6 col-md-4 mb-4'>
        <div class="card h-100">
          <img src="${product.thumbnail}" class="card-img-top" alt="${product.title}">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title text-center">${product.title}</h5>
            <p class="card-text fw-bold text-danger text-center">$${product.price}</p>
            <button class="btn btn-warning mt-auto details-btn" data-id="${product.id}">Details</button>
          </div>
        </div>
      </div>`;
  }).join(' ');

  document.querySelector(".products .row").innerHTML = result;

  document.querySelectorAll('.details-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const productId = e.target.getAttribute('data-id');
      window.location.href = `details.html?id=${productId}`;
    });
  });
};

getproducts();



document.getElementById("seeMoreBtn").addEventListener("click", () => {
  window.location.href = "all-products.html";
});
