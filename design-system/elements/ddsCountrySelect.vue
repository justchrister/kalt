<template>
  <div :class="'dds-currencySelect '+uid">
    <dds-label :label="props.label" />
    <dds-select
      :id="props.uid"
      :choices="choices"
      :selected="selected"
      v-model="props.modelValue"
      @input="emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<script lang="ts" setup>
import { createClient } from '@supabase/supabase-js'
// Create a single supabase client for interacting with your database
const runtimeConfig = useRuntimeConfig()
const supabase = createClient(runtimeConfig.supabaseUrl, runtimeConfig.supabaseSecret)

const props = defineProps<{
  modelValue: string;
  uid: string;
  selected: string;
  label: string;
}>();
//fallback array
let choices = ['Norway', 'Sweden', 'Germany'];
// get available currencies
const {data: countries, error} = await supabase.from('countries').select().eq('available',true);
let emit = defineEmits(['update:modelValue']);
// update the 
if (countries) choices = countries.map(country => country.name); 
</script>
