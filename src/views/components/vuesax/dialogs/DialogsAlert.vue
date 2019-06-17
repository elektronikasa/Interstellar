<!-- =========================================================================================
    File Name: DialogsAlert.vue
    Description: Create alert dialogs
    ----------------------------------------------------------------------------------------
    Item Name: Vuesax Admin - VueJS Dashboard Admin Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <vx-card
    title="Alert"
    code-toggler
  >
    <p>To generate a dialog we have the global function $vs.dialog the parameters to generate the dialog are</p>
    <vs-list>
      <vs-list-item
        title="title"
        subtitle="title of the dialogue - String"
      />
      <vs-list-item
        title="text"
        subtitle="internal text of the dialog - String"
      />
      <vs-list-item
        title="color"
        subtitle="color of the component - Colors, RGB, HEX"
      />
      <vs-list-item
        title="accept"
        subtitle="function that executes the user accept the dialog - Function"
      />
      <vs-list-item
        title="cancel"
        subtitle="function that executes the user to cancel the dialog (if it is a confirm type) - Function"
      />
      <vs-list-item
        title="type"
        subtitle="determines the type of dialog (alert or confirm) - alert, confirm"
      />
      <vs-list-item
        title="buttonAccept"
        subtitle="determines the type of accept button - Boolean"
      />
      <vs-list-item
        title="buttonCancel"
        subtitle="determines the type of cancel button - Boolean"
      />
    </vs-list>

    <div class="demo-alignment">
      <vs-button
        color="primary"
        type="flat"
        @click="openAlert('primary')"
      >
        Alert Primary
      </vs-button>
      <vs-button
        color="success"
        type="flat"
        @click="openAlert('success')"
      >
        Alert Success
      </vs-button>
      <vs-button
        color="danger"
        type="flat"
        @click="openAlert('danger')"
      >
        Alert Danger
      </vs-button>
      <vs-button
        color="warning"
        type="flat"
        @click="openAlert('warning')"
      >
        Alert Warning
      </vs-button>
      <vs-button
        color="dark"
        type="flat"
        @click="openAlert('dark')"
      >
        Alert Dark
      </vs-button>
      <vs-button
        color="primary"
        type="gradient"
        @click="openAlert(null)"
      >
        Alert Color RGB | HEX
      </vs-button>
    </div>

    <template slot="codeContainer">
      &lt;template&gt;
      &lt;vs-button @click=&quot;openAlert('primary')&quot; color=&quot;primary&quot; type=&quot;flat&quot;&gt;Alert Primary&lt;/vs-button&gt;
      &lt;vs-button @click=&quot;openAlert('success')&quot; color=&quot;success&quot; type=&quot;flat&quot;&gt;Alert Success&lt;/vs-button&gt;
      &lt;vs-button @click=&quot;openAlert('danger')&quot; color=&quot;danger&quot; type=&quot;flat&quot;&gt;Alert Danger&lt;/vs-button&gt;
      &lt;vs-button @click=&quot;openAlert('warning')&quot; color=&quot;warning&quot; type=&quot;flat&quot;&gt;Alert Warning&lt;/vs-button&gt;
      &lt;vs-button @click=&quot;openAlert('dark')&quot; color=&quot;dark&quot; type=&quot;flat&quot;&gt;Alert Dark&lt;/vs-button&gt;
      &lt;vs-button @click=&quot;openAlert(null)&quot; color=&quot;primary&quot; type=&quot;gradient&quot;&gt;Alert Color RGB | HEX&lt;/vs-button&gt;
      &lt;/template&gt;

      &lt;script&gt;
      export default {
      data:()=&gt;({
      colorAlert:'primary',
      titleAlert:'Alert',
      activeAlert:false,
      valueInput:'',
      }),
      methods:{
      openAlert(color){
      this.colorAlert = color || this.getColorRandom()
      this.$vs.dialog({
      color:this.colorAlert,
      title: `Dialog - ${this.colorAlert}`,
      text: 'I love soufflé lollipop liquorice wafer jelly-o halvah sesame snaps. Pastry chocolate cake jelly-o carrot cake jelly topping croissant ice cream.',
      accept:this.acceptAlert
      })
      },
      acceptAlert(){
      this.$vs.notify({
      color:this.colorAlert,
      title:'Accept Selected',
      text:'Gingerbread soufflé biscuit oat cake.'
      })
      },
      getColorRandom(){
      function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
      }
      return `rgb(${getRandomInt(0,255)},${getRandomInt(0,255)},${getRandomInt(0,255)})`
      },
      }
      }
      &lt;/script&gt;
    </template>
  </vx-card>
</template>

<script>
export default {
  data: () => ({
    colorAlert: 'primary',
    titleAlert: 'Alert',
    activeAlert: false,
    valueInput: ''
  }),
  methods: {
    openAlert (color) {
      this.colorAlert = color || this.getColorRandom()
      this.$vs.dialog({
        color: this.colorAlert,
        title: `Dialog - ${this.colorAlert}`,
        text: 'I love soufflé lollipop liquorice wafer jelly-o halvah sesame snaps. Pastry chocolate cake jelly-o carrot cake jelly topping croissant ice cream.',
        accept: this.acceptAlert
      })
    },
    acceptAlert () {
      this.$vs.notify({
        color: this.colorAlert,
        title: 'Accept Selected',
        text: 'Gingerbread soufflé biscuit oat cake.'
      })
    },
    getColorRandom () {
      function getRandomInt (min, max) {
        return Math.floor(Math.random() * (max - min)) + min
      }
      return `rgb(${getRandomInt(0, 255)},${getRandomInt(0, 255)},${getRandomInt(0, 255)})`
    }
  }
}
</script>
