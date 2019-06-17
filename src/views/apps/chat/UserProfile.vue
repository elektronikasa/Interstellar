<!-- =========================================================================================
    File Name: UserProfile.vue
    Description: user profile sidebar
    ----------------------------------------------------------------------------------------
    Item Name: Vuesax Admin - VueJS Dashboard Admin Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div id="parentx-demo-2">
    <vs-sidebar
      id="chat-profile-sidebar"
      v-model="activeLocal"
      parent="#chat-app"
      :position-right="!isActiveUser"
      :hidden-background="false"
      class="items-no-padding"
    >
      <div
        slot="header"
        class="header-sidebar relative flex flex-col p-0"
      >
        <feather-icon
          icon="XIcon"
          svg-classes="m-2 cursor-pointer absolute pin-t pin-r"
          @click="$emit('closeProfileSidebar', false)"
        />

        <div class="relative inline-flex mx-auto mb-5 mt-6">
          <vs-avatar
            class="m-0"
            :src="require(`@/assets/images/portrait/small/${userImg}`)"
            size="70px"
          />
          <div
            class="h-5 w-5 border-white border-2 border-solid rounded-full absolute pin-r pin-b"
            :class="'bg-' + getStatusColor(isActiveUser)"
          />
        </div>
        <h4 class="mr-2 self-center">
          {{ userName }}
        </h4>
      </div>

      <VuePerfectScrollbar
        class="scroll-area"
        :settings="settings"
      >
        <div class="p-8">
          <h6
            class="mb-2"
            :class="{'ml-4': isActiveUser}"
          >
            About
          </h6>
          <vs-textarea
            v-if="isActiveUser"
            v-model="about"
            class="mb-10"
            counter="120"
            maxlength="120"
            :counter-danger.sync="counterDanger"
            rows="5"
          />
          <p v-else>
            {{ about }}
          </p>

          <div
            v-if="isActiveUser"
            class="userProfile__status"
          >
            <h6 class="mb-4">
              Status
            </h6>
            <ul>
              <li class="mb-2">
                <vs-radio
                  v-model="status"
                  vs-value="online"
                  color="success"
                >
                  Active
                </vs-radio>
              </li>
              <li class="mb-2">
                <vs-radio
                  v-model="status"
                  vs-value="do not disturb"
                  color="danger"
                >
                  Do Not Disturb
                </vs-radio>
              </li>
              <li class="mb-2">
                <vs-radio
                  v-model="status"
                  vs-value="away"
                  color="warning"
                >
                  Away
                </vs-radio>
              </li>
              <li class="mb-2">
                <vs-radio
                  v-model="status"
                  vs-value="offline"
                  color="grey"
                >
                  Offline
                </vs-radio>
              </li>
            </ul>
          </div>
        </div>
      </VuePerfectScrollbar>
    </vs-sidebar>
  </div>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import contacts from './contacts.js'

export default {
  components: {
    VuePerfectScrollbar
  },
  props: {
    userId: {
      type: Number,
      required: true
    },
    active: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      contacts,
      counterDanger: false,
      settings: { // perfectscrollbar settings
        maxScrollbarLength: 60,
        wheelSpeed: 0.60
      }
    }
  },
  computed: {
    isActiveUser () {
      return this.contactIndex === -1
    },
    activeLocal: {
      get () {
        return this.active
      },
      set (value) {
        this.$emit('closeProfileSidebar', value)
      }
    },
    about: {
      get () {
        if (this.contactIndex === -1) {
          return this.$store.state.AppActiveUser.about
        }
        return this.contacts[this.contactIndex].about
      },
      set (value) {
        if (value.length > 120) {
          value = value.substring(0, 120)
        }
        this.$store.dispatch('chat/updateAboutChat', value)
      }
    },
    contactIndex () {
      return contacts.findIndex(contact => contact.id == this.userId)
    },
    status: {
      get () {
        if (this.contactIndex === -1) {
          return this.$store.state.AppActiveUser.status
        }
      },
      set (value) {
        if (this.contactIndex === -1) {
          this.$store.dispatch('chat/updateStatusChat', value)
        }
      }
    },
    userImg () {
      if (this.contactIndex === -1) {
        return this.$store.state.AppActiveUser.img
      }
      return this.contacts[this.contactIndex].img
    },
    userName () {
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
  methods: {
    getUserStatus (isActiveUser) {
      return (isActiveUser) ? this.$store.state.AppActiveUser.status : this.contacts[this.contactIndex].status
    }
  }
}
</script>
