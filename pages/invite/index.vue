<template>
  <main>
    <block>
      <div class="wrapper">
        <div class="column" @click="navigateTo('/invest/once')">
          <div class="text">
            <div class="title">One time investment</div>
            <div class="explainer"> Invest a single amount in your personalized fund. Useful when sending larger amounts.
            </div>
          </div>
          <div class="link"> Start -> </div>
        </div>
        <div class="column" @click="navigateTo('/invest/auto')">
          <div class="text">
            <div class="title">Automatic investments</div>
            <div class="explainer">Set up a daily, weekly, or monthly recurring investment. Useful for building a strong
              long-term portfolio. </div>
          </div>
          <div class="link"> Start -> </div>
        </div>
      </div>
    </block>
  </main>
</template>
<script lang="ts" setup>
  definePageMeta({
    pagename: 'Invest',
    middleware: 'auth'
  })
  useSeoMeta({
    title: 'Invest',
    ogTitle: 'Kalt - Invest',
    description: 'Real assets, real impact.',
    ogDescription: 'Real assets, real impact.',
    ogImage: 'https://ka.lt/images/meta.png'
  })

</script>
<style scoped lang="scss">
  .wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: sizer(1);

    .column {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      @include border;
      @include hoverable;
      padding: sizer(1) sizer(1.5);
      height: sizer(20);
      text-align: left;

      .title {
        margin-bottom: sizer(1);
        font-weight: 600;
      }

      .link {
        text-align: right;
      }

      &:hover {
        @include hovering;
      }
    }
  }
</style>