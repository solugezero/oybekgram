<template>
  <div class="profile-posts">
    <MoleculesPostPreview
      v-for="(item, index) in result"
      :key="`result-preview__${index}`"
      :postData="item"
      :_id="item._id"
    ></MoleculesPostPreview>
  </div>
</template>

<script setup>
const route = useRoute();
let result = ref("");
const getAllPosts = async () => {
  let promise = useFetch(`http://localhost:8080/posts/getAllUserPost`, {
    method: "POST",
    body: {
      username: route.path.slice(1),
    },
    onResponse({ response }) {
      result.value = response._data;
    },
  });
  promise.refresh();
};
onMounted(() => {
  getAllPosts();
});
</script>

<style lang="scss" scoped>
.profile-posts {
  display: grid;
  grid-template-columns: repeat(3, 200px);
  align-items: center;
  justify-content: center;
  gap: 30px;
}
</style>
