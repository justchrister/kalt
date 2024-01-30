<template>
  <main>
    <ul>
      <span @click="navigateTo('/profile')">← back</span>
      <li v-for="country of data" :value="country.iso" :key="country.iso" @click="updateProfile(country.iso2)">
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
<script setup lang="ts">
  const supabase = useSupabaseClient()
  const auth = useSupabaseUser()
  const user = await get(supabase).user(auth.value) as user;
  definePageMeta({
    pagename: 'select country',
    middleware: 'auth'
  });

  useHead({
    title: 'select country'
  });

  const { data, error } = await supabase
    .from('sys_countries')
    .select()
    .eq('enabled', true)

  const selected = ref();

  const updateProfile = async (iso) => {
    selected.value = iso;
    const error = await pub(supabase, {
      sender: "pages/select/country.vue",
      id: user.id
    }).users({
      country: iso
    });
    if (error) {
      ok.log('error', 'failed updating country: ', error)
    } else {
      await ok.sleep(200);
      navigateTo('/profile/edit')
    }
  };
</script>
<style scoped lang="scss">
  .icon {
    float: right;
  }

  main {
    max-width: sizer(35);
    margin: 0 auto;
  }

  ul {
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
</style>