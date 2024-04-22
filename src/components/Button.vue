<template>
 <button :class="computedClass" @click="handleClick">
      {{ buttonText }}
    </button>
</template>    
  
  <script>
  export default {
    props: {
      color: {
        type: String,
        default: "indigo-500" // Color por defecto
      },
      text: {
        type: String,
        default: "Button" // Texto por defecto
      }
    },
    computed: {
      computedClass() {
        return [
          "rounded-md",
          "px-4",
          "py-2",
          {
            [`bg-${this.color}`]: true,            
          },
          "text-white"
        ];
      },
      buttonText() {
        return this.text;
      }
    },
    methods: {
      handleClick() {
        this.$emit("click");
      }
    }
  };
  </script>
  

