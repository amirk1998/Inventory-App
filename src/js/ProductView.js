import Storage from './Storage.js';

const productTitle = document.querySelector('#product-title');
const productQuantity = document.querySelector('#product-quantity');
const productCategory = document.querySelector('#product-category');
const addNewProductBtn = document.querySelector('#add-new-product');
const searchInput = document.querySelector('#search-input');
const selectedSort = document.querySelector('#sort-products');

class ProductView {
  constructor() {
    addNewProductBtn.addEventListener('click', (event) => this.addNewProduct(event));
    searchInput.addEventListener('input', (event) => this.searchProducts(event));
    selectedSort.addEventListener('change', (event) => this.sortProducts(event));

    this.products = [];
  }

  setApp() {
    this.products = Storage.getAllProducts();
  }

  addNewProduct(event) {
    event.preventDefault();
    const title = productTitle.value;
    const quantity = productQuantity.value;
    const category = productCategory.value;
    if (!title || !category || !quantity) return;
    Storage.saveProducts({ title, category, quantity });
    this.products = Storage.getAllProducts();
    this.createProductsList(this.products);
    console.log(this.products);
  }

  createProductsList(products) {
    let result = '';
    products.forEach((element) => {
      const options = { hour: '2-digit', minute: '2-digit', hour12: false };
      const selectedCategory = Storage.getAllCategories().find((item) => item.id == element.category);
      result += `    <!-- Product Item # -->
      <div class="flex items-center justify-between">
        <p class="text-base text-slate-300 font-bold ">${element.title}</p>
        <div class="flex items-center justify-center gap-x-3">
        
        <p class="text-base text-slate-300 font-bold ">${new Date(element.createdAt).toLocaleDateString('en-US')}</p>
        <p class="text-base text-slate-300 font-bold ">${new Date(element.createdAt).toLocaleTimeString('en-US', options)}</p>
        <p class="text-sm text-slate-400 font-bold block px-3 py-0.5 border border-slate-400 rounded-2xl w-32 text-center ">${selectedCategory.title}</p>
        <span class="flex items-center justify-center w-7 h-7 rounded-full bg-slate-500 border-2 border-slate-300 font-bold text-slate-300">${element.quantity}</span>
        <button class="edit-product text-base border border-sky-400 px-2 py-0.5 rounded-2xl text-sky-400 hover:text-sky-600 hover:border-sky-600 font-bold" aria-label="edit-product" data-product-id=${element.id}  >Edit</button>
        <button class=" delete-product text-base border border-red-400 px-2 py-0.5 rounded-2xl text-red-400 hover:text-red-600 hover:border-red-600 font-bold" aria-label="delete-product" data-product-id=${element.id} >Delete</button>
        </div>
      </div>
      `;
    });

    // For Edit Button :
    // data-modal-target="defaultModal"
    // data-modal-toggle="defaultModal"
    //
    const productsDOM = document.querySelector('#products-list');
    productsDOM.innerHTML = result;
    const deleteBtns = [...document.querySelectorAll('.delete-product')];
    // console.log(deleteBtns);
    deleteBtns.forEach((item) => {
      item.addEventListener('click', (event) => this.deleteProduct(event));
    });

    const editBtns = [...document.querySelectorAll('.edit-product')];
    console.log(editBtns);
    editBtns.forEach((item) => {
      item.addEventListener('click', (event) => this.editProduct(event));
    });
  }

  searchProducts(event) {
    const value = event.target.value.trim().toLowerCase();
    const filteredProducts = this.products.filter((p) => {
      return p.title.toLowerCase().includes(value);
    });

    this.createProductsList(filteredProducts);
    // console.log(value);
    // console.log(this.products);
    // console.log(filteredProducts);
  }

  sortProducts(event) {
    const value = event.target.value;
    // console.log({ value });
    this.products = Storage.getAllProducts(value);
    this.createProductsList(this.products);
  }

  deleteProduct(event) {
    const productId = event.target.dataset.productId;
    // console.log(event.target.dataset.productId);
    Storage.deleteProduct(productId);
    this.products = Storage.getAllProducts();
    this.createProductsList(this.products);
  }

  editProduct(event) {
    const productId = event.target.dataset.productId;
    console.log(productId);
  }
}

export default new ProductView();
