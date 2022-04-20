<template>
    <div class='page'>
      <div class="section" id="documents">
        <div class="block">
          <h2 class="title">
            Questions & Answers
          </h2>
          <p>
						Here we try to answer questions simply and directly.
          </p>
        </div>
        <input type="text" placeholder="search">
          <nav>
          <ol>
						<li>
							<span class="category">
								Contract
							</span>
							<span class="subject">
								<a href="https://docs.google.com/document/d/1dkj9J-73FkyLZMPCGt928zdQ-II1nRo60adtTh1-33Y/edit?usp=sharing" target="blank">
									Capital investment agreement
								</a>
							</span>
							<span class="date">2022</span>
						</li>
						<li>
							<span class="category">
								Document
							</span>
							<span class="subject">
								<a href="/📄/art-aquisition-strategy.html">
									art-aquisition-strategy.html
								</a>
							</span>
							<span class="date">2022</span>
						</li>
						<li>
							<span class="category">
								Concept
							</span>
							<span class="subject">
								<a href="/📄/crypto-fund.html">
									crypto-fund.html (draft)
								</a>
							</span>
							<span class="date">2022</span>
						</li>
						<li>
							<span class="category">
								Concept
							</span>
							<span class="subject">
								<a href="/📄/kiosk.html">
									kiosk.html (draft)
								</a>
							</span>
							<span class="date">2022</span>
						</li>
						<li>
							<span class="category">
								Media
							</span>
							<span class="subject">
								<a href="/📄/images.zip">
									images.zip
								</a>
							</span>
							<span class="date">2022</span>
						</li>
						<li>
							<span class="category">
								Whitepaper
							</span>
							<span class="subject">
								<a href="/📄/principles-of-digital-architecture.html">
									principles-of-digital-architecture.html (draft)
								</a>
							</span>
							<span class="date">2022</span>
						</li>
						<li>
							<span class="category">
								Whitepaper
							</span>
							<span class="subject">
								<a href="/📄/non-organizations.html">
									non-organizations.html (draft)
								</a>
							</span>
							<span class="date">2022</span>
						</li>
            <li>
              <span class="category">
                Guide
              </span>
              <span class="subject">
                <a href="/📄/visual-profile.html">
                  visual-profile.html
                </a>
              </span>
              <span class="date">2021</span>
            </li>
            <li>
              <span class="category">
                Document
              </span>
              <span class="subject">
                <a href="https://kalt.co/📄/books.html">
                  books.html
                </a>
              </span>
              <span class="date">2021</span>
            </li>
            <li>
              <span class="category">
                Guide
              </span>
              <span class="subject">
                <a href="/📄/stylebook.html">
                  stylebook.html
                </a>
              </span>
              <span class="date">2021</span>
            </li>
            <li>
              <span class="category">
                Document
              </span>
              <span class="subject">
                <a href="/📄/investments.html">
                  investments.html
                </a>
              </span>
              <span class="date">2021</span>
            </li>
            <li>
              <span class="category">
                Document
              </span>
              <span class="subject">
                <a href="/📄/values.html">
                  values.html
                </a>
              </span>
              <span class="date">2021</span>
            </li>
            <li>
	            <span class="category">
	              Document
	            </span>
	            <span class="subject">
	              <a href="/👋">
	                about.html
	              </a>
	            </span>
	            <span class="date">2021</span>
	          </li>
            <li>
	            <span class="category">
	              Concept
	            </span>
	            <span class="subject">
	              <a href="/📄/omoji.html">
	                omoji.html
	              </a>
	            </span>
	            <span class="date">2021</span>
	          </li>
          </ol>
        </nav>
      </div>
    </div>
</template>

<script>
export default {

  data(){
    return{
      questions:[ ]
    }
  },
  async created(){

    const space = "xdtovtw3dsvp";
    const token = "rZP5wX9KmtkpApVSxPK_e9mnYImLR7wi7MbepyyFxgw";
    const content = "artwork"; // content type


    const response = await axios.get('');
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

<style scoped>
</style>