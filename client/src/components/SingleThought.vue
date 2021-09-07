<template>
  <div class="single_thought_component">
    <el-card shadow="never">
      <p class="abstract fz_20 mb_15">{{ thought.abstract }}</p>
      <router-link :to="'/thoughts/read/' + thought.id">Read more</router-link>

      <el-divider></el-divider>

      <el-row>
        <el-col :span="12">
          <p class="creation_date">{{ lastModifiedFormatted }}</p>
        </el-col>
        <el-col :span="12" class="text_right">
          <el-popover>
            <el-button @click="sendOptionEvent('edit-thought')">Edit</el-button>
            <el-button @click="sendOptionEvent('delete-thought')">Delete</el-button>

            <i class="el-icon-more fz_20 cursor_pointer" slot="reference"></i>
          </el-popover>
        </el-col>
      </el-row>

    </el-card>
  </div>
</template>

<script>
export default {
  name: 'SingleThought',
  props: {
    thought: {
      type: Object,
      required: true
    }
  },
  methods: {
    sendOptionEvent (eventType) {
      this.$emit(eventType)
    }
  },
  computed: {
    lastModifiedFormatted () {
      return new Date(this.thought.lastModified).toLocaleString()
    }
  }
}
</script>
