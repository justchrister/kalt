<template>
  <main @dragover.prevent="dragOver()" :class="draggingOver">
    <block margin="2">
      <progress-bar :percentage="percentage+'%'" />
    </block>
    <block margin="2">
      <p>To verify that you are you we need a selfie of you holding your drivers licence, id card, or passport:</p>
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
        <span v-if="uploadState==='success'">drag and drop or click to replace</span>
        <span v-if="uploadState==='loading'"><loading-icon /> Uploading...</span>
      </div>
    </block>
    <block margin="2">
      <ul class="requirements" v-if="uploadState">
        <li :class="selfieState">
          Is a selfie
          <loading-icon v-if="selfieState==='loading'"/>
          <omoji emoji="✔️" v-if="selfieState==='accepted'"/>
        </li>
        <li :class="containsIdState">
          Contains photo id
          <loading-icon v-if="containsIdState==='loading'"/>
          <omoji emoji="✔️" v-if="containsIdState==='accepted'"/>
        </li>
        <li :class="containsFaceState">
          Contains your face
          <loading-icon v-if="containsFaceState==='loading'"/>
          <omoji emoji="✔️" v-if="containsFaceState==='accepted'"/>
        </li>
      </ul>
    </block>
    <block>
      
      <input-button link="/kyc/4" v-if="accepted">next -> </input-button>
    </block>
      
  </main>
</template>
<script lang="ts" setup>
  definePageMeta({
    pagename: 'Photo id',
    middleware: 'auth'
  })
  useSeoMeta({
    title: 'KYC',
    ogTitle: 'Kalt - KYC',
    description: 'Real assets, real impact.',
    ogDescription: 'Real assets, real impact.',
    ogImage: 'https://ka.lt/images/meta.png'
  })
  const supabase = useSupabaseClient()
  const auth = useSupabaseUser()
  const user = await get(supabase).user(auth.value) as user;
  const percentage = ref(45)
  const accepted = ref(false)
  const uploadState = ref('')

  const selfieState = ref('')
  const containsIdState = ref('')
  const containsFaceState = ref('')

  const fileInput = ref(null)
  const dragOver = () => { return }
  const handleDrop = (event) => {
    const file = event.dataTransfer.files[0]
    ok.log('', event)
    upload(file)
  }

  const imagePreview = ref(null);
  const verifyImage = async () => {
    if(user.id === undefined) return;
    selfieState.value = 'loading'
    await ok.sleep(250)
    selfieState.value = 'accepted'
    containsIdState.value = 'loading'
    await ok.sleep(250)
    containsIdState.value = 'accepted'
    containsFaceState.value = 'loading'
    await ok.sleep(250)
    containsFaceState.value = 'accepted'
    accepted.value = true;
  }

  const upload = async (file: file) => {
    if(user.id === undefined) return;
    uploadState.value = 'loading'
    ok.log('', 'Starting upload to: userIdentification/'+user.id)
    if (file && file.type.startsWith('image/')) {
      console.log(file)
      imagePreview.value = URL.createObjectURL(file);
    }
    verifyImage(file)

    const { error } = await supabase.storage.from('userIdentification').upload(user.id+'/'+'selfie.jpg', file, {upsert: true})
    if (error) {
      ok.log('error', 'Failed to upload to: userIdentification/'+user.id+': '+error.statusCode+' '+error.message)
    } else {
      uploadState.value = 'success'
      percentage.value = 55;
      ok.log('', percentage.value)
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
    &.success {
      span{
        color:transparent;
      }
      &:hover span{
        color: dark(100%);
      }
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