<template>
  <main>
    <!-- Display error message if there's an error -->
    <div v-if="error" class="flex justify-center p-5">
      <Error :message="error" />
    </div>
    <!-- Display loading state while data is being fetched -->
    <div v-else-if="loading" class="flex justify-center p-5">
      <LoadingWheel />
    </div>
    <!-- Display product details if available -->
    <div v-else class="grid space-y-5">
      <!-- Back button to navigate to the homepage -->
      
      <!-- Product detail section -->
      <div v-if="product" class="flex flex-col items-center bg-white border-2 border-white p-4">
      <button class="bg-gray-300 text-black py-2 px-4 rounded items-start">
        <router-link to="/">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-house" viewBox="0 0 16 16">
            <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z"/>
          </svg>
        </router-link>
      </button>
        <img :src="product.image" :alt="product.title" class="object-contain h-48 mt-3 mb-3" />
        <h1 class="text-lg line-clamp-2 font-extrabold leading-snug text-slate-600">{{ product.title }}</h1>
        <p class="mt-2 text-center text-gray-700 mb-3">{{ product.description }}</p>
        <h2 class="text-base line-clamp-2 font-extrabold text-slate-500 leading-snug mb-3">$ {{ product.price }}</h2>
        <div class="justify-start flex-1 mt-2 mb-3">
          <span class="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">{{ product.category }}</span>
        </div>
        <p class="mt-2 text-gray-700 mb-3">⭐ {{ product.rating?.rate }}</p>
        <p class="mt-1 text-gray-700 mb-3">Reviews: {{ product.rating?.count }}</p>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import LoadingWheel from '../components/LoadingWheel.vue';

/**
 * @typedef {Object} Product
 * @property {number} id - The unique identifier of the product
 * @property {string} title - The title of the product
 * @property {number} price - The price of the product
 * @property {string} description - A description of the product
 * @property {string} category - The category of the product
 * @property {string} image - URL of the product image
 * @property {Object} rating - Rating information of the product
 * @property {number} rating.rate - The average rating of the product
 * @property {number} rating.count - The number of ratings for the product
 */

/**
 * Reactive reference for holding product details.
 * @type {import('vue').Ref<Product>}
 */
const product = ref({});

/**
 * Reactive reference for tracking error messages.
 * @type {import('vue').Ref<string | null>}
 */
const error = ref(null);

/**
 * Reactive reference for tracking loading state.
 * @type {import('vue').Ref<boolean>}
 */
const loading = ref(false);

/**
 * Vue Router instance to access route parameters.
 */
const route = useRoute();

/**
 * Fetches product details from the API.
 * 
 * @async
 * @param {string | number} productId - The ID of the product to fetch details for.
 * @returns {Promise<{response: Product | null, error: string | null}>} An object containing the response data and error message.
 */
const getProductDetails = async (productId) => {
  try {
    const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return { response: data, error: null };
  } catch (err) {
    return { response: null, error: err.message };
  }
};

/**
 * Fetches product details based on the current route parameter and updates component state.
 * 
 * @async
 * @function
 */
const fetchProductDetails = async () => {
  loading.value = true;
  const { response, error: fetchError } = await getProductDetails(route.params.id);
  if (fetchError) {
    error.value = fetchError;
  } else {
    product.value = response;
  }
  loading.value = false;
};

// Fetch product details when component is mounted
onMounted(fetchProductDetails);

// Watch for changes in the route parameter and refetch product details if it changes
watch(() => route.params.id, fetchProductDetails);
</script>