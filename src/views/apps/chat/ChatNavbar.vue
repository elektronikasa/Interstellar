<!-- =========================================================================================
    File Name: ChatNavbar.vue
    Description: Chat Application - Chat navbar
    ----------------------------------------------------------------------------------------
    Item Name: Vuesax Admin - VueJS Dashboard Admin Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div
    v-if="userId != null"
    class="chat__header"
  >
    <vs-navbar
      class="p-4 flex navbar-custom"
      color="white"
      type="flat"
    >
      <div class="relative flex mr-4">
        <feather-icon
          v-if="isSidebarCollapsed"
          icon="MenuIcon"
          class="mr-4 cursor-pointer"
          @click.stop="$emit('openContactsSidebar')"
        />
        <vs-avatar
          class="m-0"
          size="40px"
          :src="require(`@/assets/images/portrait/small/${userImg}`)"
          @click.stop="$emit('showProfileSidebar', userId)"
        />
        <div
          class="h-3 w-3 border-white border border-solid rounded-full absolute pin-r pin-b"
          :class="'bg-' + getStatusColor(false)"
        />
      </div>
      <h6>{{ contactName }}</h6>
      <vs-spacer />
      <feather-icon
        icon="StarIcon"
        class="cursor-pointer"
        :svg-classes="[{'text-warning stroke-current': isPinnedLocal}, 'w-6', 'h-6']"
        @click.stop="toggleIsPinned"
      />
    </vs-navbar>
  </div>
</template>

<script>
import contacts from './contacts'

export default {
  props: {
    userId: {
      type: Number,
      required: true
    },
    isPinnedProp: {
      type: Boolean,
      required: true
    },
    isSidebarCollapsed: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      contacts,
      isPinnedLocal: this.isPinnedProp
    }
  },
  computed: {
    contactIndex () {
      return contacts.findIndex(contact => contact.id == this.userId)
    },
    userImg () {
      if (this.contactIndex === -1) {
        return this.$store.state.AppActiveUser.img
      }
      return this.contacts[this.contactIndex].img
    },
    contactName () {
      if (this.contactIndex === -1) {
        return this.$store.state.AppActiveUser.name
      }
      return this.contacts[this.contactIndex].name
    },
    getStatusColor () {
      return (isActiveUser) => {
        const userStatus = this.getUserStatus(isActiveUser)

        if (userStatus == 'online') {
          return 'success'
        } if (userStatus == 'do not disturb') {
          return 'danger'
        } if (userStatus == 'away') {
          return 'warning'
        }
        return 'grey'
      }
    }
  },
  watch: {
    isPinnedProp (val) {
      this.isPinnedLocal = val
    }
  },
  methods: {
    getUserStatus (isActiveUser) {
      return (isActiveUser) ? this.$store.state.AppActiveUser.status : this.contacts[this.contactIndex].status
    },
    toggleIsPinned () {
      const chatData = this.$store.getters['chat/chatDataOfUser'](this.userId)
      if (chatData) {
        const payload = { id: this.userId, value: !this.isPinnedLocal }
        this.$store.dispatch('chat/toggleIsPinned', payload)
      } else {
        this.$emit('toggleIsChatPinned', !this.isPinnedLocal)
      }
      this.isPinnedLocal = !this.isPinnedLocal
    }
  }
}
</script>
