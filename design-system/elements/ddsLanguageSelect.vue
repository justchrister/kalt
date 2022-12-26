<template>
  <div :class="'dds-currencySelect '+uid">
    <dds-label :label="props.label" />
    <dds-select
      :id="props.uid"
      :choices="choices"
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
  label: string;
}>();
//fallback array
let choices = ['Norwegian', 'Swedish', 'German'];
// get available currencies
const {data: languages, error} = await supabase.from('languages').select().eq('available',true);
let emit = defineEmits(['update:modelValue']);
// update the 
if (languages) choices = languages.map(language => language.name);
</script>
