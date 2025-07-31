import { Category } from "~~/server/models/Category";

export default defineEventHandler(async (event) => {
  const category = await Category.find().sort({ name: 1 });

  return { data: category }
})