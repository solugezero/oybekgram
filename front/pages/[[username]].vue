<template>
  <div class="profile">
    <OrganismsSidebarDesktop />

    <div class="profile_content-box">
      <OrganismsProfile
        :currentData="currentData"
        :isOwner="isOwner"
      ></OrganismsProfile>
      <MoleculesPostCreatebutton v-if="isOwner"></MoleculesPostCreatebutton>
      <OrganismsProfilePosts></OrganismsProfilePosts>
    </div>
  </div>
</template>

<script setup>
const route = useRoute();
const isOwner = ref(false);
let currentData = ref();
onMounted(async () => {
  console.log("Fetching");
  const getCurrentData = async () => {
    await fetch(`http://localhost:8080/${route.path.slice(1)}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        currentData.value = data;
      });
  };
  await getCurrentData();
  isOwner.value =
    route.path.slice(1) === localStorage?.getItem("username") ? true : false;
});
</script>

<style lang="scss" scoped>
.logout {
  background: unset;
  border: none;
  font-size: 12px;
  cursor: pointer;
}
.profile {
  //   display: flex;
  //   flex-direction: row;
  position: relative;
  width: 100%;

  &_content-box {
    margin-left: 320px;
    width: calc(100% - 320px);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 50px;

    &_user-info_container {
      display: flex;
      width: 100%;
      height: auto;
      flex-direction: row;
      justify-content: center;
      gap: 30px;
      padding-top: 48px;

      &__avatar {
        display: flex;
        width: 150px;
        height: 150px;
        object-fit: cover;
        border-radius: 50%;
      }

      &_data {
        display: flex;
        flex-direction: column;
        gap: 12px;

        &_username-wrapper {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 24px;
          max-height: 32px;
        }

        &_stats {
          display: flex;
          flex-direction: row;
          gap: 18px;
        }

        &__description {
          max-width: 300px;
          flex-wrap: wrap;
        }
      }
    }
  }
}
</style>
