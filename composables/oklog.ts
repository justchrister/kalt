export const oklog = (type, text) => {
  // https://talyian.github.io/ansicolors/
  let label = '\x1b[34m● \x1b[0m';
  if (type==='success') label = '\x1b[32m● \x1b[0m'
  if (type==='warn')    label = '\x1b[43m● \x1b[0m'
  if (type==='error')   label = '\x1b[33m● \x1b[0m'
  console.log(label + text)
  return
};