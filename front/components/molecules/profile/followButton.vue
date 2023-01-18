<template>
  <div class="follow">
    <button @click="handleFollow()">{{ buttonText }}</button>
  </div>
</template>

<script setup>
const emit = defineEmits(["followed"]);
const isFollowed = ref(false);
const buttonText = computed(() => {
  if (isFollowed.value) return "Вы подписаны";
  else return "Подписаться";
});
const props = defineProps({
  parentUsername: {
    type: String,
    default: "",
  },
  isOwner: {
    type: Boolean,
    default: false,
  },
});
const handleFollow = async () => {
  const { data, pending, error, refresh } = await useFetch(
    "http://localhost:8080/handleFollow",
    {
      initialCache: false,
      method: "POST",
      body: {
        parent: props.parentUsername,
        child: localStorage?.getItem("username"),
      },
      onResponse({ response }) {
        if (response._data.message === "follow") {
          isFollowed.value = true;
          emit("followed", "follow");
        } else {
          isFollowed.value = false;
          emit("followed", "unfollow");
        }
      },
    }
  );
};

watch(
  () => props.parentUsername,
  async (newValue, oldValue) => {
    if (newValue.length && !props.isOwner) {
      const { data, pending, error, refresh } = await useFetch(
        "http://localhost:8080/checkFollow",
        {
          initialCache: false,
          method: "POST",
          body: {
            parent: newValue,
            child: localStorage?.getItem("username"),
          },
          onResponse({ response }) {
            isFollowed.value = response._data.message;
          },
        }
      );
    }
  },
  { deep: true }
);
</script>

<style lang="scss" scoped>
.follow {
  button {
    padding: 2px 10px;
    border-radius: 12px;
    color: black;
    border: none;
    cursor: pointer;
    background: #fff;
    transition: background 0.3s;

    &:hover {
      background: rgb(218, 218, 218);
    }
  }
}
</style>
