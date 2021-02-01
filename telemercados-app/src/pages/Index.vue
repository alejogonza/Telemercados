<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md" style="max-width: 500px; text-align: center">
      <h1>{{ $store.state.user }}</h1>
      <img alt="telemercados logo" src="~assets/logo.png" />
      <q-form @submit="onSubmit" class="q-gutter-md" style="width: 315px;">
        <q-input
          filled
          color="grey-8"
          v-model="email"
          label-slot
          clearable
          hint="Type your email"
          lazy-rules
          :rules="[
            val =>
              /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(val) ||
              'Please type a valid email address'
          ]"
        >
          <template v-slot:label>
            <div class="row items-center all-pointer-events">
              <q-icon class="q-mr-xs" color="grey-8" size="24px" name="mail" />
              Your email address

              <q-tooltip
                content-class="bg-grey-8"
                anchor="top left"
                self="bottom left"
                :offset="[0, 8]"
                >Email address</q-tooltip
              >
            </div>
          </template>
        </q-input>

        <q-input
          filled
          color="grey-8"
          v-model="password"
          label-slot
          :type="isPwd ? 'password' : 'text'"
          hint="Type your Password"
          lazy-rules
          :rules="[
            val => (val && val.length > 7) || 'Please type min 8 characters'
          ]"
        >
          <template v-slot:label>
            <div class="row items-center all-pointer-events">
              <q-icon
                class="q-mr-xs"
                color="grey-8"
                size="24px"
                name="vpn_key"
              />
              Your password

              <q-tooltip
                content-class="bg-grey-8"
                anchor="top left"
                self="bottom left"
                :offset="[0, 8]"
                >Password</q-tooltip
              >
            </div>
          </template>

          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>

        <br />
        <div class="flex flex-center">
          <q-btn label="Login" type="submit" color="blue-grey" />
          <q-btn
            label="Register"
            type="reset"
            color="brown-8"
            flat
            class="q-ml-sm"
            to="/register"
          />
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  data () {
    return {
      email: null,
      password: null,
      isPwd: true,
      error: null
    }
  },

  methods: {
    async onSubmit () {
      try {
        this.$q.loading.show()
        const response = await this.$axios.post('/login', {
          email: this.email,
          password: this.password
        })
        window.localStorage.setItem('token', response.data.token)
        this.$q.loading.hide()
        this.$router.push('/products')
      } catch (error) {
        this.$q.loading.hide()
        console.error(error.response.data)
        this.$q.notify({
          message: error.response.data.message,
          color: 'red',
          position: 'top'
        })
      }
    }
  }
}
</script>
