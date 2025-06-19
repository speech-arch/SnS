<script setup lang="ts">
const items = inject('items') as Array<{ label: string; icon: string; badge?: number; items?: any[] }> | undefined
const isMobile = inject('isMobile') as boolean | undefined
</script>

<template>
	<div v-if="isMobile">
	      <div class="fixed top-0 left-0 right-0 z-50 bg-white shadow w-full">
	        <NavBarUserSection 
	          avatar-class="ml-4 w-10 h-10 rounded-full object-cover aspect-square"
	          color-mode-class=""
	          search-class="w-full max-w-[80%]"
              wrapper-clasee="flex items-center justify-between p-4 bg-white w-full"
	        />
	      </div>
	      <div class="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow w-full">
	        <div class="grid grid-cols-4 gap-2 p-4 bg-white">
	          <div v-for="item in items" :key="item.label" class="flex flex-col items-center justify-center">
	            <i :class="[item.icon, 'text-2xl mb-1']" />
	            <span class="text-xs">{{ item.label }}</span>
	          </div>
	        </div>
	      </div>
	    </div>
</template>