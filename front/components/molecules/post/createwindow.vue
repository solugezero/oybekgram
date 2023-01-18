<template>
  <div class="create-window-post">
    <div class="create-window-post_inner">
      <div class="create-window-post_inner__label">Создание поста</div>
      <div class="create-window-post_inner_content">
        <img :src="imgSrc" alt="" class="create-window-post_inner__preview" />
        <div class="create-window-post_inner_content_data">
          <ui-input placeholder="Описание" v-model="postDescription"></ui-input>
          <div class="create-window-post_inner_content_data_buttons">
            <ui-button @click="sendPostData()">Добавить</ui-button>
            <ui-button>Отмена</ui-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useNotification } from "@kyvg/vue3-notification";
const emit = defineEmits(["success"]);
const { notify } = useNotification();
const props = defineProps({
  imgSrc: {
    type: String,
    default: "",
  },
  uploadedFile: {
    type: File,
  },
});
let postDescription = ref("");
const sendPostData = async () => {
  const { imgSrc, uploadedFile } = props;
  let formData = new FormData();
  formData.append("uploadedFile", uploadedFile);
  formData.append("postDescription", postDescription.value);
  formData.append("owner", localStorage.getItem("username"));

  const sendData = async () => {
    const promise = await useFetch("http://localhost:8080/posts/addPost", {
      method: "POST",
      body: formData,
      onResponse({ response }) {
        if (response.status === 200) {
          notify({
            title: "Успех",
            text: `Пост создан`,
            type: "success",
          });
          emit("success");
        } else {
          notify({
            title: "Ошибка",
            text: `Что то пошло не так, попробуйте ещё раз`,
            type: "error",
          });
        }
      },
    });
  };

  await sendData();
};
</script>

<style lang="scss" scoped>
.create-window-post {
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.363);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;

  &_inner {
    display: flex;
    background: #252525;
    // width: 80%;
    // height: 80%;
    border-radius: 12px;
    padding: 20px;
    flex-direction: column;
    align-items: center;
    gap: 20px;

    &__preview {
      object-fit: cover;
      width: 300px;
      height: 300px;
      border-radius: 12px;
    }

    &_content {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: row;
      gap: 30px;

      &_data {
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        &_buttons {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
      }
    }
  }
}
</style>
