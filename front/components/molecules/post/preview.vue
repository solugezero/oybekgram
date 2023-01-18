<template>
  <ui-modal>
    <div class="post-preview">
      <img :src="imgSrc" alt="" />
    </div>

    <template #inner
      ><OrganismsPostDesktop
        :imgSrc="imgSrc"
        :currentData="postData"
      ></OrganismsPostDesktop
    ></template>
  </ui-modal>
</template>

<script setup>
const props = defineProps({
  _id: {
    type: String,
  },
  postData: {
    type: Object,
  },
});

let imgSrc = ref();
let uploadedFile = ref();
const onFile = (file) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => (imgSrc.value = reader.result);
};

const getCurrentImage = () => {
  const promise = useFetch(`http://localhost:8080/posts/getCurrentPostImage`, {
    method: "POST",
    body: {
      _id: props._id,
    },
    onResponse({ response }) {
      onFile(response._data);
    },
  });

  promise.refresh();
};

onMounted(() => {
  getCurrentImage();
});
</script>

<style lang="scss" scoped>
.post-preview {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  img {
    width: 100%;
    aspect-ratio: 1;
    object-fit: cover;
    height: 100%;
  }
}
</style>
