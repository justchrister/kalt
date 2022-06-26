<template>
    <div class='page'>

      <!--
        Featured section
      -->

      <div class="section">
        <div class="body">
          <p>
            We operate with transparency and openness, therefore we've made our entire feature and product roadmap available here.
          </p>
        </div>
      </div>

      <div class="section completed" id="completed">
        <div class="block">
            <h2 class="title">
                Completed.
            </h2>
            <nav>
                <ul>
                    <Milestone v-for="milestone in milestones" :key="milestone.fields.title" :title="milestone.fields.title" :category="milestone.fields.category" :stage="milestone.fields.stage"/>
                    <li class="document"> Visual profile </li>
                </ul>
          </nav>
        </div>
      </div>
      <div class="section in-progress" id="in-progress">
        <div class="block">
            <h2 class="title">
                In progress.
            </h2>
            <nav>
                <ul>
                    <Milestone v-for="milestone in milestones" :key="milestone.fields.title" :title="milestone.fields.title" :category="milestone.fields.category" :stage="milestone.fields.stage"/>
                </ul>
          </nav>
        </div>
      </div>
      <div class="section to-do">
        <div class="block">
            <h2 class="title">
                To do.
            </h2>
            <nav>
                <ul>
                    <Milestone v-for="milestone in milestones" :key="milestone.fields.title" :title="milestone.fields.title" :category="milestone.fields.category" :stage="milestone.fields.stage"/>
                </ul>
          </nav>
        </div>
      </div>
      <div class="section ideas">
        <div class="block">
            <h2 class="title">
                Ideas.
            </h2>
            <nav>
                <ul>
                    <Milestone v-for="milestone in milestones" :key="milestone.fields.title" :title="milestone.fields.title" :category="milestone.fields.category" :stage="milestone.fields.stage"/>
                </ul>
          </nav>
        </div>
      </div>
    </div>
</template>

<script>
const axios = require('axios');
import milestone from '../components/milestone.vue';
export default {
    data: () => ({
        milestones: []
    }),
    async fetch(){
        const space = "xdtovtw3dsvp";
        const token = "rZP5wX9KmtkpApVSxPK_e9mnYImLR7wi7MbepyyFxgw";
        const content = "roadmap"; // content type
        const config = {
            headers: {
                'Accept': 'application/json'
            }
        };

        try {
            const res = await axios.get('https://cdn.contentful.com/spaces/' + space + '/environments/master/entries/?access_token=' + token + '&content_type=' + content, config);
            this.milestones = res.data.items;
            console.log(res.data.items);
        } catch(err) {
            console.log(err);
        }
    },
    fetchOnServer: true,
    head() {
        return{
            title: 'Kalt — Roadmap',
            meta: [{
                hid: 'description',
                name: 'description',
                content: 'Our roadmap'
            }]
        }
    },
}
</script>

<style>
    .section .block ul{
        margin-left:0;
    }
    .section .block ul li{
        display: none;
        font-family: "Kalt Monospace", "Courier New", Monospace;
        font-size:60%;
        border:1px rgba(0,0,0,0.5) solid;
        padding: 0 clamp(14px, 3.6vw, 26px) 0 clamp(25px, 6.48vw, 50px);
        background-repeat: no-repeat;
        background-position: clamp(7px, 1.8vw, 13px) center;
        background-size: auto 50% ;
        margin-right:10px;
    }
    .section#in-progress .block ul li.to.do,
    .section#in-progress .block ul li.to-do,
    .section#in-progress .block ul li.in.progress,
    .section#in-progress .block ul li.in-progress,
    .section#completed .block ul li.completed,
    .section#completed .block ul li.Completed{
        display:inline-block;
    }
    .section .block ul li.document,
    .section .block ul li.Document{
        background-image:url('../static/doc.png');
    }
    .section .block ul li.concept,
    .section .block ul li.Concept{
        background-image:url('../static/concept.png');
    }
    .section .block ul li.feature,
    .section .block ul li.Feature{
        background-image:url('../static/feature.png');
    }
    .section .block ul li.product,
    .section .block ul li.Product{
        background-image:url('../static/product.png');
    }
    .section .block ul li:before{
        display: none;
        content:'';
    }
    .section .block ul > li {
        margin-bottom: clamp(3px, 0.7vw, 7px);
    }
</style>


