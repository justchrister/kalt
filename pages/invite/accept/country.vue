<template>
  <main>
    <block margin="none">
      <h1> Where do you live? </h1>
    </block>
    <ul>
      <li v-for="country of countries" :value="country.iso" :key="country.iso" @click="updateProfile(country.iso2)">
        <span class="iso">{{ country.iso2 }}</span>
        <span>
          {{ country.name }}
          <span class="icon" v-if="selected == country.iso2">
            <loading-icon />
          </span>
        </span>
      </li>
    </ul>
  </main>
</template>
<script lang="ts" setup>
  const supabase = useSupabaseClient()
  const auth = useSupabaseUser()
  const user = await get(supabase).user(auth.value) as user;
  definePageMeta({
    pagename: 'Country',
    middleware: 'auth'
  })
  useSeoMeta({
    title: 'Accept invite',
    ogTitle: 'Kalt - Accept invite',
    description: 'Real assets, real impact.',
    ogDescription: 'Real assets, real impact.',
    ogImage: 'https://ka.lt/images/meta.png'
  })
  const getCountries = async () => {
    const { data, error } = await supabase
      .from('sys_countries')
      .select()
      .eq('enabled', true)
    return data
  }
  const countries = await getCountries();
  const selected = ref();

  const updateProfile = async (iso) => {
    selected.value = iso;
    const error = await pub(supabase, {
      sender: "invite/accept/country.vue",
      id: user.id
    }).users({
      country: iso
    });
    if (error) {
      ok.log('error', 'failed updating country: '+error.message)
    } else {
      await ok.sleep(200);
      navigateTo('/invite/accept/city')
    }
  };
</script>
<style scoped lang="scss">
  .icon {
    float: right;
  }

  ul {
    max-width: sizer(35);
    margin: 0 auto;
    padding: sizer(1) sizer(2);
  }

  li {
    display: grid;
    grid-template-columns: sizer(4) 4fr;
    padding: sizer(1) sizer(2);
    margin: sizer(1) 0;
    @include border;
    @include hoverable;

    &:hover {
      @include hovering;
    }
  }

  .iso {
    font-family: "Kalt Monospace", monospace;
    font-size: 75%;
  }

  span:hover {
    cursor: pointer;
  }

  h1 {
    text-align: center;
  }
</style>