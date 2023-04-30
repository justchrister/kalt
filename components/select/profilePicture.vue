<template>
  <div>
    <label>Select profile picture: </label>
    <ul>
      <li
        :class="{ active: colorMode.preference === 'alt1' }"
        class="alt1"
        @click="setProfilePicture('alt1')"
      ></li>
      <li
        :class="{ active: colorMode.preference === 'alt2' }"
        class="alt2"
        @click="setProfilePicture('alt2')"
      ></li>
      <li
        :class="{ active: colorMode.preference === 'alt3' }"
        class="alt3"
        @click="setProfilePicture('alt3')"
      ></li>
      <li
        :class="{ active: colorMode.preference === 'alt4' }"
        class="alt4"
        @click="setProfilePicture('alt4')"
      ></li>
      <li
        :class="{ active: colorMode.preference === 'alt5' }"
        class="alt5"
        @click="setProfilePicture('alt5')"
      ></li>
      <li
        :class="{ active: colorMode.preference === 'alt6' }"
        class="alt6"
        @click="setProfilePicture('alt6')"
      ></li>
      <li
        :class="{ active: colorMode.preference === 'alt7' }"
        class="alt7"
        @click="setProfilePicture('alt7')"
      ></li>
      <li
        :class="{ active: colorMode.preference === 'alt8' }"
        class="alt8"
        @click="setProfilePicture('alt8')"
      ></li>
      <li
        :class="{ active: colorMode.preference === 'alt9' }"
        class="alt9"
        @click="setProfilePicture('alt9')"
      ></li>
      <li
        :class="{ active: colorMode.preference === 'alt10' }"
        class="alt10"
        @click="setProfilePicture('alt10')"
      ></li>
    </ul>
  </div>
</template>
<script setup>
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()
  const colorMode = useColorMode()

  const setProfilePicture = async (colorScheme) => {
    console.log(colorMode)
    colorMode.preference = colorScheme;
    const { data, error } = await supabase
      .from('user_preferences')
      .insert({
        'user_id': user.value.id,
        'message_sender': 'components/select/autoInvest.vue',
        'color_scheme': colorScheme
      })
      .eq('user_id', user.value.id)
    if(error) ok.log('error', 'could not update color scheme', error)
  };
  const { data, error } = await supabase
    .from('get_user')
    .select()
    .limit(1)
    .single()

  if (data) {
    ok.log('', 'user color scheme: ', data.color_scheme)
    colorMode.preference = data.color_scheme;
    ok.log('', 'client color mode: ', colorMode.value)
  }
  if(error) ok.log('error', 'could not get color scheme', error)

</script>
<style scoped lang="scss">
  ul {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    grid-gap: $clamp;
  }
  li {
    border: $border;
    display: block;
    height:$clamp-6;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    cursor: pointer;
  }
  .alt1{
    background-image:url('/media/images/pfp-1.png');
  }
  .alt2{
    background-image:url('/media/images/pfp-2.png');
  }
  .alt3{
    background-image:url('/media/images/pfp-3.png');
  }
  .alt4{
    background-image:url('/media/images/pfp-4.png');
  }
  .alt5{
    background-image:url('/media/images/pfp-5.png');
  }
  .alt6{
    background-image:url('/media/images/pfp-6.png');
  }
  .alt7{
    background-image:url('/media/images/pfp-7.png');
  }
  .alt8{
    background-image:url('/media/images/pfp-8.png');
  }
  .alt9{
    background-image:url('/media/images/pfp-9.png');
  }
  .alt10{
    background-image:url('/media/images/pfp-10.png');
  }
  .active{
    border-radius:50%;
  }
</style>