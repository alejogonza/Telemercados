<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md" style="max-width: 500px; text-align: center">
      <img alt="Quasar logo" src="~assets/logo.png" />
      <q-form @submit="onSubmit" class="q-gutter-md" style="width: 315px;">
        <q-input
          filled
          color="grey-8"
          v-model="username"
          label-slot
          hint="Create a username"
          reactive-rules
          @blur="validateUser"
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
                name="person"
              />
              Your username

              <q-tooltip
                content-class="bg-grey-8"
                anchor="top left"
                self="bottom left"
                :offset="[0, 8]"
                >Username</q-tooltip
              >
            </div>
          </template>
        </q-input>

        <q-input
          filled
          color="grey-8"
          v-model="email"
          label-slot
          hint="Type your email"
          lazy-rules
          @blur="validateEmail"
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
          <q-btn label="Register" type="submit" color="blue-grey" />
        </div>
        <div class="flex flex-center">
          <q-btn
            label="Login"
            type="reset"
            color="brown-8"
            flat
            class="q-ml-sm"
            to="/"
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
      username: null,
      userValid: false
    }
  },
  methods: {
    async onSubmit () {
      this.$q.loading.show()
      try {
        const response = await this.$axios.post('register', {
          username: this.username,
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
          group: false,
          message: error.response.data.message,
          color: 'red',
          position: 'top'
        })
      }
    },
    async validateUser () {
      if (this.username != null && this.username.length > 7) {
        try {
          const response = await this.$axios.post('username-validate', {
            username: this.username
          })
          console.log(response)
          this.userValid = true
          return true
        } catch (error) {
          this.username = ''
          console.error(error.response.data)
          this.$q.notify({
            group: false,
            message: error.response.data.message,
            color: 'red',
            position: 'top'
          })
          return false
        }
      }
    },
    async validateEmail () {
      if (this.email != null && this.email.length > 7) {
        try {
          const response = await this.$axios.post('email-validate', {
            email: this.email
          })
          console.log(response)
          this.userValid = true
          return true
        } catch (error) {
          this.email = ''
          console.error(error.response.data)
          this.$q.notify({
            group: false,
            message: error.response.data.message,
            color: 'red',
            position: 'top'
          })
          return false
        }
      }
    }
  }
}
</script>
