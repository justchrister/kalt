<template>
  <div class="input-wrap">
    <label :for="props.id"> 
      {{ data[props.id].label }}
    </label>
    <input
      type="text"
      v-model="content"
      v-maska
      :data-maska="data[props.id].dataMask"
      :placeholder="data[props.id].placeholder"
      :id="props.id"
      :class="state"
      @input="updateAccount()"
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
      required: true
    }
  })

  const state = ref('loading')
  const supabase = useSupabaseClient()
  const auth = useSupabaseUser()
  const user = await get(supabase).user(auth.value) as user;
  const content = ref(props.initial || null)
  state.value = ''
  const updateAccount = async () => {
    state.value = 'loading'
    const error = await pub(supabase, {
      id: user.id, 
      sender:'components/input/account.vue'
    }).users({
      [props.id]: content.value
    });
    if(error){
      state.value="error"
    } else {
      state.value="success"
    }
  };
  const data = {
    referenceText: {
      label: "Reference text:",
      placeholder: "My best investment ever",
      dataMask: "*********************************************************************************************************"
    },
    iban: {
      label: "IBAN: ",
      placeholder: "IT68 D030 0203 2800 0420 0162 854",
      dataMask: "@@## **** **** **** **** **** **** **** **** **** **** ****"
    },
    city: {
      label: "Bank code (BIC/SWIFT)",
      placeholder: "KALT NO 11 234",
      dataMask: "@@@@ @@ ** ***"
    }
  }
</script>
