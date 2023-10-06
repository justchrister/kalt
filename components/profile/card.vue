<template>
  <div>
    <div class="profile-card" @click="navigateTo('/profile/edit')" v-if="profileSetUp">
        <div class="image" :id="user.profilePicture">
        </div>
        <div class="details">
          <div class="name">
            {{ user.firstName }} {{ user.lastName }} 
          </div>
          <div class="edit">
            edit
          </div>
          <div class="bio">
            <div class="birthdate">
              {{ calculateAge(user.birthdate) }} years old — {{ user.city }}, {{ user.country }}
            </div>
          </div>
      </div>
    </div>
    <div class="set-up-profile-card" @click="navigateTo('/profile/edit')"  v-else>
      <span>
      Let's set up your profile! <omoji emoji="😃" /> 
      </span>
      <span>
        →
      </span>
    </div>
  </div>
</template>
<script setup>
  const supabase = useSupabaseClient()
  const userId = useSupabaseUser()
  const user = await get(supabase).user(userId.value.id);
  const isProfileSetUp = async (user) => {
    if(!user || user.firstName == null || user.lastName == null || user.birthdate == null || user.city == null || user.country == null){
      return false
    } else {
      return true
    }
  }
  const profileSetUp = await isProfileSetUp(user)
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
    background-image:url('/images/pfp/4.png');
    border-radius:$clamp-4;
    height:$clamp-4;
    background-size:contain;
    background-repeat: no-repeat;
    width:$clamp-4;
    &#alt1{
      background-image:url('/images/pfp/1.png');
    }
    &#alt2{
      background-image:url('/images/pfp/2.png');
    }
    &#alt3{
      background-image:url('/images/pfp/3.png');
    }
    &#alt4{
      background-image:url('/images/pfp/4.png');
    }
    &#alt5{
      background-image:url('/images/pfp/5.png');
    }
    &#alt6{
      background-image:url('/images/pfp/6.png');
    }
    &#alt7{
      background-image:url('/images/pfp/7.png');
    }
    &#alt8{
      background-image:url('/images/pfp/8.png');
    }
    &#alt9{
      background-image:url('/images/pfp/9.png');
    }
    &#alt10{
      background-image:url('/images/pfp/10.png');
    }
  }
  .details{
    display:grid;
    grid-gap: 0px $clamp;
    grid-template-columns: 4fr $clamp-3;
  }

  .profile-card:hover{
    cursor:pointer;
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
  .set-up-profile-card{
    &:hover{
      cursor:pointer;
      background:$green-10;
    }
    background:$green-20;
    border:$border;
    padding:$clamp-1 $clamp-1 $clamp-1 $clamp-2;
    display:grid;

    grid-gap: $clamp;
    grid-template-columns: 1fr $clamp-2;
  }
</style>