import Storage from './Storage.js';
//  title , description => saveCategory => ...
const title = document.querySelector('#category-title');
const description = document.querySelector('#category-description');
const addNewCategoryBtn = document.querySelector('#add-new-category');

export default class CategoryView {
  //
  constructor() {
    //
    addNewCategoryBtn.addEventListener('click', (event) => this.addNewCategory(event));
    this.categories = [];
  }

  addNewCategory(event) {
    //
    event.preventDefault();
    const title = title.value;
    const description = description.value;
    if (!title || !description) return;
    Storage.saveCategory({ title, description });
    this.categories = Storage.getAllCategories();
    // update DOM : update select option in category
    // 161
  }
}
