<template>
  <div>
    <img ref="avatar" src="https://via.placeholder.com/150" alt="" />
  </div>
</template>

<script setup>
const data = ref();
const avatar = ref();
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
const getAvatar = async () => {
  await fetch("http://localhost:8080/getAvatar/solugezero", {
    method: "GET",
  }).then((response) => {
    response.blob().then((blobResponse) => {
      data.value = blobResponse;
    });
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

<style lang="scss" scoped></style>
