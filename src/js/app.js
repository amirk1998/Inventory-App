import CategoryView from './CategoryView.js';
import ProductView from './ProductView.js';

document.addEventListener('DOMContentLoaded', () => {
  // set App => Categories : OK
  CategoryView.setApp();
  ProductView.setApp();
  console.log(CategoryView);
  console.log(ProductView);
  // Create Categories Option
  CategoryView.createCategoriesList();
  ProductView.createProductsList(ProductView.products);
});
