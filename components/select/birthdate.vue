<template>
  <div>
    <label>Birthday:</label>
    <nuxt-link to="/profile/edit/birthdate/year">
      <span v-if="!user.birthdate">Set your birthday</span>
      <span v-else>{{ formatDate(user.birthdate) }}</span>
      <span class="arrow">→</span>
    </nuxt-link>
  </div>
</template>
<script setup lang="ts">
  const supabase = useSupabaseClient()
  const auth = useSupabaseUser()
  const user = await get(supabase).user(auth.value) as user;

  function getDaySuffix(day) {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  }
  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    const daySuffix = getDaySuffix(day);

    return `${month} ${day}${daySuffix}, ${year}`;
  }
</script>
<style scoped lang="scss">
  div{
    margin: sizer(1) 0 0 0 ;
  }
  a{
    padding: sizer(1) sizer(2) sizer(1) sizer(1);
    display:grid;
    grid-template-columns: 4fr sizer(4);
    text-decoration:none;
    @include border;
    @include hoverable;
    &:hover{
      @include hovering;
    }
  }
  .arrow{
    text-align:right;
  }
</style>