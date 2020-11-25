<template>
    <v-row class="text-center" v-if="snackbar">
        <v-col cols="12">
            <v-snackbar
            v-model="snackbar"
            :timeout="timeout"
            :multi-line="multiLine"
            top
            >
            <b>Important Information</b>
            <v-divider
                class="my-2"
            ></v-divider>
            <span>This website uses cookies to ensure you get the best experience on our website.</span>
            <template>
                <v-row class="text-center" >
                    <v-col cols="12">
                        <v-btn
                        color="red"
                        text                      
                        @click="close"
                        >
                        Fermer
                        </v-btn>
                        <v-btn
                        color="red"
                        text
                        @click="accept"
                        >
                        Accepter
                        </v-btn>
                        <v-btn
                        color="red"
                        text
                        @click="decline"
                        >
                        Refuser
                        </v-btn>
                    </v-col>
                </v-row>
            </template>
            </v-snackbar>
        </v-col>  
    </v-row>
</template>

<script>
  import * as Cookie from 'tiny-cookie'
  const STORAGE_TYPES = {
    local: 'localStorage',
    cookies: 'cookies'
  }
  export default {
    name: 'CookieSite',
    props: {
      storageName: {
        type: String,
        default: 'abes-cookie:accepted'
      },
      storageType: {
        type: String,
        default: STORAGE_TYPES.local
      },
      cookieOptions: {
        type: Object,
        default: () => {},
        required: false
      }
    },
    data () {
      return {
        supportsLocalStorage: true,
        snackbar: false,
        timeout:0,
        multiLine: true,
      }
    },
    computed: {
      canUseLocalStorage () {
        return this.storageType === STORAGE_TYPES.local && this.supportsLocalStorage
      },
    },
    created () {
      if (this.storageType === STORAGE_TYPES.local) {
        // Check for availability of localStorage
        try {
          const test = '__vue-cookielaw-check-localStorage'
          if (typeof window !== 'undefined') {
            window.localStorage.setItem(test, test)
            window.localStorage.removeItem(test)
          }
        } catch (e) {
          console.info('Local storage is not supported, falling back to cookie use')
          this.supportsLocalStorage = false
        }
      }
      if (!this.getVisited()) {
        this.snackbar = true
      }
    },
    methods: {
      setVisited () {
        if (this.canUseLocalStorage) {
          localStorage.setItem(this.storageName, true)
        } else {
          Cookie.set(this.storageName, true, { ...this.cookieOptions, expires: '1Y' })
        }
      },
      setAccepted () {
        if (this.canUseLocalStorage) {
          localStorage.setItem(this.storageName, true)
        } else {
          Cookie.set(this.storageName, true, { ...this.cookieOptions, expires: '1Y' })
        }
      },
      setDeclined () {
        if (this.canUseLocalStorage) {
          localStorage.setItem(this.storageName, false)
        } else {
          Cookie.set(this.storageName, false, { ...this.cookieOptions, expires: '1Y' })
        }
      },
      getVisited () {
        let visited = false
        if (this.canUseLocalStorage) {
          visited = localStorage.getItem(this.storageName)
        } else {
          visited = Cookie.get(this.storageName)
        }
        if (typeof visited === 'string') {
          visited = JSON.parse(visited)
        }
        return !(visited === null || visited === undefined)
      },
      isAccepted () {
        let accepted = false
        if (this.canUseLocalStorage) {
          accepted = localStorage.getItem(this.storageName)
        } else {
          accepted = Cookie.get(this.storageName)
        }
        if (typeof accepted === 'string') {
          accepted = JSON.parse(accepted)
        }
        return accepted
      },
      accept () {
        this.setVisited()
        this.setAccepted()
        this.$emit('accept')
        this.snackbar = false
      },
      close () {
        this.$emit('close')
        this.snackbar=false
      },
      decline () {
        this.setVisited()
        this.setDeclined()
        this.snackbar=false
        this.$emit('decline')
      },
      revoke () {
        if (this.canUseLocalStorage) {
          localStorage.removeItem(this.storageName)
        } else {
          Cookie.remove(this.storageName)
        }
        this.snackbar=true
        this.$emit('revoke')
      },
      open () {
        if (!this.getVisited()) {
          this.snackbar=true
        }
      }
    }
  }
</script>
