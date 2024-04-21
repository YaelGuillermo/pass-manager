<template>
  <div>
    <h2>User Registration</h2>
    <!-- Formulario de registro de usuario -->
    <form @submit.prevent="saveUser">
      <div>
        <label for="nickname">Nickname:</label>
        <input type="text" v-model="nickname" id="nickname" required>
      </div>
      <div>
        <label for="birthdate">Birthdate:</label>
        <input type="date" v-model="birthdate" id="birthdate" required>
      </div>
      <div>
        <button type="submit">Save</button>
      </div>
    </form>

    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>Nickname</th>
            <th>Birthdate</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in users" :key="index">
            <td>{{ user.nickname }}</td>
            <td>{{ user.birthdate }}</td>
            <td>
              <button @click="editUser(index)">Edit</button>
              <button @click="deleteUser(index)">Delete</button>
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
      users: []
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

  