<!-- =========================================================================================
    File Name: TodoAddNew.vue
    Description: Add new todo component
    ----------------------------------------------------------------------------------------
    Item Name: Vuesax Admin - VueJS Dashboard Admin Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div class="todo__filters-container">
    <!-- all -->
    <div class="px-6 py-4">
      <div
        class="flex cursor-pointer"
        :class="{'text-primary': todoFilter == 'all'}"
        @click="applyTodoFilter('all')"
      >
        <feather-icon
          icon="MailIcon"
          :svg-classes="[{'text-primary stroke-current': todoFilter == 'all'}, 'h-6 w-6']"
        />
        <span class="text-lg ml-3">All</span>
      </div>
    </div>

    <vs-divider />

    <!-- starred -->
    <div class="px-6 py-4">
      <h5>Filters</h5>

      <template v-for="filter in todoFilters">
        <div
          :key="filter.filter"
          class="flex mt-6 cursor-pointer"
          :class="{'text-primary': todoFilter == filter.filter}"
          @click="applyTodoFilter(filter.filter)"
        >
          <feather-icon
            :icon="filter.icon"
            :svg-classes="[{'text-primary stroke-current': todoFilter == filter.filter}, 'h-6 w-6']"
          />
          <span class="text-lg ml-3">{{ filter.filterName }}</span>
        </div>
      </template>
    </div>

    <vs-divider />

    <div class="px-6 py-4">
      <h5>Labels</h5>
      <div class="todo__lables-list">
        <div
          v-for="(tag, index) in todoTags"
          :key="index"
          class="todo__label flex items-center mt-6 cursor-pointer"
          @click="applyTodoFilter(tag.value)"
        >
          <div
            class="h-4 w-4 rounded-full mr-4"
            :class="'bg-' + tag.color"
          />
          <span class="text-lg">{{ tag.text }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      todoFilters: [
        { filterName: 'Starred', filter: 'starred', icon: 'StarIcon' },
        { filterName: 'Important', filter: 'important', icon: 'InfoIcon' },
        { filterName: 'Done', filter: 'done', icon: 'CheckIcon' },
        { filterName: 'Trashed', filter: 'trashed', icon: 'TrashIcon' }
      ]
    }
  },
  computed: {
    todoTags () {
      return this.$store.state.todo.todoTags
    },
    todoFilter () {
      return this.$store.state.todo.todoFilter
    }
  },
  methods: {
    applyTodoFilter (filterName) {
      this.$store.dispatch('todo/applyTodoFilter', filterName)
      this.$emit('closeSidebar', false)
    }
  }
}
</script>
