<template>
  <div>
    <div class="create-button-post">
      <input type="file" @change="onFile" />
    </div>
    <MoleculesPostCreatewindow
      @success="getSuccessResult()"
      v-if="imgSrc"
      :imgSrc="imgSrc"
      :uploadedFile="uploadedFile"
    ></MoleculesPostCreatewindow>
  </div>
</template>

<script setup>
let imgSrc = ref();
let uploadedFile = ref();
const onFile = (e) => {
  const files = e.target.files;
  if (!files.length) return;
  uploadedFile.value = files[0];
  console.log(uploadedFile.value);

  const reader = new FileReader();
  reader.readAsDataURL(files[0]);
  reader.onload = () => (imgSrc.value = reader.result);
};

const getSuccessResult = () => {
  imgSrc.value = "";
  uploadedFile.value = null;
};
</script>

<style lang="scss" scoped></style>
