<template>
  <header class="bg-white border-b border-gray-200 z-10">
    <div class="container mx-auto px-4">
      <div class="flex justify-between items-center py-4">
        <router-link to="/" class="text-2xl font-bold text-black">
          Chan<span class="text-green-700">Darong</span>
        </router-link>

        <nav class="hidden md:flex space-x-8">
          <router-link
            v-for="item in navItems"
            :key="item.path"
            :to="item.path"
            class="text-gray-600 hover:text-green-700 transition-colors"
            :class="{ 'text-green-700 font-medium': isActive(item.path) }"
          >
            {{ item.name }}
          </router-link>
        </nav>

        <button @click="toggleMobileMenu" class="md:hidden text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      <div v-if="mobileMenuOpen" class="md:hidden py-4 border-t">
        <NuxtLink 
            v-for="item in navItems"
            :to="item.path"
            :key="item.path"
            class="block py-2 text-gray-600 hover:text-green-700 transition-colors"
            :class="{ 'text-green-700 font-medium': isActive(item.path) }"
            @click="mobileMenuOpen = false"
        >
            {{ item.name }}
        </NuxtLink>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const mobileMenuOpen = ref(false);

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Blogs', path: '/blogs' },
  { name: 'About', path: '/about' }
];

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
};

const isActive = (path) => {
  if (path === '/') {
    return route.path === '/';
  }
  return route.path.startsWith(path);
};
</script>
