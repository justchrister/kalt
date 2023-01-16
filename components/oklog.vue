<script lang="ts" setup>
const oklog = (type, text) => {
  // verbose
  let label = ''
  // good
  if (type==='success'){
    logger.info(text)
    label = ' \x1b[42m SUCCESS \x1b[0m '
  }
  // almost bad
  if (type==='warn'){
    label = ' \x1b[43m WARNING \x1b[0m '
    logger.warn(text)
  }
  // really bad
  if (type==='error'){
    label = ' \x1b[41m ERROR \x1b[0m   '
    logger.error(text);
  }
  console.log(label + text)
}
</script>