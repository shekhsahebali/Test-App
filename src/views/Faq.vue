<template>


    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16 px-6">
        <div class="max-w-4xl mx-auto text-center">
            <h1 class="text-4xl md:text-5xl font-extrabold mb-6">Frequently Asked Questions</h1>
            <p class="text-xl text-blue-100 mb-8">
                Find answers to the most common questions about recovering your Facebook account.
            </p>
            <div class="bg-white bg-opacity-20 backdrop-filter backdrop-blur-sm rounded-lg p-4 inline-block">
                <div class="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20"
                        fill="currentColor">
                        <path fill-rule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                            clip-rule="evenodd" />
                    </svg>
                    <span>Can't find your answer? <button @click="scrollToContact"
                            class="underline hover:text-blue-200">Contact our support team</button></span>
                </div>
            </div>
        </div>
    </section>

    <!-- Search and Filter Section -->
    <section class="py-8 bg-white shadow-sm">
        <div class="max-w-5xl mx-auto px-6">
            <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20"
                        fill="currentColor">
                        <path fill-rule="evenodd"
                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                            clip-rule="evenodd" />
                    </svg>
                </div>
                <input type="text" v-model="searchQuery"
                    class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder="Search for answers...">
            </div>

            <div class="flex flex-wrap gap-2 mt-6">
                <button v-for="category in categories" :key="category.id" @click="selectedCategory = category.id"
                    :class="[
                        'px-4 py-2 rounded-full text-sm font-medium transition',
                        selectedCategory === category.id
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    ]">
                    {{ category.name }}
                </button>
            </div>
        </div>
    </section>

    <!-- FAQ Content -->
    <section class="py-16 px-6">
        <div class="max-w-5xl mx-auto">
            <div v-if="filteredQuestions.length === 0" class="text-center py-12">
                <div class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-gray-400" viewBox="0 0 20 20"
                        fill="currentColor">
                        <path fill-rule="evenodd" d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                        <path fill-rule="evenodd"
                            d="M15 7a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1V8a1 1 0 011-1h1V5a2 2 0 012-2h4a2 2 0 012 2v2h1zm-2 2H7v1h6V9z"
                            clip-rule="evenodd" />
                    </svg>
                </div>
                <h3 class="text-xl font-semibold text-gray-800 mb-2">No results found</h3>
                <p class="text-gray-600">Try adjusting your search or browse all questions.</p>
                <button @click="resetSearch" class="mt-4 text-blue-600 hover:text-blue-700 font-medium">
                    Clear search and filters
                </button>
            </div>

            <div v-else>
                <div v-for="(question, index) in filteredQuestions" :key="index" class="mb-6">
                    <div class="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 transition-all duration-300"
                        :class="activeIndex === index ? 'shadow-md border-blue-200' : 'hover:shadow-md'">
                        <button @click="toggleQuestion(index)"
                            class="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none"
                            :class="activeIndex === index ? 'bg-blue-50' : 'hover:bg-gray-50'">
                            <div class="flex items-start">
                                <div class="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mr-4 text-sm font-bold"
                                    :class="getCategoryColor(question.category)">
                                    {{ getCategoryInitial(question.category) }}
                                </div>
                                <h3 class="text-lg font-medium text-gray-800 pr-4">{{ question.question }}</h3>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg"
                                class="h-5 w-5 text-gray-500 transition-transform duration-300"
                                :class="{ 'transform rotate-180': activeIndex === index }" viewBox="0 0 20 20"
                                fill="currentColor">
                                <path fill-rule="evenodd"
                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                    clip-rule="evenodd" />
                            </svg>
                        </button>

                        <div v-show="activeIndex === index" class="px-6 pb-6 pt-0 border-t border-gray-100"
                            :class="activeIndex === index ? 'animate-fadeIn' : ''">
                            <div class="prose prose-blue max-w-none text-gray-600"
                                v-html="formatAnswer(question.answer)">
                            </div>

                            <div class="mt-4 flex items-center justify-between">
                                <div class="flex items-center text-sm text-gray-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 20 20"
                                        fill="currentColor">
                                        <path fill-rule="evenodd"
                                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                            clip-rule="evenodd" />
                                    </svg>
                                    Was this helpful?
                                    <button
                                        class="ml-2 text-blue-600 hover:text-blue-700 focus:outline-none">Yes</button>
                                    <span class="mx-1">|</span>
                                    <button class="text-blue-600 hover:text-blue-700 focus:outline-none">No</button>
                                </div>

                                <div class="flex space-x-2">
                                    <button
                                        class="p-2 text-gray-400 hover:text-blue-600 rounded-full hover:bg-blue-50 transition">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20"
                                            fill="currentColor">
                                            <path
                                                d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                                        </svg>
                                    </button>
                                    <button
                                        class="p-2 text-gray-400 hover:text-blue-600 rounded-full hover:bg-blue-50 transition">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20"
                                            fill="currentColor">
                                            <path
                                                d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Popular Questions Section -->
    <section class="py-16 bg-gray-100">
        <div class="max-w-5xl mx-auto px-6">
            <h2 class="text-3xl font-bold text-center text-gray-800 mb-12">Most Popular Questions</h2>

            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div v-for="(popular, index) in popularQuestions" :key="index"
                    class="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition cursor-pointer"
                    @click="jumpToQuestion(popular.id)">
                    <div class="flex items-center mb-3">
                        <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                            <span class="text-blue-600 font-bold text-sm">{{ index + 1 }}</span>
                        </div>
                        <div class="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0"
                            :class="getCategoryColor(popular.category)">
                            <span class="text-xs font-bold text-white">{{ getCategoryInitial(popular.category) }}</span>
                        </div>
                    </div>
                    <h3 class="font-semibold text-gray-800 mb-2">{{ popular.question }}</h3>
                    <p class="text-gray-600 text-sm line-clamp-2">{{ popular.preview }}</p>
                    <div class="mt-3 flex items-center text-blue-600 text-sm font-medium">
                        <span>Read answer</span>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" viewBox="0 0 20 20"
                            fill="currentColor">
                            <path fill-rule="evenodd"
                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                clip-rule="evenodd" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Category-based Questions -->
    <section class="py-16 bg-white">
        <div class="max-w-6xl mx-auto px-6">
            <h2 class="text-3xl font-bold text-center text-gray-800 mb-12">Browse by Category</h2>

            <div class="grid md:grid-cols-2 gap-8">
                <div v-for="category in categories" :key="category.id" class="space-y-4">
                    <div class="flex items-center">
                        <div class="w-12 h-12 rounded-full flex items-center justify-center mr-4"
                            :class="getCategoryColor(category.id)">
                            <span class="text-white text-lg font-bold">{{ getCategoryInitial(category.id) }}</span>
                        </div>
                        <h3 class="text-xl font-bold text-gray-800">{{ category.name }}</h3>
                    </div>

                    <div class="space-y-3">
                        <div v-for="(catQuestion, index) in getCategoryQuestions(category.id)" :key="index"
                            class="border-l-4 pl-4 py-2 border-gray-200 hover:border-blue-400 transition cursor-pointer"
                            :class="activeCategoryQuestion === catQuestion.id ? 'bg-blue-50 border-blue-400' : 'hover:bg-gray-50'"
                            @click="jumpToQuestion(catQuestion.id)">
                            <h4 class="font-medium text-gray-800 hover:text-blue-600 transition">{{ catQuestion.question
                                }}</h4>
                        </div>
                    </div>

                    <div class="pt-2">
                        <button class="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center">
                            <span>View all {{ category.name }} questions</span>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" viewBox="0 0 20 20"
                                fill="currentColor">
                                <path fill-rule="evenodd"
                                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                    clip-rule="evenodd" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Still Need Help Section -->
    <section class="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white" id="contact-section">
        <div class="max-w-4xl mx-auto text-center px-6">
            <div class="bg-white bg-opacity-20 backdrop-filter backdrop-blur-sm rounded-2xl p-8 md:p-12">
                <h2 class="text-3xl font-bold mb-4">Still Need Help?</h2>
                <p class="text-xl text-blue-100 mb-8">Our support team is available 24/7 to help you recover your
                    Facebook account.</p>

                <div class="grid md:grid-cols-3 gap-6 mb-8">
                    <div class="bg-white bg-opacity-10 rounded-lg p-5">
                        <div
                            class="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20"
                                fill="currentColor">
                                <path
                                    d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                            </svg>
                        </div>
                        <h3 class="font-semibold mb-2">Phone Support</h3>
                        <p>+1 (555) 123-4567</p>
                        <p class="text-sm text-blue-200">24/7 Availability</p>
                    </div>

                    <div class="bg-white bg-opacity-10 rounded-lg p-5">
                        <div
                            class="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20"
                                fill="currentColor">
                                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                            </svg>
                        </div>
                        <h3 class="font-semibold mb-2">Email Support</h3>
                        <p>support@fbrecovery.com</p>
                        <p class="text-sm text-blue-200">Response within 1 hour</p>
                    </div>

                    <div class="bg-white bg-opacity-10 rounded-lg p-5">
                        <div
                            class="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20"
                                fill="currentColor">
                                <path fill-rule="evenodd"
                                    d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.496 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                                    clip-rule="evenodd" />
                            </svg>
                        </div>
                        <h3 class="font-semibold mb-2">Live Chat</h3>
                        <p>Instant Assistance</p>
                        <p class="text-sm text-blue-200">Available 24/7</p>
                    </div>
                </div>

                <button
                    class="bg-white text-blue-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg transition transform hover:scale-105">
                    Start Live Chat
                </button>
            </div>
        </div>
    </section>

    <!-- Related Articles -->
    <section class="py-16 bg-gray-50">
        <div class="max-w-5xl mx-auto px-6">
            <h2 class="text-3xl font-bold text-center text-gray-800 mb-12">Related Articles</h2>

            <div class="grid md:grid-cols-2 gap-8">
                <div class="bg-white rounded-lg shadow-sm hover:shadow-md transition p-6">
                    <div class="flex items-center mb-3">
                        <div class="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-600" viewBox="0 0 20 20"
                                fill="currentColor">
                                <path fill-rule="evenodd"
                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                    clip-rule="evenodd" />
                            </svg>
                        </div>
                        <h3 class="text-lg font-semibold text-gray-800">How to Prevent Future Account Lockouts</h3>
                    </div>
                    <p class="text-gray-600 mb-4">Learn essential security practices to keep your Facebook account safe
                        and avoid getting locked out in the future.</p>
                    <router-link to="/how-it-works"
                        class="text-blue-600 hover:text-blue-700 font-medium flex items-center">
                        Read more
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" viewBox="0 0 20 20"
                            fill="currentColor">
                            <path fill-rule="evenodd"
                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                clip-rule="evenodd" />
                        </svg>
                    </router-link>
                </div>

                <div class="bg-white rounded-lg shadow-sm hover:shadow-md transition p-6">
                    <div class="flex items-center mb-3">
                        <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-600" viewBox="0 0 20 20"
                                fill="currentColor">
                                <path fill-rule="evenodd"
                                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-4V4a1 1 0 10-2 0v1H9a1 1 0 000 2h2v1a1 1 0 102 0V7h2a1 1 0 100-2h-2z"
                                    clip-rule="evenodd" />
                            </svg>
                        </div>
                        <h3 class="text-lg font-semibold text-gray-800">Setting Up Two-Factor Authentication</h3>
                    </div>
                    <p class="text-gray-600 mb-4">Step-by-step guide to enable two-factor authentication on your
                        Facebook account for enhanced security.</p>
                    <router-link to="/how-it-works"
                        class="text-blue-600 hover:text-blue-700 font-medium flex items-center">
                        Read more
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" viewBox="0 0 20 20"
                            fill="currentColor">
                            <path fill-rule="evenodd"
                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                clip-rule="evenodd" />
                        </svg>
                    </router-link>
                </div>

                <div class="bg-white rounded-lg shadow-sm hover:shadow-md transition p-6">
                    <div class="flex items-center mb-3">
                        <div class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-purple-600" viewBox="0 0 20 20"
                                fill="currentColor">
                                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 class="text-lg font-semibold text-gray-800">What to Do If You're Not Receiving Verification
                            Codes</h3>
                    </div>
                    <p class="text-gray-600 mb-4">Troubleshooting guide for when you're not receiving SMS or email
                        verification codes from Facebook.</p>
                    <router-link to="/how-it-works"
                        class="text-blue-600 hover:text-blue-700 font-medium flex items-center">
                        Read more
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" viewBox="0 0 20 20"
                            fill="currentColor">
                            <path fill-rule="evenodd"
                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                clip-rule="evenodd" />
                        </svg>
                    </router-link>
                </div>

                <div class="bg-white rounded-lg shadow-sm hover:shadow-md transition p-6">
                    <div class="flex items-center mb-3">
                        <div class="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-600" viewBox="0 0 20 20"
                                fill="currentColor">
                                <path fill-rule="evenodd"
                                    d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                                    clip-rule="evenodd" />
                            </svg>
                        </div>
                        <h3 class="text-lg font-semibold text-gray-800">Recovering Your Account Without Access to Email
                            or Phone</h3>
                    </div>
                    <p class="text-gray-600 mb-4">Alternative methods to recover your Facebook account when you no
                        longer have access to your recovery email or phone number.</p>
                    <router-link to="/how-it-works"
                        class="text-blue-600 hover:text-blue-700 font-medium flex items-center">
                        Read more
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" viewBox="0 0 20 20"
                            fill="currentColor">
                            <path fill-rule="evenodd"
                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                clip-rule="evenodd" />
                        </svg>
                    </router-link>
                </div>
            </div>
        </div>
    </section>


</template>

<script>
export default {
    name: 'FAQPage',
    data() {
        return {
            searchQuery: '',
            selectedCategory: 'all',
            activeIndex: null,
            activeCategoryQuestion: null,
            categories: [
                { id: 'all', name: 'All Questions' },
                { id: 'account', name: 'Account Access' },
                { id: 'password', name: 'Password Issues' },
                { id: 'verification', name: 'Verification & Security' },
                { id: 'technical', name: 'Technical Problems' },
                { id: 'privacy', name: 'Privacy & Settings' }
            ],
            questions: [
                {
                    id: 1,
                    category: 'account',
                    question: "How long does it take to recover my Facebook account?",
                    answer: "Most accounts are recovered within minutes. However, some cases may require additional verification and could take up to 24-48 hours. The time depends on several factors:<br><br><ul><li><strong>Information provided:</strong> Having access to your recovery email or phone number speeds up the process</li><li><strong>Security measures:</strong> Accounts with two-factor authentication may require additional steps</li><li><strong>Verification method:</strong> Photo identification verification can take longer as it requires manual review</li></ul><br>If your account recovery is taking longer than expected, our support team can provide an update on your case status."
                },
                {
                    id: 2,
                    category: 'account',
                    question: "Is this service affiliated with Facebook?",
                    answer: "No, we are not affiliated with Facebook, Inc. We provide guidance and tools to help you navigate Facebook's official account recovery process. Facebook is a trademark of Facebook, Inc., and we operate independently as a third-party assistance service.<br><br>Our expertise comes from years of helping users successfully recover their accounts through Facebook's official channels. We stay updated on Facebook's latest recovery procedures to provide you with the most current and effective guidance."
                },
                {
                    id: 3,
                    category: 'password',
                    question: "What if I don't remember my password or email address?",
                    answer: "Don't worry! You can still recover your account even if you don't remember your password or email address. Here are the options available to you:<br><br><ol><li><strong>Use your phone number:</strong> If you added a phone number to your account, you can use it to initiate recovery</li><li><strong>Username or full name:</strong> Try entering any username or the full name you used on your account</li><li><strong>Trusted contacts:</strong> If you set up trusted contacts, they can help you regain access</li><li><strong>Photo identification:</strong> Facebook allows you to verify your identity by uploading a government-issued ID</li></ol><br>Our system will guide you through these options step by step to find the best recovery method for your situation."
                },
                {
                    id: 4,
                    category: 'verification',
                    question: "Why am I not receiving the verification code?",
                    answer: "If you're not receiving verification codes, try these troubleshooting steps:<br><br><strong>For SMS codes:</strong><br>- Check that you're entering the correct phone number with country code<br>- Ensure your phone has signal and can receive texts<br>- Wait 5-10 minutes as codes can sometimes be delayed<br>- Try the 'Call Me' option instead of SMS<br><br><strong>For email codes:</strong><br>- Check your spam/junk folder<br>- Verify you're checking the correct email address<br>- Add no-reply@facebook.com to your contacts<br>- Wait a few minutes and request a new code<br><br>If you're still not receiving codes, you can:<br>- Try an alternate recovery method<br>- Use the 'I can't access my email or phone' option<br>- Submit photo identification for manual verification<br><br>Our support team can also help you troubleshoot this issue in real-time via live chat."
                },
                {
                    id: 5,
                    category: 'verification',
                    question: "Is my information secure during the recovery process?",
                    answer: "We take your security and privacy very seriously. Here's how we protect your information:<br><br><ul><li><strong>No data storage:</strong> We don't store any of your personal information, passwords, or recovery codes</li><li><strong>Official channels:</strong> We guide you through Facebook's official recovery process, so your information goes directly to Facebook's secure systems</li><li><strong>Encrypted connection:</strong> Our website uses HTTPS encryption to protect data in transit</li><li><strong>No password requests:</strong> We will never ask you for your Facebook password</li><li><strong>Privacy policy:</strong> We comply with strict privacy regulations and never share your information with third parties</li></ul><br>Remember: Facebook will never ask for your password via email or phone. Always ensure you're on the official facebook.com domain when entering sensitive information."
                },
                {
                    id: 6,
                    category: 'technical',
                    question: "What should I do if I'm asked to identify friends in photos?",
                    answer: "The friend identification step is one of Facebook's security measures to verify you're the legitimate account owner. Here's how to successfully complete this step:<br><br><ol><li><strong>Take your time:</strong> Don't rush through the photos. Look carefully at each image</li><li><strong>Look for context:</strong> Check backgrounds, clothing, and other details that might help you identify the person</li><li><strong>Skip if unsure:</strong> If you truly can't identify someone, use the 'Skip' option rather than guessing</li><li><strong>Common connections:</strong> Think about friends you interact with most frequently or who appear in your photos</li><li><strong>Multiple attempts:</strong> You usually get a few attempts to identify friends correctly</li></ol><br><strong>Pro Tip:</strong> This step is easier if you've regularly tagged friends in photos. If you're having difficulty, you can choose an alternative verification method like email/SMS or photo ID verification."
                },
                {
                    id: 7,
                    category: 'account',
                    question: "Can I recover my account if it was disabled or deactivated?",
                    answer: "The recovery process differs depending on whether your account was deactivated or disabled:<br><br><strong>Deactivated Account:</strong><br>- Simply log in with your email/phone and password<br>- Your account will be automatically reactivated<br>- All your content and connections will be restored<br><br><strong>Disabled Account:</strong><br>- This usually occurs for policy violations<br>- You'll need to submit an appeal to Facebook<br>- Provide any requested identification<br>- Explain your situation in the appeal form<br>- Wait for Facebook's review (typically 1-7 days)<br><br>If you're unsure whether your account was deactivated or disabled, try logging in. A deactivated account will reactivate upon login, while a disabled account will show a specific message with appeal instructions."
                },
                {
                    id: 8,
                    category: 'privacy',
                    question: "How can I prevent my account from being hacked in the future?",
                    answer: "Protecting your account from future hacks involves several important security measures:<br><br><strong>Essential Security Steps:</strong><br>1. <strong>Use a strong password:</strong> Create a unique password with 12+ characters, including uppercase, lowercase, numbers, and symbols<br>2. <strong>Enable two-factor authentication:</strong> Set up 2FA using your phone or an authentication app<br>3. <strong>Set up trusted contacts:</strong> Choose 3-5 friends who can help you recover your account<br>4. <strong>Update recovery information:</strong> Keep your email and phone number current<br>5. <strong>Review active sessions:</strong> Regularly check where your account is logged in<br>6. <strong>Be wary of phishing:</strong> Never enter your credentials on suspicious websites<br><br><strong>Additional Recommendations:</strong><br>- Use a password manager to generate and store strong passwords<br>- Install security software on your devices<br>- Be cautious about accepting friend requests from unknown people<br>- Regularly review your privacy settings<br><br>Our <a href='/how-it-works' class='text-blue-600 hover:underline'>How It Works</a> section includes detailed guides for implementing these security measures."
                },
                {
                    id: 9,
                    category: 'verification',
                    question: "What documents can I use for photo identification verification?",
                    answer: "Facebook accepts various government-issued photo IDs for verification. Accepted documents include:<br><br><strong>Primary Identification:</strong><br>- Driver's license<br>- Passport<br>- National ID card<br>- Residence permit<br>- Birth certificate (in some regions)<br>- Marriage certificate (in some regions)<br><br><strong>Document Requirements:</strong><br>- Must be government-issued<br>- Must include your photo (except for birth certificates)<br>- Must be valid (not expired)<br>- Must clearly show your name and date of birth<br>- Must be in English or include an English translation<br><br><strong>Submission Tips:</strong><br>- Take a clear, well-lit photo of your document<br>- Ensure all corners are visible<br>- Don't block any information with your fingers<br>- Submit in JPG, PNG, or PDF format<br>- File size should be under 5MB<br><br>Facebook typically reviews photo ID submissions within 24-48 hours. Your document information is encrypted and deleted after verification is complete."
                },
                {
                    id: 10,
                    category: 'technical',
                    question: "Why does Facebook say my account doesn't exist?",
                    answer: "If Facebook says your account doesn't exist, several scenarios could be causing this message:<br><br><strong>Possible Reasons:</strong><br>1. <strong>Typo in email/username:</strong> Double-check for spelling errors or extra spaces<br>2. <strong>Wrong email:</strong> Try all email addresses you might have used to create the account<br>3. <strong>Account deletion:</strong> If you or someone else deleted the account more than 30 days ago, it may be permanently gone<br>4. <strong>Account disabled:</strong> In some cases, disabled accounts may appear as non-existent<br>5. <strong>Temporary system issue:</strong> Facebook may be experiencing technical difficulties<br><br><strong>What to Try:</strong><br>- Use the 'Forgot account?' link and try different identifying information<br>- Search for your profile using your name on facebook.com<br>- Try logging in with your phone number instead of email<br>- Wait a few hours and try again in case of temporary system issues<br>- Contact support if you believe your account was wrongfully deleted<br><br>If your account was permanently deleted, you'll need to create a new one. Facebook retains deleted accounts for 30 days before permanent removal."
                },
                {
                    id: 11,
                    category: 'password',
                    question: "How do I create a strong password that I can remember?",
                    answer: "Creating a strong yet memorable password is easier than you think. Here are effective methods:<br><br><strong>Passphrase Method:</strong><br>Combine 4-5 random words: <code class='bg-gray-100 px-2 py-1 rounded'>PurpleTiger$DancesAtMidnight!</code><br><br><strong>Pattern Method:</strong><br>Start with a sentence and use the first letters: <br>'I joined Facebook in 2010 and have 357 friends!' becomes <code class='bg-gray-100 px-2 py-1 rounded'>IjFi2010ah357f!</code><br><br><strong>Substitution Method:</strong><br>Replace letters with similar-looking numbers/symbols: <br>'MySecurePassword' becomes <code class='bg-gray-100 px-2 py-1 rounded'>My$ecureP@$$w0rd</code><br><br><strong>Password Requirements for Facebook:</strong><br>- Minimum 6 characters (aim for 12+)<br>- Mix of uppercase and lowercase letters<br>- Include numbers and symbols<br>- Avoid personal information (birthdays, names)<br>- Don't reuse passwords from other sites<br><br><strong>Memory Tips:</strong><br>- Create a password hint that only you would understand<br>- Use a consistent pattern across your passwords with site-specific variations<br>- Consider using a password manager to store complex passwords securely<br><br>Remember to update your password every 6-12 months for optimal security!"
                },
                {
                    id: 12,
                    category: 'privacy',
                    question: "What should I do after recovering my account to secure it?",
                    answer: "Congratulations on recovering your account! Now take these essential steps to secure it against future issues:<br><br><strong>Immediate Actions:</strong><br>1. <strong>Change your password</strong> - Even if you just set a new one, make it even stronger<br>2. <strong>Check active sessions</strong> - Go to Settings → Security → Where You're Logged In and end any unfamiliar sessions<br>3. <strong>Review recent activity</strong> - Check for any unauthorized posts, messages, or changes<br><br><strong>Security Setup:</strong><br>4. <strong>Enable two-factor authentication</strong> - Settings → Security → Two-Factor Authentication<br>5. <strong>Set up trusted contacts</strong> - Choose 3-5 friends who can help you recover your account<br>6. <strong>Update recovery options</strong> - Add a secondary email and phone number<br>7. <strong>Review app permissions</strong> - Remove access for any apps you don't recognize or use<br><br><strong>Ongoing Maintenance:</strong><br>8. <strong>Regular security checkups</strong> - Use Facebook's Security Checkup tool monthly<br>9. <strong>Privacy review</strong> - Update who can see your posts and personal information<br>10. <strong>Download your information</strong> - Keep a backup of your photos and posts<br><br>Our system can guide you through each of these steps with detailed instructions. Just click 'Continue to Security Setup' after recovery to begin this process."
                }
            ],
            popularQuestions: [
                {
                    id: 1,
                    category: 'account',
                    question: "How long does it take to recover my Facebook account?",
                    preview: "Most accounts are recovered within minutes, but some cases may take up to 24-48 hours depending on verification methods."
                },
                {
                    id: 4,
                    category: 'verification',
                    question: "Why am I not receiving the verification code?",
                    preview: "If you're not receiving codes, try checking spam folders, using alternate methods, or waiting a few minutes before retrying."
                },
                {
                    id: 3,
                    category: 'password',
                    question: "What if I don't remember my password or email address?",
                    preview: "You can still recover your account using your phone number, username, trusted contacts, or photo identification."
                },
                {
                    id: 7,
                    category: 'account',
                    question: "Can I recover my account if it was disabled or deactivated?",
                    preview: "The recovery process differs for deactivated vs. disabled accounts. Deactivated accounts can be reactivated by logging in."
                }
            ]
        }
    },
    computed: {
        filteredQuestions() {
            let filtered = this.questions;

            // Filter by search query
            if (this.searchQuery) {
                const query = this.searchQuery.toLowerCase();
                filtered = filtered.filter(q =>
                    q.question.toLowerCase().includes(query) ||
                    q.answer.toLowerCase().includes(query)
                );
            }

            // Filter by category
            if (this.selectedCategory !== 'all') {
                filtered = filtered.filter(q => q.category === this.selectedCategory);
            }

            return filtered;
        }
    },
    methods: {
        toggleQuestion(index) {
            // If clicking on already active question, close it
            if (this.activeIndex === index) {
                this.activeIndex = null;
            } else {
                this.activeIndex = index;

                // Scroll to the opened question for better visibility on mobile
                this.$nextTick(() => {
                    const element = document.querySelectorAll('.bg-white.rounded-lg.shadow-sm.overflow-hidden')[index];
                    if (element && window.innerWidth < 768) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                });
            }
        },

        getCategoryColor(category) {
            const colors = {
                'account': 'bg-blue-600',
                'password': 'bg-purple-600',
                'verification': 'bg-green-600',
                'technical': 'bg-orange-600',
                'privacy': 'bg-pink-600',
                'all': 'bg-gray-600'
            };
            return colors[category] || 'bg-gray-600';
        },

        getCategoryInitial(category) {
            return category.charAt(0).toUpperCase();
        },

        resetSearch() {
            this.searchQuery = '';
            this.selectedCategory = 'all';
            this.activeIndex = null;
        },

        getCategoryQuestions(categoryId) {
            return this.questions.filter(q => q.category === categoryId).slice(0, 3);
        },

        jumpToQuestion(questionId) {
            const questionIndex = this.questions.findIndex(q => q.id === questionId);
            if (questionIndex !== -1) {
                this.activeIndex = questionIndex;
                this.selectedCategory = 'all';
                this.searchQuery = '';

                // Scroll to the question
                this.$nextTick(() => {
                    const element = document.querySelectorAll('.bg-white.rounded-lg.shadow-sm.overflow-hidden')[questionIndex];
                    if (element) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                });
            }
        },

        scrollToTop() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        },

        scrollToContact() {
            const contactSection = document.getElementById('contact-section');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }
        },

        formatAnswer(answer) {
            // This method can be expanded to handle more complex formatting
            return answer;
        }
    }
}
</script>

<style>
/* Animation for expanding FAQ answers */
.animate-fadeIn {
    animation: fadeIn 0.3s ease-in;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Utility for line clamping */
.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

/* Custom scrollbar for better UX */
::-webkit-scrollbar {
    width: 8px;
}

::-webkit-scrollbar-track {
    background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
    background: #a8a8a8;
}
</style>