<script setup lang="ts">
const items = inject('items') as Array<{ label: string; icon: string; badge?: number; items?: any[] }> | undefined
const isMobile = inject('isMobile') as boolean | undefined

const navBgClass = 'bg-white dark:bg-black dark:text-white';

const navShadowClass = 'shadow-2xl dark:shadow-[0_-4px_24px_0_rgba(255,255,255,0.12)] shadow-[0_-4px_24px_0_rgba(0,0,0,0.12)] dark:shadow-2xl';
</script>

<template>
	<div v-if="isMobile" :class="navBgClass">
	      <div class="fixed top-0 left-0 right-0 z-50" :class="`${navBgClass} ${navShadowClass} w-full`">
	        <NavBarUserSection 
	          avatar-class="ml-4 w-10 h-10 rounded-full object-cover aspect-square"
	          color-mode-class=""
	          search-class="w-full max-w-[80%]"
	          :wrapperClass="`flex items-center justify-between p-4 w-full ${navBgClass}`"
	        />
	      </div>
	      <div class="fixed bottom-0 left-0 right-0 z-50" :class="`${navBgClass} ${navShadowClass} w-full`">
	        <div class="grid grid-cols-4 gap-2 p-4" :class="navBgClass">
	          <div v-for="item in items" :key="item.label" class="flex flex-col items-center justify-center bg-blue-200 hover:bg-blue-300 text-blue-900">
				<i :class="[item.icon, 'text-2xl mb-1 text-black dark:text-white']" />
	            <span class="text-xs text-black" :class="navBgClass" >{{ item.label }}</span>
	          </div>
	        </div>
	      </div>
	    </div>
</template>