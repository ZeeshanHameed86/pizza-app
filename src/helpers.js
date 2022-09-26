export const uniqueCategories = (data) => {
  let categories = [
    "All",
    ...new Set(
      data.map((c) => {
        const { category } = c;
        return category;
      })
    ),
  ];
  return categories;
};
