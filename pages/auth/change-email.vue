
<template>
  <div class="PageWrapper">
    <navbar :pageTitle="pagename" />
    <div class='page'>
      <div class="section">
        <div class="block">
          <h2 class="title">
            We'll be in touch! <omoji emoji="😃" /> <omoji emoji="☀️" />
          </h2>
          <form @submit.prevent="changeEmail">
            <div class="element input email">
              <label for='email'> New e-mail:</label>
              <input
                type="email"
                placeholder="Email"
                v-model="email"
                id='email'
              />
            </div>
            <button type="submit" class="atom">
              Change email adress to {{email}} <omoji emoji="😮" />
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const pagename = 'Sign in';
  const title = 'Kalt — ' + pagename;
  const description = ref('My App Description')

  const user = useSupabaseUser()
  const supabase = useSupabaseClient()
  const router = useRouter()

  const email = ref('')
  email.value = user.value.email
  useHead({
    title,
    meta: [
      {
        name: "description",
        content: description,
      },
    ],
  });

  const changeEmail = async () => {
    const { data, error } = await supabase.auth.admin.updateUserById(
      user.value.id,
        { 
          email: email.value
        }
      )

    if (error) console.log(error)

    if (data) console.log(user)
  }
</script>