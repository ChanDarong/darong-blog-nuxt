import { defineMongooseModel } from '#nuxt/mongoose'
import { Schema } from 'mongoose'
import { useRuntimeConfig } from '#imports'
import { Author } from './Author'
import { Category } from './Category'

export interface PostType {
    title: string
    excerpt: string
    content: string
    author?: Schema.Types.ObjectId // Reference to Author model
    slug?: string
    category?: Schema.Types.ObjectId // Reference to Category model
    published?: boolean
    image?: string
    readTime?: string
    isFeatured?: boolean
    tags?: string[]
    createdAt?: Date
    updatedAt?: Date
    imageUrl?: string // Virtual field for full image URL
}

export const Post = defineMongooseModel<PostType>({
    name: 'Post',
    schema: {
        title: {
            type: String,
            required: true,
            trim: true
        },
        excerpt: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        // Reference to author
        author: {
            type: Schema.Types.ObjectId,
            ref: Author
        },
        slug: {
            type: String,
            unique: true,
            lowercase: true
        },
        // Reference to category
        category: {
            type: Schema.Types.ObjectId,
            ref: Category
        },
        // You can add more fields like:
        published: {
            type: Boolean,
            default: true
        },
        image: {
            type: String
        },
        readTime: {
            type: String
        },
        isFeatured: {
            type: Boolean,
            default: false
        },
        tags: [String]
    },
    options: {
        timestamps: true, // Adds createdAt and updatedAt fields
        toJSON: {
            virtuals: true,
            transform(doc, ret) {
                const r = ret as any
                r.id = r._id
                delete r._id
                delete r.__v
                return r
            }
        },  // Enable virtuals when converting to JSON
        toObject: { virtuals: true }
    },
    hooks(schema) {
        // Pre-save hook to generate slug from title
        schema.pre('save', function (next) {
            if (this.isModified('title')) {
                this.slug = this.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')
            }
            next()
        })

        // Virtual for full image URL
        schema.virtual('imageUrl').get(function () {
            const config = useRuntimeConfig()
            if (this.image && !this.image.startsWith('http')) {
                const baseUrl = config.public.fileUrl
                const imagePath = this.image.startsWith('/') ? this.image : `/${this.image}`;
                return `${baseUrl}${imagePath}`;
            }
            return this.image
        })
    },
})
