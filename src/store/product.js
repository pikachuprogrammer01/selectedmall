import { defineStore } from 'pinia'

export const useProductStore = defineStore('products', {
  state: () => ({
    products: [{
      id: 6,
      title: "Calvin Klein CK One 中性香水",
      description: "CK One 是 Calvin Klein 推出的经典中性香水，以清新柑橘香调著称，适合日常使用。",
      price: 49.99,
      categories: "美妆护肤",
      image: "/images/6.jpg",
      stock: 200,
      specs: [
        { key: "brand", value: "Calvin Klein" },
        { key: "volume", value: "100ml" },
        { key: "fragranceType", value: "Citrus Fresh" },
        { key: "gender", value: "Unisex" }
      ]
    },
    {
      id: 7,
      title: "香奈儿 Coco Noir 黑色可可香水",
      description: "Coco Noir 是香奈儿推出的优雅神秘香水，融合葡萄柚、玫瑰和檀香木香调。",
      price: 129.99,
      categories: "美妆护肤",
      image: "/images/7.jpg",
      stock: 120,
      specs: [
        { key: "brand", value: "Chanel" },
        { key: "volume", value: "100ml" },
        { key: "fragranceType", value: "Oriental Floral" },
        { key: "gender", value: "Women" }
      ]
    },
    {
      id: 8,
      title: "迪奥 J'adore 真我香水",
      description: "迪奥经典花香香水，融合依兰、玫瑰和茉莉。",
      price: 89.99,
      categories: "美妆护肤",
      image: "/images/8.jpg",
      stock: 150,
      specs: [
        { key: "brand", value: "Dior" },
        { key: "volume", value: "100ml" },
        { key: "fragranceType", value: "Floral" },
        { key: "gender", value: "Women" }
      ]
    },
    {
      id: 9,
      title: "Dolce Shine 阳光香水",
      description: "充满活力的果香花香型香水。",
      price: 69.99,
      categories: "美妆护肤",
      image: "/images/9.jpg",
      stock: 140,
      specs: [
        { key: "brand", value: "Dolce & Gabbana" },
        { key: "volume", value: "75ml" },
        { key: "fragranceType", value: "Fruity Floral" },
        { key: "gender", value: "Women" }
      ]
    },
    {
      id: 10,
      title: "Gucci Bloom 绽放香水",
      description: "古驰经典花香香水。",
      price: 79.99,
      categories: "美妆护肤",
      image: "/images/10.jpg",
      stock: 130,
      specs: [
        { key: "brand", value: "Gucci" },
        { key: "volume", value: "100ml" },
        { key: "fragranceType", value: "Floral" },
        { key: "gender", value: "Women" }
      ]
    },

    {
      id: 17,
      title: "优质牛排",
      description: "高品质牛排，适合烧烤或煎制。",
      price: 12.99,
      categories: "食品饮料",
      image: "/images/17.jpg",
      stock: 300,
      specs: [
        { key: "type", value: "Beef" },
        { key: "size", value: "500g" },
        { key: "shelfLife", value: "7 days" },
        { key: "storage", value: "Refrigerated" }
      ]
    },
    {
      id: 18,
      title: "猫粮",
      description: "营养均衡的猫粮。",
      price: 8.99,
      categories: "食品饮料",
      image: "/images/18.jpg",
      stock: 500,
      specs: [
        { key: "type", value: "Cat Food" },
        { key: "size", value: "2kg" },
        { key: "shelfLife", value: "12 months" },
        { key: "storage", value: "Dry place" }
      ]
    },
    {
      id: 19,
      title: "新鲜鸡肉",
      description: "新鲜鸡肉，适合多种烹饪方式。",
      price: 9.99,
      categories: "食品饮料",
      image: "/images/19.jpg",
      stock: 280,
      specs: [
        { key: "type", value: "Chicken" },
        { key: "size", value: "1kg" },
        { key: "shelfLife", value: "5 days" },
        { key: "storage", value: "Refrigerated" }
      ]
    },
    {
      id: 20,
      title: "食用油",
      description: "多用途植物油。",
      price: 4.99,
      categories: "食品饮料",
      image: "/images/20.jpg",
      stock: 400,
      specs: [
        { key: "type", value: "Vegetable Oil" },
        { key: "size", value: "1L" },
        { key: "shelfLife", value: "18 months" },
        { key: "storage", value: "Room temperature" }
      ]
    },
    {
      id: 21,
      title: "新鲜黄瓜",
      description: "清爽多汁的黄瓜。",
      price: 1.49,
      categories: "食品饮料",
      image: "/images/21.jpg",
      stock: 350,
      specs: [
        { key: "type", value: "Vegetable" },
        { key: "size", value: "500g" },
        { key: "shelfLife", value: "3 days" },
        { key: "storage", value: "Refrigerated" }
      ]
    },
    {
      id: 22,
      title: "狗粮",
      description: "为狗狗提供均衡营养。",
      price: 10.99,
      categories: "食品饮料",
      image: "/images/22.jpg",
      stock: 420,
      specs: [
        { key: "type", value: "Dog Food" },
        { key: "size", value: "3kg" },
        { key: "shelfLife", value: "12 months" },
        { key: "storage", value: "Dry place" }
      ]
    },
    {
      id: 23,
      title: "新鲜鸡蛋",
      description: "新鲜鸡蛋，适合早餐。",
      price: 2.99,
      categories: "食品饮料",
      image: "/images/23.jpg",
      stock: 600,
      specs: [
        { key: "type", value: "Eggs" },
        { key: "size", value: "12pcs" },
        { key: "shelfLife", value: "15 days" },
        { key: "storage", value: "Refrigerated" }
      ]
    },
    {
      id: 24,
      title: "鱼排",
      description: "优质鱼排，适合煎烤烹饪。",
      price: 14.99,
      categories: "食品饮料",
      image: "/images/24.jpg",
      stock: 260,
      specs: [
        { key: "type", value: "Fish" },
        { key: "size", value: "500g" },
        { key: "shelfLife", value: "5 days" },
        { key: "storage", value: "Frozen" }
      ]
    },
    {
      id: 25,
      title: "青椒",
      description: "新鲜青椒，为菜肴增添颜色和风味。",
      price: 1.29,
      categories: "食品饮料",
      image: "/images/25.jpg",
      stock: 340,
      specs: [
        { key: "type", value: "Vegetable" },
        { key: "size", value: "500g" },
        { key: "shelfLife", value: "4 days" },
        { key: "storage", value: "Refrigerated" }
      ]
    },
    {
      id: 26,
      title: "青辣椒",
      description: "辛辣青椒，适合烹饪调味。",
      price: 0.99,
      categories: "食品饮料",
      image: "/images/26.jpg",
      stock: 360,
      specs: [
        { key: "type", value: "Vegetable" },
        { key: "size", value: "300g" },
        { key: "shelfLife", value: "4 days" },
        { key: "storage", value: "Refrigerated" }
      ]
    },
    {
      id: 27,
      title: "蜂蜜罐",
      description: "天然纯蜂蜜，适合搭配面包或饮品。",
      price: 6.99,
      categories: "食品饮料",
      image: "/images/27.jpg",
      stock: 200,
      specs: [
        { key: "type", value: "Honey" },
        { key: "size", value: "500g" },
        { key: "shelfLife", value: "24 months" },
        { key: "storage", value: "Room temperature" }
      ]
    },
    {
      id: 28,
      title: "冰淇淋",
      description: "香甜顺滑的冰淇淋甜品。",
      price: 5.49,
      categories: "食品饮料",
      image: "/images/28.jpg",
      stock: 260,
      specs: [
        { key: "type", value: "Ice Cream" },
        { key: "size", value: "500ml" },
        { key: "shelfLife", value: "12 months" },
        { key: "storage", value: "Frozen" }
      ]
    },
    {
      id: 29,
      title: "果汁",
      description: "富含维生素的清爽果汁饮料。",
      price: 3.99,
      categories: "食品饮料",
      image: "/images/29.jpg",
      stock: 420,
      specs: [
        { key: "type", value: "Juice" },
        { key: "size", value: "1L" },
        { key: "shelfLife", value: "12 months" },
        { key: "storage", value: "Room temperature" }
      ]
    },
    {
      id: 30,
      title: "猕猴桃",
      description: "营养丰富的猕猴桃水果。",
      price: 2.49,
      categories: "食品饮料",
      image: "/images/30.jpg",
      stock: 300,
      specs: [
        { key: "type", value: "Fruit" },
        { key: "size", value: "500g" },
        { key: "shelfLife", value: "5 days" },
        { key: "storage", value: "Refrigerated" }
      ]
    },
    {
      id: 31,
      title: "柠檬",
      description: "酸爽柠檬，适合制作饮料或调味。",
      price: 0.79,
      categories: "食品饮料",
      image: "/images/31.jpg",
      stock: 350,
      specs: [
        { key: "type", value: "Fruit" },
        { key: "size", value: "500g" },
        { key: "shelfLife", value: "5 days" },
        { key: "storage", value: "Refrigerated" }
      ]
    },
    {
      id: 32,
      title: "牛奶",
      description: "新鲜牛奶，富含蛋白质和钙质。",
      price: 3.49,
      categories: "食品饮料",
      image: "/images/32.jpg",
      stock: 380,
      specs: [
        { key: "type", value: "Milk" },
        { key: "size", value: "1L" },
        { key: "shelfLife", value: "7 days" },
        { key: "storage", value: "Refrigerated" }
      ]
    },
    {
      id: 33,
      title: "桑葚",
      description: "甜美多汁的桑葚水果。",
      price: 4.99,
      categories: "食品饮料",
      image: "/images/33.jpg",
      stock: 200,
      specs: [
        { key: "type", value: "Fruit" },
        { key: "size", value: "400g" },
        { key: "shelfLife", value: "3 days" },
        { key: "storage", value: "Refrigerated" }
      ]
    },
    {
      id: 34,
      title: "雀巢咖啡",
      description: "香醇速溶咖啡，适合日常饮用。",
      price: 7.99,
      categories: "食品饮料",
      image: "/images/34.jpg",
      stock: 260,
      specs: [
        { key: "brand", value: "Nescafe" },
        { key: "size", value: "200g" },
        { key: "shelfLife", value: "24 months" },
        { key: "storage", value: "Dry place" }
      ]
    },
    {
      id: 35,
      title: "土豆",
      description: "常见食材，可煮、炸或烤制。",
      price: 2.29,
      categories: "食品饮料",
      image: "/images/35.jpg",
      stock: 360,
      specs: [
        { key: "type", value: "Vegetable" },
        { key: "size", value: "1kg" },
        { key: "shelfLife", value: "7 days" },
        { key: "storage", value: "Cool dry place" }
      ]
    },
    {
      id: 36,
      title: "蛋白粉",
      description: "高蛋白营养补充品。",
      price: 19.99,
      categories: "食品饮料",
      image: "/images/36.jpg",
      stock: 180,
      specs: [
        { key: "type", value: "Protein Powder" },
        { key: "size", value: "1kg" },
        { key: "shelfLife", value: "24 months" },
        { key: "storage", value: "Dry place" }
      ]
    },
    {
      id: 37,
      title: "红洋葱",
      description: "风味浓郁的红洋葱。",
      price: 1.99,
      categories: "食品饮料",
      image: "/images/37.jpg",
      stock: 320,
      specs: [
        { key: "type", value: "Vegetable" },
        { key: "size", value: "500g" },
        { key: "shelfLife", value: "7 days" },
        { key: "storage", value: "Room temperature" }
      ]
    },
    {
      id: 38,
      title: "大米",
      description: "优质大米，是日常主食。",
      price: 5.99,
      categories: "食品饮料",
      image: "/images/38.jpg",
      stock: 500,
      specs: [
        { key: "type", value: "Rice" },
        { key: "size", value: "5kg" },
        { key: "shelfLife", value: "12 months" },
        { key: "storage", value: "Dry place" }
      ]
    },
    {
      id: 39,
      title: "碳酸饮料",
      description: "多种口味的清凉碳酸饮料。",
      price: 1.99,
      categories: "食品饮料",
      image: "/images/39.jpg",
      stock: 450,
      specs: [
        { key: "type", value: "Soft Drink" },
        { key: "size", value: "330ml" },
        { key: "shelfLife", value: "12 months" },
        { key: "storage", value: "Room temperature" }
      ]
    },
    {
      id: 40,
      title: "草莓",
      description: "香甜多汁的新鲜草莓。",
      price: 3.99,
      categories: "食品饮料",
      image: "/images/40.jpg",
      stock: 280,
      specs: [
        { key: "type", value: "Fruit" },
        { key: "size", value: "500g" },
        { key: "shelfLife", value: "3 days" },
        { key: "storage", value: "Refrigerated" }
      ]
    },
    {
      id: 41,
      title: "盒装纸巾",
      description: "柔软纸巾，适合日常家庭使用。",
      price: 2.49,
      categories: "食品饮料",
      image: "/images/41.jpg",
      stock: 400,
      specs: [
        { key: "type", value: "Tissue" },
        { key: "size", value: "3 packs" },
        { key: "material", value: "Wood pulp" }
      ]
    },
    {
      id: 42,
      title: "瓶装矿泉水",
      description: "纯净饮用水，保持身体水分。",
      price: 0.99,
      categories: "食品饮料",
      image: "/images/42.jpg",
      stock: 600,
      specs: [
        { key: "type", value: "Mineral Water" },
        { key: "size", value: "500ml" },
        { key: "storage", value: "Room temperature" }
      ]
    },
    {
      id: 43,
      title: "苹果",
      description: "新鲜红苹果，口感清甜。",
      price: 2.99,
      categories: "食品饮料",
      image: "/images/43.jpg",
      stock: 420,
      specs: [
        { key: "type", value: "Fruit" },
        { key: "size", value: "500g" },
        { key: "origin", value: "China" },
        { key: "storage", value: "Refrigerated" }
      ]
    },
    {
      id: 44,
      title: "香蕉",
      description: "成熟香甜香蕉，富含钾元素。",
      price: 1.99,
      categories: "食品饮料",
      image: "/images/44.jpg",
      stock: 380,
      specs: [
        { key: "type", value: "Fruit" },
        { key: "size", value: "500g" },
        { key: "origin", value: "Philippines" },
        { key: "storage", value: "Room temperature" }
      ]
    },
    {
      id: 45,
      title: "橙子",
      description: "维生素C丰富的橙子。",
      price: 2.59,
      categories: "食品饮料",
      image: "/images/45.jpg",
      stock: 350,
      specs: [
        { key: "type", value: "Fruit" },
        { key: "size", value: "500g" },
        { key: "origin", value: "China" },
        { key: "storage", value: "Refrigerated" }
      ]
    },
    {
      id: 46,
      title: "西红柿",
      description: "新鲜西红柿，适合沙拉或烹饪。",
      price: 1.79,
      categories: "食品饮料",
      image: "/images/46.jpg",
      stock: 410,
      specs: [
        { key: "type", value: "Vegetable" },
        { key: "size", value: "500g" },
        { key: "origin", value: "China" },
        { key: "storage", value: "Refrigerated" }
      ]
    },
    {
      id: 47,
      title: "胡萝卜",
      description: "营养丰富的胡萝卜。",
      price: 1.39,
      categories: "食品饮料",
      image: "/images/47.jpg",
      stock: 390,
      specs: [
        { key: "type", value: "Vegetable" },
        { key: "size", value: "500g" },
        { key: "origin", value: "China" },
        { key: "storage", value: "Cool dry place" }
      ]
    },
    {
      id: 79,
      title: "皮带",
      description: "经典男士皮带。",
      price: 24.99,
      categories: "服装鞋帽",
      image: "/images/79.jpg",
      stock: 170,
      specs: [
        { key: "type", value: "Belt" },
        { key: "material", value: "Leather" },
        { key: "brand", value: "Gucci" },
        { key: "size", value: "110cm" }
      ]
    },
    {
      id: 80,
      title: "太阳镜",
      description: "时尚防紫外线太阳镜。",
      price: 29.99,
      categories: "服装鞋帽",
      image: "/images/80.jpg",
      stock: 150,
      specs: [
        { key: "type", value: "Sunglasses" },
        { key: "lensType", value: "UV400" },
        { key: "brand", value: "RayBan" },
        { key: "frameMaterial", value: "Metal" }
      ]
    },
    {
      id: 82,
      title: "笔记本电脑",
      description: "轻薄高性能笔记本。",
      price: 1299.99,
      categories: "电脑办公",
      image: "/images/82.jpg",
      stock: 90,
      specs: [
        { key: "brand", value: "Dell" },
        { key: "cpu", value: "Intel i7" },
        { key: "ram", value: "16GB" },
        { key: "storage", value: "512GB SSD" }
      ]
    },
    {
      id: 83,
      title: "平板电脑",
      description: "便携娱乐平板。",
      price: 499.99,
      categories: "手机数码",
      image: "/images/83.jpg",
      stock: 110,
      specs: [
        { key: "brand", value: "Apple" },
        { key: "model", value: "iPad" },
        { key: "storage", value: "64GB" },
        { key: "screenSize", value: "10.9 inch" }
      ]
    },
    {
      id: 84,
      title: "蓝牙耳机",
      description: "无线降噪耳机。",
      price: 199.99,
      categories: "手机数码",
      image: "/images/84.jpg",
      stock: 180,
      specs: [
        { key: "brand", value: "Sony" },
        { key: "type", value: "Bluetooth" },
        { key: "batteryLife", value: "30h" },
        { key: "noiseCanceling", value: "Yes" }
      ]
    },
    {
      id: 85,
      title: "机械键盘",
      description: "高性能机械键盘。",
      price: 129.99,
      categories: "电脑办公",
      image: "/images/85.jpg",
      stock: 140,
      specs: [
        { key: "brand", value: "Logitech" },
        { key: "switchType", value: "Blue Switch" },
        { key: "connection", value: "USB" },
        { key: "backlight", value: "RGB" }
      ]
    },
    {
      id: 86,
      title: "无线鼠标",
      description: "轻便无线鼠标。",
      price: 39.99,
      categories: "电脑办公",
      image: "/images/86.jpg",
      stock: 210,
      specs: [
        { key: "brand", value: "Logitech" },
        { key: "connection", value: "Wireless" },
        { key: "dpi", value: "1600" },
        { key: "batteryType", value: "AA" }
      ]
    },
    {
      id: 87,
      title: "显示器",
      description: "高清电脑显示器。",
      price: 229.99,
      categories: "电脑办公",
      image: "/images/87.jpg",
      stock: 130,
      specs: [
        { key: "brand", value: "Samsung" },
        { key: "screenSize", value: "27 inch" },
        { key: "resolution", value: "1920x1080" },
        { key: "panelType", value: "IPS" }
      ]
    }
    ]
  }),
  actions: {
  }
})
