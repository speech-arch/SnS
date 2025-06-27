<template>
  <div class="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-900 shadow mt-8 rounded-xl">
    <h1 class="text-2xl font-bold mb-4 text-center">Create Park or Event</h1>
    <div class="mb-6 flex justify-center">
      <Dropdown v-model="type" :options="typeOptions" optionLabel="label" optionValue="value" class="w-40" />
    </div>
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div class="mb-2">
        <label class="block mb-1 font-semibold">Is it Free?</label>
        <Dropdown v-model="form.isFree" :options="freeOptions" optionLabel="label" optionValue="value" class="w-full" required />
      </div>
      <div v-if="type === 'park'">
        <InputText v-model="form.name" placeholder="Park Name" class="w-full" required />
        <div class="mt-2">
          <label class="block mb-1 font-semibold">Description</label>
          <InputTextarea v-model="form.description" placeholder="Description" class="w-full mt-2" rows="3" required />
        </div>
        <InputText v-model="form.location" placeholder="Location" class="w-full mt-2" required />
        <div class="mt-2">
          <label class="block mb-1 font-semibold">Amenities</label>
          <MultiSelect v-model="form.amenities" :options="amenitiesOptions" optionLabel="label" optionValue="value" placeholder="Select amenities" class="w-full" display="chip" />
        </div>
        <div class="mt-2">
          <label class="block mb-1 font-semibold">Established Date</label>
          <Calendar v-model="form.date" class="w-full" showIcon dateFormat="yy-mm-dd" required />
        </div>
        <div class="mt-2">
          <label class="block mb-1 font-semibold">Image</label>
          <FileUpload mode="basic" name="image" accept="image/*" customUpload @uploader="onImageUpload" chooseLabel="Choose Image" class="w-full" />
        </div>
      </div>
      <div v-else-if="type === 'event'">
        <InputText v-model="form.name" placeholder="Event Name" class="w-full" required />
        <div class="mt-2">
          <label class="block mb-1 font-semibold">Description</label>
          <InputTextarea v-model="form.description" placeholder="Description" class="w-full mt-2" rows="3" required />
        </div>
        <InputText v-model="form.location" placeholder="Location" class="w-full mt-2" required />
        <InputText v-model="form.organizer" placeholder="Organizer" class="w-full mt-2" required />
        <div class="mt-2">
          <label class="block mb-1 font-semibold">Age Recommendation</label>
          <Dropdown v-model="form.ageRecommendation" :options="ageOptions" optionLabel="label" optionValue="value" class="w-full" required />
        </div>
        <div class="mt-2">
          <label class="block mb-1 font-semibold">Event Date</label>
          <Calendar v-model="form.date" class="w-full" showIcon dateFormat="yy-mm-dd" required />
        </div>
        <div class="mt-2">
          <label class="block mb-1 font-semibold">Image</label>
          <FileUpload mode="basic" name="image" accept="image/*" customUpload @uploader="onImageUpload" chooseLabel="Choose Image" class="w-full" />
        </div>
      </div>
      <Button type="submit" label="Create" class="w-full p-button-primary mt-4" />
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Dropdown from 'primevue/dropdown';
import Calendar from 'primevue/calendar';
import FileUpload from 'primevue/fileupload';
import MultiSelect from 'primevue/multiselect';

const typeOptions = [
  { label: 'Park', value: 'park' },
  { label: 'Event', value: 'event' },
];
const freeOptions = [
  { label: 'Free', value: true },
  { label: 'Paid', value: false },
];
const amenitiesOptions = [
  { label: 'Playground', value: 'playground' },
  { label: 'Restrooms', value: 'restrooms' },
  { label: 'Picnic Area', value: 'picnic' },
  { label: 'Parking', value: 'parking' },
  { label: 'Sports Fields', value: 'sports' },
  { label: 'Walking Trails', value: 'trails' },
  { label: 'Dog Park', value: 'dogpark' },
  { label: 'Water Fountain', value: 'water' },
];
const ageOptions = [
  { label: 'All Ages', value: 'all' },
  { label: '0-5', value: '0-5' },
  { label: '6-12', value: '6-12' },
  { label: '13-18', value: '13-18' },
  { label: '18+', value: '18+' },
];
const type = ref<'park' | 'event'>('park');
const form = ref({
  name: '',
  description: '',
  location: '',
  date: null as Date | null,
  image: null as File | null,
  organizer: '',
  isFree: null as boolean | null,
  amenities: [] as string[],
  ageRecommendation: '' as string,
});

function onImageUpload(event: any) {
  if (event.files && event.files.length > 0) {
    form.value.image = event.files[0];
  }
}

function handleSubmit() {
  // Placeholder: handle form submission
  alert(`Created ${type.value}: ${form.value.name}`);
  form.value = { name: '', description: '', location: '', date: null, image: null, organizer: '', isFree: null, amenities: [], ageRecommendation: '' };
}
</script>
