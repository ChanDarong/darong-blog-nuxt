<template>
  <div class="container mx-auto px-4 py-8">
    <div v-if="pending" class="text-center py-32">
      <Spinner/>
      <p class="text-center text-gray-500">Loading article...</p>
    </div>
    <div v-else>
      <div class="max-w-3xl mx-auto">
        <!-- Blog Header -->
        <div class="mb-8">
          <div class="flex items-center text-sm text-gray-500 mb-4">
            <router-link to="/blogs" class="hover:text-green-700">← Back to all articles</router-link>
          </div>
          <h1 class="text-3xl md:text-4xl font-bold text-black mb-4">{{ post.title }}</h1>
          <div class="flex items-center">
            <img :src="post.author.avatarUrl" :alt="post.author.name" class="w-10 h-10 object-cover rounded-full mr-3" />
            <div>
              <div class="text-black font-medium">{{ post.author.name }}</div>
              <div class="text-sm text-gray-500">
                {{ formatDate(post.createdAt) }} • {{ post.readTime }} min read
              </div>
            </div>
          </div>
        </div>

        <!-- Featured Image -->
        <div class="mb-8">
          <img :src="post.imageUrl" :alt="post.title" class="w-full h-auto rounded-lg" />
        </div>

        <!-- Blog Content -->
        <div class="prose prose-red max-w-none">
          <template v-for="(block, idx) in parsedBlocks" :key="idx">
            <CodeBlock
              v-if="block.type === 'code'"
              :code="block.text"
              :language="block.lang"
            />
            <div v-else v-html="marked.parser([block])"></div>
          </template>
        </div>

        <!-- Tags -->
        <div class="mt-8 pt-6 border-t border-gray-200">
          <div class="flex flex-wrap gap-2">
            <template v-for="tag in post.tags">
              <span class="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">{{ tag }}</span>
            </template>
          </div>
        </div>

        <!-- Related Posts -->
        <div class="mt-12">
          <h3 class="text-xl font-bold text-black mb-6">Related Articles</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <NuxtLink
              v-for="relatedBlog in relatedBlogs"
              :key="relatedBlog.slug"
              :to="`/blogs/${relatedBlog.slug}`"
              class="block"
            >
              <BlogCard :blog="relatedBlog" />
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import { marked } from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css'; // or any other theme you prefer

const route = useRoute();

const { data: post, pending } = useFetch(`/api/posts/${route.params.slug}`, {
//   transform: (data) => data.data || {},
//   immediate: false
});

const { data: posts } = useFetch(() => {
    // Dynamic endpoint with params
    let url = '/api/posts';
    const params = [];
    if (post.value?.category) {
      params.push(`category=${post.value.category.id}`);
    }
    params.push('withAuthor=true');
    if (params.length) url += '?' + params.join('&');
    return url;
}, {
  lazy: true,
  transform: (data) => data.data || []
});

// SEO
// useSeoMeta({
//   title: post.value ? post.value.title : 'Loading...',
//   ogTitle: post.value ? post.value.title : 'Loading...',
//   description: 'This is my amazing site, let me tell you all about it.',
//   ogDescription: 'This is my amazing site, let me tell you all about it.',
//   ogImage: 'https://example.com/image.png',
//   twitterCard: 'summary_large_image',
// })

const parsedBlocks = computed(() => {
  if (!post.value || !post.value.content) return [];
  const tokens = marked.lexer(post.value.content);
  return tokens;
});

const relatedBlogs = computed(() => {
  if (!post.value || !posts.value) return [];
  // Return filter out the current post
  return posts.value.filter(p => p.id !== post.value.id);
});

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

watch(
  () => post.value,
  (newPost) => {
    useSeoMeta({
      title: newPost ? newPost.title : 'Loading...',
      ogTitle: newPost ? newPost.title : 'Loading...',
      description: newPost ? newPost.summary || newPost.title : 'This is my amazing site, let me tell you all about it.',
      ogDescription: newPost ? newPost.summary || newPost.title : 'This is my amazing site, let me tell you all about it.',
      ogImage: newPost ? newPost.imageUrl : 'https://example.com/image.png',
      twitterCard: 'summary_large_image',
    });
  },
  { immediate: true }
);

</script>
