<template>
  <main>
    <block margin="2">
      <progress-bar percentage="45%" />
    </block>
    <block>
      <p>
        Are you or someone close to you politically exposed?
      </p>
      <form @submit.prevent="save()">
        <div class="double">
          <div>
            <input type="radio" id="yes" name="politicallyExposed" value="yes" v-model="politicallyExposed" @click="save()">
            <label class="radioRow" for="yes">
              <span> Yes </span>
              <span class="radio-icon"></span>
            </label>
          </div>
          <div>
            <input type="radio" id="no" name="politicallyExposed" value="no" v-model="politicallyExposed" @click="save()">
            <label class="radioRow" for="no">
              <span> No </span>
              <span class="radio-icon"></span>
            </label>
          </div>
        </div>
        <input-button link="/kyc/3">next -> </input-button>
      </form>
    </block>
  </main>
</template>
<script lang="ts" setup>
  definePageMeta({
    pagename: 'Politically exposed',
    middleware: 'auth'
  })
  useHead({
    title: 'Politically exposed',
    meta: [{
      name: 'description',
      content: 'Invest in the future, today.'
    }]
  })
  const politicallyExposed = ref('');
  const supabase = useSupabaseClient()
  const auth = useSupabaseUser()
  const user = await get(supabase).user(auth.value);

  const save = async () => {
    let val = false as boolean;
    if(politicallyExposed.value==='yes') val = true;
    const error = await pub(supabase, {
      id: user.id,
      sender:'pages/profile/kyc/2.vue'
    }).kyc({
      'politicallyExposed': val
    });
    
  }
</script>
<style scoped lang="scss">
.double{
  display:grid;
  grid-template-columns:1fr 1fr;
  gap: sizer(1);

}
  
  input[type="radio"] {
      height: sizer(1);
      appearance: radio;
      border: 1px solid #ccc;
      margin-right: sizer(1);
      vertical-align: middle;
      margin:sizer(1);
      opacity:0;
      display:none;
  }
  label{
    margin:0;
    line-height:sizer(3);
    &:hover{
      cursor:pointer;
    }
  }
  .radioRow {
    margin-bottom: sizer(1);
    display: grid;
    grid-template-columns: 1fr sizer(3);
    @include border;
    @include hoverable;
    padding: sizer(1) sizer(2) sizer(1) sizer(1.5);
    &:hover{
      cursor:pointer;
      @include hovering;
    }
  }
  // if input radio is selected give .radioRow a selected class
  input[type="radio"]:checked + label {
    @include selected;
  }
</style>