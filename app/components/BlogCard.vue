<template>
  <div class="relative group transition-transform h-full">
    <span class="absolute inset-0 transition-transform translate-y-1.5 translate-x-1.5 group-hover:translate-y-0 group-hover:translate-x-0 bg-gray-300">
    </span>
    <div class="relative bg-white border shadow-sm transition-transform hover:shadow-md h-full flex flex-col">
      <span class="relative flex flex-col h-full">
        <img
          :src="blog.image"
          :alt="blog.title"
          class="w-full h-48 object-cover"
          loading="lazy"
          width="800"
          height="450"
        />
        <div class="p-5 flex-grow flex flex-col">
          <div class="flex items-center text-sm text-gray-500 mb-2">
            <span>{{ formatDate(blog.createdAt) }}</span>
            <span class="mx-2">•</span>
            <span>{{ blog.readTime }} min read</span>
          </div>
          <h3 class="text-xl font-semibold text-black mb-2">{{ blog.title }}</h3>
          <p class="text-gray-600 mb-4">{{ blog.excerpt }}</p>
          <div class="mt-auto flex items-center">
            <img :src="blog.author.avatarUrl" :alt="blog.author.name" class="w-8 h-8 object-cover rounded-full mr-3" />
            <span class="text-sm text-gray-700">{{ blog.author.name }}</span>
          </div>
        </div>
      </span>
    </div>
  </div>

</template>

<script setup>

const props = defineProps({
  blog: {
    type: Object,
    required: true
  }
});

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};
</script>
