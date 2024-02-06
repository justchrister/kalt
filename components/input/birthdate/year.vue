
<template>
  <label> Which year were you born?</label>
  <input type="number" @input="updateYear()" v-model="year" :class="{ 'wrong': wrong }">
  <notification :message="notification" v-if="notification" />
</template>
<script setup lang="ts">
  const props = defineProps({
    user: {
      type: Object,
      required: true
    }
  })

  const supabase = useSupabaseClient()
  const user = props.user as user;
  
  const minAge = 18;
  const maxAge = 130;

  const max = ref(new Date().getFullYear() - minAge);
  const min = ref(new Date().getFullYear() - maxAge);

  const year = ref(props.user.birthdate?.split('-')[0] || null);
  const month = ref(props.user.birthdate?.split('-')[1] || '10');
  const day = ref(props.user.birthdate?.split('-')[2] || '20');

  const wrong= ref(false);
  const notification = ref('hello');

  const updateYear = async () => {
    const yearAsString = year.value.toString();
    if(yearAsString.length>4 || yearAsString.length<4){
      return
    }
    if(yearAsString.length===4) {
      if (year.value > max.value) {
        wrong.value = true;
        notification.value='You must be at least 18 years old to use this service'
        ok.log('warn', 'user under 18')
        return
      }
    }
    const error = await pub(supabase, { 
      sender: 'components/input/birthdate/year.vue',
      id: user.id 
    }).users({
      birthdate: `${year.value}-${month.value}-${day.value}`
    });
  };
</script>
<style scoped lang="scss"></style>