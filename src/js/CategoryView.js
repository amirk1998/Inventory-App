import Storage from './Storage.js';
//  title , description => saveCategory => ...
const categoryTitle = document.querySelector('#category-title');
const categoryDescription = document.querySelector('#category-description');
const addNewCategoryBtn = document.querySelector('#add-new-category');
const toggleAddCategoryBtn = document.querySelector('#toggle-add-category');
const categoryWrapper = document.querySelector('#category-wrapper');
const cancelAddCategoryBtn = document.querySelector('#cancel-add-category');

class CategoryView {
  //
  constructor() {
    //
    addNewCategoryBtn.addEventListener('click', (event) => this.addNewCategory(event));
    toggleAddCategoryBtn.addEventListener('click', (event) => this.toggleAddCategory(event));
    cancelAddCategoryBtn.addEventListener('click', (event) => this.cancelAddCategory(event));
    this.categories = [];
  }

  addNewCategory(event) {
    //
    event.preventDefault();
    const title = categoryTitle.value;
    const description = categoryDescription.value;
    if (!title || !description) {
      categoryTitle.classList.remove('border-slate-500');
      categoryTitle.classList.add('border-red-500');
      document.querySelector('#category-title-error').classList.remove('hidden');
      categoryDescription.classList.remove('border-slate-500');
      categoryDescription.classList.add('border-red-500');
      document.querySelector('#category-description-error').classList.remove('hidden');

      return;
    }
    Storage.saveCategory({ title, description });
    this.categories = Storage.getAllCategories();
    // update DOM : update select option in category
    this.createCategoriesList();
    categoryTitle.value = '';
    categoryDescription.value = '';
    categoryWrapper.classList.add('hidden');
    toggleAddCategoryBtn.classList.remove('hidden');
  }

  setApp() {
    //
    this.categories = Storage.getAllCategories();
  }

  createCategoriesList() {
    //
    let result = `<option class="bg-slate-500 text-slate-300" value="" disabled selected hidden>Select a category</option>`;
    this.categories.forEach((element) => {
      //
      result += `<option class="bg-slate-500 text-slate-300" value=${element.id}>${element.title}</option>`;
    });

    const categoryDOM = document.querySelector('#product-category');
    categoryDOM.innerHTML = result;
  }

  toggleAddCategory(event) {
    event.preventDefault();
    categoryWrapper.classList.remove('hidden');
    toggleAddCategoryBtn.classList.add('hidden');
  }

  cancelAddCategory(event) {
    event.preventDefault();
    toggleAddCategoryBtn.classList.remove('hidden');
    categoryWrapper.classList.add('hidden');
  }
}

export default new CategoryView();
