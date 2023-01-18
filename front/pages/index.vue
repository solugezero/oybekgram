<template>
  <div class="main-page">
    <OrganismsSidebarDesktop />
    <div class="main-page_content">
      <!-- <OrganismsStoriesDesktop /> -->
      <div class="main-page_content_posts-list">
        <OrganismsPostDesktop />
        <OrganismsPostDesktop />
        <OrganismsPostDesktop />
        <OrganismsPostDesktop />
        <OrganismsPostDesktop />
        <OrganismsPostDesktop />
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.main-page {
  display: flex;
  flex-direction: row;
  padding-bottom: 24px;

  &_content {
    margin-top: 24px;
    padding: 0px 24px;
    display: flex;
    margin-left: 320px;
    width: 100%;
    height: auto;
    flex-direction: column;
    align-items: center;
    gap: 24px;

    &_posts-list {
      align-items: center;
      display: flex;
      width: 100%;
      flex-direction: column;
      gap: 24px;
    }
  }
}
</style>
