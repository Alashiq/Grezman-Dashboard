<template>
    <div class="loading-box">
      <img
        src="@/assets/loading.gif"
      />
    </div>
</template>



<style>
.loading-box {
  float: right;
  height: 100vh;
  width: 100%;
  position: fixed;
  z-index: 100;
  top: 0px;
  right: 0px;
  left: 0px;
  bottom: 0px;
  background-color: hsla(0, 0%, 100%, 0.9);
}
.loading-box   img {
    height: 100px;
    width: 100px;
    float: right;
    margin: calc(50vh - 50px) calc(50% - 50px);
  }
</style>
