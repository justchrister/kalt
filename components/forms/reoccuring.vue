<script lang="ts">
    const day = ref('15')
    const amount = ref('15')
    const days = ref(30);
</script>
<template>
<div>
        <p> Reoccuring investment <a href="">?</a></p>
        <p> Which day to auto-invest?</p>
        <div>
            <input id="one" type="radio" value="1" v-model="days" name="days"/>
            <label for="one">1</label>
            
            <input id="two" type="radio" value="2" v-model="days" name="days"/>
            <label for="two">2</label>
            <input id="three" type="radio" value="3" v-model="days" name="days"/>
            <label for="three">3</label>
            <input id="four" type="radio" value="4" v-model="days" name="days"/>
            <label for="four">4</label>
            <input id="five" type="radio" value="5" v-model="days" name="days"/>
            <label for="five">5</label>
            <input id="six" type="radio" value="6" v-model="days" name="days"/>
            <label for="six">6</label>
                <input id="seven" type="radio" value="7" v-model="days" name="days"/>
            <label for="seven">7</label>
                <input id="eight" type="radio" value="8" v-model="days" name="days" />
            <label for="eight">8</label>
                <input id="nine" type="radio" value="9" v-model="days" name="days" />
            <label for="nine">9</label>
            <input id="ten" type="radio" value="10" v-model="days" name="days" />

            <label for="ten">10</label>
            <input id="eleven" type="radio" value="11" v-model="days" name="days" />

            <label for="eleven">11</label>
            <input id="twelve" type="radio" value="12" v-model="days" name="days" />

            <label for="twelve">12</label>
            <input id="thirteen" type="radio" value="13" v-model="days" name="days" />

            <label for="thirteen">13</label>
            <input id="fourteen" type="radio" value="14" v-model="days" name="days" />

            <label for="fourteen">14</label>
            <input id="fifteen" type="radio" value="15" v-model="days" name="days" />

            <label for="fifteen">15</label>
            <input id="sixteen" type="radio" value="16" v-model="days" name="days" />

            <label for="sixteen">16</label>
            <input id="seventeen" type="radio" value="17" v-model="days" name="days" />

            <label for="seventeen">17</label>
            <input id="eighteen" type="radio" value="18" v-model="days" name="days" />

            <label for="eighteen">18</label>
            <input id="nineteen" type="radio" value="19" v-model="days" name="days" />

            <label for="nineteen">19</label>

            <input id="twenty" type="radio" value="20" v-model="days" name="days" />
            <label for="twenty">20</label>

            <input id="twentyone" type="radio" value="21" v-model="days" name="days" />
            <label for="twentyone">21</label>

            <input id="twentytwo" type="radio" value="22" v-model="days" name="days" />
            <label for="twentytwo">22</label>

            <input id="twentythree" type="radio" value="23" v-model="days" name="days" />
            <label for="twentythree">23</label>

            <input id="twentyfour" type="radio" value="24" v-model="days" name="days" />
            <label for="twentyfour">24</label>

            <input id="twentyfive" type="radio" value="25" v-model="days" name="days" />
            <label for="twentyfive">25</label>

            <input id="twentysix" type="radio" value="26" v-model="days" name="days" />
            <label for="twentysix">26</label>

            <input id="twentyseven" type="radio" value="27" v-model="days" name="days" />
            <label for="twentyseven">27</label>

            <input id="twentyeight" type="radio" value="28" v-model="days" name="days" />
            <label for="twentyeight">28</label>

            <input id="twentynine" type="radio" value="29" v-model="days" name="days" />
            <label for="twentynine">29</label>

            <input id="thirty" type="radio" value="30" v-model="days" name="days" />
            <label for="thirty">30</label>

            <input id="thirtyone" type="radio" value="31" v-model="days" name="days" />
            <label for="thirtyone">31</label>
            
        </div>
    </div>
</template>
<style scoped>
    label{
        display:inline-block;
        margin:5px;
        width:8%;
        text-align:center;

    }
    label:hover{
        background:blue;
    }
    input[type="radio"] {
    display: none;
    }      

    input[type="radio"]:checked+label {
    background-color: #76cf9f;
    }
</style>