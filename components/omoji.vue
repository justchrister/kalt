<script>
const omoji = createComponent({
  data() {
    return {
      css: 'omoji { background-size:contain;color:transparent;background-repeat:no-repeat;}',
      omojis: [
        // Happy
        ["☺️", "happy.svg"],
        ["😊", "happy.svg"],
        ["🙂", "happy.svg"],
        // Super-happy
        ["😃", "super-happy.svg"],
        ["😄", "super-happy.svg"],
        ["😁", "super-happy.svg"],
        ["😆", "super-happy.svg"],
        ["😀", "super-happy.svg"],
        // Sad
        ["☹️", "sad.svg"],
        ["🙁", "sad.svg"],
        ["😟", "sad.svg"],
        ["😒", "sad.svg"],
        ["😞", "sad.svg"],
        ["😔", "sad.svg"],

        // ambivalent
        ["🙃", "ambivilant.svg"],

        // Suprised
        ["😦", "suprised.svg"],
        ["😯", "suprised.svg"],
        ["😧", "suprised.svg"],
        ["😮", "suprised.svg"],
        ["😲", "suprised.svg"],
      ],
    }
  },
  mounted() {
    const head = document.head || document.getElementsByTagName('head')[0]
    const style = document.createElement('style')

    head.appendChild(style)
    style.type = 'text/css'
    style.appendChild(document.createTextNode(this.css))

    for (let i = 0; i < this.omoji.length; i++) {
      const item = this.omoji[i]
      const emoji = new RegExp(item[0], 'g')
      const omoji = '<omoji style="background-image:url(../images/omoji/' + item[1] + ');">' + item[0] + '</omoji>'
      document.body.innerHTML = document.body.innerHTML.replace(emoji, omoji)
    }
  },
})

export default omoji
</script>