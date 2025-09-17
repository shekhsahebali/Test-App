<script setup>
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
    <!-- Header -->
    <header class="py-4 px-6 bg-white shadow-sm sticky top-0 z-10">
      <div class="max-w-7xl mx-auto flex justify-between items-center">
        <div class="flex items-center">
          <div class="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </div>
          <router-link to="/" class="ml-3 text-xl font-bold text-gray-800">FbRecovery</router-link>
        </div>
        <nav class="hidden md:flex space-x-8">
          <router-link to="/" class="text-gray-600 hover:text-blue-600 transition">Home</router-link>
          <router-link to="/how-it-works" class="text-gray-600 hover:text-blue-600 transition">How It
            Works</router-link>
          <router-link to="/faq" class="text-gray-600 hover:text-blue-600 transition">FAQ</router-link>

        </nav>
        <button class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition md:hidden">
          Start Recovery
        </button>
      </div>
    </header>
    <RouterView />
    <!-- Footer -->
    <footer class="bg-gray-800 text-white py-12 px-6">
      <div class="max-w-6xl mx-auto">
        <div class="grid md:grid-cols-4 gap-8">
          <div>
            <div class="flex items-center mb-4">
              <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" viewBox="0 0 24 24"
                  fill="currentColor">
                  <path
                    d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </div>
              <h3 class="ml-2 text-lg font-bold">Facebook Recovery</h3>
            </div>
            <p class="text-gray-400 text-sm">Helping users regain access to their Facebook accounts since
              2020.</p>
          </div>

          <div>
            <h4 class="font-semibold mb-4">Quick Links</h4>
            <ul class="space-y-2 text-gray-400 text-sm">
              <li><router-link to="/" class="hover:text-white transition">Home</router-link></li>
              <li><router-link to="/how-it-works" class="text-blue-300 font-medium">How It
                  Works</router-link></li>
              <li><router-link to="/faq" class="hover:text-white transition">FAQ</router-link></li>
              <li><router-link to="/contact" class="hover:text-white transition">Contact</router-link>
              </li>
            </ul>
          </div>

          <div>
            <h4 class="font-semibold mb-4">Support</h4>
            <ul class="space-y-2 text-gray-400 text-sm">
              <li><a href="#" class="hover:text-white transition">Help Center</a></li>
              <li><a href="#" class="hover:text-white transition">Privacy Policy</a></li>
              <li><a href="#" class="hover:text-white transition">Terms of Service</a></li>
              <li><a href="#" class="hover:text-white transition">Security</a></li>
            </ul>
          </div>

          <div>
            <h4 class="font-semibold mb-4">Contact Us</h4>
            <address class="text-gray-400 text-sm not-italic">
              <p>Email: support@fbrecovery.com</p>
              <p>Phone: +1 (555) 123-4567</p>
              <p>Hours: 24/7 Support</p>
            </address>
          </div>
        </div>

        <div class="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; 2023 FbRecovery. This is not affiliated with Facebook Inc.</p>
          <p class="mt-2 text-xs">Facebook is a trademark of Facebook, Inc. We are not associated with
            Facebook in any way.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped></style>
