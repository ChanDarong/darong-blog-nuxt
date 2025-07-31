import { Post } from '~~/server/models/Post'

export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    const slug = getRouterParam(event, 'slug')

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
        content: 1,
        tags: 1,
        readTime: 1
    }

    // Build query
    let mongooseQuery = Post.findOne({ slug: slug }, projection)
        .populate({
          path: 'category',
          select: 'name slug'
        })
        .populate({
          path: 'author',
          select: 'name avatar'
        });

    // Execute
    const posts = await mongooseQuery

    return posts
})