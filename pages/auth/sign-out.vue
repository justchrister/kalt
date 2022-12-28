<script lang="ts" setup>
  const supabase = useSupabaseClient()
  const { error } = await supabase.auth.signOut()
  navigateTo('/')
</script>