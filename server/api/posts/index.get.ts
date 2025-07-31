import { Post } from '~~/server/models/Post'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  // Build filter
  const filter: any = {}
  if (query.category) filter.category = query.category
  if (query.isFeatured == 1 || query.isFeatured === '1' || query.isFeatured === true) filter.isFeatured = true

  // Projection
  const projection: any = {
    title: 1,
    slug: 1,
    excerpt: 1,
    image: 1,
    createdAt: 1,
    category: 1,
    author: 1,
    readTime: 1
  }

  // Build query
  let mongooseQuery = Post.find(filter, projection)

  // Populate if requested
  if (query.withCategory === 'true') {
    mongooseQuery = mongooseQuery.populate({ path: 'category', select: 'name slug' })
  }
  if (query.withAuthor === 'true') {
    mongooseQuery = mongooseQuery.populate({ path: 'author', select: 'name avatar' })
  }

  // Sort by newest
  mongooseQuery = mongooseQuery.sort({ createdAt: -1 })

  // Execute
  const posts = await mongooseQuery

  return { data: posts }
})