<template>
  <div class="PageWrapper">
    <Kaltmenu pageTitle="About" />
    <div class='page'>
      <div class="section">
        <div class="body">
          <p>
            The goal of the visual profile is to communicate ideas as clearly as possible, while not being restrictive. This is achived in combination with the <a href="stylebook.html">Kalt — Stylebook</a>.
          </p>
        </div>
      </div>
      <div class="section">
        <div class="block" id="logo">
          <h2>
            <a href="#logo"> The logo </a>
          </h2>
          <p>
            The logotype is set in Helvetica Regular; <span style="font-weight:400;">Kalt</span>. It is always be capitalized, even in URL's.<br>

          </p>
          <p>
            The logomark — also called the insignia — is the outline of one circle, inside the outline of two ovals. The outlines has to be 1 pixel on digital platforms, and as thin as possible in print, whilst still being visable.
            It is very forgiving and can be made in almost any graphic software, even just in text ( (o) ).<br> <br>
          </p>

						<svg version="1.1" id="Insignia" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
				 viewBox="0 0 7113.2 2048.5" style="enable-background:new 0 0 7113.2 2048.5;" xml:space="preserve">
						<circle id="Inner" class="insignia" cx="3565.7" cy="1024.3" r="1022.3"/>
						<ellipse id="Middle" class="insignia" cx="3556.6" cy="1024.3" rx="2527.9" ry="1022.3"/>
						<ellipse id="Outer" class="insignia" cx="3556.6" cy="1024.3" rx="3554.6" ry="1022.3"/>
						</svg>
        </div>
      </div>
      <div class="section">
        <div class="block" id="font-stack">
          <h2>
            <a href="#font-stack"> Font stack </a>
          </h2>
          <p>
            Since not all operating systems have the same fonts available, we have decided to use a stack of fonts instead of a restrictive set of fonts. This means we support almost every system.
          </p>
          <h3>Display font</h3>
          <p>
            We decided to use a serif fonts for titles and headlines.
          </p>
          <ol>
            <li> Kalt Display </li>
            <li>STIXGeneral Regular </li>
            <li>Times New Roman </li>
          </ol>
<pre><code>$serif : "Kalt Display",
         "STIXGeneral Regular",
         "Times New Roman",
         Serif;

@mixin font-display {
  font-family: $serif;
  font-size: clamp(25px, 6.48vw, 50px);
  line-height: clamp(37px, 9.72vw, 75px);
  margin-bottom: clamp(12px, 3.24vw, 25px);
}</code></pre>
          <h3>Body font</h3>
          <p>
            Used for large blocks of texts,
          </p>
          <ol>
            <li> Helvetica </li>
            <li> Arial </li>
            <li> Raleway </li>
            <li> Roboto </li>
          </ol>
<pre><code>$sans-serif: "Helvetica",
             "Arial",
             "Raleway",
             "Roboto",
             Sans-Serif;

@mixin font-body {
  font-size: clamp(14px, 3.6vw, 26px);
	font-weight: 300;
  line-height: 150%;
  font-family: $sans-serif;
}
p {
  @include font-body;
}</code></pre>
          <h3>Monospace font</h3>
          <p>
            Used for code.
          </p>
          <ol>
            <li> Kalt Monospace </li>
            <li> Courier New </li>
          </ol>
<pre><code>$monospace: "Kalt Monospace",
             "Courier New",
             Monospace;

@mixin font-body {
  font-size: inherit;
	font-weight: 300;
  line-height: inherit;
  font-family: $monospace;
}
pre code {
  @include font-body;
}</code></pre>
        </div>
      </div>
      <div class="section">
        <div class="block" id="colors">
          <h2>
            <a href="#colors"> Colors </a>
          </h2>
          <p>
            You may use any color you like, but we do prefer the use of the ones below. They are also in this <a href="https://coolors.co/1e96fc-2afc98-f3c969" target="_blank">coolors.co</a>
          </p>
          <h3>Brand colors</h3>
          <ul style="background: #FCF9F2;">
                <li style="background-color:#1E96FC;">
                    Primary
                </li>
                <li style="background-color:#1E96FC;opacity:.8;">
                    Shade 04
                </li>
                <li style="background-color:#1E96FC;opacity:.6;">
                    Shade 03
                </li>
                <li style="background-color:#1E96FC;opacity:.4;">
                    Shade 02
                </li>
                <li style="background-color:#1E96FC;opacity:.2;">
                    Shade 01
                </li>
            </ul><ul style="background: #FCF9F2;">
                <li style="background-color:#F991CC;">
                    Primary
                </li>
                <li style="background-color:#F991CC;opacity:.8;">
                    Shade 04
                </li>
                <li style="background-color:#F991CC;opacity:.6;">
                    Shade 03
                </li>
                <li style="background-color:#F991CC;opacity:.4;">
                    Shade 02
                </li>
                <li style="background-color:#F991CC;opacity:.2;">
                    Shade 01
                </li>
            </ul>
        </div>
      </div>
      <div class="section">
        <div class="block" id="margins">
            <h2>
                Margins
            </h2>
            <p>
                The margins on both the web, in documents etc is a creative restriction that lets the content breathe. When you are restricted to using only a set amount of space you
            </p>
            <h3>Digital</h3>
            <p>
                The margins on digital surfaces should be equal on all sides, the width of the margin is determined by the width of the surface. The margin should be 7% of the width of the screen.
            </p>
            <h4>Exceptions.</h4>
            <ul>
                <li>The menu of a website or an app has only a 1px margin around it.</li>
                <li>On ultrawide screens the width of the site will only reach 720px. Therefore, the margins on the left and right side will be larger.</li>
            </ul>
        </div>
    </div>
    <div class="section">
        <div class="body">
          <p>
            This document attempts to provide guidance, rather than strict rules for written communication.
          </p>
        </div>
    </div>
    <div class="section">
        <div class="block" id="interpunction">
          <h2>
            <a href="#interpunction"> Interpunction </a>
          </h2>
          <p>
            The grammatical use of punctuation is fairly settled; punctuation style, on the other hand, is variable.
            <br>
            The Oxford comma is the final comma before the conjunction (and/or) in a series. For example, when I use an Oxford comma, my sentence might read, “Kalt makes the world better, cooler, and calmer". Without an Oxford comma, that sentence would read, “Kelly loves Twitter, yoga and blogging.”
          </p>
        </div>
    </div>
    <div class="section">
        <div class="block" id="abbreviations">
          <h2>
            <a href="#abbreviations"> Abbreviations </a>
          </h2>
          <p>
            Usually thought of as a way to communicate more effectively, abbreviations, in many cases, do the exact opposite. Abbreviations can confuse the recipient, therefore you ought to use the full  and alienate unfamiliar audiences, and even well-intentioned writers and speakers may overestimate an audience's familiarity with abbreviations
            <br>
            Whilst shortening long names are very effective, it can also cause unessacry misunderstandings,

        </p>
            <h3>Exceptions.</h3>
            <ul>
              <li>E.g. and i.e. should only be used within parenthesis, whenever possible, start a new sentence "Example:".</li>
              <li>PS Should always be abbreviated with only the first letters, capitalised. It should also always be at the end of a document. In order for it to be read by the audience, it ought to be written before a signature.</li>
            </ul>
        </div>
    </div>
    <div class="section">
        <div class="block" id="abbreviations">
          <h2>
            <a href="#dates-and-time"> Dates and time </a>
          </h2>
          <p>
            When it comes to lists of dates that should be sortable or in chronological order — like a spreadsheet or system logs — you should use this format; yyyy.mm.dd. In texts you should you use the following format 30. September, 2021.
          </p>
        </div>
      </div>
			<div class="section">
        <div class="block" id="abbreviations">
          <h2>
            <a href="#interactive"> Interactive elements </a>
          </h2>
          <p>
						Whenever any element is clicked, the background will change to the blue/happy color.
            <strong>Buttons</strong>
						On hover the
						<strong>Hyperlinks</strong>
						Hyperlinks should be underlined, and in the same typeface as the text itself. Unless it is targetting itself as a section url.
          </p>
        </div>
        </div>
      </div>
    </div>
</template>

<script>
import kaltmenu from '../components/kaltmenu.vue';
export default {
    head() {
        return{
            title: 'Kalt — Brand',
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
    

    #colors ul{
        margin:0;
        padding:0;
        display: inline-block;
        width:50%;
    }

    #colors ul li{
        margin:0;
        color:transparent;
        line-height: 100%;
    }

    #colors ul li:first-child{
        line-height:200%;
    }

    #colors ul li:before{
        display:none;
    }
</style>


