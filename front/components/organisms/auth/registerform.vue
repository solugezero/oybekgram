<template>
  <div class="register-form">
    <img
      class="register-form__logo"
      src="@/public/img/logowithoutbg.png"
      alt=""
    />
    <div class="register-form_content">
      <p class="register-form__label">Регистрация</p>
      <ui-input v-model="authState.username" placeholder="Логин"></ui-input>
      <ui-input
        v-model="authState.password"
        type="password"
        placeholder="Пароль"
      ></ui-input>
      <ui-input
        type="password"
        v-model="authState.secondpassword"
        placeholder="Ещё раз пароль"
      ></ui-input>
      <ui-button :disabled="!validSecondPassword" @click="getAuthorize()"
        >Зарегистрироваться</ui-button
      >
      <NuxtLink to="/auth/login">Авторизоваться</NuxtLink>
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
  secondpassword: "4L5KE2x4kaGMCW9P4Sx4",
});

const validSecondPassword = computed(() => {
  if (
    authState.value.password === authState.value.secondpassword &&
    authState.value.secondpassword !== ""
  )
    return true;
  else return false;
});

const token = ref();

const getAuthorize = async () => {
  const { username, password } = authState.value;
  const userAuth = { username, password };

  const getAuthrorize = async () => {
    const authPromise = await useFetch("http://localhost:8080/auth/login", {
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
            text: `Вы успешно зарегестрировались!`,
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

  const registerPromise = await useFetch(
    "http://localhost:8080/auth/register",
    {
      method: "POST",
      body: userAuth,
      onResponse({ request, response, options }) {
        if (response.status === 200) {
          getAuthrorize();
        } else {
          notify({
            title: "Ошибка регистрации",
            text: response._data.message,
            type: "error",
          });
        }
      },
    }
  );
};
</script>

<style lang="scss" scoped>
.register-form {
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
