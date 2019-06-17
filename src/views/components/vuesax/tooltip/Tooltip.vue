<!-- =========================================================================================
    File Name: Tooltip.vue
    Description: Tooltip - Imports all page portions
    ----------------------------------------------------------------------------------------
    Item Name: Vuesax Admin - VueJS Dashboard Admin Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div id="tooltip-demo">
    <tooltip-default />
    <tooltip-position />
    <tooltip-delay />
    <tooltip-color />
    <tooltip-title />
  </div>
</template>

<script>
import TooltipDefault from './TooltipDefault.vue'
import TooltipPosition from './TooltipPosition.vue'
import TooltipDelay from './TooltipDelay.vue'
import TooltipColor from './TooltipColor.vue'
import TooltipTitle from './TooltipTitle.vue'

export default {
  components: {
    TooltipDefault,
    TooltipPosition,
    TooltipDelay,
    TooltipTitle,
    TooltipColor
  }
}
</script>
