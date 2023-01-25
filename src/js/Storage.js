const product = [
  {
    id: 1,
    title: 'FrontEnd',
    quantity: 12,
    category: 'FrontEnd ',
    createdAt: '2012-10-025T14:32:00.000Z',
    updatedAt: '2012-10-025T14:32:00.000Z',
  },
  {
    id: 2,
    title: 'BackEnd',
    quantity: 8,
    category: 'BackEnd ',
    createdAt: '2014-09-03T14:48:00.000Z',
    updatedAt: '2012-10-025T14:32:00.000Z',
  },
  {
    id: 3,
    title: 'IOS',
    quantity: 6,
    category: 'IOS ',
    createdAt: '2015-06-04T06:21:00.000Z',
    updatedAt: '2012-10-025T14:32:00.000Z',
  },
  {
    id: 4,
    title: 'DevOps',
    quantity: 3,
    category: 'DevOps ',
    createdAt: '2017-07-05T19:16:00.000Z',
    updatedAt: '2012-10-025T14:32:00.000Z',
  },
];

const category = [
  {
    id: 1,
    title: 'FrontEnd',
    description: 'FrontEnd Developer is Good ',
    createdAt: '2011-11-025T14:32:00.000Z',
  },
  {
    id: 2,
    title: 'BackEnd',
    description: 'BackEnd Developer is Good ',
    createdAt: '2013-10-03T14:48:00.000Z',
  },
  {
    id: 3,
    title: 'IOS',
    description: 'IOS Developer is Good ',
    createdAt: '2016-09-04T06:21:00.000Z',
  },
  {
    id: 4,
    title: 'DevOps',
    description: 'DevOps Developer is Good ',
    createdAt: '2019-08-05T19:16:00.000Z',
  },
];

export default class Storage {
  // property
  // save,delete,update => method
  //
  // Add new category
  // Save,Edit category
  // getAllCategories

  static getAllCategories() {
    // products , category => local storage
    const savedCategories = JSON.parse(localStorage.getItem('category')) || [];
    // Sort => نزولی (descending)
    const sortedCategories = savedCategories.sort((a, b) => {
      return new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1;
    });
    return sortedCategories;
  }

  static saveCategory(categoryToSave) {
    const savedCategories = this.getAllCategories();
    const existedItem = savedCategories.find((item) => item.id == categoryToSave.id);

    if (existedItem) {
      // edit
      existedItem.title = categoryToSave.title;
      existedItem.description = categoryToSave.description;
    } else {
      //new Category
      // categoryToSave.id = new Date().getTime();
      categoryToSave.id = crypto.randomUUID();
      categoryToSave.createdAt = new Date().toISOString();
      savedCategories.push(categoryToSave);
    }
    localStorage.setItem('category', JSON.stringify(savedCategories));
  }

  static getAllProducts(sortOption = 'newest') {
    const savedProducts = JSON.parse(localStorage.getItem('products')) || [];
    // Sort => نزولی (descending)
    const sortedProducts = savedProducts.sort((a, b) => {
      // return new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1;
      if (sortOption === 'newest') {
        return new Date(a.updatedAt) > new Date(b.updatedAt) ? -1 : 1;
      } else if (sortOption === 'oldest') {
        return new Date(a.updatedAt) < new Date(b.updatedAt) ? -1 : 1;
      }
    });
    return sortedProducts;
  }

  static saveProducts(productToSave) {
    const savedProducts = this.getAllProducts();
    const existedItem = savedProducts.find((item) => item.id == productToSave.id);

    if (existedItem) {
      // edit
      existedItem.title = productToSave.title;
      existedItem.quantity = productToSave.quantity;
      existedItem.category = productToSave.category;
      existedItem.createdAt = productToSave.createdAt;
      existedItem.updatedAt = new Date().toISOString();
    } else {
      //new Category
      // productToSave.id = new Date().getTime();
      productToSave.id = crypto.randomUUID();
      productToSave.createdAt = new Date().toISOString();
      productToSave.updatedAt = new Date().toISOString();
      savedProducts.push(productToSave);
    }
    localStorage.setItem('products', JSON.stringify(savedProducts));
  }

  static deleteProduct(id) {
    const savedProducts = this.getAllProducts();
    const filteredProducts = savedProducts.filter((p) => p.id !== id);
    localStorage.setItem('products', JSON.stringify(filteredProducts));
  }
}
