<template>
  <div>
    <img ref="avatar" :style="getAvatarStyle" src="" alt="" />
  </div>
</template>

<script setup>
const props = defineProps({
  borderRadius: {
    type: String,
    default: "0%",
  },
});

const getAvatarStyle = computed(() => {
  return {
    "border-radius": props.borderRadius,
  };
});

const route = useRoute();
const data = ref();
const avatar = ref();
function stringAvatar() {}

function previewFile() {
  const preview = avatar.value;
  const file = data.value;
  const reader = new FileReader();
  reader.addEventListener(
    "load",
    () => {
      // convert image file to base64 string
      preview.src = reader.result;
    },
    false
  );
  if (file) {
    reader.readAsDataURL(file);
  }
}
// const getAvatar = async () => {
//   await fetch(`http://localhost:8080/getAvatar/${route.path.slice(1)}`, {
//     method: "GET",
//   }).then((response) => {
//     response.blob().then((blobResponse) => {
//       data.value = blobResponse;
//     });
//   });
// };

const getAvatar = async () => {
  await fetch(`http://localhost:8080/getAvatar/${route.path.slice(1)}`, {
    method: "GET",
  }).then((response) => {
    if (response.status === 200) {
      response.blob().then((blobResponse) => {
        data.value = blobResponse;
      });
    } else {
      response.json().then((data) => {
        avatar.value.src = data.message;
      });
    }
  });
};

onMounted(() => {
  getAvatar();
});
watch(
  () => typeof data.value,
  (newValue, oldValue) => {
    if (newValue === "object") {
      previewFile();
    }
  },
  { deep: true }
);
</script>

<style lang="scss" scoped>
img {
  object-fit: cover;
  width: 100%;
  height: 100%;
}
</style>
