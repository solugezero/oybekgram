<template>
  <div class="sidebar">
    <div class="sidebar_top">
      <NuxtLink to="/"
        ><img
          src="@/public/img/logowithoutbg.png"
          alt=""
          class="sidebar_top__logo"
      /></NuxtLink>

      <div class="sidebar_top_buttons">
        <!-- Menu button component -->
        <MoleculesSidebarMenubutton icon="Home"
          ><NuxtLink to="/">Home</NuxtLink></MoleculesSidebarMenubutton
        >
        <MoleculesSidebarMenubutton icon="Search"
          >Search</MoleculesSidebarMenubutton
        >
        <div
          class="profile-button"
          @click="router.push({ path: `/${username}` })"
        >
          <img ref="avatar" src="" alt="" />
          <p class="profile__username">{{ username }}</p>
        </div>
      </div>
    </div>
    <div class="sidebar_bottom">
      <MoleculesSidebarMenubutton icon="Menu">More</MoleculesSidebarMenubutton>
    </div>
  </div>
</template>

<script setup>
const router = useRouter();
const data = ref();
const avatar = ref();
const username = ref(process.client ? localStorage.getItem("username") : "");
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
  await fetch(
    `http://localhost:8080/getAvatar/${localStorage.getItem("username")}`,
    {
      method: "GET",
    }
  ).then((response) => {
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
.sidebar {
  display: flex;
  width: 320px;
  height: 100vh;
  position: fixed;
  background: #171717;
  flex-direction: column;
  justify-content: space-between;

  &_bottom {
    margin: 24px 20px;
  }

  &_top {
    align-items: center;
    flex-direction: column;
    display: flex;
    height: min-content;
    width: calc(100% - 40px);
    margin: 24px 20px;
    gap: 84px;

    &__logo {
      aspect-ratio: 10;
      width: 70%;
      user-select: none;
    }

    &_buttons {
      display: flex;
      width: 100%;
      flex-direction: column;
      gap: 17px;

      img {
        object-fit: cover;
        width: 25px;
        height: 25px;
        border-radius: 50%;
      }
    }
  }
}

.profile-button {
  display: flex;
  flex-direction: row;
  gap: 12px;
  align-items: center;
  cursor: pointer;
}
</style>
