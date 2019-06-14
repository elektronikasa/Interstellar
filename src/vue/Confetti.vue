<template>
    <main>
    </main>
</template>

<script>
    import Vue from 'vue'
    import VueConfetti from 'vue-confetti'

    import Vuesax from 'vuesax'

    import 'vuesax/dist/vuesax.css' //Vuesax styles
    Vue.use(Vuesax)

    Vue.use(VueConfetti);

    export default {
        mounted: function() {
            this.$confetti.start({
                shape: 'heart',
                colors: ['DodgerBlue', 'OliveDrab', 'Gold', 'pink', 'SlateBlue', 'lightblue', 'Violet', 'PaleGreen', 'SteelBlue', 'SandyBrown', 'Chocolate', 'Crimson'],
            });
            setTimeout(() => {
                this.$confetti.stop();
            }, 5000);
        },
        methods: {}
    }
</script>
