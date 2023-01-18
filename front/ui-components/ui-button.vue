<template>
  <div class="ui-button">
    <button
      :disabled="disabled"
      class="ui-button__button"
      @click="handleClick()"
    >
      <slot />
    </button>
  </div>
</template>

<script setup>
const emit = defineEmits(["click"]);
const handleClick = () => {
  emit("click");
};

const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="scss" scoped>
.ui-button {
  display: flex;
  align-items: center;

  &__button {
    background: #da0037;
    padding: 8px 30px;
    border: none;
    border-radius: 12px;
    font-size: 16px;
    cursor: pointer;
    transition: background 0.3s;
    width: 100%;

    &:disabled {
      background: grey;
      cursor: default;

      &:hover {
        background: grey;
      }
    }

    &:hover {
      background: #b3002d;
    }
  }
}
</style>
