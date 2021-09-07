<template>
  <div class="thoughts_read_view">
    <ActionBar>
      <el-button type="primary" @click="goToEditThoughtPage">Edit</el-button>
      <el-button type="primary" @click="deleteThought">Delete</el-button>
    </ActionBar>

    <el-divider />

    <p class="thought_content fz_18 mt_45">{{ thought.content }}</p>
  </div>
</template>

<script>
import ActionBar from '@/components/ActionBar'
import { getThought, deleteThought } from '@/api/thoughtHttpRequest'

export default {
  name: 'Read',
  props: {
    // from route
    thought_id: {
      type: String
    }
  },
  data () {
    return {
      thought: {}
    }
  },
  components: { ActionBar },
  methods: {
    goToEditThoughtPage () {
      this.$router.push({ path: '/thoughts/edit/' + this.thought.id })
    },
    deleteThought () {
      this.$confirm('This thought will be deleted. Confirm ?', 'Warning', {
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        deleteThought(this.thought.id)
          .then(() => {
            this.$message({
              type: 'success',
              message: 'Thought deleted.'
            })

            this.$router.push('/')
          })
      }).catch(() => {})
    }
  },
  async mounted () {
    this.thought = await getThought(this.thought_id)
  }
}
</script>
