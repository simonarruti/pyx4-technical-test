<template>
  <div class="action_bar_component">
    <el-row align="middle" type="flex">
      <el-col :span="12">
        <slot name="left_side">
          <router-link to="/" class="fz_16">Back home</router-link>
        </slot>
      </el-col>
      <el-col :span="12">
        <div class="text_right">
          <slot></slot>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
