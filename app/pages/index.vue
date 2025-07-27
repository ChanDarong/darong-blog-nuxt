<script setup>
import { onMounted, ref } from 'vue';
// import BlogCard from '../components/BlogCard.vue';
// import Spinner from '@/components/Spinner.vue';
// import usePost from '@/composables/post';

const email = ref('');
const loading = ref(true);
// const { posts, getPosts } = usePost();

// onMounted(async () => {
//   try {
//     // await getPosts('', 1);
//   } finally {
//     loading.value = false;
//   }
// });

const subscribeNewsletter = () => {
  alert(`Thank you for subscribing with ${email.value}!`);
  email.value = '';
};
</script>

<template>
    <!-- Hero Section -->
    <section class="py-12 md:py-20 bg-gradient-to-r from-green-200 to-gray-50">
        <div class="container mx-auto px-4">
            <div class="max-w-3xl mx-auto text-center">
                <h1 class="text-4xl md:text-5xl font-bold text-black mb-6">
                    Mastering <span class="text-green-700">Laravel</span> Development
                </h1>
                <p class="text-xl text-black mb-8">
                    Tutorials, tips, and best practices for building modern web applications with Laravel
                </p>
                <NuxtLink to="/blogs">
                    <div class="relative inline-block group focus:outline-none focus:ring cursor-pointer">
                        <span class="absolute inset-0 transition-transform translate-x-0 translate-y-0 group-hover:translate-y-1.5 group-hover:translate-x-1.5 bg-green-700">
                        </span>
                        <span class="relative inline-block px-4 py-3 text-sm font-bold tracking-widest uppercase border-2 border-black text-white">
                            Explore Articles
                        </span>
                    </div>
                </NuxtLink>

            </div>
        </div>
    </section>

    <!-- Newsletter -->
    <section class="py-12 bg-gray-100">
        <div class="container mx-auto px-4">
            <div class="max-w-2xl mx-auto text-center">
                <h2 class="text-2xl font-bold text-black mb-4">Stay Updated</h2>
                <p class="text-gray-600 mb-6">
                    Subscribe to our newsletter to receive the latest Laravel tips and tutorials
                </p>
                <form @submit.prevent="subscribeNewsletter" class="flex flex-col sm:flex-row gap-3">
                    <input
                    type="email"
                    v-model="email"
                    placeholder="Enter your email"
                    class="flex-grow px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent"
                    required
                    />
                    <button
                    type="submit"
                    class="bg-green-700 hover:bg-green-700 text-white font-medium px-6 py-3 transition-colors cursor-pointer"
                    >
                    Subscribe
                    </button>
                </form>
            </div>
        </div>
    </section>
</template>