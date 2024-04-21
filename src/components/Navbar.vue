<template>
    <nav class="bg-gray-800 py-4">
      <div class="container mx-auto flex justify-between items-center">
        <!-- Logo -->
        <div>
          <router-link to="/">
            <img src="logo.png" alt="Logo" class="h-8">
          </router-link>
        </div>
        
        <!-- Módulos -->
        <div class="space-x-4">
          <!-- User -->
          <router-link to="/user" class="text-white hover:text-gray-300">User</router-link>
          
          <!-- Passwords -->
          <router-link to="/password" class="text-white hover:text-gray-300">Passwords</router-link>
        </div>
      </div>
    </nav>
    <slot></slot>
  </template>
  
  <script>
  export default {
    methods: {
      openUserModule() {
        // Redirigir a la ruta de usuario
        this.$router.push('/user');
      },
      openPasswordsModule() {
        // Redirigir a la ruta de contraseñas
        this.$router.push('/passwords');
      }
    }
  };
  </script>
  
  