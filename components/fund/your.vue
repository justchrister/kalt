<template>
  <div class="fund">
    <div class="icon">
      <span id="art">
      </span>
    </div>
    <div class="name">
      Venture capital fund
    </div>
    <div class="amount" @click="adjustAmount()">
      <span :class="{ active: amount >= 1}"></span>
      <span :class="{ active: amount >= 2}"></span>
      <span :class="{ active: amount >= 3}"></span>
    </div>
  </div>
  <button>
    done
  </button>
</template>
<script setup lang="ts">
  const props = defineProps({
    ticker: {
      type: String,
      required: 
    }
  })
  const amount = ref(0)
  const adjustAmount = (fund) => {
    if(amount.value===3){
      amount.value = 0
    } else {
      amount.value =+ 1
    }
  }
</script>
<style scoped lang="scss">
  
</style>