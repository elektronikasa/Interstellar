<!-- =========================================================================================
    File Name: VxSidebarItem.vue
    Description: Sidebar item component. Extends vuesax framework's 'vs-sidebar-item' component
    Component Name: VxSidebarItem
    ----------------------------------------------------------------------------------------
    Item Name: Vuesax Admin - VueJS Dashboard Admin Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div
    v-if="canSee"
    :class="[{'vs-sidebar-item-active':activeLink}, {'disabled-item pointer-events-none': isDisabled}]"
    class="vs-sidebar--item"
  >
    <router-link
      v-if="to"
      :to="to"
      :class="[{'router-link-active': activeLink}]"
      :target="target"
      exact
    >
      <vs-icon
        v-if="!featherIcon"
        :icon-pack="iconPack"
        :icon="icon"
      />
      <feather-icon
        v-else
        :icon="icon"
        :class="{'w-3 h-3': iconSmall}"
      />
      <slot />
    </router-link>
    <a
      v-else
      :target="target"
      :href="href"
    >
      <vs-icon
        v-if="!featherIcon"
        :icon-pack="iconPack"
        :icon="icon"
      />
      <feather-icon
        v-else
        :icon="icon"
        :class="{'w-3 h-3': iconSmall}"
      />
      <slot />
    </a>
  </div>
</template>

<script>
export default {
  name: 'VxSidebarItem',
  props: {
    icon: {
      default: '',
      type: String
    },
    iconSmall: {
      default: false,
      type: Boolean
    },
    iconPack: {
      default: 'material-icons',
      type: String
    },
    href: {
      default: '#',
      type: String
    },
    to: {
      default: null,
      type: String
    },
    index: {
      default: null,
      type: [String, Number]
    },
    featherIcon: {
      default: true,
      type: Boolean
    },
    target: {
      default: '_self',
      type: String
    },
    isDisabled: {
      default: false,
      type: Boolean
    }
  },
  data () {
    return {
      activeLink: false
    }
  },
  computed: {
    canSee () {
      this.$acl.check(this.$store.state.userRole)
      if (this.to) {
        return this.$acl.check(this.$router.match(this.to).meta.rule)
      }
      return true
    }
  },
  watch: {
    $route () {
      this.CheckIsActive()
    }
  },
  updated () {
    this.CheckIsActive()
  },
  methods: {
    CheckIsActive () {
      if (this.to) {
        if (this.$route.path.slice(1).includes(this.to.slice(1)) && this.to.slice(1)) this.activeLink = true
        else this.activeLink = false
      }
    }
  }
}
</script>
