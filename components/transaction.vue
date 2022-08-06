<template>
    <tr>
        <td>{{ amount }}</td>
        <td>{{ account }}</td>
        <td>{{ date }}</td>
    </tr>
</template>

<script>
export default{
    name: 'Transaction',
    props: ['amount', 'account', 'date'],
}
</script>
<style>
</style>