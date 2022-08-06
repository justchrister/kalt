<template>
    <div class="PageWrapper userpage">
    <Kaltmenu pageTitle="Deposit" />
        <div class='page'>
            <div class="section">
                <div class="block">
                    <form>
                        <label>Deposit amount</label>
                        <input type="number">
                        <input type="radio" name="paymentOption" value="card">
                        <label for="card">Card</label>
                        <input type="radio" name="paymentOption" value="Transfer">
                        <label for="Transfer">Transfer</label>
                        <input type="radio" name="paymentOption" value="Crypto">
                        <label for="Crypto">Crypto</label>
                        <button> Start deposit </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
  head() {
    return{
      title: 'Kalt — Deposit',
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


