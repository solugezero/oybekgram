<template>
  <div class="login-form">
    <img class="login-form__logo" src="@/public/img/logowithoutbg.png" alt="" />
    <div class="login-form_content">
      <p class="login-form__label">Авторизация</p>
      <ui-input v-model="authState.username" placeholder="Логин"></ui-input>
      <ui-input
        v-model="authState.password"
        type="password"
        placeholder="Пароль"
      ></ui-input>
      <ui-button @click="getAuthorize()">Авторизоваться</ui-button>
      <NuxtLink to="/auth/register">Зарегистрироваться</NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { useNotification } from "@kyvg/vue3-notification";
import { useAuth } from "~/stores/auth";

const router = useRouter();
const authStore = useAuth();
const { notify } = useNotification();

const authState = ref({
  username: "",
  password: "",
});

const token = ref();

const getAuthorize = async () => {
  const { username, password } = authState.value;
  const userAuth = { username, password };
  const promise = await useFetch("http://localhost:8080/auth/login", {
    method: "POST",
    body: userAuth,
    onResponse({ request, response, options }) {
      if (response.status === 200) {
        token.value = response._data.token;
        authStore.setToken(response._data.token);
        authStore.setId(response._data.user._id);
        authStore.setUsername(response._data.user.username);
        localStorage.setItem("authToken", token.value);
        localStorage.setItem("username", response._data.user.username);
        notify({
          title: "Успех",
          text: `Вы успешно авторизировались в аккаунт ${username}`,
          type: "success",
        });
        router.push({ path: `/${username}` });
      } else {
        console.log(response._data.message);
        notify({
          title: "Ошибка авторизации",
          text: response._data.message,
          type: "error",
        });
      }
    },
  });
};
</script>

<style lang="scss" scoped>
.login-form {
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;

  &_content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 14px;
    width: 100%;
    max-width: 329px;

    a {
      font-size: 14px;
      color: #fff;
      transition: color 0.3s;

      &:hover {
        color: rgb(212, 212, 212);
      }
    }
  }

  &__logo {
    width: 300px;
  }
}
</style>
