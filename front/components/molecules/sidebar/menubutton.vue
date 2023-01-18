<template>
  <div class="menu-button">
    <img :src="getValidIcon" alt="" class="menu-button__icon" />
    <p class="menu-button__text">
      <slot />
    </p>
  </div>
</template>

<script setup>
import Home from "@/assets/svg/Home.svg";
import Search from "@/assets/svg/Search.svg";
import Message from "@/assets/svg/Message.svg";
import Notification from "@/assets/svg/Notification.svg";
import Create from "@/assets/svg/Create.svg";
import Menu from "@/assets/svg/Menu.svg";
const props = defineProps({
  icon: {
    type: String,
    default: "",
  },
});
const getValidIcon = computed(() => {
  const { icon } = props;
  if (icon === "Home") return Home;
  if (icon === "Search") return Search;
  if (icon === "Message") return Message;
  if (icon === "Notification") return Notification;
  if (icon === "Create") return Create;
  if (icon === "Menu") return Menu;
  else return Create;
});
</script>

<style lang="scss" scoped>
.menu-button {
  display: flex;
  width: auto;
  height: auto;
  flex-direction: row;
  align-items: center;
  gap: 12px;
  color: #d9d9d9;
  cursor: pointer;
}
</style>
