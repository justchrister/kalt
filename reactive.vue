<template>
  <div>
    <h1>Form nested v-model example</h1>
    <div class="page">
      <form @submit.prevent="updateProfile">
        <el-full-name :data="form.data" />
      </form>
    </div>
    <hr />
    DEBUG OUTPUT:
    <pre>    {{ form.data }}</pre>
  </div>
</template>

<script lang="ts">
export default {
  name: 'PageHomepage',
};
</script>

<script lang="ts" setup>
import ElFullName from '@/components/ElFullName.vue';

//const first_name = ref('');
//const last_name = ref('');
// I would use reactive in this case for this type of scenario
const form = reactive({
  data: {
    first_name: '',
    last_name: '',
  },
});

//const { data: profile } = await useAsyncData("accounts", async () => {
// data fetching
//});

//if (profile.value.first_name) {
//  first_name.value = profile.value.first_name;
//}
//if (profile.value.last_name) {
//  last_name.value = profile.value.last_name;
//}

const updateProfile = () => {
  // updating via API, using first_name, last_name
  console.log('updateProfile');
};
</script>
