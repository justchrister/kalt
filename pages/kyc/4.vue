<template>
  <main @dragover.prevent="dragOver()" :class="draggingOver">
    <block margin="2">
      <progress-bar :percentage="percentage+'%'" />
    </block>
    <block margin="2">
      <p>To check that you live where you say you live, please upload your lease, a utility bill or other document that proves you live at {{ user.addressLine1 }}:</p>
    </block>
    <block margin="2">
      <div 
        :class="'dropZone '+uploadState" 
        @dragover.prevent="dragOver()" 
        @drop.prevent="handleDrop"
        :style="`background-image: url('${imagePreview}')`"
        >
        <input
          type="file" 
          @change="upload($event.target.files[0])"
          ref="fileInput"
          class="fileInput">
        <span v-if="!uploadState">drag and drop or click to upload</span>
        <span v-if="uploadState==='success'">{{fileUploaded}}</span>
        <span v-if="uploadState==='loading'"><loading-icon /> Uploading...</span>
      </div>
    </block>
    <block>
      <input-button link="/kyc/5" v-if="accepted">next -> </input-button>
    </block>
      
  </main>
</template>
<script lang="ts" setup>
  definePageMeta({
    pagename: 'Proof of address',
    middleware: 'auth'
  })
  useHead({
    title: 'Proof of address',
    meta: [{
      name: 'description',
      content: 'Invest in the future, today.'
    }]
  })
  const supabase = useSupabaseClient()
  const auth = useSupabaseUser()
  const user = await get(supabase).user(auth.value) as user;
  const percentage = ref(55)
  const accepted = ref(false)
  const uploadState = ref('')

  const fileInput = ref(null)
  const dragOver = () => { return }
  const handleDrop = (event) => {
    const file = event.dataTransfer.files[0]
    ok.log('', event)
    upload(file)
  }

  const imagePreview = ref(null);
  const fileUploaded = ref(null);
  
  const upload = async (file: file) => {
    if(user.id === undefined) return;
    uploadState.value = 'loading'
    ok.log('', 'Starting upload to: userIdentification/'+user.id)
    if (file && file.type.startsWith('image/')) {
      console.log(file)
      imagePreview.value = URL.createObjectURL(file);
    } else {
      fileUploaded.value = file.name
    }

    const { error } = await supabase.storage.from('proofOfAddress').upload(user.id+'/'+file.name, file, {upsert: true})
    if (error) {
      ok.log('error', 'Failed to upload to: proofOfAddress/'+user.id+': '+error.statusCode+' '+error.message)
    } else {
      uploadState.value = 'success'
      percentage.value = 75;
      accepted.value = true;
    }
  }
</script>
<style scoped lang="scss">
  .dropZone {
    padding: sizer(7) 0;
    line-height: sizer(2);
    text-align: center;
    position:relative;
    cursor: pointer;
    @include border;
    border-style: dashed;
    border-width: sizer(0.1);
    @include hoverable;
    background-size:contain; 
    background-repeat: no-repeat;
    background-position: center;
    &:hover {
      border-style:solid;
      @include hovering;
    }
    &:hover,
    &.loading{
      background-image:none !important;
    }
  }

  .fileInput {
    opacity: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    cursor: pointer;
    left: 0;
    top: 0;
  }
  ul li{
    display:inline; 
  }
  
</style>