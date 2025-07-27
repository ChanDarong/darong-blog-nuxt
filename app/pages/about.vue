<template>
  <div class="container mx-auto px-4 py-8">
    <div class="max-w-3xl mx-auto">
      <h1 class="text-3xl font-bold text-black mb-6">About Us</h1>

      <div class="prose prose-red max-w-none">
        <p class="text-lg text-gray-600 mb-6">
          Welcome to my website, a blog dedicated to sharing knowledge and best practices about Laravel and web development.
        </p>

        <h2>Our Mission</h2>
        <p>
          Our mission is to provide high-quality, practical tutorials and articles that help developers of all skill levels build better web applications with Laravel. We believe in sharing knowledge openly and fostering a community of continuous learning.
        </p>

        <h2>Who We Are</h2>
        <p>
          We are a team of passionate Laravel developers who love to share what we've learned through years of experience. Our team has worked on projects of all sizes, from small startups to large enterprise applications.
        </p>

        <h2>What We Cover</h2>
        <p>
          Our content focuses on:
        </p>
        <ul>
          <li>Laravel framework tutorials and tips</li>
          <li>PHP best practices</li>
          <li>Database design and optimization</li>
          <li>API development</li>
          <li>Testing strategies</li>
          <li>DevOps for Laravel applications</li>
          <li>Frontend technologies that work well with Laravel</li>
        </ul>

        <h2>Get in Touch</h2>
        <p>
          Have a question or suggestion? We'd love to hear from you! Feel free to reach out to us through the contact form below or connect with us on social media.
        </p>
      </div>

      <div class="mt-12 bg-white p-6 rounded-lg shadow-sm">
        <h2 class="text-xl font-semibold text-black mb-4">Contact Us</h2>
        <form @submit.prevent="submitForm" class="space-y-4">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              id="name"
              v-model="form.name"
              class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              id="email"
              v-model="form.email"
              class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label for="message" class="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea
              id="message"
              v-model="form.message"
              rows="4"
              class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            class="bg-green-700 hover:bg-green-700 text-white font-medium px-6 py-3 rounded-lg transition-colors"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';

const form = reactive({
  name: '',
  email: '',
  message: ''
});

const submitForm = () => {
  alert('Thank you for your message! We will get back to you soon.');
  form.name = '';
  form.email = '';
  form.message = '';
};
</script>
