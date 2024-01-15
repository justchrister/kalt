<template>
  <div @click="markedAsUnavail=true" class="outside-wrapper">
    <modal title="This feature is not available (yet)" :show="markedAsUnavail">
      We only offer our website in english, but will add more languages in the future.
    </modal>
    <label>Language: </label>
    <div class="wrapper">
      <span class="iso">{{languageDetails.iso}}</span>
      <span>{{languageDetails.name}}</span>
      <span>→</span>
    </div>
  </div>
</template>
<script setup lang="ts">
  const supabase = useSupabaseClient()
  const auth = useSupabaseUser()
  const user = await get(supabase).user(auth.value) as user;
  const languageDetails = await get(supabase).languageDetails(user?.language || 'ENG');
  const markedAsUnavail = ref(false)
</script>
<style scoped lang="scss">
  .outside-wrapper{
    margin: sizer(1) 0 0 0 ;
  }
  .wrapper{
    padding: sizer(1) sizer(2);
    display:grid;
    grid-template-columns: sizer(4) 4fr sizer(1);
    text-decoration:none;
    @include border;
    @include hoverable;
    &:hover{
      @include hovering;
    }
  }
  .iso{
    font-family:"Kalt Monospace", monospace;
    font-size:75%;
  }
</style>