
<template>
    <div class="transactions_component">
      <p> <strong> Transactions {{ transactionData}} </strong> </p>
      <table>
        <tr>
          <th>Amount</th>
          <th>Account</th>
          <th>Date</th>
        </tr>
        <Transaction v-for="transaction in transactionData.transactions" :key="transaction.id" :amount="transaction.amount" :account="transaction.account" :date="transaction.date" />
      </table>
    </div>
</template>

<script>
const axios = require('axios');

export default{
    name: 'Transactions',

    data: () => ({
        transactionData: []
    }),
    async fetch(){
        let uri = 'http://localhost:9000/getTransactions?id=' + this.$auth.user.sub;
        try {
            const res = await axios.get(uri);
            this.transactionData = res.data
            console.log(res.data)
        } catch(err) {
            console.log(err);
        }
    },
    fetchOnServer: true,
}
</script>
<style>
</style>