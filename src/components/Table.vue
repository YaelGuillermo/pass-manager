<template>
    <table class="w-full border-collapse">
      <thead>
        <tr>
          <th v-for="(header, index) in tableHeaders" :key="index" class="text-left px-4 py-2 bg-gray-100">
            {{ header }}
          </th>
        </tr>
      </thead>
      <tbody>
        <slot></slot>
      </tbody>
    </table>
  </template>
  
  <script>
  import CustomButton from '@/components/Button.vue';
  
  export default {
    components: {
      CustomButton
    },
    props: {
      credentials: {
        type: Array,
        required: true
      },
      tableHeaders: {
        type: Array,
        required: true
      }
    }
  };
  </script>
  