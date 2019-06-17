<!-- =========================================================================================
  File Name: AddNewDataSidebar.vue
  Description: Add New Data - Sidebar component
  ----------------------------------------------------------------------------------------
  Item Name: Vuesax Admin - VueJS Dashboard Admin Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <vs-sidebar
    v-model="isSidebarActiveLocal"
    click-not-close
    position-right
    parent="body"
    default-index="1"
    color="primary"
    class="add-new-data-sidebar items-no-padding"
    spacer
  >
    <div class="mt-6 flex items-center justify-between px-6">
      <h4>ADD NEW DATA</h4>
      <feather-icon
        icon="XIcon"
        class="cursor-pointer"
        @click.stop="isSidebarActiveLocal = false"
      />
    </div>
    <vs-divider class="mb-0" />

    <VuePerfectScrollbar
      class="scroll-area--data-list-add-new pt-4 pb-6"
      :settings="settings"
    >
      <div class="p-6">
        <!-- NAME -->
        <vs-input
          v-model="name"
          label="Name"
          name="name"
          class="mt-5 w-full"
        />

        <!-- CATEGORY -->
        <vs-select
          v-model="category"
          label="Category"
          class="mt-5 w-full"
        >
          <vs-select-item
            v-for="item in category_choices"
            :key="item.value"
            :value="item.value"
            :text="item.text"
          />
        </vs-select>

        <!-- ORDER STATUS -->
        <vs-select
          v-model="order_status"
          label="Order Status"
          class="mt-5 w-full"
        >
          <vs-select-item
            v-for="item in order_status_choices"
            :key="item.value"
            :value="item.value"
            :text="item.text"
          />
        </vs-select>

        <!-- PRICE -->
        <vs-input
          v-model="price"
          label="Price"
          name="price"
          class="mt-5 w-full"
        />

        <!-- IMG -->
        <vs-upload
          ref="fileUpload"
          text="Upload Image"
          class="img-upload"
        />
      </div>
    </VuePerfectScrollbar>

    <div
      slot="footer"
      class="flex flex-wrap items-center justify-center p-6"
    >
      <vs-button class="mr-6">
        Add Data
      </vs-button>
      <vs-button
        type="border"
        color="danger"
        @click="isSidebarActiveLocal = false"
      >
        Cancel
      </vs-button>
    </div>
  </vs-sidebar>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'

export default {
  components: {
    VuePerfectScrollbar
  },
  props: {
    isSidebarActive: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      name: '',
      category: 'audio',
      order_status: 'pending',
      price: '',

      category_choices: [
        { text: 'Audio', value: 'audio' },
        { text: 'Computers', value: 'computers' },
        { text: 'Fitness', value: 'fitness' },
        { text: 'Appliance', value: 'appliance' }
      ],
      order_status_choices: [
        { text: 'Pending', value: 'pending' },
        { text: 'Canceled', value: 'canceled' },
        { text: 'Delivered', value: 'delivered' },
        { text: 'On Hold', value: 'on_hold' }
      ],
      settings: { // perfectscrollbar settings
        maxScrollbarLength: 60,
        wheelSpeed: 0.60
      }
    }
  },
  computed: {
    isSidebarActiveLocal: {
      get () {
        return this.isSidebarActive
      },
      set (val) {
        if (!val) {
          this.$emit('closeSidebar')
          this.initValues()
        }
      }
    }
  },
  methods: {
    initValues () {
      this.name = ''
      this.category = 'audio'
      this.order_status = 'pending'
      this.price = ''
      this.$refs.fileUpload.srcs = []
    }
  }
}
</script>

<style lang="scss" scoped>
.add-new-data-sidebar {
  /deep/ .vs-sidebar--background {
    z-index: 52010;
  }

  /deep/ .vs-sidebar {
    z-index: 52010;
    width: 400px;
    max-width: 90vw;

    .img-upload {
      margin-top: 2rem;

      .con-img-upload {
        padding: 0;
      }

      .con-input-upload {
        width: 100%;
        margin: 0;
      }
    }
  }
}

.scroll-area--data-list-add-new {
    height: calc(100% - 4.3rem);
}
</style>
