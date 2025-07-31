<template>
  <article class="container mx-auto px-4 py-8">
    <div class="max-w-3xl mb-12">
      <h1 class="text-3xl font-bold text-black mb-4">{{ selectedCategory.name }}</h1>
      <p class="text-gray-600">
        {{ selectedCategory.description }}
      </p>
    </div>

    <div class="mb-8">
      <div class="flex flex-wrap gap-3">
        <button
          @click="filterByCategory('All')"
          class="px-4 py-2 text-sm border transition-colors cursor-pointer"
          :class="selectedCategoryId === 'All' ? 'bg-green-700 text-white border-black' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'"
        >
          All
        </button>
        <button
          v-for="category in categories"
          :key="category.id"
          @click="filterByCategory(category.id)"
          class="px-4 py-2 text-sm border transition-colors cursor-pointer"
          :class="selectedCategoryId === category.id ? 'bg-green-700 text-white border-black' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'"
        >
          {{ category.name }}
        </button>
      </div>
    </div>

    <div v-if="pending" class="py-16">
      <Spinner/>
      <p class="text-center text-gray-500 mt-4">Loading articles...</p>
    </div>
    <template v-else>
      <div v-if="posts.length === 0" class="text-center py-12">
        <p class="text-gray-500 text-lg">No articles found for the selected category.</p>
        <button
          @click="selectedCategoryId = 'All'"
          class="mt-4 text-green-700 hover:text-green-700 font-medium"
        >
          View all articles
        </button>
      </div>
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        <NuxtLink
          v-for="blog in posts"
          :key="blog.slug"
          :to="`/blogs/${blog.slug}`"
          class="block"
        >
          <BlogCard :blog="blog" />
        </NuxtLink>
      </div>
    </template>
  </article>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

useSeoMeta({
  title: 'Darong Blog - All Blogs',
  ogTitle: 'Darong Blog - All Blogs',
  description: 'Tutorials, tips, and best practices for building modern web applications with Laravel.',
  ogDescription: 'Tutorials, tips, and best practices for building modern web applications with Laravel.',
  // ogImage: newPost ? newPost.imageUrl : 'https://example.com/image.png',
  twitterCard: 'summary_large_image',
});

const selectedCategoryId = ref('All');
const loading = ref(true);
const { data: categories } = useFetch('/api/categories', {
  lazy: true,
  transform: (data) => data.data || []
});

const { data: posts, pending, refresh } = useFetch(() => {
  // Dynamic endpoint with params
  let url = '/api/posts';
  const params = [];
  if (selectedCategoryId.value !== 'All') {
    params.push(`category=${selectedCategoryId.value}`);
  }
  params.push('withAuthor=true');
  if (params.length) url += '?' + params.join('&');
  return url;
}, {
  lazy: true,
  transform: (data) => data.data || []
});

// Create a computed property to handle the displayed category
const selectedCategory = computed(() => {
  if (selectedCategoryId.value === 'All') {
    return {
      name: 'All Articles',
      description: 'Browse our collection of Laravel tutorials, tips, and best practices'
    };
  }
//   return category.value || { name: 'Loading...', description: 'Loading...' };
    const category = categories.value.find(cat => cat.id === selectedCategoryId.value);
    return category || { name: 'Loading...', description: 'Loading...' };
});

// Watch for category change and refresh posts
// watch(selectedCategoryId, () => {
//   refresh();
// });

const filterByCategory = async (category_id) => {
  selectedCategoryId.value = category_id;
};
</script>
