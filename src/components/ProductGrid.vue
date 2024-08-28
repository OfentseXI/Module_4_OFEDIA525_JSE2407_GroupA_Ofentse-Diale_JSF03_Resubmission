<template>
  <div class="container mx-auto mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    <!-- Loop through the products array and display each product in a styled card -->
    <router-link
      v-for="product in products"
      :key="product.id"
      :to="`/products/${product.id}`"
      class="flex flex-col max-h-[130rem] cursor-pointer max-w-80 hover:-translate-y-1 hover:scale-102 duration-300 bg-white border border-slate-200 shadow shadow-slate-950/5 rounded overflow-hidden"
    >
      <!-- Product image -->
      <div class="flex justify-center items-center h-48 pt-6 px-6">
        <img
          :src="product.image"
          :alt="product.title"
          class="object-contain h-full"
        />
      </div>
      <div class="flex-1 flex flex-col p-6">
        <div class="flex-1">
          <!-- Product title with truncated lines to handle overflow -->
          <header class="mb-2 flex-2">
            <h2 class="text-lg line-clamp-2 font-extrabold leading-snug text-slate-600">
              {{ product.title }}
            </h2>
          </header>
        </div>

        <!-- Product rating displayed as star icons -->
        <div class="flex items-left -ml-2 mb-2">
          <!-- Display filled stars based on the product's rating -->
          <template v-for="(_, index) in Math.round(product.rating.rate)" :key="index">
            <svg
              class="w-4 h-4 text-yellow-300 ms-1"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
          </template>
          <!-- Display empty stars for the remaining rating out of 5 -->
          <template v-for="(_, index) in 5 - Math.round(product.rating.rate)" :key="index">
            <svg
              class="w-4 h-4 ms-1 text-gray-300 dark:text-gray-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
          </template>
        </div>

        <!-- Product price displayed in a bold font -->
        <div class="text-base line-clamp-2 font-extrabold text-slate-500 leading-snug">
          <h2>${{ product.price }}</h2>
        </div>

        <!-- Product category label -->
        <div class="flex mt-1 space-x-2 my-3">
          <div class="justify-start flex-1">
            <span class="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
              {{ product.category }}
            </span>
          </div>
        </div>

        <!-- Buttons for adding to wishlist and cart -->
        <div class="flex justify-end mt-4 mx-auto space-x-14">
          <!-- Wishlist button with hover tooltip -->
          <div class="group relative">
            <button class="focus:outline-none" @click.stop="toggleWishlist(product.id)">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                class="h-6 w-6 text-black transition-colors duration-200 group-hover:text-red-500"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M21.178 2.822a6 6 0 0 0-8.487 0L12 3.514l-.691-.691a6 6 0 0 0-8.487 8.487l.691.691L12 21l8.487-8.487.691-.691a6 6 0 0 0 0-8.487z" />
              </svg>
            </button>
            <span class="absolute hidden group-hover:block w-auto p-2 m-2 min-w-max top-6 left-2 rounded-md shadow-md text-white bg-gray-800 text-xs font-bold">
              Add to Wishlist
            </span>
          </div>

          <!-- Add to Cart button -->
          <button
            class="bg-blue-500 text-white px-3 py-1 rounded-md focus:outline-none hover:bg-blue-600"
            @click.stop="addToCart(product)"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

/**
 * Props for the ProductGrid component.
 * @typedef {Object} Props
 * @property {Array} products - Array of product objects, each containing id, title, image, price, category, and rating.
 */
const props = defineProps({
  products: {
    type: Array,
    required: true,
  },
});

/**
 * Handles adding a product to the wishlist.
 * Toggles the wishlist status of the specified product by its ID.
 *
 * @param {number} productId - The ID of the product to add or remove from the wishlist.
 */
const toggleWishlist = (productId) => {
  // Implementation of the wishlist toggle functionality goes here.
  console.log(`Wishlist toggled for product ID: ${productId}`);
};

/**
 * Handles adding a product to the cart.
 * 
 * @param {Object} product - The product object to add to the cart.
 */
const addToCart = (product) => {
  // Implementation of the add to cart functionality goes here.
  console.log(`Added to cart:`, product);
};

/**
 * Navigates to the product detail page.
 * 
 * @param {number} productId - The ID of the product to view details for.
 */
const navigateToProductDetail = (productId) => {
  router.push(`/products/${productId}`);
};
</script>

<style>
/* Custom styles specific to the ProductGrid component */
</style>