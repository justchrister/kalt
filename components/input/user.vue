<template>
  <div class="input-wrap">
    <label :for="props.id"> 
      {{ data[props.id].label }}
    </label>
    <input
      type="text"
      v-model="content"
      :placeholder="data[props.id].placeholder"
      :id="props.id"
      :class="state"
      @input="updateProfile()"
    />
  </div>
</template>

<script setup lang="ts">
  const props = defineProps({
    initial: {
      type: String,
      required: false
    },
    id: {
      type: String,
      required: false
    }
  })

  const state = ref('loading')
  const supabase = useSupabaseClient()
  const auth = useSupabaseUser()
  const content = ref(props.initial || null)
  state.value = ''
  const updateProfile = async () => {
    state.value = 'loading'
    const error = await pub(supabase, {
      entity: auth.value.id, 
      sender:'components/input/user.vue'
    }).users({
      userId: auth.value.id,
      [props.id]: content.value
    });
    if(error){
      state.value="error"
    } else {
      state.value="success"
    }
  };
  const data = {
    firstName: {
      label: "First name",
      placeholder: "John"
    },
    lastName: {
      label: "Last name",
      placeholder: "Doe"
    },
    city: {
      label: "City",
      placeholder: "Oslo"
    },
    postalCode: {
      label: "Postal code",
      placeholder: "0254"
    },
    addressLine1: {
      label: "Address line 1",
      placeholder: "Karl Johans gate 1"
    }
  }
</script>
