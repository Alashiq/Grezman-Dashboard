<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div class="bg-blue-500 w-32 h-20">aaaa</div>
    <button @click="showAlert">Hello world</button>

  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>


<script>

export default {
  methods: {
    showAlert() {
      // Use sweetalert2
      this.$alert.Success("aaa");

      // this.$swal('Hello Vue world!!!');
    },
  },
};
</script>
