<template>
  <div>
    <div
      class="q-pa-md row items-start q-gutter-md flex flex-center"
      v-show="products"
    >
      <q-card
        class="my-card"
        flat
        bordered
        v-for="(value, index) in products"
        :key="index"
      >
           <q-img style="max-height: 400px"
        :src="value.image"
      />

      <q-card-section>
        <div class="text-overline text-orange-9">ID: {{value.id}} • brand: {{value.brand}}</div>
        <div class="text-h5 q-mt-sm q-mb-xs">{{value.name}}</div>
        <div class="text-h5 q-mt-sm q-mb-xs text-orange-9">${{formater(value.price)}}</div>

        <div class="text-caption text-grey" style="max-size: 100px">
          {{value.description}}
        </div>
      </q-card-section>
      </q-card>
    </div>

    <div class="absolute-center" style="text-align: center" v-show="productsFail">
      <img
        class=""
        src="https://www.iconpacks.net/icons/2/free-sad-face-icon-2691-thumb.png"
        style="width: 200px"
      />
      <h3 style="margin: 10px">Sorry, no products found</h3>
    </div>
  </div>
</template>

<script>

export default {
  name: 'map',
  components: {

  },
  created () {
    this.onSucccess()
  },
  data () {
    return {
      products: null,
      productsFail: false
    }
  },

  methods: {
    formater (num) {
      var numParts = num.toString().split('.')
      numParts[0] = numParts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      return numParts.join('.')
    },
    async onSucccess () {
      this.$q.loading.show()
      try {
        const response = await this.$axios.get('/store', {
          headers: {
            token: window.localStorage.getItem('token')
          }
        })
        if (!response.data.data) {
          this.productsFail = true
          this.$q.loading.hide()
        } else {
          this.products = response.data.data
        }
        this.$q.loading.hide()
      } catch (error) {
        this.$q.loading.hide()
        this.productsFail = true
        if (error.response.data.auth === false) {
          window.localStorage.clear()
          this.$router.push('/')
        }
      }
    }
  }
}
</script>
<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 350px
</style>
