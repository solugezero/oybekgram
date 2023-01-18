<template>
  <div class="profile_content-box_user-info_container">
    <div class="profile_content-box_user-info_container__avatar">
      <MoleculesProfileGetAvatar borderRadius="50%" />
    </div>
    <!-- profile_content-box_user-info_container__avatar -->
    <div class="profile_content-box_user-info_container_data">
      <div
        class="profile_content-box_user-info_container_data_username-wrapper"
      >
        <p
          class="profile_content-box_user-info_container_data_username-wrapper__username"
        >
          {{ currentData?.username }}
        </p>
        <ui-button v-if="isOwner" @click="router.push({ path: '/edit' })"
          >Edit profile</ui-button
        >
        <button v-if="isOwner" @click="logOutFunc()" class="logout">
          Выйти
        </button>
      </div>

      <div
        class="profile_content-box_user-info_container_data_following-buttons"
      >
        <MoleculesProfileFollowButton
          @followed="(val) => followedFunc(val)"
          v-if="!isOwner"
          :isOwner="isOwner"
          :parentUsername="currentData?.username"
        ></MoleculesProfileFollowButton>
      </div>

      <div class="profile_content-box_user-info_container_data_stats">
        <p class="profile_content-box_user-info_container_data_stats__item">
          {{ currentData?.posts.length }} posts
        </p>
        <p class="profile_content-box_user-info_container_data_stats__item">
          {{ currentData?.followers.length }} followers
        </p>
        <p class="profile_content-box_user-info_container_data_stats__item">
          {{ currentData?.following.length }} following
        </p>
      </div>

      <p class="profile_content-box_user-info_container_data__nickname">
        {{ currentData?.nickname }}
      </p>
      <p class="profile_content-box_user-info_container_data__description">
        {{ currentData?.description }}
      </p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  currentData: {
    type: Object,
    default: () => {},
  },
  isOwner: {
    type: Boolean,
    default: false,
  },
});

const route = useRoute();
const router = useRouter();

const isOwner = ref(false);

const logOutFunc = () => {
  localStorage.clear();
  router.push({ path: "/auth/login" });
};
let currentData = ref();
const distributorProfile = () => {
  if (localStorage.getItem("username") === route.path.slice(1)) {
  }
};

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

const followedFunc = (val) => {
  if (val === "follow") {
    currentData.value.followers.push(localStorage.getItem("username"));
  } else {
    currentData.value.followers.splice(
      currentData.value.followers.indexOf(localStorage.getItem("username"), 1)
    );
  }
};
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
