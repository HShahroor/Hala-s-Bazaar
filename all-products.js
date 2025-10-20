const allRow = document.querySelector(".all-products-row");
const sortSelect = document.querySelector(".sort-by-select");
const orderSelect = document.querySelector(".order-select");
const sortBtn = document.querySelector(".apply-sort");
const pagContainer = document.querySelector(".pagination-container");
const search = document.querySelector(".search-input");

let page = 1;
let limit = 9;
let allProducts = [];
let filtered = [];
let sort = "";
let order = "";

async function getProducts() {
  let res = await axios.get("https://dummyjson.com/products?limit=100");
  allProducts = res.data.products;
  filtered = allProducts;
  showProducts(getPage());
  makePagination();
}

function getPage() {
  let start = (page - 1) * limit;
  return filtered.slice(start, start + limit);
}

function showProducts(list) {
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
  }).join(' ');

  allRow.innerHTML = result;

  document.querySelectorAll(".details-btn").forEach(btn => {
    btn.onclick = e => {
      let id = e.target.getAttribute("data-id");
      window.location.href = `details.html?id=${id}`;
    };
  });
}

function makePagination() {
  let totalPages = Math.ceil(filtered.length / limit);
  pagContainer.innerHTML = "";

  let prev = document.createElement("li");
  prev.classList.add("page-item");
  prev.innerHTML = `<a class="page-link" href="#">Prev</a>`;
  if (page == 1) prev.classList.add("disabled");
  prev.onclick = e => {
    e.preventDefault();
    if (page > 1) {
      page--;
      showProducts(getPage());
      makePagination();
    }
  };
  pagContainer.appendChild(prev);

  for (let i = 1; i <= totalPages; i++) {
    let li = document.createElement("li");
    li.classList.add("page-item");
    if (i == page) li.classList.add("active");
    li.innerHTML = `<a class="page-link" href="#">${i}</a>`;
    li.onclick = e => {
      e.preventDefault();
      page = i;
      showProducts(getPage());
      makePagination();
    };
    pagContainer.appendChild(li);
  }

  let next = document.createElement("li");
  next.classList.add("page-item");
  next.innerHTML = `<a class="page-link" href="#">Next</a>`;
  if (page == totalPages) next.classList.add("disabled");
  next.onclick = e => {
    e.preventDefault();
    if (page < totalPages) {
      page++;
      showProducts(getPage());
      makePagination();
    }
  };
  pagContainer.appendChild(next);
}

search.addEventListener("input", () => {
  let txt = search.value.toLowerCase().trim();
  filtered = allProducts.filter(p =>
    p.title.toLowerCase().includes(txt) ||
    p.description.toLowerCase().includes(txt)
  );
  page = 1;
  showProducts(getPage());
  makePagination();
});

sortBtn.addEventListener("click", () => {
  sort = sortSelect.value;
  order = orderSelect.value;
  doSort();
  page = 1;
  showProducts(getPage());
  makePagination();
});

function doSort() {
  if (sort && order) {
    filtered.sort((a, b) => {
      if (sort == "title") {
        return order == "asc"
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      } else if (sort == "price") {
        return order == "asc" ? a.price - b.price : b.price - a.price;
      }
    });
  }
}

getProducts();
