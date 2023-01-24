import Storage from './Storage.js';

const productTitle = document.querySelector('#product-title');
const productQuantity = document.querySelector('#product-quantity');
const productCategory = document.querySelector('#product-category');
const addNewProductBtn = document.querySelector('#add-new-product');

class ProductView {
  //
  constructor() {
    addNewProductBtn.addEventListener('click', (event) => this.addNewProduct(event));
    this.products = [];
  }

  setApp() {
    //
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
    this.createProductsList();
    console.log(this.products);
  }

  createProductsList() {
    //

    let result = '';
    this.products.forEach((element) => {
      const options = { hour: '2-digit', minute: '2-digit', hour12: false };
      const selectedCategory = Storage.getAllCategories().find((item) => item.id == element.category);
      result += `    <!-- Product Item # -->
      <div class="flex items-center justify-between">
        <p class="text-base text-slate-300 font-bold">${element.title}</p>
        <div class="flex items-center justify-center gap-x-3">
        
        <p class="text-base text-slate-300 font-bold ">${new Date(element.createdAt).toLocaleDateString('en-US')}</p>
        <p class="text-base text-slate-300 font-bold ">${new Date(element.createdAt).toLocaleTimeString('en-US', options)}</p>
        <p class="text-sm text-slate-400 font-bold block px-3 py-0.5 border border-slate-400 rounded-2xl ">${selectedCategory.title}</p>
        <span class="flex items-center justify-center w-7 h-7 rounded-full bg-slate-500 border-2 border-slate-300 font-bold text-slate-300">${element.quantity}</span>
        <button class="text-base border border-red-400 px-2 py-0.5 rounded-2xl text-red-400 hover:text-red-600 hover:border-red-600 font-bold" aria-label="delete-product" data-id=${element.id} >Delete</button>
        </div>
      </div>
      `;
    });

    const productsDOM = document.querySelector('#products-list');
    productsDOM.innerHTML = result;
  }
}

export default new ProductView();
