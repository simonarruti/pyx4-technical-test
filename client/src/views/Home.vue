<template>
  <div class="home">
    <div class="thoughts_container" v-loading="isLoading">
      <ActionBar class="mb_30">
        <template #left_side>
          <el-button type="primary" @click="goToCreatePage">Create</el-button>
        </template>
        <p class="total_thoughts fz_16">{{ thoughtsCountFormatted }}</p>
      </ActionBar>

      <el-empty v-if="totalCount === 0" description="No thoughts."></el-empty>

      <div v-else>
        <SingleThought
          v-for="singleThought of thoughts"
          :thought="singleThought"
          :key="singleThought.id"
          class="mb_15"
          @edit-thought="goToEditThoughtPage(singleThought.id)"
          @delete-thought="deleteThought(singleThought.id)"
        />

        <el-pagination
          class="text_center"
          :total="totalCount"
          :page-size="5"
          :current-page.sync="currentPage"
          layout="prev, pager, next"
          @current-change="getPaginatedThoughts"
        />
      </div>
    </div>
  </div>
</template>

<script>

import ActionBar from '@/components/ActionBar'
import SingleThought from '@/components/SingleThought'

import { deleteThought, getAllThoughts } from '@/api/thoughtHttpRequest'

export default {
  name: 'Home',
  data () {
    return {
      thoughts: [],
      totalCount: 0,
      isLoading: false,
      currentPage: 1
    }
  },
  components: { ActionBar, SingleThought },
  methods: {
    getPaginatedThoughts (page) {
      this.isLoading = true
      getAllThoughts(page)
        .then(res => {
          this.thoughts = res.data.thoughts
          this.totalCount = res.data.totalCount

          this.isLoading = false
        })
    },
    goToCreatePage () {
      this.$router.push('/thoughts/create')
    },
    goToEditThoughtPage (thoughtId) {
      this.$router.push('/thoughts/edit/' + thoughtId)
    },
    deleteThought (thoughtId) {
      this.$confirm('This thought will be deleted. Confirm ?', 'Warning', {
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        deleteThought(thoughtId)
          .then(() => {
            this.$message({
              type: 'success',
              message: 'Thought deleted.'
            })

            this.getPaginatedThoughts(this.currentPage)
          })
      }).catch(() => {})
    }
  },
  computed: {
    thoughtsCountFormatted () {
      return `${this.totalCount} ${this.totalCount > 1 ? 'Thoughts' : 'Thought'}`
    }
  },
  mounted () {
    this.getPaginatedThoughts(1)
  }
}
</script>
