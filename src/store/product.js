import { defineStore } from 'pinia'

export const useProductStore = defineStore('products', {
  state: () => ({
    products: [
    {
      id: 6,
      title: "Calvin Klein CK One",
      description: "CK One by Calvin Klein is a classic unisex fragrance, known for its fresh and clean scent. It's a versatile fragrance suitable for everyday wear.",
      price: 49.99,
      categories: "美妆护肤",
      image: "images/6.jpg"
    },
    {
      id: 7,
      title: "Chanel Coco Noir Eau De",
      description: "Coco Noir by Chanel is an elegant and mysterious fragrance, featuring notes of grapefruit, rose, and sandalwood. Perfect for evening occasions.",
      price: 129.99,
      categories: "美妆护肤",
      image: "images/7.jpg"
    },
    {
      id: 8,
      title: "Dior J'adore",
      description: "J'adore by Dior is a luxurious and floral fragrance, known for its blend of ylang-ylang, rose, and jasmine. It embodies femininity and sophistication.",
      price: 89.99,
      categories: "美妆护肤",
      image: "images/8.jpg"
    },
    {
      id: 9,
      title: "Dolce Shine Eau de",
      description: "Dolce Shine by Dolce & Gabbana is a vibrant and fruity fragrance, featuring notes of mango, jasmine, and blonde woods. It's a joyful and youthful scent.",
      price: 69.99,
      categories: "美妆护肤",
      image: "images/9.jpg"
    },
    {
      id: 10,
      title: "Gucci Bloom Eau de",
      description: "Gucci Bloom by Gucci is a floral and captivating fragrance, with notes of tuberose, jasmine, and Rangoon creeper. It's a modern and romantic scent.",
      price: 79.99,
      categories: "美妆护肤",
      image: "images/10.jpg"
    },
    {
      id: 17,
      title: "Beef Steak",
      description: "High-quality beef steak, great for grilling or cooking to your preferred level of doneness.",
      price: 12.99,
      categories: "食品饮料",
      image: "images/17.jpg"
    },
    {
      id: 18,
      title: "Cat Food",
      description: "Nutritious cat food formulated to meet the dietary needs of your feline friend.",
      price: 8.99,
      categories: "食品饮料",
      image: "images/18.jpg"
    },
    {
      id: 19,
      title: "Chicken Meat",
      description: "Fresh and tender chicken meat, suitable for various culinary preparations.",
      price: 9.99,
      categories: "食品饮料",
      image: "images/19.jpg"
    },
    {
      id: 20,
      title: "Cooking Oil",
      description: "Versatile cooking oil suitable for frying, sautéing, and various culinary applications.",
      price: 4.99,
      categories: "食品饮料",
      image: "images/20.jpg"
    },
    {
      id: 21,
      title: "Cucumber",
      description: "Crisp and hydrating cucumbers, ideal for salads, snacks, or as a refreshing side.",
      price: 1.49,
      categories: "食品饮料",
      image: "images/21.jpg"
    },
    {
      id: 22,
      title: "Dog Food",
      description: "Specially formulated dog food designed to provide essential nutrients for your canine companion.",
      price: 10.99,
      categories: "食品饮料",
      image: "images/22.jpg"
    },
    {
      id: 23,
      title: "Eggs",
      description: "Fresh eggs, a versatile ingredient for baking, cooking, or breakfast.",
      price: 2.99,
      categories: "食品饮料",
      image: "images/23.jpg"
    },
    {
      id: 24,
      title: "Fish Steak",
      description: "Quality fish steak, suitable for grilling, baking, or pan-searing.",
      price: 14.99,
      categories: "食品饮料",
      image: "images/24.jpg"
    },
    {
      id: 25,
      title: "Green Bell Pepper",
      description: "Fresh and vibrant green bell pepper, perfect for adding color and flavor to your dishes.",
      price: 1.29,
      categories: "食品饮料",
      image: "images/25.jpg"
    },
    {
      id: 26,
      title: "Green Chili Pepper",
      description: "Spicy green chili pepper, ideal for adding heat to your favorite recipes.",
      price: 0.99,
      categories: "食品饮料",
      image: "images/26.jpg"
    },
    {
      id: 27,
      title: "Honey Jar",
      description: "Pure and natural honey in a convenient jar, perfect for sweetening beverages or drizzling over food.",
      price: 6.99,
      categories: "食品饮料",
      image: "images/27.jpg"
    },
    {
      id: 28,
      title: "Ice Cream",
      description: "Creamy and delicious ice cream, available in various flavors for a delightful treat.",
      price: 5.49,
      categories: "食品饮料",
      image: "images/28.jpg"
    },
    {
      id: 29,
      title: "Juice",
      description: "Refreshing fruit juice, packed with vitamins and great for staying hydrated.",
      price: 3.99,
      categories: "食品饮料",
      image: "images/29.jpg"
    },
    {
      id: 30,
      title: "Kiwi",
      description: "Nutrient-rich kiwi, perfect for snacking or adding a tropical twist to your dishes.",
      price: 2.49,
      categories: "食品饮料",
      image: "images/30.jpg"
    },
    {
      id: 31,
      title: "Lemon",
      description: "Zesty and tangy lemons, versatile for cooking, baking, or making refreshing beverages.",
      price: 0.79,
      categories: "食品饮料",
      image: "images/31.jpg"
    },
    {
      id: 32,
      title: "Milk",
      description: "Fresh and nutritious milk, a staple for various recipes and daily consumption.",
      price: 3.49,
      categories: "食品饮料",
      image: "images/32.jpg"
    },
    {
      id: 33,
      title: "Mulberry",
      description: "Sweet and juicy mulberries, perfect for snacking or adding to desserts and cereals.",
      price: 4.99,
      categories: "食品饮料",
      image: "images/33.jpg"
    },
    {
      id: 34,
      title: "Nescafe Coffee",
      description: "Quality coffee from Nescafe, available in various blends for a rich and satisfying cup.",
      price: 7.99,
      categories: "食品饮料",
      image: "images/34.jpg"
    },
    {
      id: 35,
      title: "Potatoes",
      description: "Versatile and starchy potatoes, great for roasting, mashing, or as a side dish.",
      price: 2.29,
      categories: "食品饮料",
      image: "images/35.jpg"
    },
    {
      id: 36,
      title: "Protein Powder",
      description: "Nutrient-packed protein powder, ideal for supplementing your diet with essential proteins.",
      price: 19.99,
      categories: "食品饮料",
      image: "images/36.jpg"
    },
    {
      id: 37,
      title: "Red Onions",
      description: "Flavorful and aromatic red onions, perfect for adding depth to your savory dishes.",
      price: 1.99,
      categories: "食品饮料",
      image: "images/37.jpg"
    },
    {
      id: 38,
      title: "Rice",
      description: "High-quality rice, a staple for various cuisines and a versatile base for many dishes.",
      price: 5.99,
      categories: "食品饮料",
      image: "images/38.jpg"
    },
    {
      id: 39,
      title: "Soft Drinks",
      description: "Assorted soft drinks in various flavors, perfect for refreshing beverages.",
      price: 1.99,
      categories: "食品饮料",
      image: "images/39.jpg"
    },
    {
      id: 40,
      title: "Strawberry",
      description: "Sweet and succulent strawberries, great for snacking, desserts, or blending into smoothies.",
      price: 3.99,
      categories: "食品饮料",
      image: "images/40.jpg"
    },
    {
      id: 41,
      title: "Tissue Paper Box",
      description: "Convenient tissue paper box for everyday use, providing soft and absorbent tissues.",
      price: 2.49,
      categories: "食品饮料",
      image: "images/41.jpg"
    },
    {
      id: 42,
      title: "Water",
      description: "Pure and refreshing bottled water, essential for staying hydrated throughout the day.",
      price: 0.99,
      categories: "食品饮料",
      image: "images/42.jpg"
    },
    {
      id: 43,
      title: "Decoration Swing",
      description: "The Decoration Swing is a charming addition to your home decor. Crafted with intricate details, it adds a touch of elegance and whimsy to any room.",
      price: 59.99,
      categories: "家用电器",
      image: "images/43.jpg"
    },
    {
      id: 44,
      title: "Family Tree Photo Frame",
      description: "The Family Tree Photo Frame is a sentimental and stylish way to display your cherished family memories. With multiple photo slots, it tells the story of your loved ones.",
      price: 29.99,
      categories: "家用电器",
      image: "images/44.jpg"
    },
    {
      id: 45,
      title: "House Showpiece Plant",
      description: "The House Showpiece Plant is an artificial plant that brings a touch of nature to your home without the need for maintenance. It adds greenery and style to any space.",
      price: 39.99,
      categories: "家用电器",
      image: "images/45.jpg"
    },
    {
      id: 46,
      title: "Plant Pot",
      description: "The Plant Pot is a stylish container for your favorite plants. With a sleek design, it complements your indoor or outdoor garden, adding a modern touch to your plant display.",
      price: 14.99,
      categories: "家用电器",
      image: "images/46.jpg"
    },
    {
      id: 47,
      title: "Table Lamp",
      description: "The Table Lamp is a functional and decorative lighting solution for your living space. With a modern design, it provides both ambient and task lighting, enhancing the atmosphere.",
      price: 49.99,
      categories: "家用电器",
      image: "images/47.jpg"
    },
    {
      id: 79,
      title: "Asus Zenbook Pro Dual Screen Laptop",
      description: "The Asus Zenbook Pro Dual Screen Laptop is a high-performance device with dual screens, providing productivity and versatility for creative professionals.",
      price: 1799.99,
      categories: "电脑办公",
      image: "images/79.jpg"
    },
    {
      id: 80,
      title: "Huawei Matebook X Pro",
      description: "The Huawei Matebook X Pro is a slim and stylish laptop with a high-resolution touchscreen display, offering a premium experience for users on the go.",
      price: 1399.99,
      categories: "电脑办公",
      image: "images/80.jpg"
    },
    {
      id: 82,
      title: "New DELL XPS 13 9300 Laptop",
      description: "The New DELL XPS 13 9300 Laptop is a compact and powerful device, featuring a virtually borderless InfinityEdge display and high-end performance for various tasks.",
      price: 1499.99,
      categories: "电脑办公",
      image: "images/82.jpg"
    },
    {
      id: 83,
      title: "Blue & Black Check Shirt",
      description: "The Blue & Black Check Shirt is a stylish and comfortable men's shirt featuring a classic check pattern. Made from high-quality fabric, it's suitable for both casual and semi-formal occasions.",
      price: 29.99,
      categories: "服装鞋帽",
      image: "images/83.jpg"
    },
    {
      id: 84,
      title: "Gigabyte Aorus Men Tshirt",
      description: "The Gigabyte Aorus Men Tshirt is a cool and casual shirt for gaming enthusiasts. With the Aorus logo and sleek design, it's perfect for expressing your gaming style.",
      price: 24.99,
      categories: "服装鞋帽",
      image: "images/84.jpg"
    },
    {
      id: 85,
      title: "Man Plaid Shirt",
      description: "The Man Plaid Shirt is a timeless and versatile men's shirt with a classic plaid pattern. Its comfortable fit and casual style make it a wardrobe essential for various occasions.",
      price: 34.99,
      categories: "服装鞋帽",
      image: "images/85.jpg"
    },
    {
      id: 86,
      title: "Man Short Sleeve Shirt",
      description: "The Man Short Sleeve Shirt is a breezy and stylish option for warm days. With a comfortable fit and short sleeves, it's perfect for a laid-back yet polished look.",
      price: 19.99,
      categories: "服装鞋帽",
      image: "images/86.jpg"
    },
    {
      id: 87,
      title: "Men Check Shirt",
      description: "The Men Check Shirt is a classic and versatile shirt featuring a stylish check pattern. Suitable for various occasions, it adds a smart and polished touch to your wardrobe.",
      price: 27.99,
      categories: "服装鞋帽",
      image: "images/87.jpg"
    }]
  }),
  actions: {
  }
})
