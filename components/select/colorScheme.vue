<template>
  <div>
    <label>Color scheme: </label>
    <ul>
      <li
        :class="{ active: selectedColorScheme === 'dark' }"
        class="dark"
        @click="setColorScheme('dark')"
      ></li>
      <li
        :class="{ active: selectedColorScheme === 'light' }"
        class="light"
        @click="setColorScheme('light')"
      ></li>
      <li
        :class="{ active: selectedColorScheme === 'crazy' }"
        class="crazy"
        @click="setColorScheme('crazy')"
      ></li>
    </ul>
  </div>
</template>
<script setup>
  const selectedColorScheme = useCookie("light");
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()
  const colorMode = useColorMode()

  const setColorScheme = async (colorScheme) => {
    colorMode.value = colorScheme;
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

  if (data) colorMode.value = data.color_scheme;
  if(error) ok.log('error', 'could not get color scheme', error)

</script>
<style scoped lang="scss">
  ul {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: $clamp;
  }
  li {
    border: $border;
    display: block;
    height: $clamp-8;
    background-size: cover;
    background-position: center top;
    background-repeat: no-repeat;
    cursor: pointer;
  }
  .dark {
    background-image: url("/darkmode.svg");
  }
  .light {
    background-image: url("/lightmode.svg");
  }
  .crazy {
    background-image: url("/FsoMtuBXsAI_Bx7.jpeg");
  }
  .active {
    &:before{
      display:block;
      content: '';
      position:relative;
      top:$clamp-0-5;
      right:$clamp-0-5;
      float:right;
      width:$clamp-1-5;
      height:$clamp-1-5;
      background-color:$green;
      background-image:url('omoji/check.svg');
      background-size:cover;
      border-radius:$clamp-2;
    }
  }
</style>