export const pizzas = [
  {
    id: 1,
    name: "Маргарита",
    description: "Соус томатний, сир моцарела, помідори",
    basePrices: { Мала: 178, Середня: 249, Велика: 297 },
    crustTypes: ["Традиційне", "Тонке"],
    toppings: [
      { name: "Бекон", price: 36 },
      { name: "Мисливські Ковбаски", price: 29 },
      { name: "Гриби", price: 22 },
      { name: "Кукурудза", price: 19 },
      { name: "Помідор Черрі", price: 26 },
    ],
    image:
      "https://prontopizza.ua/khmelnytskyi/wp-content/uploads/sites/11/2025/02/margaryta-kopiya-500x500.webp",
  },
  {
    id: 2,
    name: "Папероні",
    description: "Соус томатний, сир моцарела, папероні",
    basePrices: { Мала: 254, Середня: 347, Велика: 421 },
    crustTypes: ["Традиційне", "Тонке"],
    toppings: [
      { name: "Сир", price: 41 },
      { name: "Перець Чилі", price: 8 },
      { name: "Цибуля", price: 15 },
      { name: "Маслини", price: 36 },
      { name: "Гриби", price: 22 },
    ],
    image:
      "https://prontopizza.ua/khmelnytskyi/wp-content/uploads/sites/11/2025/02/paperoni-kopiya-500x500.webp",
  },
  {
    id: 3,
    name: "Гавайська",
    description:
      "Соус вершковий, сир моцарела, курка, ананас, кукурудза, маслини",
    basePrices: { Мала: 259, Середня: 399, Велика: 512 },
    crustTypes: ["Традиційне", "Тонке"],
    toppings: [
      { name: "Курка", price: 35 },
      { name: "Мисливські Ковбаски", price: 29 },
      { name: "Кукурудза", price: 19 },
      { name: "Ананас", price: 32 },
    ],
    image:
      "https://prontopizza.ua/khmelnytskyi/wp-content/uploads/sites/11/2025/02/gavajska-kopiya-500x500.webp",
  },
  {
    id: 4,
    name: "Мексиканська",
    description:
      "Соус томатний, сир моцарела, бекон, папероні, гриби, парець халапеньо",
    basePrices: { Мала: 259, Середня: 363, Велика: 447 },
    crustTypes: ["Традиційне", "Тонке"],
    toppings: [
      { name: "Сир Моцарелла", price: 38 },
      { name: "Перець Чилі", price: 8 },
      { name: "Бекон", price: 36 },
      { name: "Папероні", price: 61 },
      { name: "Гриби", price: 22 },
    ],
    image:
      "https://prontopizza.ua/khmelnytskyi/wp-content/uploads/sites/11/2025/02/meksykanska-kopiya-500x500.webp",
  },
  {
    id: 5,
    name: "Корнелія",
    description: "Соус вершковий, сир моцарела, салямі, кукурудза",
    basePrices: { Мала: 205, Середня: 297, Велика: 356 },
    crustTypes: ["Традиційне", "Тонке"],
    toppings: [
      { name: "Салямі", price: 34 },
      { name: "Шинка", price: 47 },
      { name: "Кукурудза", price: 19 },
      { name: "Сир Моцарелла", price: 38 },
    ],
    image:
      "https://prontopizza.ua/khmelnytskyi/wp-content/uploads/sites/11/2025/02/korneliya-kopiya-500x500.webp",
  },
  {
    id: 6,
    name: "4 Сири",
    description:
      "Cоус вершковий, сир моцарела, сир дор блю, сир королівський, сир пармезан",
    basePrices: { Мала: 276, Середня: 409, Велика: 487 },
    crustTypes: ["Традиційне", "Тонке"],
    toppings: [
      { name: "Сир Пармезан", price: 78 },
      { name: "Сир Дор Блю", price: 62 },
      { name: "Сир Моцарелла", price: 38 },
      { name: "Сир Королівський", price: 62 },
    ],
    image:
      "https://prontopizza.ua/khmelnytskyi/wp-content/uploads/sites/11/2021/07/4syry-kopiya-500x500.webp",
  },
  {
    id: 7,
    name: "Карибська",
    description: "Соус вершковий, сир моцарела, креветка, цибуля синя, базилік",
    basePrices: { Мала: 327, Середня: 409, Велика: 490 },
    crustTypes: ["Традиційне", "Тонке"],
    toppings: [
      { name: "Цибуля", price: 15 },
      { name: "Сир Моцарелла", price: 38 },
      { name: "Базилік", price: 12 },
    ],
    image:
      "https://prontopizza.ua/khmelnytskyi/wp-content/uploads/sites/11/2024/11/karybska-kopiya-500x500.webp",
  },
  {
    id: 8,
    name: "Морено",
    description:
      "Соус вершковий том ям, сир моцарела, мідії, креветки, помідори чері, гриби, кунжут",
    basePrices: { Мала: 307, Середня: 407, Велика: 500 },
    crustTypes: ["Традиційне", "Тонке"],
    toppings: [
      { name: "Помідори Чері", price: 26 },
      { name: "Сир Моцарелла", price: 38 },
      { name: "Гриби", price: 22 },
    ],
    image:
      "https://prontopizza.ua/khmelnytskyi/wp-content/uploads/sites/11/2025/02/morena-kopiya-500x500.webp",
  },
  {
    id: 9,
    name: "Цезар",
    description:
      "Соус цезар, сир моцарела, сир пармезан, курка, бекон, помідори чері, айсберг",
    basePrices: { Мала: 293, Середня: 427, Велика: 519 },
    crustTypes: ["Традиційне", "Тонке"],
    toppings: [
      { name: "Сир Пармезан", price: 78 },
      { name: "Сир Моцарелла", price: 38 },
      { name: "Курка", price: 35 },
      { name: "Бекон", price: 36 },
      { name: "Помідори Чері", price: 26 },
    ],
    image:
      "https://prontopizza.ua/khmelnytskyi/wp-content/uploads/sites/11/2025/03/czezar-kopiya-500x500.webp",
  },
];