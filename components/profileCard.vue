<template>
  <div class="profile-card">
    <div class="image">
    </div>
    <div class="details">
      <div class="name">
        {{ data.first_name }} {{ data.last_name }} 
      </div>
      <div class="bio">
        <div class="birthdate">
          🎂  {{ calculateAge(data.birthdate) }} years old
        </div>
        <div class="location">
          📍 {{ data.city }}, {{ data.country }}
        </div>
      </div>
      <div class="edit">
        <nuxt-link to="profile/edit">
          EDIT
        </nuxt-link>
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
  margin-top:$clamp;
  display:grid;
  grid-gap: $clamp;
  height:$clamp-8;
  grid-template-columns: $clamp-8 4fr;
}
.image{
  background-image:url('/media/people/caleb.jpg');
  height:100%;
  background-size:contain;
  background-repeat: no-repeat;
  width:100%;
}
  a{
    text-decoration:none;
  }
  a:hover{
    text-decoration:underline;
  }
  .edit{

    margin-top:$clamp;
  }
  a,
  .birthdate,
  .location{
    font-size:80%;
  }
  .birthdate,
  .location{
    margin-right: $clamp;
    display:inline-block;
  }
</style>