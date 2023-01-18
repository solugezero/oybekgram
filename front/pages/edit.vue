<template>
  <div class="edit">
    <OrganismsSidebarDesktop />

    <div class="edit_content">
      <div class="edit_content_avatar item">
        <div class="edit_content__label">Фото профиля</div>
        <form
          id="uploadForm"
          ref="uploadedForm"
          method="post"
          encType="multipart/form-data"
          @change="previewFile()"
        >
          <input type="file" name="uploadedFile" id="uploadedFile" />
        </form>
        <ui-button @click="changeAvatar()">Сменить</ui-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useNotification } from "@kyvg/vue3-notification";
const route = useRoute();
const router = useRouter();
const { notify } = useNotification();
const uploadedForm = ref();
const changeAvatar = async () => {
  const uploadedUsername = localStorage.getItem("username");
  let formData = new FormData(uploadedForm.value);
  formData.append("username", uploadedUsername);
  const sendData = async () => {
    const promise = await useFetch("http://localhost:8080/changeAvatar", {
      method: "POST",
      body: formData,
      onResponse({ response }) {
        if (response.status === 200) {
          notify({
            title: "Успех",
            text: `Фото профиля обновлено`,
            type: "success",
          });
          router.push({ path: route.path });
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

  await sendData().then(router.push({ path: "/", force: true }));
};
</script>

<style lang="scss" scoped>
.edit {
  width: 100%;

  &_content {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: 320px;
    padding-top: 24px;

    &__label {
      font-size: 18px;
    }
  }
}

.item {
  max-width: 80%;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
