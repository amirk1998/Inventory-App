import Storage from './Storage.js';
import CategoryView from './CategoryView.js';

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
        <button class="edit-product text-base border border-sky-400 px-2 py-0.5 rounded-2xl text-sky-400 hover:text-sky-600 hover:border-sky-600 font-bold" aria-label="edit-product" data-product-id=${element.id} data-modal-target="defaultModal"
        data-modal-toggle="defaultModal" >Edit</button>
        <!-- Main modal -->
        <div id="defaultModal" tabindex="-1" aria-hidden="true" class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full">
          <div class="bg-slate-900 relative w-full h-full max-w-2xl md:h-auto">
            <!-- Modal content -->
            <div class="relative bg-gray-200 rounded-lg shadow dark:bg-gray-700">
              <!-- Modal header -->
              <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Edit Product</h3>
                <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="defaultModal">
                  <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span class="sr-only">Close modal</span>
                </button>
              </div>
              <!-- Modal body -->
              <div class="main-modal p-6 space-y-6 " data-product-id=${element.id}>
                
              </div>
              <!-- Modal footer -->
              <div class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                
                <button
                  data-modal-hide="defaultModal"
                  type="button"
                  class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                >
                  Cancel
                </button>
                <button
                  data-modal-hide="defaultModal"
                  type="button"
                  id="edit-product-btn"
                  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>
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
    // console.log(editBtns);
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
    event.preventDefault();
    const productId = event.target.dataset.productId;
    console.log(productId);
    const editedProduct = this.products.find((element) => element.id === productId);
    console.log(editedProduct);
    const selectedCategory = Storage.getAllCategories().find((item) => item.id == editedProduct.category);
    console.log(selectedCategory);
    // Begin::Category List Created in Edit Product
    let result = ``;
    Storage.getAllCategories().forEach((element) => {
      if (element.id === selectedCategory.id) {
        result += `<option class="category-list bg-slate-500 text-slate-300" selected value=${element.id} data-product-id=${element.id} >${element.title}</option>`;
      } else {
        result += `<option class="category-list bg-slate-500 text-slate-300" value=${element.id} data-product-id=${element.id} >${element.title}</option>`;
      }
    });
    const categoryDOM = document.querySelector('#product-category');
    categoryDOM.innerHTML = result;
    // Finsih::Category List Created in Edit Product
    const mainModal = document.querySelector('.main-modal');
    mainModal.innerHTML = `
    <div class="flex flex-col  rounded-xl gap-y-4 p-2">
    <form class="flex flex-col  rounded-xl gap-y-4 p-2">
      <div>
        <label for="product-title" class="block mb-1 text-slate-800">title</label>
        <input class="bg-transparent px-2 rounded-xl border border-slate-800 text-slate-800 h-10 w-full md:w-auto" type="text" name="product-title" id="product-title" aria-label="product-title" value=${editedProduct.title} />
      </div>
      <div>
        <label for="product-quantity" class="block mb-1 text-slate-800">quantity</label>
        <input
          class="bg-transparent rounded-xl border border-slate-800 text-slate-800 h-10 w-full px-2 md:w-auto appearance-none"
          type="number"
          name="product-quantity"
          id="product-quantity"
          aria-label="product-quantity"
          min="1"
          step="1"
          value=${editedProduct.quantity}
        />
      </div>
      <div>
        <label for="product-category" class="block mb-1 text-slate-800">category</label>
        <select name="product-category" id="product-category" class="form-select bg-transparent text-slate-800 rounded-xl w-full border border-slate-800 h-10 px-2 blo">
        
        ${result}
        </select>
      </div>
      </form>
  </div>
    `;
    // let newEditProduct = {};
    const editProductModalBtn = document.querySelector('#edit-product-btn');
    editProductModalBtn.addEventListener('click', (event) => {
      // console.log('Edit Product Btn in modal has been clicked');
      // console.log(event.target);
      document.querySelector('#product-title').value = editedProduct.title;
      document.querySelector('#product-category').value = editedProduct.category;
      document.querySelector('#product-quantity').value = editedProduct.quantity;

      Storage.saveProducts(editedProduct);
      this.products = Storage.getAllProducts();
      this.createProductsList(this.products);
      // console.log(newEditProduct);
    });
  }
}

export default new ProductView();
