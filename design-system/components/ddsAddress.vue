<template>
  <div class="name">
    <div class="col-3 gutter-right">
    <dds-country-select
      uid="country"
      label="Country:"
    :selected="props.data.country"
      v-model="props.data.country"
    />
      </div>
    <div class="col-3 gutter-horizontal">
    <dds-text-input
      uid="city"
      placeholder="City"
      label="City:"
      v-model="props.data.city"
    />
    </div>
    <div class="col-3 gutter-left">
      <dds-number-input
        uid="postal-code"
        placeholder="Postal code"
        label="Postal code:"
        v-model="props.data.postal_code"
      />
    </div>
    <div>
    <dds-text-input
      uid="address-line"
      placeholder="Address line"
      label="Address line:"
      v-model="props.data.address_line"
    />
      </div>
  </div>
</template>

<script lang="ts" setup>
// You can move this to general interface and reuse them if its same accross the app
const props = defineProps<{
  data: {
    country: string;
    city: string;
    address_line: string;
    postal_code: number;
  };
}>();
</script>
