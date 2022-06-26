<template>
    <li :class="[category, stage]"> {{ title }} </li>
</template>

<script>
export default{
    name: 'milestone',
    props: ['category', 'title', 'stage']
}
</script>
<style>
</style>