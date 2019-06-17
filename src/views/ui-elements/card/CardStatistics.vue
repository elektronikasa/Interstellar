<!-- =========================================================================================
    File Name: CardStatistics.vue
    Description: Statistics Card
    ----------------------------------------------------------------------------------------
    Item Name: Vuesax Admin - VueJS Dashboard Admin Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div>
    <!-- ROW 1 -->
    <div class="vx-row">
      <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4 mb-base">
        <statistics-card-line
          icon="UsersIcon"
          statistic="92.6k"
          statistic-title="Subscribers Gained"
          :chart-data="analyticsData.subscribersGained"
          type="area"
        />
      </div>
      <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4 mb-base">
        <statistics-card-line
          icon="DollarSignIcon"
          statistic="97.5K"
          statistic-title="Revenue Generated"
          :chart-data="analyticsData.revenueGenerated"
          color="success"
          type="area"
        />
      </div>
      <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4 mb-base">
        <statistics-card-line
          icon="ShoppingCartIcon"
          statistic="36%"
          statistic-title="Quarterly Sales"
          :chart-data="analyticsData.quarterlySales"
          color="danger"
          type="area"
        />
      </div>
      <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4 mb-base">
        <statistics-card-line
          icon="ShoppingBagIcon"
          statistic="97.5K"
          statistic-title="Orders Received"
          :chart-data="analyticsData.ordersRecevied"
          color="warning"
          type="area"
        />
      </div>
    </div>

    <!-- ROW 2 -->
    <div class="vx-row">
      <div class="vx-col w-full md:w-1/3 lg:w-1/3 xl:w-1/3">
        <statistics-card-line
          icon="MonitorIcon"
          icon-right
          statistic="78.9k"
          statistic-title="Site Traffic"
          :chart-data="analyticsData.siteTraffic"
        />
      </div>

      <div class="vx-col w-full md:w-1/3 lg:w-1/3 xl:w-1/3">
        <statistics-card-line
          icon="UserCheckIcon"
          icon-right
          statistic="659.8k"
          statistic-title="Active Users"
          :chart-data="analyticsData.activeUsers"
          color="success"
        />
      </div>

      <div class="vx-col w-full md:w-1/3 lg:w-1/3 xl:w-1/3">
        <statistics-card-line
          icon="MailIcon"
          icon-right
          statistic="28.7k"
          statistic-title="Newsletter"
          :chart-data="analyticsData.newsletter"
          color="warning"
        />
      </div>
    </div>
  </div>
</template>

<script>
import StatisticsCardLine from '@/components/statistics-cards/StatisticsCardLine.vue'
import analyticsData from './analyticsData.js'

export default {
  components: {
    StatisticsCardLine
  },
  data () {
    return {
      analyticsData
    }
  }
}
</script>
