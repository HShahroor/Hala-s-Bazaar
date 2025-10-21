const form = document.querySelector(".create-product-form");
const preview = document.querySelector("#preview");


form.image.addEventListener("change", () => {
  const file = form.image.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);

  reader.onload = e => {
    preview.setAttribute("src", e.target.result);
  };
});


form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  
    const response=await axios.post("https://dummyjson.com/products/add", formData)
      

    Swal.fire({
      title: "Product Added!",
      text: "The new product has been added successfully.",
      icon: "success"
    });

    form.reset();
    preview.setAttribute("src", "");

});
