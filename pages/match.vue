<template>
    <div>
        <h1> success </h1>
    </div>
</template>
<script setup lang="ts">
// This is your test secret API key.

    const supabase = useSupabaseClient()
    const user = useSupabaseUser()

    const getOrder = async (type) => {
        const { data, error } = await supabase
            .from('exchange')
            .select('order_id')
            .is('fulfilled_by_order_id', null)
            .eq('order_type', type)
            .eq('quantity', 1)
            .order('created_at', { ascending: true })
        return data[0].order_id
    }

    const updateOrder = async (order, fulfiller) => {
        const { error } = await supabase
            .from('exchange')
            .update({ fulfilled_by_order_id: fulfiller })
            .eq('order_id', order)
    }

    let sell_id = await getOrder(0)
    let buy_id  = await getOrder(1)
    await updateOrder(sell_id, buy_id)
    await updateOrder(buy_id, sell_id)
</script>
