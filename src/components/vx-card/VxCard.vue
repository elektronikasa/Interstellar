<!-- =========================================================================================
    File Name: VxCard.vue
    Description: Card Component
    Component Name: VxCard
    ----------------------------------------------------------------------------------------
    Item Name: Vuesax Admin - VueJS Dashboard Admin Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div
    ref="card"
    class="vx-card"
    :class="[
      {'overflow-hidden': tempHidden},
      {'no-shadow': noShadow},
      {'rounded-none': noRadius},
      {'card-border': cardBorder} ]"
    :style="cardStyles"
  >
    <div
      v-if="hasHeader"
      class="vx-card__header"
    >
      <!-- card title -->
      <div class="vx-card__title">
        <h4 v-if="this.$props.title">
          {{ title }}
        </h4>
        <h6
          v-if="this.$props.subtitle"
          class="text-grey"
        >
          {{ subtitle }}
        </h6>
      </div>

      <!-- card actions -->
      <div
        v-if="hasAction"
        class="vx-card__actions"
      >
        <slot name="actions">
          <div
            v-if="(actionButtons || collapseAction || refreshContentAction || removeCardAction) && !codeToggler"
            class="vx-card__action-buttons"
          >
            <feather-icon
              v-if="actionButtons || collapseAction"
              icon="ChevronUpIcon"
              :class="{rotate180: !isContentCollapsed}"
              class="ml-4"
              @click="toggleContent"
            />
            <feather-icon
              v-if="actionButtons || refreshContentAction"
              icon="RotateCwIcon"
              class="ml-4"
              @click="refreshcard"
            />
            <feather-icon
              v-if="actionButtons || removeCardAction"
              icon="XIcon"
              class="ml-4"
              @click="removeCard"
            />
          </div>
          <div
            v-if="codeToggler && !actionButtons"
            class="vx-card__code-toggler sm:block hidden"
          >
            <feather-icon
              icon="CodeIcon"
              :class="{'border border-solid border-primary border-t-0 border-r-0 border-l-0': showCode}"
              @click="toggleCode"
            />
          </div>
        </slot>
      </div>
    </div>

    <div
      ref="content"
      class="vx-card__collapsible-content vs-con-loading__container"
      :class="[{collapsed: isContentCollapsed}, {'overflow-hidden': tempHidden}]"
      :style="StyleItems"
    >
      <!-- content with no body(no padding) -->
      <slot name="no-body" />

      <!-- content inside body(with padding) -->
      <div
        v-if="this.$slots.default"
        class="vx-card__body"
      >
        <slot />
      </div>

      <!-- content with no body(no padding) -->
      <slot name="no-body-bottom" />

      <div
        v-if="this.$slots.footer"
        class="vx-card__footer"
      >
        <slot name="footer" />
      </div>
    </div>

    <div
      v-show="this.$slots.codeContainer"
      ref="codeContainer"
      class="vx-card__code-container"
      :style="codeContainerStyles"
      :class="{collapsed: !showCode}"
    >
      <div class="code-content">
        <prism :language="codeLanguage">
          <slot name="codeContainer" />
        </prism>
      </div>
    </div>
  </div>
</template>

<script>
import Prism from 'vue-prism-component'

export default {
  name: 'VxCard',
  components: {
    Prism
  },
  props: {
    title: String,
    subtitle: String,
    actionButtons: {
      type: Boolean,
      default: false
    },
    actionButtonsColor: {
      type: String,
      default: 'success'
    },
    codeToggler: {
      type: Boolean,
      default: false
    },
    noShadow: {
      default: false,
      type: Boolean
    },
    noRadius: {
      default: false,
      type: Boolean
    },
    cardBorder: {
      default: false,
      type: Boolean
    },
    codeLanguage: {
      default: 'markup',
      type: String
    },
    collapseAction: {
      default: false,
      type: Boolean
    },
    refreshContentAction: {
      default: false,
      type: Boolean
    },
    removeCardAction: {
      default: false,
      type: Boolean
    }
  },
  data () {
    return {
      isContentCollapsed: false,
      showCode: false,
      maxHeight: null,
      cardMaxHeight: null,
      codeContainerMaxHeight: '0px',
      tempHidden: false
    }
  },
  computed: {
    hasAction () {
      return this.$slots.actions || (this.actionButtons || this.collapseAction || this.refreshContentAction || this.removeCardAction || this.codeToggler)
    },
    hasHeader () {
      return this.hasAction || (this.title || this.subtitle)
    },
    StyleItems () {
      return { maxHeight: this.maxHeight }
    },
    cardStyles () {
      return { maxHeight: this.cardMaxHeight }
    },
    codeContainerStyles () {
      return { maxHeight: this.codeContainerMaxHeight }
    }
  },
  methods: {
    toggleContent () {
      this.$refs.content.style.overflow = 'hidden'
      const { scrollHeight } = this.$refs.content
      if (this.maxHeight == '1.5rem') {
        this.maxHeight = `${scrollHeight}px`
        setTimeout(() => {
          this.maxHeight = 'none'
          this.$refs.content.style.overflow = 'hidden'
        }, 300)
      } else {
        this.maxHeight = `${scrollHeight}px`
        setTimeout(() => {
          this.maxHeight = '1.5rem'
          this.$refs.content.style.overflow = 'hidden'
        }, 50)
      }
      this.isContentCollapsed = !this.isContentCollapsed
    },
    refreshcard () {
      this.tempHidden = true
      this.$vs.loading({
        container: this.$refs.content,
        scale: 0.5
      })
      setTimeout(() => {
        this.$vs.loading.close(this.$refs.content)
        this.tempHidden = false
      }, 3000)
    },
    removeCard () {
      const { scrollHeight } = this.$refs.card
      this.cardMaxHeight = `${scrollHeight}px`
      this.$el.style.overflow = 'hidden'
      setTimeout(() => {
        this.cardMaxHeight = '0px'
      }, 50)
    },
    toggleCode () {
      this.tempHidden = true
      this.showCode = !this.showCode
      const { scrollHeight } = this.$refs.codeContainer
      if (this.codeContainerMaxHeight == '0px') {
        this.codeContainerMaxHeight = `${scrollHeight}px`
        setTimeout(() => {
          this.codeContainerMaxHeight = 'none'
          this.tempHidden = false
        }, 300)
      } else {
        this.codeContainerMaxHeight = `${scrollHeight}px`
        setTimeout(() => {
          this.codeContainerMaxHeight = '0px'
          this.tempHidden = false
        }, 150)
      }
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/scss/vuesax/components/vxCard.scss";
</style>
