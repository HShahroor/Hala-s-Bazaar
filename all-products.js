const productsContainer = document.querySelector(".all-products-row");
const sortBySelect = document.querySelector(".sort-by-select");
const orderSelect = document.querySelector(".order-select");
const applySortBtn = document.querySelector(".apply-sort");
const paginationContainer = document.querySelector(".pagination-container");
const searchInput = document.querySelector(".search-input");

let currentPage = 1;
const limit = 9;
let products = [];           
let filteredProducts = [];   
let sortBy = "";
let order = "";


const loadAllProducts = async () => {
  let allProducts = [];
  let skip = 0;
  const batchLimit = 50; 
  let total = 0;

  do {
    const response = await axios.get(`https://dummyjson.com/products?limit=${batchLimit}&skip=${skip}`);
    allProducts = allProducts.concat(response.data.products);
    total = response.data.total;
    skip += batchLimit;
  } while (allProducts.length < total);

  products = allProducts;
  filteredProducts = [...products];

  displayProducts(getPageProducts());
  createPagination();
};


const getPageProducts = () => {
  const start = (currentPage - 1) * limit;
  return filteredProducts.slice(start, start + limit);
};


const displayProducts = (list) => {
  const result = list.map(product => {
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
  }).join("");

  productsContainer.innerHTML = result;

  document.querySelectorAll(".details-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const productId = e.target.getAttribute("data-id");
      window.location.href = `details.html?id=${productId}`;
    });
  });
};


const createPagination = () => {
  const totalPages = Math.ceil(filteredProducts.length / limit);
  paginationContainer.innerHTML = "";

  const prevLi = document.createElement("li");
  prevLi.classList.add("page-item");
  prevLi.innerHTML = `<a class="page-link" href="#">Prev</a>`;
  prevLi.classList.toggle("disabled", currentPage === 1);
  prevLi.addEventListener("click", e => {
    e.preventDefault();
    if (currentPage > 1) {
      currentPage--;
      displayProducts(getPageProducts());
      createPagination();
    }
  });
  paginationContainer.appendChild(prevLi);

  let startPage = Math.max(1, currentPage - 1);
  let endPage = Math.min(totalPages, currentPage + 1);
  if (currentPage === 1 && totalPages > 2) endPage = 3;
  if (currentPage === totalPages && totalPages > 2) startPage = totalPages - 2;

  for (let i = startPage; i <= endPage; i++) {
    const li = document.createElement("li");
    li.classList.add("page-item");
    if (i === currentPage) li.classList.add("active");
    li.innerHTML = `<a class="page-link" href="#">${i}</a>`;
    li.addEventListener("click", e => {
      e.preventDefault();
      currentPage = i;
      displayProducts(getPageProducts());
      createPagination();
    });
    paginationContainer.appendChild(li);
  }

  const nextLi = document.createElement("li");
  nextLi.classList.add("page-item");
  nextLi.innerHTML = `<a class="page-link" href="#">Next</a>`;
  nextLi.classList.toggle("disabled", currentPage === totalPages);
  nextLi.addEventListener("click", e => {
    e.preventDefault();
    if (currentPage < totalPages) {
      currentPage++;
      displayProducts(getPageProducts());
      createPagination();
    }
  });
  paginationContainer.appendChild(nextLi);
};


searchInput.addEventListener("input", () => {
  const text = searchInput.value.toLowerCase().trim();
  filteredProducts = products.filter(p =>
    p.title.toLowerCase().includes(text) ||
    p.description.toLowerCase().includes(text)
  );
  currentPage = 1;
  displayProducts(getPageProducts());
  createPagination();
});


applySortBtn.addEventListener("click", () => {
  sortBy = sortBySelect.value;
  order = orderSelect.value;
  sortProducts();
  currentPage = 1;
  displayProducts(getPageProducts());
  createPagination();
});

const sortProducts = () => {
  if (sortBy && order) {
    filteredProducts.sort((a, b) => {
      if (sortBy === "title") {
        return order === "asc" ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
      } else if (sortBy === "price") {
        return order === "asc" ? a.price - b.price : b.price - a.price;
      }
    });
  }
};


loadAllProducts();
