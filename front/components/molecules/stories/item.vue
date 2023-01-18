<template>
  <div class="stories-item">
    <img
      class="stories-item__avatar"
      src="https://via.placeholder.com/70"
      alt=""
    />
    <p class="stories-item__username">username</p>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.stories-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  &__avatar {
    border-radius: 50%;
  }

  &__username {
    color: #fff;
  }
}
</style>
