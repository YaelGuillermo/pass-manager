<template>
  <div class="p-4"> 
    <div> <!-- Margen superior -->
      <h2 class="text-2xl text-gray-700 mb-4">Saved Credentials</h2> <!-- Tamaño del texto y margen inferior -->
      <!-- Campo de búsqueda -->
    <div class="mb-4 flex justify-between">
      <Search />
    </div>
    <CustomTable :tableHeaders="customTableHeaders">
      <tbody>
          <tr v-for="(credential, index) in credentials" :key="index" class="border-b"> <!-- Bordes inferiores -->
            <td class="px-4 py-2">{{ credential.user }}</td> <!-- Padding -->
            <td class="px-4 py-2">{{ credential.platform }}</td> <!-- Padding -->
            <td class="px-4 py-2">{{ credential.information }}</td> 
            
            <td class="px-4 py-2">
              <button @click="editCredential(index)" class="bg-blue-500 text-white px-2 py-1 rounded-md mr-2 hover:bg-blue-600">Edit</button> <!-- Color de fondo, color de texto, padding, bordes redondeados, margen derecho y hover -->
              <button @click="deleteCredential(index)" class="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600">Delete</button> <!-- Color de fondo, color de texto, padding, bordes redondeados y hover -->
            </td>
          </tr>
        </tbody>
</CustomTable>
  
    </div>
    <button @click="openModal" class="fixed bottom-4 right-4 bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600">New Password</button>
      <!-- Modal de Create New Password -->
      <div v-if="showModal" class="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center" @click.self="closeModal">
      <div class="bg-white rounded-lg p-8">
        <h2 class="text-2xl text-gray-700 mb-4">Create New Password</h2> <!-- Tamaño del texto y margen inferior -->
    <form @submit.prevent="saveCredential">
      <div class="mb-4"> <!-- Margen inferior -->
        <label for="user" class="block text-sm font-medium text-gray-700 mb-1">User:</label> <!-- Margen inferior para el texto y el select -->
        <select v-model="selectedUser" id="user" required class="w-full rounded-md border-gray-200 shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500"> <!-- Clases para el ancho, bordes, sombra y estilo de foco -->
          <option v-for="(user, index) in users" :key="index" :value="user.nickname">{{ user.nickname }}</option>
        </select>
      </div>
      <div class="mb-4"> <!-- Margen inferior -->
        <label for="platform" class="block text-sm font-medium text-gray-700 mb-1">Platform:</label> <!-- Margen inferior para el texto y el select -->
        <select v-model="platform" id="platform" class="w-full rounded-md border-gray-200 shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500"> <!-- Clases para el ancho, bordes, sombra y estilo de foco -->
          <option value="email">Email</option>
          <option value="socialMedia">Social Media</option>
          <option value="card">Card</option>
        </select>
      </div>
      <div v-if="platform === 'email'" class="mb-4"> <!-- Margen inferior -->
        <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email:</label> <!-- Margen inferior para el texto y el input -->
        <input type="email" v-model="email" id="email" required class="w-full rounded-md border-gray-200 shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500"> <!-- Clases para el ancho, bordes, sombra y estilo de foco -->
      </div>
      <div v-if="platform === 'socialMedia'" class="mb-4"> <!-- Margen inferior -->
        <label for="socialMedia" class="block text-sm font-medium text-gray-700 mb-1">Social Media:</label> <!-- Margen inferior para el texto y el input -->
        <input type="text" v-model="socialMedia" id="socialMedia" required class="w-full rounded-md border-gray-200 shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500"> <!-- Clases para el ancho, bordes, sombra y estilo de foco -->
      </div>
      <div v-if="platform === 'card'" class="mb-4"> <!-- Margen inferior -->
        <label for="cardNumber" class="block text-sm font-medium text-gray-700 mb-1">Card Number:</label> <!-- Margen inferior para el texto y el input -->
        <input type="text" v-model="cardNumber" id="cardNumber" required class="w-full rounded-md border-gray-200 shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500"> <!-- Clases para el ancho, bordes, sombra y estilo de foco -->
      </div>
      <div class="mb-4 relative"> <!-- Margen inferior -->
        <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Password:</label> <!-- Margen inferior para el texto y el input -->
        <input type="password" v-model="password" id="password" required class="w-full rounded-md border-gray-200 shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 pr-10"> <!-- Clases para el ancho, bordes, sombra y estilo de foco y espacio adicional para el botón de visualización -->
        <button type="button" @click="togglePasswordVisibility" class="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 focus:outline-none"> <!-- Botón para visualización de contraseña -->
          <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"/>
          </svg>
        </button>
      </div>
      <div class="mb-4"> <!-- Margen inferior -->
        <CustomButton type="submit" color="indigo-600" text="Save"/>
        <CustomButton @click="goToUserCreation" color="blue-500" text="Create User"/>
        <CustomButton @click="closeModal" color="red-500" text="Close"/>
      </div>
    </form>

      </div>
    </div>
  </div>
</template>

<script>
import CustomButton from '@/components/Button.vue'
import CustomTable from '@/components/Table.vue'
import CustomSearch from '@/components/Search.vue'

export default {
  components: {
    CustomButton,
    CustomTable,
    CustomSearch
  },
  data() {
    return {
      customTableHeaders: ['User', 'Platform', 'Information', 'Password', 'Actions'],
      customButtons: [
        { color: 'red-500', text: 'Delete' },
        { color: 'red-500', text: 'Delete' },
        { color: 'red-500', text: 'Delete' }
      ],
      platform: '',
      email: '',
      socialMedia: '',
      cardNumber: '',
      password: '',
      selectedUser: '',
      credentials: [],
      users: [], // Assume this is populated elsewhere
      editingIndex: null, // To keep track of the index of the credential being edited
      showModal: false
    };
  },
  methods: {
    saveCredential() {
      const newCredential = {
        platform: this.platform,
        information: this.platform === 'email' ? this.email : (this.platform === 'socialMedia' ? this.socialMedia : this.cardNumber),
        password: this.password,
        user: this.selectedUser
      };
      
      // If editing a credential, update instead of adding
      if (this.editingIndex !== null) {
        this.credentials.splice(this.editingIndex, 1, newCredential);
        this.editingIndex = null; // End edit mode
      } else {
        this.credentials.push(newCredential);
      }
      
      localStorage.setItem('credentials', JSON.stringify(this.credentials));

      this.closeModal()
    },
    editCredential(index) {
      this.showModal = true
      // Fill form with selected credential for editing
      const credential = this.credentials[index];
      this.platform = credential.platform;
      if (this.platform === 'email') {
        this.email = credential.information;
      } else if (this.platform === 'socialMedia') {
        this.socialMedia = credential.information;
      } else if (this.platform === 'card') {
        this.cardNumber = credential.information;
      }
      this.password = credential.password;
      this.selectedUser = credential.user;
      
      // Set index of credential being edited
      this.editingIndex = index;
      this.closeModal()
    },
    deleteCredential(index) {
      this.credentials.splice(index, 1);
      localStorage.setItem('credentials', JSON.stringify(this.credentials));
    },
    togglePasswordVisibility(index) {
      // Toggle password visibility for the input field in the form
      const passwordInput = document.getElementById('password');
      passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
    },
    toggleCredentialPassword(index) {
      // Toggle password visibility for the credential in the table
      this.credentials[index].showPassword = !this.credentials[index].showPassword;
    },
    openModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.clearFields()
    },
    goToUserCreation(){
      this.$router.push('/user');
    }, clearFields(){
      // Clear fields after saving
      this.platform = '';
      this.email = '';
      this.socialMedia = '';
      this.cardNumber = '';
      this.password = '';
      this.selectedUser = '';
    }
  },
  created() {
    const savedCredentials = localStorage.getItem('credentials');
    if (savedCredentials) {
      this.credentials = JSON.parse(savedCredentials);
    }
    const savedUsers = localStorage.getItem('users');
    if (savedUsers) {
      this.users = JSON.parse(savedUsers);
    }
  }
};
</script>

  
  