<template>
  <main>
    <ul>
      <span @click="navigateTo('/profile')">← back</span>
      <li v-for="currency of data" :value="currency.iso" :key="currency.iso" @click="updateProfile(currency.iso)">
        <span class="iso">{{ currency.iso }}</span>
        <span>{{ currency.name }}
          <span class="icon" v-if="selected == currency.iso"><loading-icon /></span>
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
    pagename: 'select currency',
    middleware: 'auth'
  })
  useHead({
    title: 'select currency'
  })

  const { data, error } = await supabase
    .from('sys_currencies')
    .select()
    .eq('enabled', true)
  const selected = ref();

  const updateProfile = async (iso) => {
    selected.value = iso;
    const error = await pub(supabase, {
      sender: "pages/select/currency.vue",
      id: user.id
    }).users({
      currency: iso
    });
    if (error) {
      ok.log('error', 'failed updating currency: ', error)
    } else {
      await ok.sleep(200);
      navigateTo('/profile')
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