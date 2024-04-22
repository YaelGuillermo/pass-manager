<script>
import 'tailwindcss/tailwind.css'

import Navbar from './components/Navbar.vue';
export default {
  name: 'App',
  components: {
    Navbar 
  }
};
</script>

<template>
  <Navbar>
    <router-view/>
  </Navbar>
</template>


