
<script lang="ts">
export default {
  props: ['label', 'value', 'min', 'max'],
}
</script>

<template>
    <div class="number-wrap">
        <label :for="value">{{label}}</label>
        <input :id="value" type="number" :min="min" :max="max" :v-model="value"/>
        <select name="cars" id="cars" form="carform">
            <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
            <option value="opel">Opel</option>
            <option value="audi">Audi</option>
        </select>
    </div>
</template>