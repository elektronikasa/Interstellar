<!-- =========================================================================================
    File Name: FormWizardIconTab.vue
    Description: Form wizard with numbers in tabs
    ----------------------------------------------------------------------------------------
    Item Name: Vuesax Admin - VueJS Dashboard Admin Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <vx-card
    title="Form wizard with icon tabs"
    code-toggler
  >
    <p>Add feather icon class to <code>icon</code> prop in <code>tab-content</code> component to get desired icon in tab.</p>

    <div class="mt-5">
      <form-wizard
        color="rgba(var(--vs-primary), 1)"
        :title="null"
        :subtitle="null"
        finish-button-text="Submit"
        @on-complete="formSubmitted"
      >
        <tab-content
          title="Step 1"
          class="mb-5"
          icon="feather icon-home"
        >
          <!-- tab 1 content -->
          <div class="vx-row">
            <div class="vx-col w-1/2 mt-5">
              <vs-input
                v-model="firstName"
                label="First Name"
                class="w-full"
              />
            </div>
            <div class="vx-col w-1/2 mt-5">
              <vs-input
                v-model="lastName"
                label="Last Name"
                class="w-full"
              />
            </div>
            <div class="vx-col w-1/2 mt-5">
              <vs-input
                v-model="email"
                type="email"
                label="Email"
                class="w-full"
              />
            </div>
            <div class="vx-col w-1/2 mt-5">
              <vs-select
                v-model="city"
                class="w-full select-large"
                label="City"
              >
                <vs-select-item
                  v-for="(item,index) in cityOptions"
                  :key="index"
                  :value="item.value"
                  :text="item.text"
                  class="w-full"
                />
              </vs-select>
            </div>
          </div>
        </tab-content>

        <!-- tab 2 content -->
        <tab-content
          title="Step 2"
          class="mb-5"
          icon="feather icon-briefcase"
        >
          <div class="vx-row">
            <div class="vx-col w-1/2">
              <vs-input
                v-model="proposalTitle"
                label="Proposal Title"
                class="w-full mt-4"
              />
              <vs-input
                v-model="jobTitle"
                label="Job Title"
                class="w-full mt-4"
              />
            </div>
            <div class="vx-col w-1/2">
              <vs-textarea
                v-model="textarea"
                label="Short discription"
                class="mb-0 mt-10"
                rows="3"
              />
            </div>
          </div>
        </tab-content>

        <!-- tab 3 content -->
        <tab-content
          title="Step 3"
          class="mb-5"
          icon="feather icon-image"
        >
          <div class="vx-row">
            <div class="vx-col w-1/2">
              <vs-input
                v-model="eventName"
                label="Event Name"
                class="w-full mt-5"
              />
            </div>
            <div class="vx-col w-1/2">
              <vs-select
                v-model="city"
                class="w-full select-large mt-5"
                label="Event Location"
              >
                <vs-select-item
                  v-for="(item,index) in cityOptions"
                  :key="index"
                  :value="item.value"
                  :text="item.text"
                  class="w-full"
                />
              </vs-select>
            </div>
            <div class="vx-col w-1/2 mt-5">
              <vs-select
                v-model="status"
                class="w-full select-large"
                label="Event Status"
              >
                <vs-select-item
                  v-for="(item,index) in statusOptions"
                  :key="index"
                  :value="item.value"
                  :text="item.text"
                  class="w-full"
                />
              </vs-select>
            </div>
            <div class="vx-col w-1/2 mt-8">
              <div class="demo-alignment">
                <span>Requirements:</span>
                <vs-checkbox>Staffing</vs-checkbox>
                <vs-checkbox>Catering</vs-checkbox>
              </div>
            </div>
          </div>
        </tab-content>
      </form-wizard>
    </div>

    <template slot="codeContainer">
      &lt;template&gt;
      &lt;form-wizard color=&quot;rgba(var(--vs-primary), 1)&quot; :title=&quot;null&quot; :subtitle=&quot;null&quot; finishButtonText=&quot;Submit&quot; @on-complete=&quot;formSubmitted&quot;&gt;
      &lt;tab-content title=&quot;Step 1&quot; class=&quot;mb-5&quot; icon=&quot;feather icon-home&quot;&gt;

      &lt;!-- tab 1 content --&gt;
      &lt;div class=&quot;vx-row&quot;&gt;
      &lt;div class=&quot;vx-col w-1/2 mt-5&quot;&gt;
      &lt;vs-input size=&quot;large&quot; label=&quot;First Name&quot; v-model=&quot;firstName&quot; class=&quot;w-full&quot; /&gt;
      &lt;/div&gt;
      &lt;div class=&quot;vx-col w-1/2 mt-5&quot;&gt;
      &lt;vs-input size=&quot;large&quot; label=&quot;Last Name&quot;  v-model=&quot;lastName&quot; class=&quot;w-full&quot; /&gt;
      &lt;/div&gt;
      &lt;div class=&quot;vx-col w-1/2 mt-5&quot;&gt;
      &lt;vs-input type=&quot;email&quot; size=&quot;large&quot; label=&quot;Email&quot;  v-model=&quot;email&quot; class=&quot;w-full&quot; /&gt;
      &lt;/div&gt;
      &lt;div class=&quot;vx-col w-1/2 mt-5&quot;&gt;
      &lt;vs-select v-model=&quot;city&quot; class=&quot;w-full select-large&quot; label=&quot;City&quot;&gt;
      &lt;vs-select-item :key=&quot;index&quot; :value=&quot;item.value&quot; :text=&quot;item.text&quot; v-for=&quot;(item,index) in cityOptions&quot; class=&quot;w-full&quot; /&gt;
      &lt;/vs-select&gt;
      &lt;/div&gt;
      &lt;/div&gt;
      &lt;/tab-content&gt;

      &lt;!-- tab 2 content --&gt;
      &lt;tab-content title=&quot;Step 2&quot; class=&quot;mb-5&quot; icon=&quot;feather icon-briefcase&quot;&gt;
      &lt;div class=&quot;vx-row&quot;&gt;
      &lt;div class=&quot;vx-col w-1/2&quot;&gt;
      &lt;vs-input size=&quot;large&quot; label=&quot;Proposal Title&quot; v-model=&quot;proposalTitle&quot; class=&quot;w-full mt-5&quot; /&gt;
      &lt;vs-input size=&quot;large&quot; label=&quot;Job Title&quot;  v-model=&quot;jobTitle&quot; class=&quot;w-full mt-5&quot; /&gt;
      &lt;/div&gt;
      &lt;div class=&quot;vx-col w-1/2 mt-10&quot;&gt;
      &lt;vs-textarea v-model=&quot;textarea&quot; label=&quot;Short discription&quot; class=&quot;h-full&quot; /&gt;
      &lt;/div&gt;
      &lt;/div&gt;
      &lt;/tab-content&gt;

      &lt;!-- tab 3 content --&gt;
      &lt;tab-content title=&quot;Step 3&quot; class=&quot;mb-5&quot; icon=&quot;feather icon-image&quot;&gt;
      &lt;div class=&quot;vx-row&quot;&gt;
      &lt;div class=&quot;vx-col w-1/2&quot;&gt;
      &lt;vs-input size=&quot;large&quot; label=&quot;Event Name&quot; v-model=&quot;eventName&quot; class=&quot;w-full mt-5&quot; /&gt;
      &lt;/div&gt;
      &lt;div class=&quot;vx-col w-1/2&quot;&gt;
      &lt;vs-select v-model=&quot;city&quot; class=&quot;w-full select-large mt-5&quot; label=&quot;Event Location&quot;&gt;
      &lt;vs-select-item :key=&quot;index&quot; :value=&quot;item.value&quot; :text=&quot;item.text&quot; v-for=&quot;(item,index) in cityOptions&quot; class=&quot;w-full&quot; /&gt;
      &lt;/vs-select&gt;
      &lt;/div&gt;
      &lt;div class=&quot;vx-col w-1/2 mt-5&quot;&gt;
      &lt;vs-select v-model=&quot;status&quot; class=&quot;w-full select-large&quot; label=&quot;Event Status&quot;&gt;
      &lt;vs-select-item :key=&quot;index&quot; :value=&quot;item.value&quot; :text=&quot;item.text&quot; v-for=&quot;(item,index) in statusOptions&quot; class=&quot;w-full&quot; /&gt;
      &lt;/vs-select&gt;
      &lt;/div&gt;
      &lt;div class=&quot;vx-col w-1/2 mt-8&quot;&gt;
      &lt;div class=&quot;demo-alignment&quot;&gt;
      &lt;span&gt;Requirements:&lt;/span&gt;
      &lt;vs-checkbox&gt;Staffing&lt;/vs-checkbox&gt;
      &lt;vs-checkbox&gt;Catering&lt;/vs-checkbox&gt;
      &lt;/div&gt;
      &lt;/div&gt;
      &lt;/div&gt;
      &lt;/tab-content&gt;
      &lt;/form-wizard&gt;
      &lt;/template&gt;

      &lt;script&gt;
      import {FormWizard, TabContent} from 'vue-form-wizard'
      import 'vue-form-wizard/dist/vue-form-wizard.min.css'

      export default {
      data() {
      return {
      firstName: &quot;&quot;,
      /// other data....
      }
      },
      methods: {
      formSubmitted() {
      alert(&quot;Form submitted!&quot;);
      }
      },
      components: {
      FormWizard,
      TabContent
      }
      }
      &lt;/script&gt;
    </template>
  </vx-card>
</template>

<script>
import { FormWizard, TabContent } from 'vue-form-wizard'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'

export default {
  components: {
    FormWizard,
    TabContent
  },
  data () {
    return {
      firstName: '',
      lastName: '',
      email: '',
      city: 'new-york',
      proposalTitle: '',
      jobTitle: '',
      textarea: '',
      eventName: '',
      eventLocation: 'san-francisco',
      status: 'plannning',
      cityOptions: [
        { text: 'New York', value: 'new-york' },
        { text: 'Chicago', value: 'chicago' },
        { text: 'San Francisco', value: 'san-francisco' },
        { text: 'Boston', value: 'boston' }
      ],
      statusOptions: [
        { text: 'Plannning', value: 'plannning' },
        { text: 'In Progress', value: 'in progress' },
        { text: 'Finished', value: 'finished' }
      ],
      LocationOptions: [
        { text: 'New York', value: 'new-york' },
        { text: 'Chicago', value: 'chicago' },
        { text: 'San Francisco', value: 'san-francisco' },
        { text: 'Boston', value: 'boston' }
      ]
    }
  },
  methods: {
    formSubmitted () {
      alert('Form submitted!')
    }
  }
}
</script>
