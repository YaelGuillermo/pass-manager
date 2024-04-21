<template>
  <div>
    <h2>Create New Password</h2>
    <form @submit.prevent="saveCredential">
      <label for="user">User:</label>
      <select v-model="selectedUser" id="user" required>
        <option v-for="(user, index) in users" :key="index" :value="user.nickname">{{ user.nickname }}</option>
      </select>
      <br>
      <label for="platform">Platform:</label>
      <select v-model="platform" id="platform">
        <option value="email">Email</option>
        <option value="socialMedia">Social Media</option>
        <option value="card">Card</option>
      </select>
      <br>
      <div v-if="platform === 'email'">
        <label for="email">Email:</label>
        <input type="email" v-model="email" id="email" required>
      </div>
      <div v-if="platform === 'socialMedia'">
        <label for="socialMedia">Social Media:</label>
        <input type="text" v-model="socialMedia" id="socialMedia" required>
      </div>
      <div v-if="platform === 'card'">
        <label for="cardNumber">Card Number:</label>
        <input type="text" v-model="cardNumber" id="cardNumber" required>
      </div>
      <br>
      <label for="password">Password:</label>
      <input type="password" v-model="password" id="password" required>
      <br>
      <br>
      <button type="submit">Save</button>
    </form>

    <h2>Saved Credentials</h2>
    <table>
      <thead>
        <tr>
          <th>User</th>
          <th>Platform</th>
          <th>Information</th>
          <th>Password</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(credential, index) in credentials" :key="index">
          <td>{{ credential.user }}</td>
          <td>{{ credential.platform }}</td>
          <td>{{ credential.information }}</td>
          <td>{{ credential.password }}</td>
          <td>
            <button @click="editCredential(index)">Edit</button>
            <button @click="deleteCredential(index)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      platform: 'email',
      email: '',
      socialMedia: '',
      cardNumber: '',
      password: '',
      selectedUser: '',
      credentials: [],
      users: [], // Assume this is populated elsewhere
      editingIndex: null // To keep track of the index of the credential being edited
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

      // Clear fields after saving
      this.platform = 'email';
      this.email = '';
      this.socialMedia = '';
      this.cardNumber = '';
      this.password = '';
      this.selectedUser = '';
    },
    editCredential(index) {
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
    },
    deleteCredential(index) {
      this.credentials.splice(index, 1);
      localStorage.setItem('credentials', JSON.stringify(this.credentials));
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

  
  