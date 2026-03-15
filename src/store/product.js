import { defineStore } from 'pinia'

export const useProductStore = defineStore('products', {
  state: () => ({
    products: [{
      id: 6,
      hot: false,
      recommend: true,
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
        { key: "gender", value: "无性别区分" }
      ]
    },
    {
      id: 7,
      hot: false,
      recommend: false,
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
        { key: "gender", value: "女性" }
      ]
    },
    {
      id: 8,
      hot: false,
      recommend: false,
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
        { key: "gender", value: "女性" }
      ]
    },
    {
      id: 9,
      hot: false,
      recommend: false,
      title: "Dolce Shine 阳光香水",
      description: "充满活力的果香花香型香水。",
      price: 69.99,
      categories: "美妆护肤",
      image: "/images/9.jpg",
      stock: 140,
      specs: [
        { key: "brand", value: "Dolce & Gabbana" },
        { key: "volume", value: "75ml" },
        { key: "fragranceType", value: "水果y Floral" },
        { key: "gender", value: "女性" }
      ]
    },
    {
      id: 10,
      hot: false,
      recommend: true,
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
        { key: "gender", value: "女性" }
      ]
    },

    {
      id: 17,
      hot: false,
      recommend: false,
      title: "优质牛排",
      description: "高品质牛排，适合烧烤或煎制。",
      price: 12.99,
      categories: "食品饮料",
      image: "/images/17.jpg",
      stock: 300,
      specs: [
        { key: "type", value: "Beef" },
        { key: "size", value: "500g" },
        { key: "shelfLife", value: "7 天" },
        { key: "storage", value: "冷藏" }
      ]
    },
    {
      id: 18,
      hot: false,
      recommend: false,
      title: "猫粮",
      description: "营养均衡的猫粮。",
      price: 8.99,
      categories: "食品饮料",
      image: "/images/18.jpg",
      stock: 500,
      specs: [
        { key: "type", value: "Cat Food" },
        { key: "size", value: "2kg" },
        { key: "shelfLife", value: "12 个月" },
        { key: "storage", value: "干燥处" }
      ]
    },
    {
      id: 19,
      hot: false,
      recommend: false,
      title: "新鲜鸡肉",
      description: "新鲜鸡肉，适合多种烹饪方式。",
      price: 9.99,
      categories: "食品饮料",
      image: "/images/19.jpg",
      stock: 280,
      specs: [
        { key: "type", value: "Chicken" },
        { key: "size", value: "1kg" },
        { key: "shelfLife", value: "5 天" },
        { key: "storage", value: "冷藏" }
      ]
    },
    {
      id: 20,
      hot: false,
      recommend: false,
      title: "食用油",
      description: "多用途植物油。",
      price: 4.99,
      categories: "食品饮料",
      image: "/images/20.jpg",
      stock: 400,
      specs: [
        { key: "type", value: "蔬菜 Oil" },
        { key: "size", value: "1L" },
        { key: "shelfLife", value: "18 个月" },
        { key: "storage", value: "常温" }
      ]
    },
    {
      id: 21,
      hot: false,
      recommend: false,
      title: "新鲜黄瓜",
      description: "清爽多汁的黄瓜。",
      price: 1.49,
      categories: "食品饮料",
      image: "/images/21.jpg",
      stock: 350,
      specs: [
        { key: "type", value: "蔬菜" },
        { key: "size", value: "500g" },
        { key: "shelfLife", value: "3 天" },
        { key: "storage", value: "冷藏" }
      ]
    },
    {
      id: 22,
      hot: true,
      recommend: false,
      title: "狗粮",
      description: "为狗狗提供均衡营养。",
      price: 10.99,
      categories: "食品饮料",
      image: "/images/22.jpg",
      stock: 420,
      specs: [
        { key: "type", value: "狗粮" },
        { key: "size", value: "3kg" },
        { key: "shelfLife", value: "12 个月" },
        { key: "storage", value: "干燥处" }
      ]
    },
    {
      id: 23,
      hot: false,
      recommend: false,
      title: "新鲜鸡蛋",
      description: "新鲜鸡蛋，适合早餐。",
      price: 2.99,
      categories: "食品饮料",
      image: "/images/23.jpg",
      stock: 600,
      specs: [
        { key: "type", value: "鸡蛋" },
        { key: "size", value: "12个" },
        { key: "shelfLife", value: "15 天" },
        { key: "storage", value: "冷藏" }
      ]
    },
    {
      id: 24,
      hot: false,
      recommend: false,
      title: "鱼排",
      description: "优质鱼排，适合煎烤烹饪。",
      price: 14.99,
      categories: "食品饮料",
      image: "/images/24.jpg",
      stock: 260,
      specs: [
        { key: "type", value: "鱼" },
        { key: "size", value: "500g" },
        { key: "shelfLife", value: "5 天" },
        { key: "storage", value: "冰冻" }
      ]
    },
    {
      id: 25,
      hot: false,
      recommend: false,
      title: "青椒",
      description: "新鲜青椒，为菜肴增添颜色和风味。",
      price: 1.29,
      categories: "食品饮料",
      image: "/images/25.jpg",
      stock: 340,
      specs: [
        { key: "type", value: "蔬菜" },
        { key: "size", value: "500g" },
        { key: "shelfLife", value: "4 天" },
        { key: "storage", value: "冷藏" }
      ]
    },
    {
      id: 26,
      hot: false,
      recommend: false,
      title: "青辣椒",
      description: "辛辣青椒，适合烹饪调味。",
      price: 0.99,
      categories: "食品饮料",
      image: "/images/26.jpg",
      stock: 360,
      specs: [
        { key: "type", value: "蔬菜" },
        { key: "size", value: "300g" },
        { key: "shelfLife", value: "4 天" },
        { key: "storage", value: "冷藏" }
      ]
    },
    {
      id: 27,
      hot: false,
      recommend: false,
      title: "蜂蜜罐",
      description: "天然纯蜂蜜，适合搭配面包或饮品。",
      price: 6.99,
      categories: "食品饮料",
      image: "/images/27.jpg",
      stock: 200,
      specs: [
        { key: "type", value: "Honey" },
        { key: "size", value: "500g" },
        { key: "shelfLife", value: "24 个月" },
        { key: "storage", value: "常温" }
      ]
    },
    {
      id: 28,
      hot: false,
      recommend: false,
      title: "冰淇淋",
      description: "香甜顺滑的冰淇淋甜品。",
      price: 5.49,
      categories: "食品饮料",
      image: "/images/28.jpg",
      stock: 260,
      specs: [
        { key: "type", value: "Ice Cream" },
        { key: "size", value: "500ml" },
        { key: "shelfLife", value: "12 个月" },
        { key: "storage", value: "冰冻" }
      ]
    },
    {
      id: 29,
      hot: false,
      recommend: false,
      title: "果汁",
      description: "富含维生素的清爽果汁饮料。",
      price: 3.99,
      categories: "食品饮料",
      image: "/images/29.jpg",
      stock: 420,
      specs: [
        { key: "type", value: "Juice" },
        { key: "size", value: "1L" },
        { key: "shelfLife", value: "12 个月" },
        { key: "storage", value: "常温" }
      ]
    },
    {
      id: 30,
      hot: false,
      recommend: false,
      title: "猕猴桃",
      description: "营养丰富的猕猴桃水果。",
      price: 2.49,
      categories: "食品饮料",
      image: "/images/30.jpg",
      stock: 300,
      specs: [
        { key: "type", value: "水果" },
        { key: "size", value: "500g" },
        { key: "shelfLife", value: "5 天" },
        { key: "storage", value: "冷藏" }
      ]
    },
    {
      id: 31,
      hot: false,
      recommend: false,
      title: "柠檬",
      description: "酸爽柠檬，适合制作饮料或调味。",
      price: 0.79,
      categories: "食品饮料",
      image: "/images/31.jpg",
      stock: 350,
      specs: [
        { key: "type", value: "水果" },
        { key: "size", value: "500g" },
        { key: "shelfLife", value: "5 天" },
        { key: "storage", value: "冷藏" }
      ]
    },
    {
      id: 32,
      hot: false,
      recommend: false,
      title: "牛奶",
      description: "新鲜牛奶，富含蛋白质和钙质。",
      price: 3.49,
      categories: "食品饮料",
      image: "/images/32.jpg",
      stock: 380,
      specs: [
        { key: "type", value: "Milk" },
        { key: "size", value: "1L" },
        { key: "shelfLife", value: "7 天" },
        { key: "storage", value: "冷藏" }
      ]
    },
    {
      id: 33,
      hot: false,
      recommend: true,
      title: "桑葚",
      description: "甜美多汁的桑葚水果。",
      price: 4.99,
      categories: "食品饮料",
      image: "/images/33.jpg",
      stock: 200,
      specs: [
        { key: "type", value: "水果" },
        { key: "size", value: "400g" },
        { key: "shelfLife", value: "3 天" },
        { key: "storage", value: "冷藏" }
      ]
    },
    {
      id: 34,
      hot: false,
      recommend: false,
      title: "雀巢咖啡",
      description: "香醇速溶咖啡，适合日常饮用。",
      price: 7.99,
      categories: "食品饮料",
      image: "/images/34.jpg",
      stock: 260,
      specs: [
        { key: "brand", value: "Nescafe" },
        { key: "size", value: "200g" },
        { key: "shelfLife", value: "24 个月" },
        { key: "storage", value: "干燥处" }
      ]
    },
    {
      id: 35,
      hot: false,
      recommend: false,
      title: "土豆",
      description: "常见食材，可煮、炸或烤制。",
      price: 2.29,
      categories: "食品饮料",
      image: "/images/35.jpg",
      stock: 360,
      specs: [
        { key: "type", value: "蔬菜" },
        { key: "size", value: "1kg" },
        { key: "shelfLife", value: "7 天" },
        { key: "storage", value: "干燥处" }
      ]
    },
    {
      id: 36,
      hot: true,
      recommend: false,
      title: "蛋白粉",
      description: "高蛋白营养补充品。",
      price: 19.99,
      categories: "食品饮料",
      image: "/images/36.jpg",
      stock: 180,
      specs: [
        { key: "type", value: "Protein Powder" },
        { key: "size", value: "1kg" },
        { key: "shelfLife", value: "24 个月" },
        { key: "storage", value: "干燥处" }
      ]
    },
    {
      id: 37,
      hot: false,
      recommend: false,
      title: "红洋葱",
      description: "风味浓郁的红洋葱。",
      price: 1.99,
      categories: "食品饮料",
      image: "/images/37.jpg",
      stock: 320,
      specs: [
        { key: "type", value: "蔬菜" },
        { key: "size", value: "500g" },
        { key: "shelfLife", value: "7 天" },
        { key: "storage", value: "常温" }
      ]
    },
    {
      id: 38,
      hot: false,
      recommend: false,
      title: "礼盒",
      description: "精美礼盒，适合送礼或自用，内含多种精选食品和饮品，满足不同口味需求，是节日和特殊场合的理想选择。",
      price: 5.99,
      categories: "运动户外",
      image: "/images/38.jpg",
      stock: 500,
      specs: [
        { key: "type", value: "Rice" },
        { key: "shelfLife", value: "12 个月" },
        { key: "storage", value: "干燥处" }
      ]
    },
    {
      id: 39,
      hot: true,
      recommend: false,
      title: "碳酸饮料",
      description: "多种口味的清凉碳酸饮料。",
      price: 1.99,
      categories: "食品饮料",
      image: "/images/39.jpg",
      stock: 450,
      specs: [
        { key: "type", value: "碳酸饮料" },
        { key: "size", value: "330ml" },
        { key: "shelfLife", value: "12 个月" },
        { key: "storage", value: "常温" }
      ]
    },
    {
      id: 40,
      hot: false,
      recommend: false,
      title: "草莓",
      description: "香甜多汁的新鲜草莓。",
      price: 3.99,
      categories: "食品饮料",
      image: "/images/40.jpg",
      stock: 280,
      specs: [
        { key: "type", value: "水果" },
        { key: "size", value: "500g" },
        { key: "shelfLife", value: "3 天" },
        { key: "storage", value: "冷藏" }
      ]
    },
    {
      id: 41,
      hot: false,
      recommend: true,
      title: "盒装纸巾",
      description: "柔软纸巾，适合日常家庭使用。",
      price: 2.49,
      categories: "食品饮料",
      image: "/images/41.jpg",
      stock: 400,
      specs: [
        { key: "type", value: "纸巾" },
        { key: "size", value: "3 packs" },
        { key: "material", value: "木浆" }
      ]
    },
    {
      id: 42,
      hot: true,
      recommend: false,
      title: "瓶装矿泉水",
      description: "纯净饮用水，保持身体水分。",
      price: 0.99,
      categories: "食品饮料",
      image: "/images/42.jpg",
      stock: 600,
      specs: [
        { key: "type", value: "Mineral Water" },
        { key: "size", value: "500ml" },
        { key: "storage", value: "常温" }
      ]
    },
    {
      id: 43,
      hot: false,
      recommend: false,
      title: "座椅",
      description: "舒适座椅，适合家庭和办公室使用，采用优质材料制作，设计简约大方，提供多种颜色选择，是提升生活品质的理想选择。",
      price: 2.99,
      categories: "家用电器",
      image: "/images/43.jpg",
      stock: 420,
      specs: [
        { key: "origin", value: "中国" },
        { key: "material", value: "木质" }
      ]
    },
    {
      id: 44,
      hot: false,
      recommend: false,
      title: "相框",
      description: "精美相框，适合展示照片或艺术作品，采用优质材料制作，设计简约大方，提供多种尺寸选择，是家庭和办公室装饰的理想选择。",
      price: 1.99,
      categories: "家用电器",
      image: "/images/44.jpg",
      stock: 380,
      specs: [
        { key: "origin", value: "中国" },
        { key: "material", value: "木质" }
      ]
    },
    {
      id: 45,
      hot: false,
      recommend: false,
      title: "绿植",
      description: "适合室内装饰的盆栽植物，提供清新绿意，提升居家环境的舒适度。",
      price: 2.59,
      categories: "家用电器",
      image: "/images/45.jpg",
      stock: 350,
      specs: [
        { key: "type", value: "盆栽" },
        { key: "origin", value: "中国" },
        { key: "material", value: "陶瓷" }
      ]
    },
    {
      id: 46,
      hot: false,
      recommend: false,
      title: "盆栽",
      description: "适合室内装饰的盆栽植物，提供清新绿意，提升居家环境的舒适度。",
      price: 1.79,
      categories: "家用电器",
      image: "/images/46.jpg",
      stock: 410,
      specs: [
        { key: "type", value: "盆栽" },
        { key: "origin", value: "中国" },
        { key: "material", value: "陶瓷" }
      ]
    },
    {
      id: 47,
      hot: false,
      recommend: false,
      title: "灯",
      description: "座地灯/阅读灯,适合卧室或客厅使用，提供柔和照明，营造温馨氛围。",
      price: 1.39,
      categories: "家用电器",
      image: "/images/47.jpg",
      stock: 390,
      specs: [
        { key: "type", value: "灯具" },
        { key: "origin", value: "中国" }
      ]
    },
    {
      id: 79,
      hot: false,
      recommend: false,
      title: "笔记本电脑",
      description: "Gucci 笔记本电脑，适合日常办公和娱乐，配备高性能处理器和大容量存储，提供流畅的使用体验，是时尚与功能的完美结合。",
      price: 24.99,
      categories: "电脑办公",
      image: "/images/79.jpg",
      stock: 170,
      specs: [
        { key: "type", value: "笔记本电脑" },
        { key: "brand", value: "Gucci" }
      ]
    },
    {
      id: 80,
      hot: false,
      recommend: false,
      title: "笔记本电脑",
      description: "RayBan 笔记本电脑，适合日常办公和娱乐，配备高性能处理器和大容量存储，提供流畅的使用体验，是时尚与功能的完美结合。",
      price: 29.99,
      categories: "电脑办公",
      image: "/images/80.jpg",
      stock: 150,
      specs: [
        { key: "type", value: "笔记本电脑" },
        { key: "brand", value: "RayBan" },
        { key: "cpu", value: "Intel i5" },
        { key: "ram", value: "16GB" },
        { key: "storage", value: "1024GB SSD" }
      ]
    },
    {
      id: 82,
      hot: false,
      recommend: false,
      title: "笔记本电脑",
      description: "高性能游戏本，适合游戏玩家和专业用户，配备强大显卡和高速处理器，提供卓越的游戏体验和高效的工作性能。",
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
      hot: false,
      recommend: false,
      title: "衬衫",
      description: "时尚舒适的衬衫，适合各种场合穿着，采用优质面料，设计简约大方，提供多种颜色选择，是衣橱必备的百搭单品。",
      price: 499.99,
      categories: "服装鞋帽",
      image: "/images/83.jpg",
      stock: 110,
      specs: [
        { key: "brand", value: "Gucci" },
        { key: "material", value: "棉纤维" },
        { key: "size", value: "L" },
        { key: "color", value: "黑白相间" }
      ]
    },
    {
      id: 84,
      hot: false,
      recommend: false,
      title: "上衣",
      description: "时尚舒适的上衣，适合各种场合穿着，采用优质面料，设计简约大方，提供多种颜色选择，是衣橱必备的百搭单品。",
      price: 199.99,
      categories: "服装鞋帽",
      image: "/images/84.jpg",
      stock: 180,
      specs: [
        { key: "brand", value: "adidas" },
        { key: "type", value: "上衣" },
        { key: "size", value: "L" },
        { key: "color", value: "白色" }
      ]
    },
    {
      id: 85,
      hot: false,
      recommend: false,
      title: "衬衫",
      description: "时尚舒适的衬衫，适合各种场合穿着，采用优质面料，设计简约大方，提供多种颜色选择，是衣橱必备的百搭单品。",
      price: 129.99,
      categories: "服装鞋帽",
      image: "/images/85.jpg",
      stock: 140,
      specs: [
        { key: "brand", value: "Gucci" },
        { key: "material", value: "棉纤维" },
        { key: "size", value: "L" },
        { key: "color", value: "红色" }
      ]
    },
    {
      id: 86,
      hot: false,
      recommend: false,
      title: "衬衫",
      description: "时尚舒适的衬衫，适合各种场合穿着，采用优质面料，设计简约大方，提供多种颜色选择，是衣橱必备的百搭单品。",
      price: 39.99,
      categories: "服装鞋帽",
      image: "/images/86.jpg",
      stock: 210,
      specs: [
        { key: "brand", value: "Gucci" },
        { key: "material", value: "棉纤维" },
        { key: "size", value: "M" },
        { key: "color", value: "蓝色" }
      ]
    },
    {
      id: 87,
      hot: false,
      recommend: false,
      title: "衬衫",
      description: "时尚舒适的衬衫，适合各种场合穿着，采用优质面料，设计简约大方，提供多种颜色选择，是衣橱必备的百搭单品。",
      price: 229.99,
      categories: "服装鞋帽",
      image: "/images/87.jpg",
      stock: 130,
      specs: [
        { key: "brand", value: "Gucci" },
        { key: "material", value: "棉纤维" },
        { key: "size", value: "M" },
        { key: "color", value: "绿色" }
      ]
    }
    ]
  }),
  actions: {
  }
})
