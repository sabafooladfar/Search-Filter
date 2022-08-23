// http://localhost:3000/items

const searchInput = document.querySelector(".search-input");
const productContent = document.querySelector(".product-content");
const productBtn = document.querySelectorAll(".product-title-btn");

let allProducts = [];
const filters = {
    searchItems: "",
};

document.addEventListener("DOMContentLoaded", () => {
    axios
        .get("http://localhost:3000/items")
        .then((res) => {
            allProducts = res.data;
            renderProducts(res.data, filters);
        })
        .catch((err) => console.log(err))
});

function renderProducts(_products, _filters) {
    const filteredProducts = _products.filter((p) => {
        return p.title.toLowerCase().includes(_filters.searchItems.toLowerCase());
    });
    productContent.innerHTML = "";
    // console.log(filteredProducts);
    filteredProducts.forEach((item) => {
        const newDiv = document.createElement("div");
        newDiv.className = "col-12 col-md-6 col-lg-4 d-flex justify-content-center";
        newDiv.innerHTML = `
        <div class="card p-3 m-4" style="width: 18rem;">
        <img src=${item.image} class="card-img-top" alt="...">
        <div class="card-body d-flex justify-content-between align-items-center">
          <h6 class="card-title price text-secondary">${item.price} $</h6>
          <h6 class="card-title title">${item.title}</h6>
        </div>
        <a href="#" class="btn btn-outline-secondary">Add</a>
      </div>
      </div>
        `;
        productContent.appendChild(newDiv);
    });
}
searchInput.addEventListener("input", (e) => {
    filters.searchItems = e.target.value;
    renderProducts(allProducts, filters);
})
productBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const filter = e.target.dataset.filter;
        filters.searchItems = filter;
        renderProducts(allProducts, filters);
    });
});