const getDetails = async () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

        const response = await axios.get(`https://dummyjson.com/products/${id}`);
        const data = response.data;

        document.querySelector(".title").textContent = data.title;
        document.querySelector(".product-img").setAttribute("src", data.thumbnail);

        const result = `
        <li class="list-group-item"><strong>Brand:</strong> ${data.brand}</li>
        <li class="list-group-item"><strong>Category:</strong> ${data.category}</li>
        <li class="list-group-item"><strong>Price:</strong> $${data.price}</li>
        <li class="list-group-item"><strong>Rating:</strong> ${data.rating}</li>
        <li class="list-group-item"><strong>Description:</strong> ${data.description}</li>
    `;

        document.querySelector(".detail").innerHTML = result;
};

getDetails();
