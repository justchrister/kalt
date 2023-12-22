<template>
  <div class="container">
    <navbar-top />
    <slot />
    <navbar-bottom />
  </div>
</template>
<script setup lang="ts">
useHead({
  link: [
    {
      rel: 'preload',
      as: 'image',
      href: '/images/gradients/successAlt.svg',
    },
    {
      rel: 'preload',
      as: 'image',
      href: '/images/shards/shard-top-left.svg',
    },
    {
      rel: 'preload',
      as: 'image',
      href: '/images/shards/shard-top-center-left.svg',
    },
    {
      rel: 'preload',
      as: 'image',
      href: '/images/shards/shard-top-center-right.svg',
    },
    {
      rel: 'preload',
      as: 'image',
      href: '/images/shards/shard-top-right.svg',
    },
    {
      rel: 'preload',
      as: 'image',
      href: '/images/shards/shard-bottom-right.svg',
    },
    {
      rel: 'preload',
      as: 'image',
      href: '/images/shards/shard-bottom-center-right.svg',
    },
    {
      rel: 'preload',
      as: 'image',
      href: '/images/shards/shard-bottom-center-left.svg',
    },
    {
      rel: 'preload',
      as: 'image',
      href: '/images/shards/shard-bottom-left.svg',
    }
  ]
})
</script>