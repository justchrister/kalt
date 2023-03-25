
<template>
  <div>
    <form class="component calendar"  @change="updateSubscription()">
      <input type="checkbox" id="day1" name="day1" v-model="days" value="1">
      <label for="day1"> 1st </label>
      <input type="checkbox" id="day2" name="day2" v-model="days" value="2">
      <label for="day2"> 2nd </label>
      <input type="checkbox" id="day3" name="day3" v-model="days" value="3">
      <label for="day3"> 3rd </label>
      <input type="checkbox" id="day4" name="day4" v-model="days" value="4">
      <label for="day4"> 4th </label>
      <input type="checkbox" id="day5" name="day5" v-model="days" value="5">
      <label for="day5"> 5th </label>
      <input type="checkbox" id="day6" name="day6" v-model="days" value="6">
      <label for="day6"> 6th </label>
      <input type="checkbox" id="day7" name="day7" v-model="days" value="7">
      <label for="day7"> 7th </label>
      <input type="checkbox" id="day8" name="day8" v-model="days" value="8">
      <label for="day8"> 8th </label>
      <input type="checkbox" id="day9" name="day9" v-model="days" value="9">
      <label for="day9"> 9th </label>
      <input type="checkbox" id="day10" name="day10" v-model="days" value="10">
      <label for="day10"> 10th </label>
      <input type="checkbox" id="day11" name="day11" v-model="days" value="11">
      <label for="day11"> 11th </label>
      <input type="checkbox" id="day12" name="day12" v-model="days" value="12">
      <label for="day12"> 12th </label>
      <input type="checkbox" id="day13" name="day13" v-model="days" value="13">
      <label for="day13"> 13th </label>
      <input type="checkbox" id="day14" name="day14" v-model="days" value="14">
      <label for="day14"> 14th </label>
      <input type="checkbox" id="day15" name="day15" v-model="days" value="15">
      <label for="day15"> 15th </label>
      <input type="checkbox" id="day16" name="day16" v-model="days" value="16">
      <label for="day16"> 16th </label>
      <input type="checkbox" id="day17" name="day17" v-model="days" value="17">
      <label for="day17"> 17th </label>
      <input type="checkbox" id="day18" name="day18" v-model="days" value="18">
      <label for="day18"> 18th </label>
      <input type="checkbox" id="day19" name="day19" v-model="days" value="19">
      <label for="day19"> 19th </label>
      <input type="checkbox" id="day20" name="day20" v-model="days" value="20">
      <label for="day20"> 20th </label>
      <input type="checkbox" id="day21" name="day21" v-model="days" value="21">
      <label for="day21"> 21st </label>
      <input type="checkbox" id="day22" name="day22" v-model="days" value="22">
      <label for="day22"> 22nd </label>
      <input type="checkbox" id="day23" name="day23" v-model="days" value="23">
      <label for="day23"> 23rd </label>
      <input type="checkbox" id="day24" name="day24" v-model="days" value="24">
      <label for="day24"> 24th </label>
      <input type="checkbox" id="day25" name="day25" v-model="days" value="25">
      <label for="day25"> 25th </label>
      <input type="checkbox" id="day26" name="day26" v-model="days" value="26">
      <label for="day26"> 26th </label>
      <input type="checkbox" id="day27" name="day27" v-model="days" value="27">
      <label for="day27"> 27th </label>
      <input type="checkbox" id="day28" name="day28" v-model="days" value="28">
      <label for="day28"> 28th </label>
      <input type="checkbox" id="day29" name="day29" v-model="days" value="29">
      <label for="day29"> 29th </label>
      <input type="checkbox" id="day30" name="day30" v-model="days" value="30">
      <label for="day30"> 30th </label>
      <input type="checkbox" id="day31" name="day31" v-model="days" value="31">
      <label for="day31"> 31st </label>
    </form>
    <info-box type="warn" text="choosing the 29th, 30th, or 31st will be charged to the last day of the month" v-if="warn"/>
  </div>
</template>

<script setup lang="ts">
  const supabase = useSupabaseClient()
  const props = defineProps({
    uuid: {
      type: String,
      required: true
    },
    days: {
      type: String,
      required: true
    }
  })
  const days = ref([])
  const warn = ref(false)
  const uuid = props.uuid;
  if(props.days) days.value=props.days
  const updateSubscription = async () => {
    if(days.value.includes('29')) warn.value = true
    if(days.value.includes('30')) warn.value = true
    if(days.value.includes('31')) warn.value = true
    const { data, error } = await supabase
      .from('subscriptions')
      .update({
        days: days.value
      })
      .eq('subscription_id', uuid)
      .select()
      .single()
      // for each loop
    oklog("success", "updated subscription: " + data.subscription_id)
  }
</script>
<style scoped lang="scss">
  .component.calendar{
      display: grid;
      grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
      gap: 1% 1%;
      grid-auto-flow: row;
      max-width:$maxsitewidth;
    input{
      display:none;
    }
    label{
      user-select: none;
    }
    label:hover{
      background: white;
      cursor: pointer;
    }
    input[type="checkbox"] + label{
      border: $border;
      display:inline-block;
      border-radius:$border-radius;
      height:clamp($unit-min, $unit, $unit-max);
      line-height:clamp($unit-min, $unit, $unit-max);
      padding:clamp($unit-min, $unit, $unit-max)
              clamp($unit-min, $unit, $unit-max)
              clamp($unit-min * 2, $unit * 2, $unit-max * 2)
              0;
      text-align:right;
      margin: clamp(calc($unit-min/3), calc($unit/3), calc($unit-max/3)) 0;
    }
    input[type="checkbox"]:checked + label {
        text-decoration:underline;
        border-radius:$border-radius;
        background: $green-20;
    }
  }
</style>