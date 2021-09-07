<template>
  <div class="thoughts_edit_view">
    <EditOrCreate v-loading="isLoading" v-if="!isLoading" :thoughtContent="thought.content" @save-thought="saveThought"></EditOrCreate>
  </div>
</template>

<script>
import EditOrCreate from '@/components/EditOrCreate'
import { getThought, updateThought } from '@/api/thoughtHttpRequest'

export default {
  name: 'Edit',
  props: {
    // from route
    thought_id: {
      type: String
    }
  },
  data () {
    return {
      thought: {},
      loading: false
    }
  },
  components: { EditOrCreate },
  methods: {
    saveThought (thoughtContent) {
      updateThought(this.thought.id, { content: thoughtContent })
        .then(() => {
          this.$message({
            type: 'success',
            message: 'The thought has been edited.'
          })

          this.$router.push('/')
        })
    }
  },
  computed: {
    isLoading () {
      return !this.thought.id
    }
  },
  async mounted () {
    this.thought = await getThought(this.thought_id)
  }
}
</script>
