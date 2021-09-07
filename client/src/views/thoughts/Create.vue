<template>
  <div class="thoughts_create_view">
    <EditOrCreate @save-thought="saveThought" />
  </div>
</template>

<script>
import EditOrCreate from '@/components/EditOrCreate'
import { createThought } from '@/api/thoughtHttpRequest'

export default {
  name: 'Create',
  components: { EditOrCreate },
  methods: {
    saveThought (thoughtContent) {
      createThought({ content: thoughtContent })
        .then(() => {
          this.$message({
            type: 'success',
            message: 'A new thought has been created.'
          })

          this.$router.push('/')
        })
    }
  }
}
</script>
