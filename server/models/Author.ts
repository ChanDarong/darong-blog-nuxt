import { defineMongooseModel } from '#nuxt/mongoose'
import { useRuntimeConfig } from '#imports'

export interface AuthorType {
    name: string
    avatar?: string
    createdAt?: Date
    updatedAt?: Date
}

export const Author = defineMongooseModel<AuthorType>({
    name: 'Author',
    schema: {
        name: { type: String, required: true },
        avatar: { type: String }
    },
    options: {
        timestamps: true,
        toJSON: {
            virtuals: true,
            transform: function(doc, ret, options) {
                const r = ret as any
                r.id = r._id;
                delete r._id;
                delete r.__v;
                return r;
            }
        },
        toObject: { virtuals: true }
    },
    hooks(schema) {
        // Add a virtual for the full avatar URL
        schema.virtual('avatarUrl').get(function() {
            const config = useRuntimeConfig()
            if (this.avatar && !this.avatar.startsWith('http')) {
                const baseUrl = config.public.fileUrl
                const avatarPath = this.avatar.startsWith('/') ? this.avatar : `/${this.avatar}`;
                return `${baseUrl}${avatarPath}`;
            }
            return this.avatar;
        });
    }
})