<template>
  <div>
    <div class="profile-card" @click="navigateTo('/profile')" v-if="profileSetUp">
      <div class="name">
        {{ userObject.firstName }} {{ userObject.lastName }}  <kyc-status :user="userObject"/>
      </div>
      <pill-next size="small" type="hoverable">
        edit
      </pill-next>
      <div class="birthdate">
        {{ calculateAge(userObject.birthdate) }} years old — {{ userObject.city }}, {{ userObject.country }}
      </div>
    </div>
    <div class="set-up" @click="navigateTo('/profile')"  v-else>
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
  const userObject = ref(props.user);
  if(!props.user){
    const supabase = useSupabaseClient();
    const auth = useSupabaseUser();
    userObject.value = await get(supabase).user(auth.value) as user;
  }
  const isProfileSetUp = (userObj) => {
    switch (userObj){
      case userObj == null:
        console.log('no user')
        return false;
      case userObj.firstName == null:
        console.log('missing first name')
        return false;
      case userObj.lastName == null:
        console.log('missing last name')
        return false;
      case userObj.birthdate == null:
        console.log('missing birthdate')
        return false;
      case userObj.city == null:
        console.log('missing city')
        return false;
      case userObj.country == null:
        console.log('missing country')
        return false;
      default:
        return true;
    }
  }
  const profileSetUp = isProfileSetUp(userObject.value);

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