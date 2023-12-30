<template>
  <div>
  <label>Language: </label>
  <nuxt-link to="/profile/edit/language">
    <span class="iso">{{languageDetails.iso}}</span>
    <span>{{languageDetails.name}}</span>
    <span>→</span>
  </nuxt-link></div>
</template>
<script setup lang="ts">
  const supabase = useSupabaseClient()
  const auth = useSupabaseUser()
  const user = await get(supabase).user(auth.value) as user;
  const languageDetails = await get(supabase).languageDetails(user?.language || 'ENG');
</script>
<style scoped lang="scss">
  div{
    margin: sizer(1) 0 0 0 ;
  }
  a{
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