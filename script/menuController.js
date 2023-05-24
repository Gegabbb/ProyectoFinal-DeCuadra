function Product(id, name, quantity, price) {
  this.id = id;
  this.name = name;
  this.quantity = quantity;
  this.price = price;
}

const products = [
  new Product("product_1", "Guiso", 1, 2302.54),
  new Product("product_2", "Asado", 1, 6150.15),
  new Product("product_3", "Ensalada", 1, 1200),
  new Product("product_4", "Sopa", 1, 2030.12),
  new Product("product_5", "CocaCola", 1, 350.25),
  new Product("product_6", "Sprite", 1, 350),
  new Product("product_7", "Pepsi", 1, 350.10),
  new Product("product_8", "Fanta", 1, 412.50),
  new Product("product_9", "Helado", 1, 1231.12 ),
  new Product("product_10", "Flan", 1, 935.42 ),
  new Product("product_11", "Gelatina", 1, 602.23),
  new Product("product_12", "Ensalada de fruta", 1, 1230.32),
  new Product("product_13", "Arroz con leche", 1, 702.65),
  new Product("product_14", "Torta de chocolate", 1, 1523.65),
];

