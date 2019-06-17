<!-- =========================================================================================
    File Name: Todo.vue
    Description: Todo Application to keep you ahead of time
    ----------------------------------------------------------------------------------------
    Item Name: Vuesax Admin - VueJS Dashboard Admin Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div
    id="todo-app"
    class="border border-solid border-grey-light rounded relative overflow-hidden"
  >
    <vs-sidebar
      v-model="isSidebarActive"
      class="items-no-padding"
      parent="#todo-app"
      :click-not-close="clickNotClose"
      :hidden-background="clickNotClose"
    >
      <todo-add-new />
      <VuePerfectScrollbar
        class="todo-scroll-area"
        :settings="settings"
      >
        <todo-filters @closeSidebar="toggleTodoSidebar" />
      </VuePerfectScrollbar>
    </vs-sidebar>

    <div
      :class="{'sidebar-spacer': clickNotClose}"
      class="app-fixed-height border border-r-0 border-b-0 border-t-0 border-solid border-grey-light app-fixed-height"
    >
      <div class="flex items-center app-search-container border border-l-0 border-r-0 border-t-0 border-solid border-grey-light">
        <!-- TOGGLE SIDEBAR BUTTON -->
        <feather-icon
          class="md:inline-flex lg:hidden ml-8 mr-4 cursor-pointer"
          icon="MenuIcon"
          @click.stop="toggleTodoSidebar(true)"
        />

        <!-- SEARCH BAR -->
        <vs-input
          v-model="searchQuery"
          size="large"
          icon-pack="feather"
          icon="icon-search"
          placeholder="Search..."
          class="vs-input-no-border vs-input-no-shdow-focus no-icon-border w-full"
        />
      </div>

      <!-- TODO LIST -->
      <VuePerfectScrollbar
        ref="todoListPS"
        class="todo-content-scroll-area"
        :settings="settings"
      >
        <transition-group
          class="todo-list"
          name="list-enter-up"
          tag="ul"
          appear
        >
          <li
            v-for="(todoItem, index) in todoList"
            :key="String(todoFilter) + String(todoItem.id)"
            class="cursor-pointer todo_todo-item"
            :style="[{transitionDelay: (index * 0.1) + 's'}]"
          >
            <todo-item
              :todo-item-id="todoItem.id"
              @showDisplayPrompt="showDisplayPrompt($event)"
            />
          </li>
        </transition-group>
      </VuePerfectScrollbar>
      <!-- /TODO LIST -->
    </div>

    <!-- EDIT TODO DIALOG -->
    <todo-edit
      v-if="displayPrompt"
      :display-prompt="displayPrompt"
      :todo-item-id="todoIdToEdit"
      @hideDisplayPrompt="hidePrompt"
    />
  </div>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import TodoAddNew from './TodoAddNew.vue'
import TodoItem from './TodoItem.vue'
import TodoFilters from './TodoFilters.vue'
import TodoEdit from './TodoEdit.vue'

export default {
  components: {
    TodoAddNew,
    TodoItem,
    TodoFilters,
    TodoEdit,
    VuePerfectScrollbar
  },
  data () {
    return {
      clickNotClose: true,
      displayPrompt: false,
      todoIdToEdit: 0,
      isSidebarActive: true,
      windowWidth: window.innerWidth,
      settings: {
        maxScrollbarLength: 60,
        wheelSpeed: 0.30
      }
    }
  },
  computed: {
    todo () {
      return this.$store.state.todo.todoArray
    },
    todoFilter () {
      return this.$store.state.todo.todoFilter
    },
    todoList () {
      return this.$store.getters['todo/todoList']
    },
    searchQuery: {
      get () {
        return this.$store.state.todo.todoSearchQuery
      },
      set (val) {
        this.$store.dispatch('todo/setTodoSearchQuery', val)
      }
    }
  },
  watch: {
    todoFilter () {
      this.$refs.todoListPS.$el.scrollTop = 0
    }
  },
  created () {
    this.$nextTick(() => {
      window.addEventListener('resize', this.handleWindowResize)
    })
    this.setSidebarWidth()
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.handleWindowResize)
  },
  methods: {
    showDisplayPrompt (itemId) {
      this.todoIdToEdit = itemId
      this.displayPrompt = true
    },
    hidePrompt () {
      this.displayPrompt = false
    },
    handleWindowResize (event) {
      this.windowWidth = event.currentTarget.innerWidth
      this.setSidebarWidth()
    },
    setSidebarWidth () {
      if (this.windowWidth < 992) {
        this.isSidebarActive = this.clickNotClose = false
      } else {
        this.isSidebarActive = this.clickNotClose = true
      }
    },
    toggleTodoSidebar (value = false) {
      if (!value && this.clickNotClose) return
      this.isSidebarActive = value
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/scss/vuesax/apps/todo.scss";
</style>
