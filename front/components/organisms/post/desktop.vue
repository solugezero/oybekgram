<template>
  <div class="post">
    <div class="post_top">
      <MoleculesProfileGetAvatar borderRadius="50%" class="post_top__avatar" />
      <p class="post_top__username">{{ currentData?.owner }}</p>
    </div>
    <img :src="imgSrc" alt="" class="post__img" />
    <div class="post_bottom">
      <div class="post_bottom_buttons">
        <div class="post_bottom_buttons_left">
          <img
            v-if="!isLiked"
            class="post_bottom_buttons__button"
            src="@/assets/svg/heart-492.svg"
            @click="likePost()"
            alt=""
          />
          <img
            v-else
            class="post_bottom_buttons__button"
            src="@/assets/svg/heart-992.svg"
            @click="likePost()"
            alt=""
          />
          <!-- <img
            class="post_bottom_buttons__button"
            src="@/assets/svg/message.svg"
            alt=""
          /> -->
        </div>
        <!-- <img
          class="post_bottom_buttons__button"
          src="@/assets/svg/bookmark.svg"
          alt=""
        /> -->
      </div>
      <p class="post_bottom__likes">{{ likeAmount }} likes</p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  currentData: {
    type: Object,
    default: () => {},
  },
  imgSrc: {
    type: String,
    default: "",
  },
});

let likeAmount = ref(props.currentData?.likes.length);
let isLiked = ref(true);

const likePost = async () => {
  const promise = await useFetch("http://localhost:8080/posts/like", {
    method: "POST",
    body: {
      child: localStorage.getItem("username"),
      _id: props.currentData._id,
    },
    onResponse({ response }) {
      if (response._data.message === "like") {
        likeAmount.value = likeAmount.value + 1;
      } else {
        likeAmount.value = likeAmount.value - 1;
      }
      checkLike();
    },
  });
};

const checkLike = async () => {
  const promise = await useFetch("http://localhost:8080/posts/checkLike", {
    method: "POST",
    body: {
      child: localStorage.getItem("username"),
      _id: props.currentData._id,
    },
    onResponse({ response }) {
      isLiked.value = response._data.message;
    },
  });
};

onMounted(() => {
  checkLike();
});
</script>

<style lang="scss" scoped>
.asd {
  width: 15px;
  height: 15px;
}
.post {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  max-width: 500px;

  &__img {
    // aspect-ratio: 3/4;
    width: 100%;
    height: auto;
    object-fit: cover;
  }

  &_top {
    display: flex;
    flex-direction: row;
    gap: 13px;
    align-items: center;
    color: #fff;
    background: #171717;
    border-radius: 12px 12px 0px 0px;
    padding: 10px;

    &__avatar {
      width: 30px;
      height: 30px;
    }
  }

  &_bottom {
    display: flex;
    flex-direction: column;
    gap: 8px;
    background: #171717;
    border-radius: 0px 0px 12px 12px;
    color: #fff;
    padding: 10px;

    &_buttons {
      display: flex;
      width: 100%;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;

      &__button {
        width: 30px;
        height: 30px;
      }

      img {
        cursor: pointer;
      }

      &_left {
        display: flex;
        flex-direction: row;
        gap: 16px;
        align-items: center;

        img {
          cursor: pointer;
        }
      }
    }
  }
}
</style>
