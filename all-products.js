const productsContainer = document.querySelector("#all-products-row");
const sortBySelect = document.querySelector("#sortBySelect");
const orderSelect = document.querySelector("#orderSelect");
const applySortBtn = document.querySelector("#applySort");
const paginationContainer = document.querySelector("#pagination");

let currentPage = 1;
const limit = 9; 
let totalProducts = 0;
let sortBy = "";
let order = "";


const getProducts = async (page = 1, sortByParam = "", orderParam = "") => {
  
    let skip = (page - 1) * limit;
    let url = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;

    if (sortByParam && orderParam) {
      url += `&sortBy=${sortByParam}&order=${orderParam}`;
    }

    const response = await axios.get(url);
    const allProducts = response.data.products;
    totalProducts = response.data.total;

    const result = allProducts.map(product => {
      return `
        <div class='col-6 col-md-4 mb-4'>
          <div class="card h-100 shadow-sm">
            <img src="${product.thumbnail}" class="card-img-top" alt="${product.title}">
            <div class="card-body">
              <h5 class="card-title">${product.title}</h5>
              <p class="card-text">${product.description}</p>
              <p class="card-text fw-bold text-primary">$${product.price}</p>
            </div>
          </div>
        </div>`;
    }).join("");

    productsContainer.innerHTML = result;
    createPagination();

};

const createPagination = () => {
  const totalPages = Math.ceil(totalProducts / limit);
  paginationContainer.innerHTML = "";

  const prevLi = document.createElement("li");
  prevLi.classList.add("page-item");
  prevLi.innerHTML = `<a class="page-link" href="#">Prev</a>`;
  prevLi.classList.toggle("disabled", currentPage === 1);
  prevLi.addEventListener("click", (e) => {
    e.preventDefault();
    if (currentPage > 1) {
      currentPage--;
      getProducts(currentPage, sortBy, order);
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
    li.addEventListener("click", (e) => {
      e.preventDefault();
      currentPage = i;
      getProducts(currentPage, sortBy, order);
    });

    paginationContainer.appendChild(li);
  }

  const nextLi = document.createElement("li");
  nextLi.classList.add("page-item");
  nextLi.innerHTML = `<a class="page-link" href="#">Next</a>`;
  nextLi.classList.toggle("disabled", currentPage === totalPages);
  nextLi.addEventListener("click", (e) => {
    e.preventDefault();
    if (currentPage < totalPages) {
      currentPage++;
      getProducts(currentPage, sortBy, order);
    }
  });
  paginationContainer.appendChild(nextLi);
};


applySortBtn.addEventListener("click", () => {
  sortBy = sortBySelect.value;
  order = orderSelect.value;
  currentPage = 1;
  getProducts(currentPage, sortBy, order);
});

getProducts();
