<template>
  <div class="modal-form">
    <div class="modal-form_trigger" @click="handleModal()"><slot /></div>
    <div class="modal-form_content" v-if="isActive">
      <div class="modal-form_content_inner" ref="inner">
        <slot name="inner" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onClickOutside } from "@vueuse/core";
let inner = ref();
let isActive = ref(false);

onClickOutside(inner, () => (isActive.value = false));

const handleModal = () => {
  isActive.value = !isActive.value;
};
</script>

<style lang="scss" scoped>
.modal-form {
  &_trigger {
    cursor: pointer;
  }

  &_content {
    display: flex;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.664);
    position: absolute;
    top: 0;
    left: 0;
    justify-content: center;
    align-items: center;
  }
}
</style>
