
<script lang="ts">
export default {
  props: ['label', 'value', 'min', 'max'],
  created() {
    // props are exposed on `this`
    console.log(this.foo)
  }
}
</script>

<template>
    <div class="number-wrap">
        <label :for="value">{{label}}</label>
        <input :id="value" type="number" :min="min" :max="max" :v-model="value"/>
    </div>
</template>
