<template>
  <div class="p-4"> <!-- Agregamos padding al contenedor principal -->
    <h2 class="text-2xl text-gray-700 mb-4">User Registration</h2> <!-- Tamaño del texto y margen inferior -->
    <form @submit.prevent="saveUser">
      <div class="mb-4"> <!-- Margen inferior -->
        <label for="nickname" class="block text-xs font-medium text-gray-700 mb-1">Nickname</label> <!-- Margen inferior para el texto y para el input -->
        <input
          type="text"
          v-model="nickname"
          id="nickname"
          placeholder="Nickname"
          class="w-full rounded-md border-gray-200 shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500" 
          required
        />
      </div>
      <div class="mb-4"> <!-- Margen inferior -->
        <label for="birthdate" class="block text-xs font-medium text-gray-700 mb-1">Birthdate</label> <!-- Margen inferior para el texto y para el input -->
        <input type="date" v-model="birthdate" id="birthdate" class="w-full rounded-md border-gray-200 shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500" required /> <!-- Clases para el ancho, bordes, sombra y estilo de foco -->
      </div>
      <div>
        <button type="submit" class="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600">Save</button> <!-- Clases para el color de fondo, color de texto, padding y bordes redondeados, y hover -->
      </div>
    </form>

    <div class="mt-8"> <!-- Margen superior -->
      <h2 class="text-2xl text-gray-700 mb-4">Users</h2> <!-- Tamaño del texto y margen inferior -->
      <table class="w-full border-collapse"> <!-- Ancho completo y colapsado de bordes -->
        <thead>
          <tr>
            <th class="text-left px-4 py-2 bg-gray-100">Nickname</th> <!-- Alineación del texto a la izquierda, padding, fondo gris claro -->
            <th class="text-left px-4 py-2 bg-gray-100">Birthdate</th> <!-- Alineación del texto a la izquierda, padding, fondo gris claro -->
            <th class="text-left px-4 py-2 bg-gray-100">Actions</th> <!-- Alineación del texto a la izquierda, padding, fondo gris claro -->
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in users" :key="index" class="border-b"> <!-- Bordes inferiores -->
            <td class="px-4 py-2">{{ user.nickname }}</td> <!-- Padding -->
            <td class="px-4 py-2">{{ user.birthdate }}</td> <!-- Padding -->
            <td class="px-4 py-2">
              <button @click="editUser(index)" class="bg-blue-500 text-white px-2 py-1 rounded-md mr-2 hover:bg-blue-600">Edit</button> <!-- Color de fondo, color de texto, padding, bordes redondeados, margen derecho y hover -->
              <button @click="deleteUser(index)" class="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600">Delete</button> <!-- Color de fondo, color de texto, padding, bordes redondeados y hover -->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>


<script>

export default {
  data() {
    return {
      nickname: '',
      birthdate: '',
      users: [],
      editingIndex: null
    };
  },
  methods: {
    saveUser() {
      // Crear objeto de usuario
      const newUser = {
        nickname: this.nickname,
        birthdate: this.birthdate
      };

      // Si se está editando un usuario, actualiza en lugar de agregar
      if (this.editingIndex !== null) {
        this.users.splice(this.editingIndex, 1, newUser);
        this.editingIndex = null; // Termina el modo de edición
      } else {
        // Agregar nuevo usuario a la lista
        this.users.push(newUser);
      }

      // Guardar lista de usuarios en Local Storage
      localStorage.setItem('users', JSON.stringify(this.users));

      // Limpiar campos después de guardar
      this.nickname = '';
      this.birthdate = '';
    },
    editUser(index) {
      const userToEdit = this.users[index];
      this.nickname = userToEdit.nickname;
      this.birthdate = userToEdit.birthdate;
      this.editingIndex = index;
    },
    deleteUser(index) {
      this.users.splice(index, 1);
      localStorage.setItem('users', JSON.stringify(this.users));
    }
  },
  created() {
    // Obtener lista de usuarios del Local Storage al cargar la página
    const usersFromStorage = JSON.parse(localStorage.getItem('users'));
    if (usersFromStorage) {
      this.users = usersFromStorage;
    }
  }
};
</script>

  