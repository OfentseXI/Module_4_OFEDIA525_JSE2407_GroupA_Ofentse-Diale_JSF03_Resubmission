<template>
  <div class="max-w-screen-xl mx-auto mt-8">
    <!-- Filters and Sorting Section -->
    <div class="mt-20 flex justify-between items-center flex-wrap mb-4">
      <!-- Category Filter Dropdown -->
      <label for="category" class="w-20 my-auto font-semibold">Browse: </label>
      <select v-model="selectedCategory" id="category" class="p-2 w-full text-sm text-gray-900 bg-gray-200 rounded border-s-gray-200 border-s-2 border-gray-300 focus:ring-blue-500 focus:border-blue-500">
        <option value="">All Categories</option>
        <option v-for="category in categories" :key="category" :value="category">
          {{ category }}
        </option>
      </select>

      <!-- Sort Order Dropdown -->
      <label for="sort" class="w-20 my-auto font-semibold">Sort by: </label>
      <select v-model="sortOrder" id="sort" class="p-2 w-full text-sm text-gray-900 bg-gray-200 rounded border-s-gray-200 border-s-2 border-gray-300 focus:ring-blue-500 focus:border-blue-500">
        <option value="default">Default</option>
        <option value="asc">Price: Low - High</option>
        <option value="desc">Price: High - Low</option>
      </select>
    </div>

    <!-- Loading Indicator -->
    <Loading v-if="loading" />

    <!-- Product Grid -->
    <ProductGrid :products="filteredProducts" v-else />
  </div>
</template>


<script>
// Import necessary Vue functions and components
import { ref, onMounted, computed } from 'vue';
import Loading from '../components/Loading.vue';
import ProductGrid from '../components/ProductGrid.vue';

export default {
  /**
   * Components used in the Home component
   *
   * @type {Object}
   */
  components: {
    Loading,
    ProductGrid
  },

  /**
   * Setup function for the Home component
   *
   * Initializes reactive references, fetches products and categories, and defines computed properties and functions.
   *
   * @returns {Object} An object containing reactive references, computed properties, and functions.
   */
  setup() {
    // Reactive references for the products, categories, search query, selected category, sort order, and loading state
    const products = ref([]); // Array to hold products
    const categories = ref([]); // Array to hold categories
    const searchQuery = ref(''); // Search query input
    const selectedCategory = ref(''); // Selected category
    const sortOrder = ref(''); // Sort order (asc, desc, or default)
    const loading = ref(true); // Loading state

    /**
     * Fetch products from the Fake Store API
     *
     * This function makes an asynchronous call to fetch the list of products from the Fake Store API.
     * The products are stored in the reactive `products` reference and the loading state is updated accordingly.
     *
     * @async
     */
    const fetchProducts = async () => {
      loading.value = true; // Set loading state to true
      const response = await fetch('https://fakestoreapi.com/products'); // Fetch products
      const data = await response.json(); // Parse the response data
      products.value = data; // Update products reference
      loading.value = false; // Set loading state to false
    };

    /**
     * Fetch categories from the Fake Store API
     *
     * This function makes an asynchronous call to fetch the list of product categories from the Fake Store API.
     * The categories are stored in the reactive `categories` reference.
     *
     * @async
     */
    const fetchCategories = async () => {
      const response = await fetch('https://fakestoreapi.com/products/categories'); // Fetch categories
      const data = await response.json(); // Parse the response data
      categories.value = data; // Update categories reference
    };

    /**
     * Trigger the search function
     *
     * This function is triggered when the search button is clicked. It doesn't directly filter products,
     * but it will cause the `filteredProducts` computed property to recalculate based on the current search query.
     */
    const searchProducts = () => {
      // This will trigger the computed property to recalculate
    };

    /**
     * Computed property to filter products based on category, search query, and sort order
     *
     * This computed property returns a list of products that match the selected category, search query, and sort order.
     * It filters the products array in the following order:
     * 1. By category
     * 2. By sort order (price: ascending, descending, or default)
     * 3. By search query (product title)
     *
     * @returns {Array} An array of filtered products
     */
    const filteredProducts = computed(() => {
      let prods = products.value;

      // Filter by selected category
      if (selectedCategory.value) {
        prods = prods.filter(product => product.category === selectedCategory.value);
      }

      // Sort by selected sort order
      if (sortOrder.value === 'asc') {
        prods = prods.sort((a, b) => a.price - b.price);
      } else if (sortOrder.value === 'desc') {
        prods = prods.sort((a, b) => b.price - a.price);
      } else if (sortOrder.value === 'default') {
        prods = prods.sort((a, b) => a.id - b.id);
      }

      // Filter by search query
      if (searchQuery.value) {
        prods = prods.filter(product =>
          product.title.toLowerCase().includes(searchQuery.value.toLowerCase())
        );
      }

      return prods;
    });

    // Lifecycle function to run when the component mounts
    onMounted(() => {
      fetchProducts(); // Fetch products when component mounts
      fetchCategories(); // Fetch categories when component mounts
    });

    // Return reactive references, computed properties, and functions to the template
    return {
      products,
      categories,
      searchQuery,
      selectedCategory,
      sortOrder,
      loading,
      searchProducts,
      filteredProducts
    };
  }
};
</script>

<style>
/* Add specific styles for the Home component */
</style>
