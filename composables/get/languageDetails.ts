export const getLanguageDetails = async (client, iso) => {
  const { data, error } = await client
    .from('sys_languages')
    .select()
    .eq('available', true)
    .eq('iso', iso || 'ENG')
    .limit(1)
    .single()
  if(error) {
    return {
      iso: 'ENG',
      name: 'English'
    }
  } else {
    return data
  }
};