
<script lang="ts">
export default {
  props: ['label', 'value'],
  created() {
    // props are exposed on `this`
    console.log(this.foo)
  }
}
</script>

<template>
    <div class="switch-wrap">
        <label class="switch">
            <input type="checkbox" :id="value" :name="value" checked />
            <span class="slider round"></span>
        </label>
        <label :for="value">
            {{label}}
        </label>
    </div>
</template>
