<template>
  <div>
    <label>Color scheme: </label>
    <ul>
      <li
        :class="{ active: colorMode.preference === 'dark' }"
        class="dark"
        @click="setColorScheme('dark')"
      ></li>
      <li
        :class="{ active: colorMode.preference === 'light' }"
        class="light"
        @click="setColorScheme('light')"
      ></li>
      <li
        :class="{ active: colorMode.preference === 'crazy' }"
        class="crazy"
        @click="setColorScheme('crazy')"
      ></li>
    </ul>
  </div>
</template>
<script setup>
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()
  const colorMode = useColorMode()

  const setColorScheme = async (colorScheme) => {
    colorMode.preference = colorScheme;
    const error = await pub(supabase, {
      sender:'components/select/colorScheme.vue',
      entity: userId.value.id
    }).users({
      'userId': userId.value.id,
      'colorScheme': colorScheme
    });
    if(error) ok.log('error', 'could not update color scheme', error)
  };
  const { data, error } = await supabase
    .from('getUser')
    .select()
    .limit(1)
    .single()

  if (data) {
    colorMode.preference = data.colorScheme;
    ok.log('', 'user color scheme: ', data.colorScheme)
  }
  if(error) ok.log('error', 'could not get color scheme', error)

</script>
<style scoped lang="scss">
  ul {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: sizer(1);
  }
  li {
    border: $border;
    display: block;
    height: sizer(8);
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
      top: sizer(0.5);
      right: sizer(0.5);
      float:right;
      width: sizer(1.5);
      height: sizer(1.5);
      background-color: $green;
      background-image:url('omoji/check.svg');
      background-size:cover;
      border-radius: sizer(2);
    }
  }
</style>