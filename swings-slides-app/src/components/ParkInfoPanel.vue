<template>
  <div class="flex flex-col justify-between gap-6">
    <div>
      <h1 class="text-3xl font-bold mb-2">{{ item[nameKey] }}</h1>
      <Tag
        :value="item.isOpen ? 'Open' : 'Closed'"
        :severity="item.isOpen ? 'success' : 'danger'"
        class="mb-3"
      />
      <div class="flex flex-col gap-2 text-gray-700">
        <template v-for="field in fields" :key="field.valueKey">
          <p>
            <i :class="field.icon"></i>
            <span>
              <template v-if="field.format">
                {{ field.format(item[field.valueKey], item) }}
              </template>
              <template v-else>
                {{ item[field.valueKey] }}
              </template>
            </span>
          </p>
        </template>
        <Rating v-if="ratingKey" :value="item[ratingKey]" readonly :cancel="false" class="mt-2" />
      </div>
    </div>
    <div class="mt-6 flex gap-3">
      <Button label="Add to Favorites" icon="pi pi-heart" outlined />
      <Button label="Plan Visit" icon="pi pi-calendar" />
    </div>
  </div>
</template>

<script setup>

const props = defineProps({
  item: { type: Object, required: true },
  nameKey: { type: String, default: 'name' },
  ratingKey: { type: String, default: 'rating' },
  fields: {
    type: Array,
    required: true,
    // [{ icon: 'pi pi-map-marker', valueKey: 'location', label: 'Location', format: (val, item) => val }]
  }
});
</script>
