<!-- =========================================================================================
    File Name: NotificationsDefault.vue
    Description: Rendering of default notifications
    ----------------------------------------------------------------------------------------
    Item Name: Vuesax Admin - VueJS Dashboard Admin Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <vx-card
    title="Default"
    code-toggler
  >
    <p>To add a notification we have the global function <code>$vs.notify</code>. The first parameter is a <code>json</code> with all the necessary attributes, or if we only want the standard notification we can only add a string with the text of the notification</p>

    <div class="demo-alignment">
      <vs-button
        color="primary"
        type="flat"
        @click="$vs.notify({
          title:'Primary',
          text:'Lorem ipsum dolor sit amet, consectetur',
          color:'primary'})"
      >
        Notification Primary
      </vs-button>

      <vs-button
        color="success"
        type="flat"
        @click="$vs.notify({
          title:'Success',
          text:'Lorem ipsum dolor sit amet, consectetur',
          color:'success'})"
      >
        Notification Success
      </vs-button>

      <vs-button
        color="danger"
        type="flat"
        @click="$vs.notify({
          title:'Danger',
          text:'Lorem ipsum dolor sit amet, consectetur',
          color:'danger'})"
      >
        Notification Danger
      </vs-button>

      <vs-button
        color="warning"
        type="flat"
        @click="$vs.notify({
          title:'Warning',
          text:'Lorem ipsum dolor sit amet, consectetur',
          color:'warning'})"
      >
        Notification Warning
      </vs-button>

      <vs-button
        color="dark"
        type="flat"
        @click="$vs.notify({
          title:'dark',
          text:'Lorem ipsum dolor sit amet, consectetur',
          color:'dark'})"
      >
        Notification Dark
      </vs-button>

      <vs-button
        color="success"
        type="gradient"
        @click="random()"
      >
        Notification Random Color
      </vs-button>
    </div>

    <template slot="codeContainer">
      &lt;template&gt;
      &lt;div class=&quot;demo-alignment&quot;&gt;

      &lt;vs-button
      @click=&quot;$vs.notify({
      title:&apos;Primary&apos;,
      text:&apos;Lorem ipsum dolor sit amet, consectetur&apos;,
      color:&apos;primary&apos;})&quot;
      color=&quot;primary&quot;
      type=&quot;flat&quot;&gt;Notification Primary&lt;/vs-button&gt;

      &lt;vs-button
      @click=&quot;$vs.notify({
      title:&apos;Success&apos;,
      text:&apos;Lorem ipsum dolor sit amet, consectetur&apos;,
      color:&apos;success&apos;})&quot;
      color=&quot;success&quot;
      type=&quot;flat&quot;&gt;Notification Success&lt;/vs-button&gt;

      &lt;vs-button
      @click=&quot;$vs.notify({
      title:&apos;Danger&apos;,
      text:&apos;Lorem ipsum dolor sit amet, consectetur&apos;,
      color:&apos;danger&apos;})&quot;
      color=&quot;danger&quot;
      type=&quot;flat&quot;&gt;Notification Danger&lt;/vs-button&gt;

      &lt;vs-button
      @click=&quot;$vs.notify({
      title:&apos;Warning&apos;,
      text:&apos;Lorem ipsum dolor sit amet, consectetur&apos;,
      color:&apos;warning&apos;})&quot;
      color=&quot;warning&quot;
      type=&quot;flat&quot;&gt;Notification Warning&lt;/vs-button&gt;

      &lt;vs-button
      @click=&quot;$vs.notify({
      title:&apos;dark&apos;,
      text:&apos;Lorem ipsum dolor sit amet, consectetur&apos;,
      color:&apos;dark&apos;})&quot;
      color=&quot;dark&quot;
      type=&quot;flat&quot;&gt;Notification Dark&lt;/vs-button&gt;

      &lt;vs-button @click=&quot;random()&quot; color=&quot;success&quot; type=&quot;gradient&quot;&gt;Notification Random Color&lt;/vs-button&gt;
      &lt;/div&gt;
      &lt;/template&gt;

      &lt;script&gt;
      export default {
      methods: {
      random() {
      function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
      }
      let color = &grave;rgb(${getRandomInt(0,255)},${getRandomInt(0,255)},${getRandomInt(0,255)})&grave;

      this.$vs.notify({
      title: &apos;Color&apos;,
      text: &apos;Lorem ipsum dolor sit amet, consectetur&apos;,
      color: color
      })

      },
      }
      }
      &lt;/script&gt;
    </template>
  </vx-card>
</template>

<script>
export default {
  methods: {
    random () {
      function getRandomInt (min, max) {
        return Math.floor(Math.random() * (max - min)) + min
      }
      const color = `rgb(${getRandomInt(0, 255)},${getRandomInt(0, 255)},${getRandomInt(0, 255)})`

      this.$vs.notify({
        title: 'Color',
        text: 'Lorem ipsum dolor sit amet, consectetur',
        color
      })
    }
  }
}
</script>
