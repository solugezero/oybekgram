<template>
  <div class="ui-input">
    <input
      :type="type"
      :placeholder="placeholder"
      class="ui-input__input"
      v-model="state"
    />
  </div>
</template>

<script setup>
const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
  placeholder: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "text",
  },
});

const state = ref();

watch(
  () => state.value,
  (newValue, oldValue) => {
    emit("update:modelValue", state.value);
  },
  { deep: true }
);
</script>

<style lang="scss" scoped>
.ui-input {
  display: flex;
  width: 100%;
  height: auto;
  position: relative;
  height: 45px;
  border-radius: 12px;
  background: #171717;

  &__input {
    background: unset;
    border: 1px solid black;
    padding: 12px 17px;
    border-radius: 12px;
    width: 100%;
    height: 100%;
  }
}
</style>
