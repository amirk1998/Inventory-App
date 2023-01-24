import Storage from './Storage.js';
//  title , description => saveCategory => ...
const categoryTitle = document.querySelector('#category-title');
const categoryDescription = document.querySelector('#category-description');
const addNewCategoryBtn = document.querySelector('#add-new-category');

class CategoryView {
  //
  constructor() {
    //
    addNewCategoryBtn.addEventListener('click', (event) => this.addNewCategory(event));
    this.categories = [];
  }

  addNewCategory(event) {
    //
    event.preventDefault();
    const title = categoryTitle.value;
    const description = categoryDescription.value;
    if (!title || !description) return;
    Storage.saveCategory({ title, description });
    this.categories = Storage.getAllCategories();
    // update DOM : update select option in category
    this.createCategoriesList();
    categoryTitle.value = '';
    categoryDescription.value = '';
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
}

export default new CategoryView();
