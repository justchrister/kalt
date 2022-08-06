<template>
  <div class="PageWrapper userpage">
    <Kaltmenu pageTitle="Dashboard" />
    <div class='page'>
      <div class="section">
        <div class="frame">
            <Chart />
        </div>      <h1>Hello, {{ $auth.loggedIn ? $auth.user.username : 'friend' }}!</h1>

        <nav class="legend">
          <ul>
            <li id="deposit">
              Deposits
            </li>
            <li id="dividends">
              Dividends
            </li>
          </ul>
        </nav>
        <div class="block">
          <button> Invest more </button>
        </div>
        <div class="block" v-if="$auth.loggedIn">
          <Transactions />
        </div>
        <div class="block" style="text-align: center;" v-if="$auth.loggedIn">
          <button> Invest more </button>
          <a href="withdraw"> Withdraw </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  head() {
    return{
      title: 'Kalt — Dashboard',
      meta: [{
          hid: 'description',
          name: 'description',
          content: 'Best app ever'
      }]
    }
  },
}

</script>

<style scoped>
</style>


