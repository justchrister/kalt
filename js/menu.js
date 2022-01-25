const bod = document.getElementsByTagName('body')[0];

bod.insertAdjacentHTML('afterBegin', '<header><a href="/"><button class="logo" id="logo"><span>Kalt</span> — ' + document.title.split('—')[1] + '</button></a><nav class="menu"><a href="https://kalt.co/menu.html"> <button id="menu"> menu</button></a><ul id="menu_items"><li><a href="https://kalt.co/art">Artworks</a></li><li><a href="https://kalt.co/fund">Fund</a></li><li><a href="mailto:hello@kalt.co">Contact</a></li><li><a href="https://kalt.co/📄">Documents</a></li></ul></nav></header>');
console.log();
const menubtn = document.getElementById("menu");

menubtn.addEventListener("click", ()=>{
	event.preventDefault();
  bod.classList.toggle("show-menu");
});

const okStyle = [
  "color: #FF0"
].join(";");

console.log("");
console.log("%c                          (                              ", okStyle)
console.log("%c              .            )        )                    ", okStyle)
console.log("%c                        (  (|              .             ", okStyle)
console.log("%c                   )   )\\/ ( ( (                        ", okStyle)
console.log("%c           *  (   ((  /     ))\\))  (  )    )            ", okStyle)
console.log("%c         (     \\   )\\(          |  ))( )  (|           ", okStyle)
console.log("%c        >)     ))/   |          )/  \\((  ) \\ \\        ", okStyle)
console.log("");
console.log("%c                       kalt.co                           ", okStyle)
console.log("");

const logoel = document.getElementById("logo");
let curval = logoel.innerHTML;
let orgval = 100;
let randval = 0;
setTimeout(() => { logoel.innerHTML = "_K_____"; }, orgval);
randval = randval + orgval;
setTimeout(() => { logoel.innerHTML = "__K____"; }, randval);
randval = randval + orgval;
setTimeout(() => { logoel.innerHTML = "___K___"; }, randval);
randval = randval + orgval;
setTimeout(() => { logoel.innerHTML = "____K__"; }, randval);
randval = randval + orgval;
setTimeout(() => { logoel.innerHTML = "_____K_"; }, randval);
randval = randval + orgval;
setTimeout(() => { logoel.innerHTML = "____K__"; }, randval);
randval = randval + orgval;
setTimeout(() => { logoel.innerHTML = "___K___"; }, randval);
randval = randval + orgval;
setTimeout(() => { logoel.innerHTML = "__K____"; }, randval);
randval = randval + orgval;
setTimeout(() => { logoel.innerHTML = "_K_____"; }, randval);
randval = randval + orgval;
setTimeout(() => { logoel.innerHTML = curval; }, randval);

// set a cookie, lool
document.cookie = "cookie!";
