<template>
  <div :class="{ 'update': true, 'unread': !props.read }" @click="navigateTo('/update/' + id)">
    <div :class="{ 'icon': true, 'animated': !props.read }" :id="props.category">
    </div>
    <div class="content">
      <h3>{{ props.title }}</h3>
      <p>{{ props.ingress }}</p>
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
  },
  read: {
    type: String,
    required: false,
    default: true
  }
})
</script>
<style scoped lang="scss">
  .update {
    display: grid;
    grid-template-columns: sizer(5) 4fr 1fr;
    padding: sizer(1);
    gap: sizer(1);
    @include hoverable;
    @include border;
  }

  .update:hover {
    @include hovering;
    cursor: pointer;
  }

  .icon {
    position:relative;
    border-radius: $border-radius;
    height: sizer(5);
    width: sizer(5);
    background-color: dark(100%);

    &#performance {
      background-color: green(100%);
    }

    &#major {
      background-color: red(100%);
    }
    &#general {
      background-color: blue(100%);
    }

    &#kyc {
      background-color: primary(100%);
    }
  }
  .icon.animated {
    &#performance {
      background: linear-gradient(225deg, green(20%), green(40%), green(100%), green(2%));
      background-size: 800% 800%;
      animation: performanceAnimation 15s ease infinite;
    }

    &#general {
      background: linear-gradient(225deg, blue(20%), blue(40%), blue(100%), blue(2%));
      background-size: 800% 800%;
      animation: majorAnimation 15s ease infinite;
    }

    &#major {
      background: linear-gradient(225deg, red(20%), red(40%), red(100%), red(2%));
      background-size: 800% 800%;
      animation: majorAnimation 15s ease infinite;
    }
    &#kyc {
      background: linear-gradient(225deg, primary(20%), primary(40%), primary(100%), primary(2%));
      background-size: 800% 800%;
      animation: kycAnimation 15s ease infinite;
    }
  }
  .icon:before{
    position:absolute;
    content:"";
    display:block;
    top:sizer(1.5);
    left:sizer(0);
    height:sizer(2);
    width:sizer(5);
    background-size:contain;
    background-position:center; 
    background-repeat:no-repeat;
  }
  .icon#performance:before{
      background-image: url('/icons/updates/performance.svg');
    }
  .icon#major:before{
    background-image: url('/icons/updates/major.svg');
  }
  .icon#general:before{
    background-image: url('/icons/updates/general.svg');
  }
  .icon#kyc:before{
    background-image: url('/icons/updates/kyc.svg');
  }
  .content{
    max-height: sizer(5);
    overflow:hidden;
  }
  .content h3 {
    font-weight: 600;
    font-size: sizer(1.2);
  }

  .content p {
    font-size: sizer(1);
  }

  .date {
    text-align: right;
    color: dark(70%);
    font-size: sizer(1);
  }

  @keyframes performanceAnimation {
    0% {
      background-position: 0% 50%
    }

    50% {
      background-position: 100% 50%
    }

    100% {
      background-position: 0% 50%
    }
  }

  @keyframes majorAnimation {
    0% {
      background-position: 0% 50%
    }

    50% {
      background-position: 100% 50%
    }

    100% {
      background-position: 0% 50%
    }
  }

@keyframes generalAnimation {
  0% {
    background-position: 0% 50%
  }

  50% {
    background-position: 100% 50%
  }

  100% {
    background-position: 0% 50%
  }
}

@keyframes kycAnimation {
  0% {
    background-position: 0% 50%
  }

  50% {
    background-position: 100% 50%
  }

  100% {
    background-position: 0% 50%
  }
}
</style>