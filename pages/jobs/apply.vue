<template>
  <main>
    <block margin="1">
      Which role seems interesting to you?
    </block>
    <block margin="4">
    <form>
      <input type="radio" id="ml" name="role" value="ml" v-model="role">
      <label class="radioRow" for="ml">
        <span>ML engineer</span>
        <span class="radio-icon"></span>
      </label>
      <input type="radio" id="datascientist" name="role" value="datascientist" v-model="role">
      <label class="radioRow" for="datascientist">
        <span>Data scientist</span>
        <span class="radio-icon"></span>
      </label>
      <input type="radio" id="fullstack" name="role" value="fullstack" v-model="role">
      <label class="radioRow" for="fullstack">
        <span>Fullstack developer</span>
        <span class="radio-icon"></span>
      </label>
      <input type="radio" id="cofounder" name="role" value="cofounder" v-model="role">
      <label class="radioRow" for="cofounder">
        <span>Chief investment officer</span>
        <span class="radio-icon"></span>
      </label>
    </form>
    </block>
    <block margin="1">
      Whats the most relevant job/project you've worked on?
    </block>
    <block margin="4">
      <input type="text" v-model="relevantProject" placeholder="this can just be a link"/>
    </block>
    <block margin="1">
      Tell us a bit about yourself
    </block>
    <block margin="4">
      <textarea type="text" v-model="bio" placeholder="keep it short">
      </textarea>
      <div class="textAreaCounter">
        {{bio.length}}/280
      </div>
    </block>
    <block margin="1">
      Where do you live at the moment?
    </block>
    <block margin="4">
      <input type="text" v-model="living" placeholder="Berlin, Germany"/>
    </block>
    <block margin="1">
      Are you willing to relocate?
    </block>
    <block margin="4">
      <form>
        <div class="yesno">
          <input type="radio" id="no" name="role" value="no" v-model="relocate">
          <label class="radioRow" for="no">
            <span>No</span>
            <span class="radio-icon"></span>
          </label>
          <input type="radio" id="yes" name="role" value="yes" v-model="relocate">
          <label class="radioRow" for="yes">
            <span>Yes</span>
            <span class="radio-icon"></span>
          </label>
        </div>
      </form>
    </block>
    <block margin="1">
      How should we contact you?
    </block>
    <block margin="4">
      <input type="text" v-model="contact" placeholder="whatsapp me: +47 906 41 280"/>
    </block>
    <block margin="4">
      <input-button @click="submit()">Submit </input-button>
    </block>
  </main>
</template>
<script lang="ts" setup>
  definePageMeta({
    pagename: 'Apply'
  })
  
  useSeoMeta({
    title: 'Apply',
    ogTitle: 'Kalt - Apply',
    description: 'Real assets, real impact.',
    ogDescription: 'Real assets, real impact.',
    ogImage: 'https://ka.lt/images/meta-jobs.png'
  })

  const supabase = useSupabaseClient()

  const role = ref('');
  const relevantProject = ref('');
  const bio = ref('');
  const relocate = ref('');
  const living = ref('');
  const contact = ref('');

  const submit = async () => {
    const error = await pub(supabase, {
      sender:'pages/jobs/apply.vue'
    }).jobApplications({
      role: role.value,
      relevantProject: relevantProject.value,
      bio: bio.value,
      relocate: relocate.value,
      living: living.value,
      contact: contact.value
    });
    if(!error) navigateTo('/jobs/success')
  };
</script>
<style scoped lang="scss">
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
.textAreaCounter{
  text-align:right;
}
.yesno{
  display:grid;
  grid-template-columns: 1fr 1fr;
  gap:sizer(1);
}
</style>