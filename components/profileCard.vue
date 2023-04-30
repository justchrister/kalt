<template>
  <div class="profile-card" @click="navigateTo('/profile/edit')">
    <div class="image">
    </div>
    <div class="details">
      <div class="name">
        {{ data.first_name }} {{ data.last_name }} 
      </div>
      <div class="edit">
        edit
      </div>
      <div class="bio">
        <div class="birthdate">
          {{ calculateAge(data.birthdate) }} years old — {{ data.city }}, {{ data.country }}
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
  const supabase = useSupabaseClient()
  const { data, error } = await supabase
    .from('get_user')
    .select()
    .limit(1)
    .single()
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
    border-radius:3px;
    display:grid;
    grid-gap: $clamp;
    grid-template-columns: $clamp-4 4fr;
  }
  .image{
    background-image:url('/media/images/pfp-3.png');
    border-radius:$clamp-4;
    height:$clamp-4;
    background-size:contain;
    background-repeat: no-repeat;
    width:$clamp-4;
  }
  .details{
    display:grid;
    grid-gap: 0px $clamp;
    grid-template-columns: 4fr $clamp-3;
  }

  .profile-card:hover{
    cursor:pointer;
    background:white;
    .edit,
    .name{
      text-decoration:underline;
    }
  }
  .edit{
    text-align:right;
  }
  .edit,
  .birthdate{
    font-size:80%;
    text-decoration:none;
  }
</style>