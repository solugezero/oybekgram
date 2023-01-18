<template>
  <NuxtLayout>
    <notifications />
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
const router = useRouter();
const route = useRoute();
onBeforeMount(() => {
  if (
    !localStorage.getItem("authToken") &&
    !route.path.split("/").includes("auth")
  ) {
    router.push({ path: "/auth/login" });
  }
});
</script>

<style lang="scss"></style>
