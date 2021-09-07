<template>
  <div id="app">
    <div class="app_wrapper">
      <el-row :gutter="30">
        <el-col>
          <h1 class="title">Thoughts</h1>
        </el-col>
      </el-row>
      <router-view />
    </div>

  </div>
</template>

<style lang="scss" scoped>
  .app_wrapper {
    max-width: 1000px;
    margin: 30px auto;

    .title {
      font-size: 44px;

      @extend .mb_30
    }
  }
</style>
