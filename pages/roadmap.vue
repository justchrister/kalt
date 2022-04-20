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

      <div class="section" id="completed">
        <div class="block">
            <h2 class="title">
                Completed.
            </h2>
            <nav>
                <ul>
                    <li class="document"> Visual profile </li>
                </ul>
          </nav>
        </div>
      </div>
      <div class="section" id="in-progress">
        <div class="block">
            <h2 class="title">
                In progress.
            </h2>
            <nav>
                <ul>
                </ul>
          </nav>
        </div>
      </div>
      <div class="section">
        <div class="block">
            <h2 class="title">
                To do.
            </h2>
            <nav>
                <ul>
                    <li class="document"> Questions & answers </li>
                    <li class="feature"> Add search to menu </li>
                    <li class="feature"> Log in </li>
                    <li class="concept"> Omoji </li>
                    <li class="product"> Turtleneck </li>
                </ul>
          </nav>
        </div>
      </div>
      <div class="section">
        <div class="block">
            <h2 class="title">
                Ideas.
            </h2>
            <nav>
                <ul>
                    <li class="concept"> Residual income </li>
                    <li class="concept"> Digital agency </li>
                </ul>
          </nav>
        </div>
      </div>
    </div>
</template>

<script>
const axios = require('axios');
export default {
    async created(){

        const space = "xdtovtw3dsvp";
        const token = "rZP5wX9KmtkpApVSxPK_e9mnYImLR7wi7MbepyyFxgw";
        const content = "roadmap"; // content type
        
        await axios.get('https://cdn.contentful.com/spaces/' + space + '/environments/master/entries/?access_token=' + token + '&content_type=' + content).then(response => (
            response.data.items.forEach(function(item){
                let title    = item.fields.title;
                let stage    = item.fields.stage[0].toLowerCase().replace(" ", "-");
                let category = item.fields.category[0].toLowerCase().replace(" ", "-");

                let element  = '<li class="' + category + '"> ' + title + '</li>';

                let list  = document.getElementById(stage).getElementsByTagName('ul')[0];

                list.insertAdjacentHTML('beforeend', element);
                
            })
        ));
    },
    head() {
        return{
            title: 'Kalt — Homepage',
            meta: [{
                hid: 'description',
                name: 'description',
                content: 'Best app ever'
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
        display: inline-block;
        font-family: "Kalt Monospace", "Courier New", Monospace;
        font-size:60%;
        border:1px rgba(0,0,0,0.5) solid;
        padding: 0 clamp(14px, 3.6vw, 26px) 0 clamp(25px, 6.48vw, 50px);
        background-repeat: no-repeat;
        background-position: clamp(7px, 1.8vw, 13px) center;
        background-size: auto 50% ;
    }
    .section .block ul li.document{
        background-image:url('../static/doc.png');
    }
    .section .block ul li.concept{
        background-image:url('../static/concept.png');
    }
    .section .block ul li.feature{
        background-image:url('../static/feature.png');
    }
    .section .block ul li.product{
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


