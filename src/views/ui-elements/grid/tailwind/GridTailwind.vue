<!-- =========================================================================================
    File Name: GridTailwind.vue
    Description: Tailwind Grid System - Imports page portions
    ----------------------------------------------------------------------------------------
    Item Name: Vuesax Admin - VueJS Dashboard Admin Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div id="tailwind-grid-demo">
    <grid-basic-grid />
    <grid-responsive-grids />
    <grid-mixed-column-sizes />
    <grid-wrapping-columns />
    <grid-column-spacing />
    <grid-auto-column-width />
    <grid-simple-offset />
  </div>
</template>

<script>
import GridBasicGrid from './GridBasicGrid.vue'
import GridResponsiveGrids from './GridResponsiveGrids.vue'
import GridMixedColumnSizes from './GridMixedColumnSizes.vue'
import GridWrappingColumns from './GridWrappingColumns.vue'
import GridColumnSpacing from './GridColumnSpacing.vue'
import GridAutoColumnWidth from './GridAutoColumnWidth.vue'
import GridColumnOrder from './GridColumnOrder.vue'
import GridSimpleOffset from './GridSimpleOffset.vue'

export default {
  components: {
    GridBasicGrid,
    GridResponsiveGrids,
    GridMixedColumnSizes,
    GridWrappingColumns,
    GridColumnSpacing,
    GridAutoColumnWidth,
    GridSimpleOffset,
    GridColumnOrder
  }
}
</script>

<style lang="scss">
#tailwind-grid-demo {
    .bg-grid-color {
        background-color: #b8c2cc;
    }

    .bg-grid-color-secondary {
        background-color: #dae1e7;
    }
    .theme-dark{
        .bg-grid-color {
            background-color: #212744; // $table-dark-stripe
        }

        .bg-grid-color-secondary {
            background-color: #343661; // $grid-dark-color
        }
    }
}
</style>
