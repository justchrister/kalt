<template>
  <div>
    <div class="profile-card" @click="navigateTo('/profile/edit')" v-if="profileSetUp">
      <div class="name">
        {{ user.firstName }} {{ user.lastName }}  <kyc-status :user="user"/>
      </div>
      <pill-next size="small" >
        edit
      </pill-next>
      <div class="birthdate">
        {{ calculateAge(user.birthdate) }} years old — {{ user.city }}, {{ user.country }}
      </div>
    </div>
    <div class="set-up" @click="navigateTo('/profile/edit')"  v-else>
      <span>
      Let's set up your profile! <omoji emoji="😃" /> 
      </span>
      <span>
        →
      </span>
    </div>
  </div>
</template>
<script setup lang="ts">
  const props = defineProps({
    user: {
      type: Object as user,
      required: false
    }
  })
  const userObject = ref();
  if(!props.user){
    const supabase = useSupabaseClient();
    const auth = useSupabaseUser();
    userObject.value = await get(supabase).user(auth.value) as user;
  } else {
    userObject.value = props.user;
  }
  const isProfileSetUp = (user) => {
    if(!user || user.firstName == null || user.lastName == null || user.birthdate == null || user.city == null || user.country == null){
      ok.log('','profile is not set up, missing:',user);
      const withNullValue = Object.keys(user).filter(key => user[key] == null);
      return false
    } else {
      return true
    }
  }
  const profileSetUp = isProfileSetUp(userObject.value) || false;
  function calculateAge(birthday) {
    const birthDate = new Date(birthday);
    const currentDate = new Date();

    let ageInYears = currentDate.getFullYear() - birthDate.getFullYear();
    let ageInMonths = currentDate.getMonth() - birthDate.getMonth();
    let ageInDays = currentDate.getDate() - birthDate.getDate();

    // Adjust the years if the birth month hasn't occurred yet in the current year
    if (ageInMonths < 0 || (ageInMonths === 0 && ageInDays < 0)) {
      ageInYears--;
    }

    return ageInYears;
  }
</script>
<style scoped lang="scss">
  .profile-card{
    padding: sizer(1) sizer(1);
    display:grid;
    grid-gap: 0px sizer(1);
    grid-template-columns: 1fr sizer(4);
    @include border;
    @include hoverable;
  }

  .profile-card:hover{
    @include hovering;
    .edit{
      text-decoration:underline;
    }
  }
  .edit{
    text-align:right;
  }
  .birthdate{
    font-size:80%;
    text-decoration:none;
  }
  
  .set-up{
    background: green(20%);
    padding: sizer(1) sizer(1) sizer(1) sizer(2);
    display:grid;

    grid-gap: sizer(1);
    grid-template-columns: 1fr sizer(2);
    @include border;
    @include hoverable;
    background-color:yellow(5%);
    &:hover{
      @include hovering;
      background-color:yellow(10%);
    }
  }
</style>