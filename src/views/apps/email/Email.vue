<!-- =========================================================================================
    File Name: Email.vue
    Description: Email Application (Inbox)
    ----------------------------------------------------------------------------------------
    Item Name: Vuesax Admin - VueJS Dashboard Admin Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div
    id="email-app"
    class="border border-solid border-grey-light rounded relative overflow-hidden"
  >
    <vs-sidebar
      v-model="isEmailSidebarActive"
      class="items-no-padding"
      parent="#email-app"
      :click-not-close="clickNotClose"
      :hidden-background="clickNotClose"
    >
      <email-sidebar
        :email-tags="emailTags"
        :mail-filter="mailFilter"
        @closeSidebar="toggleEmailSidebar"
      />
    </vs-sidebar>

    <div
      :class="{'sidebar-spacer': clickNotClose}"
      class="app-fixed-height border border-solid border-grey-light border-r-0 border-t-0 border-b-0"
    >
      <!-- SEARCH BAR -->
      <div class="flex border items-center app-search-container">
        <feather-icon
          class="md:inline-flex lg:hidden ml-4 mr-4 cursor-pointer"
          icon="MenuIcon"
          @click.stop="toggleEmailSidebar(true)"
        />
        <vs-input
          v-model="searchQuery"
          icon="icon-search"
          size="large"
          icon-pack="feather"
          placeholder="Search Mail"
          class="vs-input-no-border vs-input-no-shdow-focus w-full no-icon-border"
        />
      </div>

      <!-- EMAIL ACTION BAR -->
      <div class="email__actions flex flex-wrap justify-between p-4 border border-r-0 border-l-0 border-solid border-grey-light">
        <div>
          <vs-checkbox
            v-model="selectAllCheckBox"
            icon-pack="feather"
            :icon="selectAllIcon"
            class="select-all-chexkbox ml-0"
          >
            Select All
          </vs-checkbox>
        </div>
        <div class="flex">
          <vs-dropdown
            vs-custom-content
            vs-trigger-click
            class="cursor-pointer"
          >
            <feather-icon
              icon="FolderIcon"
              class="cursor-pointer"
              svg-classes="h-6 w-6"
            />

            <vs-dropdown-menu>
              <ul class="my-2">
                <li
                  v-if="mailFilter != 'inbox'"
                  class="px-4 mb-2 flex items-start cursor-pointer hover:text-primary"
                  @click="moveTo('inboxed')"
                >
                  <feather-icon
                    icon="MailIcon"
                    svg-classes="h-5 w-5"
                  />
                  <span class="ml-3">Inbox</span>
                </li>
                <li
                  v-if="mailFilter != 'draft'"
                  class="px-4 mb-2 flex items-start cursor-pointer hover:text-primary"
                  @click="moveTo('drafted')"
                >
                  <feather-icon
                    icon="Edit2Icon"
                    svg-classes="h-5 w-5"
                  />
                  <span class="ml-3">Draft</span>
                </li>
                <li
                  v-if="mailFilter != 'spam'"
                  class="px-4 mb-2 flex items-start cursor-pointer hover:text-primary"
                  @click="moveTo('spam')"
                >
                  <feather-icon
                    icon="InfoIcon"
                    svg-classes="h-5 w-5"
                  />
                  <span class="ml-3">Spam</span>
                </li>
                <li
                  v-if="mailFilter != 'trash'"
                  class="px-4 flex items-start cursor-pointer hover:text-primary"
                  @click="moveTo('trashed')"
                >
                  <feather-icon
                    icon="TrashIcon"
                    svg-classes="h-5 w-5"
                  />
                  <span class="ml-3">Trash</span>
                </li>
              </ul>
            </vs-dropdown-menu>
          </vs-dropdown>

          <vs-dropdown
            vs-custom-content
            vs-trigger-click
            class="cursor-pointer"
          >
            <feather-icon
              icon="TagIcon"
              class="cursor-pointer ml-5"
              svg-classes="h-6 w-6"
            />

            <vs-dropdown-menu>
              <ul>
                <li
                  v-for="(label, index) in emailTags"
                  :key="index"
                  class="px-2 py-1 cursor-pointer"
                  @click="addLabelToMails(label.value)"
                >
                  <div
                    class="h-3 w-3 inline-block rounded-full mr-3"
                    :class="'bg-' + label.color"
                  />
                  <span>{{ label.text }}</span>
                </li>
              </ul>
            </vs-dropdown-menu>
          </vs-dropdown>

          <feather-icon
            icon="MailIcon"
            class="ml-5 cursor-pointer"
            svg-classes="h-6 w-6"
            @click="updateMarkUnread"
          />

          <feather-icon
            icon="TrashIcon"
            class="cursor-pointer ml-5"
            svg-classes="h-6 w-6"
            @click="moveTo('trashed')"
          />
        </div>
      </div>

      <!-- EMAILS LIST -->
      <VuePerfectScrollbar
        ref="mailListPS"
        class="email-content-scroll-area"
        :settings="settings"
      >
        <transition-group
          name="list-enter-up"
          class="email__mails"
          tag="ul"
          appear
        >
          <li
            v-for="(mail, index) in mails"
            :key="String(mailFilter) + String(mail.id)"
            class="cursor-pointer email__mail-item"
            :style="{transitionDelay: (index * 0.1) + 's'}"
            @click.stop="updateOpenMail(mail.id)"
          >
            <mail-item
              :mail="mail"
              :is-mail-open="isMailOpen(mail.id)"
              :is-selected="isMailSelected(mail.id)"
              @addToSelected="addToSelectedMails"
              @removeSelected="removeSelectedMail"
            />
          </li>
        </transition-group>
      </VuePerfectScrollbar>
    </div>

    <!-- EMAIL VIEW SIDEBAR -->
    <email-view
      :email-tags="emailTags"
      :open-mail-id="openMailId"
      :is-sidebar-active="isSidebarActive"
      @markUnread="updateSingleMarkUnread"
      @removeMail="removeOpenMail"
      @previousMail="previousMail"
      @nextMail="nextMail"
      @moveTo="moveCurrentTo"
      @closeSidebar="closeMailViewSidebar"
    />
  </div>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import EmailSidebar from './EmailSidebar.vue'
import MailItem from './MailItem.vue'
import EmailView from './EmailView.vue'

export default {
  components: {
    MailItem,
    EmailSidebar,
    EmailView,
    VuePerfectScrollbar
  },
  data () {
    return {
      openMailId: null,
      selectedMails: [],
      isSidebarActive: false,
      showThread: false,
      clickNotClose: true,
      isEmailSidebarActive: true,
      windowWidth: window.innerWidth,
      settings: {
        maxScrollbarLength: 60,
        wheelSpeed: 0.30
      }
    }
  },
  computed: {
    mailFilter () {
      return this.$store.state.email.mail_filter
    },
    emailTags () {
      return this.$store.state.email.mailTags
    },
    searchQuery: {
      get () {
        return this.$store.state.email.mailSearchQuery
      },
      set (val) {
        this.$store.dispatch('email/setMailSearchQuery', val)
      }
    },
    selectAllCheckBox: {
      get () {
        return this.selectedMails.length
      },
      set (value) {
        if (value) this.selectedMails = this.mails.map(mail => mail.id)
        else this.selectedMails = []
      }
    },
    mails () {
      return this.$store.getters['email/filteredMails']
    },
    isMailOpen () {
      return mailId => mailId == this.openMailId
    },
    selectAllIcon () {
      if (this.selectedMails.length == this.mails.length) return 'icon-check'
      return 'icon-minus'
    },
    isMailSelected () {
      return mailId => (this.selectedMails.indexOf(mailId) != -1)
    }
  },
  watch: {
    isSidebarActive (value) {
      if (!value) this.showThread = false
    },
    mailFilter () {
      this.selectedMails = []
      this.$refs.mailListPS.$el.scrollTop = 0
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
    updateOpenMail (mailId) {
      this.openMailId = mailId
      const payload = { mails: [mailId], unread: false }
      this.$store.dispatch('email/updateMailUnread', payload)
      this.isSidebarActive = true
    },
    addToSelectedMails (mailId) {
      this.selectedMails.push(mailId)
    },
    removeSelectedMail (mailId) {
      const mailIndex = this.selectedMails.indexOf(mailId)
      if (mailIndex > -1) {
        this.selectedMails.splice(mailIndex, 1)
      }
    },
    moveTo (to) {
      const payload = { mails: this.selectedMails, to }
      this.$store.dispatch('email/moveMailsTo', payload)
      this.selectedMails = []
    },
    moveCurrentTo (to) {
      this.selectedMails = [this.openMailId]
      this.moveTo(to)
    },
    updateMarkUnread () {
      const payload = { mails: this.selectedMails, unread: true }
      this.$store.dispatch('email/updateMailUnread', payload)
      this.selectedMails = []
    },
    removeOpenMail () {
      this.selectedMails = [this.openMailId]
      this.moveTo('trashed')
      this.isSidebarActive = false
    },
    toggleIsStarred () {
      const payload = { mailId: this.currentMail.id, value: !this.currentMail.isStarred }
      this.$store.dispatch('email/toggleIsMailStarred', payload)
    },
    nextMail () {
      const currentMailIndex = this.mails.findIndex(mail => mail.id == this.openMailId)
      if (this.mails[currentMailIndex + 1]) this.openMailId = this.mails[currentMailIndex + 1].id
    },
    previousMail () {
      const currentMailIndex = this.mails.findIndex(mail => mail.id == this.openMailId)
      if (this.mails[currentMailIndex - 1]) this.openMailId = this.mails[currentMailIndex - 1].id
    },
    updateSingleMarkUnread () {
      this.selectedMails = [this.openMailId]
      this.updateMarkUnread()
      this.isSidebarActive = false
    },
    addLabelToMails (label) {
      const payload = { mails: this.selectedMails, label }
      this.$store.dispatch('email/addLabelToMails', payload)
      this.selectedMails = []
    },
    closeMailViewSidebar () {
      this.isSidebarActive = false
    },
    handleWindowResize (event) {
      this.windowWidth = event.currentTarget.innerWidth
      this.setSidebarWidth()
    },
    setSidebarWidth () {
      if (this.windowWidth < 992) {
        this.isEmailSidebarActive = this.clickNotClose = false
      } else {
        this.isEmailSidebarActive = this.clickNotClose = true
      }
    },
    toggleEmailSidebar (value = false) {
      if (!value) {
        this.closeMailViewSidebar()
        if (this.clickNotClose) {
          return
        }
      }
      this.isEmailSidebarActive = value
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/scss/vuesax/apps/email.scss";
</style>
