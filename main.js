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
        <div class="card">
            <img src="${product.thumbnail}" class="card-img-top" alt="${product.title}">
            <div class="card-body">
              <h5 class="card-title">${product.title}</h5>
              <p class="card-text">${product.description}</p>
              <p class="card-text fw-bold text-primary">$${product.price}</p>
            </div>
            </div>
            </div>`;
    }).join(' ');
    document.querySelector(".products .row").innerHTML = result;}
getproducts();


document.getElementById("seeMoreBtn").addEventListener("click", () => {
  window.location.href = "all-products.html";
});
