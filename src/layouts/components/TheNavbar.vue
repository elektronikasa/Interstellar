<!-- =========================================================================================
	File Name: TheNavbar.vue
	Description: Navbar component
	Component Name: TheNavbar
	----------------------------------------------------------------------------------------
	Item Name: Vuesax Admin - VueJS Dashboard Admin Template
	Author: Pixinvent
	Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div class="relative">
    <div class="vx-navbar-wrapper">
      <vs-navbar
        class="vx-navbar navbar-custom"
        :color="navbarColor"
        :class="classObj"
      >
        <!-- SM - OPEN SIDEBAR BUTTON -->
        <feather-icon
          class="sm:inline-flex xl:hidden cursor-pointer mr-1"
          icon="MenuIcon"
          @click.stop="showSidebar"
        />

        <template v-if="breakpoint != 'md'">
          <!-- STARRED PAGES - FIRST 10 -->
          <ul class="vx-navbar__starred-pages">
            <draggable
              v-model="starredPagesLimited"
              :group="{name: 'pinList'}"
              class="flex cursor-move"
            >
              <li
                v-for="page in starredPagesLimited"
                :key="page.url"
                class="starred-page"
              >
                <vx-tooltip
                  :text="page.label"
                  position="bottom"
                  delay=".3s"
                >
                  <feather-icon
                    svg-classes="h-6 w-6"
                    class="p-2 cursor-pointer"
                    :icon="page.labelIcon"
                    @click="$router.push(page.url)"
                  />
                </vx-tooltip>
              </li>
            </draggable>
          </ul>

          <!-- STARRED PAGES MORE -->
          <div
            v-if="starredPagesMore.length"
            class="vx-navbar__starred-pages--more-dropdown"
          >
            <vs-dropdown
              vs-custom-content
              vs-trigger-click
            >
              <feather-icon
                icon="ChevronDownIcon"
                svg-classes="h-4 w-4"
                class="cursor-pointer p-2"
              />
              <vs-dropdown-menu>
                <ul class="vx-navbar__starred-pages-more--list">
                  <draggable
                    v-model="starredPagesMore"
                    :group="{name: 'pinList'}"
                    class="cursor-move"
                  >
                    <li
                      v-for="page in starredPagesMore"
                      :key="page.url"
                      class="starred-page--more flex items-center cursor-pointer"
                      @click="$router.push(page.url)"
                    >
                      <feather-icon
                        svg-classes="h-5 w-5"
                        class="ml-2 mr-1"
                        :icon="page.labelIcon"
                      />
                      <span class="px-2 pt-2 pb-1">{{ page.label }}</span>
                    </li>
                  </draggable>
                </ul>
              </vs-dropdown-menu>
            </vs-dropdown>
          </div>

          <div class="bookmark-container">
            <feather-icon
              icon="StarIcon"
              :svg-classes="['stoke-current text-warning', {'text-white': navbarColor != '#fff'}]"
              class="cursor-pointer p-2"
              @click.stop="showBookmarkPagesDropdown = !showBookmarkPagesDropdown"
            />
            <div
              v-if="showBookmarkPagesDropdown"
              v-click-outside="outside"
              class="absolute bookmark-list w-1/3 xl:w-1/4 mt-4"
            >
              <vx-auto-suggest
                :auto-focus="true"
                :data="navbarSearchAndPinList"
                input-classses="w-full"
                show-action
                show-pinned
                background-overlay
@selected="selected" @actionClicked="actionClicked"
              />
            </div>
          </div>
        </template>

        <vs-spacer />

        <!-- I18N -->
        <vs-dropdown
          vs-custom-content
          vs-trigger-click
          class="cursor-pointer"
        >
          <span class="cursor-pointer flex i18n-locale"><img
            class="h-4 w-5"
            :src="require(`@/assets/images/flags/${$i18n.locale}.png`)"
            :alt="$i18n.locale"
          ><span class="hidden sm:block ml-2">{{ getCurrentLocaleData.lang }}</span></span>
          <vs-dropdown-menu class="w-48 i18n-dropdown">
            <vs-dropdown-item @click="updateLocale('en')">
              <img
                class="h-4 w-5 mr-1"
                src="@/assets/images/flags/en.png"
                alt="en"
              > &nbsp;English
            </vs-dropdown-item>
            <vs-dropdown-item @click="updateLocale('fr')">
              <img
                class="h-4 w-5 mr-1"
                src="@/assets/images/flags/fr.png"
                alt="fr"
              > &nbsp;French
            </vs-dropdown-item>
            <vs-dropdown-item @click="updateLocale('de')">
              <img
                class="h-4 w-5 mr-1"
                src="@/assets/images/flags/de.png"
                alt="de"
              > &nbsp;German
            </vs-dropdown-item>
            <vs-dropdown-item @click="updateLocale('pt')">
              <img
                class="h-4 w-5 mr-1"
                src="@/assets/images/flags/pt.png"
                alt="pt"
              > &nbsp;Portuguese
            </vs-dropdown-item>
          </vs-dropdown-menu>
        </vs-dropdown>

        <!-- SEARCHBAR -->
        <div
          v-show="showFullSearch"
          class="search-full-container w-full h-full absolute pin-l rounded-lg"
          :class="{'flex': showFullSearch}"
        >
          <vx-auto-suggest
            ref="navbarSearch"
            :auto-focus="showFullSearch"
            :data="navbarSearchAndPinList"
            placeholder="Search..."
            class="w-full"
            input-classses="w-full vs-input-no-border vs-input-no-shdow-focus no-icon-border"
            icon="SearchIcon"
            background-overlay
            @selected="selected"
            @closeSearchbar="showFullSearch = false"
          />
          <div class="absolute pin-r h-full z-50">
            <feather-icon
              icon="XIcon"
              class="px-4 cursor-pointer h-full close-search-icon"
              @click="showFullSearch = false"
            />
          </div>
        </div>
        <feather-icon
          icon="SearchIcon"
          class="cursor-pointer navbar-fuzzy-search ml-4"
          @click="showFullSearch = true"
        />

        <!-- CART DROPDOWN -->
        <vs-dropdown
          vs-custom-content
          vs-trigger-click
          class="cursor-pointer"
        >
          <feather-icon
            icon="ShoppingCartIcon"
            class="cursor-pointer ml-4 mr-6 mt-1"
            :badge="cartItems.length"
          />
          <vs-dropdown-menu
            class="cart-dropdown"
            :class="{'dropdown-custom': cartItems.length}"
          >
            <!-- IF CART HAVE ITEMS: HEADER -->
            <template v-if="cartItems.length">
              <div class="notification-header text-center p-5 bg-primary text-white">
                <h3 class="text-white">
                  {{ cartItems.length }} Item<span v-show="cartItems.length > 1">s</span>
                </h3>
                <p class="opacity-75">
                  In Your Cart
                </p>
              </div>

              <!-- CART ITEMS -->
              <VuePerfectScrollbar
                ref="mainSidebarPs"
                class="scroll-area--cart-items-dropdowm p-0 mb-10"
                :settings="settings"
              >
                <ul class="bordered-items">
                  <li
                    v-for="item in cartItems"
                    :key="item.objectID"
                    class="vx-row no-gutter cart-item cursor-pointer"
                  >
                    <!-- IMG COL -->
                    <div class="vx-col w-1/5 item-img-container bg-white flex items-center justify-center">
                      <img
                        :src="item.image"
                        alt="item"
                        class="cart-dropdown-item-img p-4"
                      >
                    </div>

                    <!-- INFO COL -->
                    <div class="vx-col w-4/5 pr-4 pl-2 py-4 flex flex-col justify-center">
                      <span class="font-medium block cart-item-title truncate">{{ item.name }}</span>
                      <small class="truncate mb-2">{{ item.description }}</small>
                      <div class="flex items-center justify-between">
                        <span class="text-sm font-medium">{{ item.quantity }} <small>x</small> ${{ item.price }}</span>
                        <feather-icon
                          icon="XIcon"
                          svg-classes="h-4 w-4 cursor-pointer text-danger"
                          class="hover:text-danger"
                          @click.stop="removeItemFromCart(item)"
                        />
                      </div>
                    </div>
                  </li>
                </ul>
              </VuePerfectScrollbar>
              <div
                class="
                                checkout-footer
                                fixed
                                pin-b
                                rounded-b-lg
                                text-primary
                                font-semibold
                                w-full
                                p-2
                                text-center
                                border
                                border-b-0
                                border-l-0
                                border-r-0
                                border-solid
                                border-grey-light
                                cursor-pointer"
                @click="$router.push('/apps/eCommerce/checkout')"
              >
                <span class="flex items-center justify-center">
                  <feather-icon
                    icon="ShoppingCartIcon"
                    svg-classes="h-4 w-4"
                  />
                  <span class="ml-2">Checkout</span>
                </span>
              </div>
            </template>

            <!-- IF CART IS EMPTY -->
            <template v-else>
              <p class="p-4">
                Your Cart Is Empty.
              </p>
            </template>
          </vs-dropdown-menu>
        </vs-dropdown>

        <!-- NOTIFICATIONS -->
        <vs-dropdown
          vs-custom-content
          vs-trigger-click
          class="cursor-pointer"
        >
          <feather-icon
            icon="BellIcon"
            class="cursor-pointer mt-1 sm:mr-6 mr-2"
            :badge="unreadNotifications.length"
          />
          <vs-dropdown-menu class="notification-dropdown dropdown-custom">
            <div class="notification-top text-center p-5 bg-primary text-white">
              <h3 class="text-white">
                {{ unreadNotifications.length }} New
              </h3>
              <p class="opacity-75">
                App Notifications
              </p>
            </div>

            <VuePerfectScrollbar
              ref="mainSidebarPs"
              class="scroll-area--nofications-dropdown p-0 mb-10"
              :settings="settings"
            >
              <ul class="bordered-items">
                <li
                  v-for="ntf in unreadNotifications"
                  :key="ntf.index"
                  class="flex justify-between px-4 py-4 notification cursor-pointer"
                >
                  <div class="flex items-start">
                    <feather-icon
                      :icon="ntf.icon"
                      :svg-classes="[`text-${ntf.category}`, 'stroke-current mr-1 h-6 w-6']"
                    />
                    <div class="mx-2">
                      <span
                        class="font-medium block notification-title"
                        :class="[`text-${ntf.category}`]"
                      >{{ ntf.title }}</span>
                      <small>{{ ntf.msg }}</small>
                    </div>
                  </div>
                  <small class="mt-1 whitespace-no-wrap">{{ elapsedTime(ntf.time) }}</small>
                </li>
              </ul>
            </VuePerfectScrollbar>
            <div
              class="
                        checkout-footer
                        fixed
                        pin-b
                        rounded-b-lg
                        text-primary
                        w-full
                        p-2
                        font-semibold
                        text-center
                        border
                        border-b-0
                        border-l-0
                        border-r-0
                        border-solid
                        border-grey-light
                        cursor-pointer"
            >
              <span>View All Notifications</span>
            </div>
          </vs-dropdown-menu>
        </vs-dropdown>

        <!-- USER META -->
        <div class="the-navbar__user-meta flex items-center">
          <div class="text-right leading-tight hidden sm:block">
            <p class="font-semibold">
              {{ user_displayName }}
            </p>
            <small>Available</small>
          </div>
          <vs-dropdown
            vs-custom-content
            vs-trigger-click
            class="cursor-pointer"
          >
            <div class="con-img ml-3">
              <img
                v-if="activeUserImg.startsWith('http')"
                key="onlineImg"
                :src="activeUserImg"
                alt="user-img"
                width="40"
                height="40"
                class="rounded-full shadow-md cursor-pointer block"
              >
              <img
                v-else
                key="localImg"
                :src="require(`@/assets/images/portrait/small/${activeUserImg}`)"
                alt="user-img"
                width="40"
                height="40"
                class="rounded-full shadow-md cursor-pointer block"
              >
            </div>
            <vs-dropdown-menu>
              <ul style="min-width: 9rem">
                <li
                  class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                  @click="$router.push('/pages/profile')"
                >
                  <feather-icon
                    icon="UserIcon"
                    svg-classes="w-4 h-4"
                  /> <span class="ml-2">Profile</span>
                </li>
                <li
                  class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                  @click="$router.push('/apps/email')"
                >
                  <feather-icon
                    icon="MailIcon"
                    svg-classes="w-4 h-4"
                  /> <span class="ml-2">Inbox</span>
                </li>
                <li
                  class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                  @click="$router.push('/apps/todo')"
                >
                  <feather-icon
                    icon="CheckSquareIcon"
                    svg-classes="w-4 h-4"
                  /> <span class="ml-2">Tasks</span>
                </li>
                <li
                  class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                  @click="$router.push('/apps/chat')"
                >
                  <feather-icon
                    icon="MessageSquareIcon"
                    svg-classes="w-4 h-4"
                  /> <span class="ml-2">Chat</span>
                </li>
                <li
                  class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                  @click="$router.push('/apps/eCommerce/wish-list')"
                >
                  <feather-icon
                    icon="HeartIcon"
                    svg-classes="w-4 h-4"
                  /> <span class="ml-2">Wish List</span>
                </li>
                <vs-divider class="m-1" />
                <li
                  class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                  @click="logout"
                >
                  <feather-icon
                    icon="LogOutIcon"
                    svg-classes="w-4 h-4"
                  /> <span class="ml-2">Logout</span>
                </li>
              </ul>
            </vs-dropdown-menu>
          </vs-dropdown>
        </div>
      </vs-navbar>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
import VxAutoSuggest from '@/components/vx-auto-suggest/VxAutoSuggest.vue'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import draggable from 'vuedraggable'

export default {
  name: 'TheNavbar',
  directives: {
    'click-outside': {
      bind (el, binding) {
        const { bubble } = binding.modifiers
        const handler = (e) => {
          if (bubble || (!el.contains(e.target) && el !== e.target)) {
            binding.value(e)
          }
        }
        el.__vueClickOutside__ = handler
        document.addEventListener('click', handler)
      },

      unbind (el) {
        document.removeEventListener('click', el.__vueClickOutside__)
        el.__vueClickOutside__ = null
      }
    }
  },
  components: {
    VxAutoSuggest,
    VuePerfectScrollbar,
    draggable
  },
  props: {
    navbarColor: {
      type: String,
      default: '#fff'
    }
  },
  data () {
    return {
      navbarSearchAndPinList: this.$store.state.navbarSearchAndPinList,
      searchQuery: '',
      showFullSearch: false,
      unreadNotifications: [
        {
          index: 0, title: 'New Message', msg: 'Are your going to meet me tonight?', icon: 'MessageSquareIcon', time: 'Wed Jan 30 2019 07:45:23 GMT+0000 (GMT)', category: 'primary'
        },
        {
          index: 1, title: 'New Order Recieved', msg: 'You got new order of goods.', icon: 'PackageIcon', time: 'Wed Jan 30 2019 07:45:23 GMT+0000 (GMT)', category: 'success'
        },
        {
          index: 2, title: 'Server Limit Reached!', msg: 'Server have 99% CPU usage.', icon: 'AlertOctagonIcon', time: 'Thu Jan 31 2019 07:45:23 GMT+0000 (GMT)', category: 'danger'
        },
        {
          index: 3, title: 'New Mail From Peter', msg: 'Cake sesame snaps cupcake', icon: 'MailIcon', time: 'Fri Feb 01 2019 07:45:23 GMT+0000 (GMT)', category: 'primary'
        },
        {
          index: 4, title: 'Bruce\'s Party', msg: 'Chocolate cake oat cake tiramisu', icon: 'CalendarIcon', time: 'Fri Feb 02 2019 07:45:23 GMT+0000 (GMT)', category: 'warning'
        }
      ],
      settings: { // perfectscrollbar settings
        maxScrollbarLength: 60,
        wheelSpeed: 0.60
      },
      autoFocusSearch: false,
      showBookmarkPagesDropdown: false
    }
  },
  computed: {
    // HELPER
    sidebarWidth () {
      return this.$store.state.sidebarWidth
    },
    breakpoint () {
      return this.$store.state.breakpoint
    },

    // NAVBAR STYLE
    classObj () {
      if (this.sidebarWidth == 'default') return 'navbar-default'
      if (this.sidebarWidth == 'reduced') return 'navbar-reduced'
      if (this.sidebarWidth) return 'navbar-full'
    },

    // I18N
    getCurrentLocaleData () {
      const { locale } = this.$i18n
      if (locale == 'en') return { flag: 'us', lang: 'English' }
      if (locale == 'pt') return { flag: 'br', lang: 'Portuguese' }
      if (locale == 'fr') return { flag: 'fr', lang: 'French' }
      if (locale == 'de') return { flag: 'de', lang: 'German' }
    },

    // BOOKMARK & SEARCH
    data () {
      return this.$store.state.navbarSearchAndPinList
    },
    starredPages () {
      return this.$store.state.starredPages
    },
    starredPagesLimited: {
      get () {
        return this.starredPages.slice(0, 10)
      },
      set (list) {
        this.$store.dispatch('arrangeStarredPagesLimited', list)
      }
    },
    starredPagesMore: {
      get () {
        return this.starredPages.slice(10)
      },
      set (list) {
        this.$store.dispatch('arrangeStarredPagesMore', list)
      }
    },

    // CART DROPDOWN
    cartItems () {
      return this.$store.state.eCommerce.cartItems.slice().reverse()
    },

    // PROFILE
    user_displayName () {
      return JSON.parse(localStorage.getItem('userInfo')).displayName
    },
    activeUserImg () {
      return JSON.parse(localStorage.getItem('userInfo')).photoURL || this.$store.state.AppActiveUser.img
    }
  },
  watch: {
    $route () {
      if (this.showBookmarkPagesDropdown) this.showBookmarkPagesDropdown = false
    }
  },
  methods: {
    updateLocale (locale) {
      this.$i18n.locale = locale
    },
    showSidebar () {
      this.$store.commit('TOGGLE_IS_SIDEBAR_ACTIVE', true)
    },
    selected (item) {
      this.$router.push(item.url)
      this.showFullSearch = false
    },
    actionClicked (item) {
      // e.stopPropogation();
      this.$store.dispatch('updateStarredPage', { index: item.index, val: !item.highlightAction })
    },
    showNavbarSearch () {
      this.showFullSearch = true
    },
    showSearchbar () {
      this.showFullSearch = true
    },
    elapsedTime (startTime) {
      const x = new Date(startTime)
      const now = new Date()
      let timeDiff = now - x
      timeDiff /= 1000

      const seconds = Math.round(timeDiff)
      timeDiff = Math.floor(timeDiff / 60)

      const minutes = Math.round(timeDiff % 60)
      timeDiff = Math.floor(timeDiff / 60)

      const hours = Math.round(timeDiff % 24)
      timeDiff = Math.floor(timeDiff / 24)

      const days = Math.round(timeDiff % 365)
      timeDiff = Math.floor(timeDiff / 365)

      const years = timeDiff

      if (years > 0) {
        return `${years + (years > 1 ? ' Years ' : ' Year ')}ago`
      } if (days > 0) {
        return `${days + (days > 1 ? ' Days ' : ' Day ')}ago`
      } if (hours > 0) {
        return `${hours + (hours > 1 ? ' Hrs ' : ' Hour ')}ago`
      } if (minutes > 0) {
        return `${minutes + (minutes > 1 ? ' Mins ' : ' Min ')}ago`
      } if (seconds > 0) {
        return seconds + (seconds > 1 ? `${seconds} sec ago` : 'just now')
      }

      return 'Just Now'
    },
    logout () {
      // if user is logged in via auth0
      if (this.$auth.profile) this.$auth.logOut()

      // if user is looged in via firebase
      const firebaseCurrentUser = firebase.auth().currentUser

      if (firebaseCurrentUser) {
        firebase.auth().signOut().then(() => {
          this.$router.push('/pages/login')
          localStorage.removeItem('userInfo')
        })
      }
      // Change role on logout. Same value as initialRole of acj.js
      this.$acl.change('admin')
      localStorage.removeItem('userRole')
    },
    outside () {
      this.showBookmarkPagesDropdown = false
    },

    // CART DROPDOWN
    removeItemFromCart (item) {
      this.$store.dispatch('eCommerce/toggleItemInCart', item)
    }
  }
}
</script>
