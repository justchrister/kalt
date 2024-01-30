<template>
  <div class="update" @click="navigateTo('/update/'+id)">
    <div class="icon" :id="props.category"></div>
    <div class="content">
      <h3>{{props.title}}</h3>
      <p>{{props.ingress}}</p>
    </div>
    <div class="date">
      {{ props.date }}
    </div>
  </div>
</template>
<script setup lang="ts">
  const props = defineProps({
    id: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    ingress: {
      type: String,
      required: true
    },
    date: {
      type: String,
      required: true
    }
  })
</script>
<style scoped lang="scss">
  .update{
    display:grid;
    grid-template-columns: sizer(5) 4fr 1fr;
    padding: sizer(1);
    gap: sizer(1);
    max-height:sizer(5);
    @include hoverable;
    @include border;
  }
  .update:hover{
    @include hovering;
    cursor:pointer;
  }
  .icon{
    border-radius:$border-radius;
    max-height:sizer(5);
    background-color:dark(100%);
    &#performance{
      background-color:green(100%);
    }
    &#majorEvent{
      background-color:blue(100%);
    }
    &.animated{
      &#performance{
        background: linear-gradient(225deg, green(20%), green(40%), green(100%), green(2%));
        background-size: 800% 800%;
        animation: performanceAnimation 15s ease infinite;
      }
      &#majorEvent{
        background: linear-gradient(225deg, blue(20%), blue(40%), blue(100%), blue(2%));
        background-size: 800% 800%;
        animation: majorEventAnimation 15s ease infinite;
      }

    }
  }
  .content h3{
    font-weight:600;
    font-size:sizer(1.2);
  }
  .content p{
    font-size:sizer(1);
  }
  .date{
    text-align:right;
    color:dark(50%);
    font-size:sizer(1);
  }





  @keyframes performanceAnimation {
    0%{background-position:0% 50%}
    50%{background-position:100% 50%}
    100%{background-position:0% 50%}
  }
  @keyframes majorEventAnimation {
    0%{background-position:0% 50%}
    50%{background-position:100% 50%}
    100%{background-position:0% 50%}
  }
</style>