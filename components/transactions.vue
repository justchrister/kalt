
<template>
    <div class="transactions_component">
          <p> <strong> Transactions </strong> </p>
          <table>
            <tr>
              <th>Amount</th>
              <th>Account</th>
              <th>Date</th>
            </tr>
            <Transaction v-for="transaction in transactionData" :key="transaction.id" :amount="transaction.amount" :account="transaction.account" :date="transaction.date" />
          </table>
          <!--
          <table>
            <tr>
              <th>Amount</th>
              <th>Account</th>
              <th>Date</th>
            </tr>
            <tr>
              <td>+ 103.44 €</td>
              <td>Account name</td>
              <td>13.02.22</td>
            </tr>
            <tr>
              <td>+ 34.44 €</td>
              <td>Account name</td>
              <td>14.02.22</td>
            </tr>
            <tr>
              <td>+ 103.44 €</td>
              <td>Account name</td>
              <td>13.02.22</td>
            </tr>
            <tr>
              <td>+ 34.44 €</td>
              <td>Account name</td>
              <td>14.02.22</td>
            </tr>
            <tr>
              <td>+ 103.44 €</td>
              <td>Account name</td>
              <td>13.02.22</td>
            </tr>
            <tr>
              <td>+ 34.44 €</td>
              <td>Account name</td>
              <td>14.02.22</td>
            </tr>
            <tr>
              <td>+ 103.44 €</td>
              <td>Account name</td>
              <td>13.02.22</td>
            </tr>
            <tr>
              <td>+ 34.44 €</td>
              <td>Account name</td>
              <td>14.02.22</td>
            </tr>
            <tr>
              <td>+ 103.44 €</td>
              <td>Account name</td>
              <td>13.02.22</td>
            </tr>
            <tr>
              <td>+ 34.44 €</td>
              <td>Account name</td>
              <td>14.02.22</td>
            </tr>
            <tr>
              <td>{{ transactions[1] }} </td>
            </tr>
        </table>
        -->
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
        try {
            const res = await axios.get('http://localhost:9000/getTransactions');
            console.log(res.data[1])
            this.transactionData = res.data[1].transactions
        } catch(err) {
            console.log(err);
        }
    },
    fetchOnServer: true,
}
</script>
<style>
</style>