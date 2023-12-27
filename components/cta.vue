<template>
  <div class="cta">
    <input-button link="/invest" v-if="signedIn">invest</input-button>
    <div class="button-group" v-if="!signedIn">
      <input-button link="/request/amount">request invite</input-button>
      <input-button link="/auth">sign in</input-button>
    </div>
  </div>
</template>
<script setup>
  const props = defineProps({
    showDivest: {
      default: false,
      type: Boolean,
      required: false
    },
    animated: {
      default: true,
      type: Boolean,
      required: false
    }
  })
  let signedIn = false
  const supabase = useSupabaseClient()
  const userId = useSupabaseUser()
  if(userId.value) signedIn = true
</script>
<style scoped lang="scss">
.cta{
  text-align: center;
  margin: sizer(1) 0;
}
.button-group{
  display:grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: sizer(1);
}
a{
  text-decoration: none;
}
.link-group{
  margin-top: sizer(1);
  text-align:left;
}
.link-group a {
  margin-right: sizer(1.5);
  text-decoration:underline;
}
</style>