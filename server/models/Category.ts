import { defineMongooseModel } from '#nuxt/mongoose'
import type { Schema } from 'mongoose'

export interface CategoryType {
  name: string
  description?: string
  slug: string
  createdAt?: Date
  updatedAt?: Date
}

export const Category = defineMongooseModel<CategoryType>({
  name: 'Category',
  schema: {
    name: {
      type: 'string',
      required: true,
      unique: true,
      trim: true
    },
    description: {
      type: 'string',
      default: ''
    },
    slug: {
      type: 'string',
      unique: true,
      lowercase: true
    }
  },
  options: {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform(doc, ret) {
        const r = ret as any
        r.id = r._id
        delete r._id
        delete r.__v
        return r
      }
    },
    toObject: { virtuals: true }
  },
  hooks(schema) {
    schema.pre('save', function (next) {
      if (this.isModified('name')) {
        this.slug = this.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
      }
      next()
    })
  }
})