import { defineStore } from 'pinia';

export const useDataStore = defineStore('data', {
  state: () => ({
    products: [
      { id: '1', code: 'f230fh0g3', name: 'Bamboo Watch', description: 'Product Description', image: 'bamboo-watch.jpg', price: 65, category: 'Accessories', quantity: 24, inventoryStatus: 'Top', rating: 5 },
      { id: '5', code: 'nvklal433', name: 'Black Watch', description: 'Product Description', image: 'black-watch.jpg', price: 72, category: 'Accessories', quantity: 61, inventoryStatus: 'Top', rating: 4 },
      { id: '2', code: 'zz21cz3c1', name: 'Blue Band', description: 'Product Description', image: 'blue-band.jpg', price: 79, category: 'Fitness', quantity: 2, inventoryStatus: 'Top', rating: 3 },
      { id: '3', code: '244wgerg2', name: 'Blue T-Shirt', description: 'Product Description', image: 'blue-t-shirt.jpg', price: 29, category: 'Clothing', quantity: 25, inventoryStatus: 'Top', rating: 5 },
      { id: '4', code: 'h456wer53', name: 'Bracelet', description: 'Product Description', image: 'bracelet.jpg', price: 15, category: 'Accessories', quantity: 73, inventoryStatus: 'Top', rating: 4 },
      { id: '1005', code: 'a1', name: 'Red Ball', description: 'Fun toy', image: 'red-ball.jpg', price: 10, category: 'Toys', quantity: 10, inventoryStatus: 'Top', rating: 4 },
      { id: '1006', code: 'a2', name: 'Green Ball', description: 'Fun toy', image: 'green-ball.jpg', price: 12, category: 'Toys', quantity: 8, inventoryStatus: 'Top', rating: 3 },
      { id: '1007', code: 'a3', name: 'Yellow Ball', description: 'Fun toy', image: 'yellow-ball.jpg', price: 11, category: 'Toys', quantity: 12, inventoryStatus: 'Top', rating: 5 },
      { id: '1008', code: 'a4', name: 'Blue Ball', description: 'Fun toy', image: 'blue-ball.jpg', price: 13, category: 'Toys', quantity: 7, inventoryStatus: 'Top', rating: 2 },
      { id: '1009', code: 'a5', name: 'Purple Ball', description: 'Fun toy', image: 'purple-ball.jpg', price: 14, category: 'Toys', quantity: 9, inventoryStatus: 'Top', rating: 4 },
      { id: '1010', code: 'a6', name: 'Orange Ball', description: 'Fun toy', image: 'orange-ball.jpg', price: 15, category: 'Toys', quantity: 6, inventoryStatus: 'Top', rating: 3 },
      { id: '1011', code: 'a7', name: 'Pink Ball', description: 'Fun toy', image: 'pink-ball.jpg', price: 16, category: 'Toys', quantity: 5, inventoryStatus: 'Top', rating: 5 },
    ]
  })
});
