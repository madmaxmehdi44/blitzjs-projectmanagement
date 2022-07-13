import db from "./index"
/*
 * This seed function is executed when you run `blitz db seed`.
 *
 * Probably you want to use a library like https://chancejs.com
 * or https://github.com/Marak/Faker.js to easily generate
 * realistic data.
 */
const seed = async () => {
  await db.linkMenu.create({
    data: {
      name: "خانه",
      description: "خانه",
      urlLink: "/",
    },
  })
}
// {
//   id: 2,
//   name: "خدمات",
//   description: "خدمات",
//   urlLink: "/services",
//   active: true,
// },
// {
//   id: 3,
//   name: "نمونه کار",
//   description: "نمونه کار",
//   urlLink: "/projects",
//   active: true,
// },
// {
//   id: 4,
//   name: "درباره ما",
//   description: "درباره ما",
//   urlLink: "/aboutus",
//   active: true,
// },
// {
//   id: 5,
//   name: "تماس با ما",
//   description: "تماس با ما",
//   urlLink: "/contactus",
//   active: true,
// },
// ]}
// }
// const seed = menuListData.map(async (menuListData) => {
//   await db.linkMenu.create({
//     data: {
//       name: menuListData.name,
//       description: menuListData.description,
//       urlLink: menuListData.urlLink,
//     },
//   })
// })
// const seed = async () => {
//   for (let i = 0; i < 5; i++) {
//     await db.linkMenu.create({ data: { menuListData } })
//   }
// }

export default seed
