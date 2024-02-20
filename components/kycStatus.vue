<template>
  <div :class="{'icon': true, 'unverified': !verified }"></div>
</template>
<script setup lang="ts">
  const props = defineProps({
    user: {
      type: Object,
      required: true
    }
  })
  const supabase = useSupabaseClient()
  const verified = await get(supabase).kycStatus(props.user)
  ok.log('', verified)
</script>
<style scoped lang="scss">
  .icon{
    display:inline-block;
    width: sizer(1.5);
    height: sizer(1.5);
    background-image: url('/icons/kyc/verified.svg');
    background-repeat: no-repeat;
    background-size: 80%;
    background-position: bottom;
    &.unverified{
      display:none;
    }
  }
</style>