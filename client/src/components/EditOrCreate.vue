<template>
  <div class="edit_or_create_component">
    <ActionBar>
      <el-button
        type="primary"
        :disabled="!localContent"
        @click="$emit('save-thought', localContent)"
      >
        Save
      </el-button>
    </ActionBar>

    <el-divider />

    <el-input
      type="textarea"
      :rows="15"
      v-model="localContent">
    </el-input>
  </div>
</template>

<script>
import ActionBar from '@/components/ActionBar'

export default {
  name: 'EditOrCreate',
  props: {
    thoughtContent: {
      type: String,
      required: false
    }
  },
  data () {
    return {
      localContent: ''
    }
  },
  components: { ActionBar },
  mounted () {
    if (this.thoughtContent) {
      this.localContent = this.thoughtContent
    }
  }
}
</script>
