<template>
  <nav>
    <component :is="navBarType"></component>
  </nav>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import NavbarVisitor from "@/components/navigation-components/NavbarVisitor.vue"
import NavbarLogged from "@/components/navigation-components/NavbarLogged.vue"
import { Getter } from "vuex-class";

const namespace = "user";

@Component({
  components: {
    NavbarVisitor,
    NavbarLogged
  }
})
export default class NavBar extends Vue {
  @Getter('getIsLogged', { namespace }) getIsLogged: boolean | undefined;
  navType = "navbar-visitor";

  get navBarType() {
    if(this.getIsLogged) {
      this.navType =  "navbar-logged";
    } else {
      this.navType = "navbar-visitor";
    }
    return this.navType;
  }

}
</script>
