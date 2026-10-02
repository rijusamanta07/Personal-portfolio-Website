const canvas=document.getElementById('network');
const ctx=canvas.getContext('2d');
let nodes=[];
function resize(){
  canvas.width=innerWidth*devicePixelRatio;
  canvas.height=innerHeight*devicePixelRatio;
  canvas.style.width=innerWidth+'px';
  canvas.style.height=innerHeight+'px';
  ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);
  nodes=Array.from({length:Math.min(70,Math.floor(innerWidth/18))},()=>({
    x:Math.random()*innerWidth,y:Math.random()*innerHeight,
    vx:(Math.random()-.5)*.22,vy:(Math.random()-.5)*.22
  }));
}
function draw(){
  ctx.clearRect(0,0,innerWidth,innerHeight);
  for(const n of nodes){n.x+=n.vx;n.y+=n.vy;if(n.x<0||n.x>innerWidth)n.vx*=-1;if(n.y<0||n.y>innerHeight)n.vy*=-1}
  for(let i=0;i<nodes.length;i++)for(let j=i+1;j<nodes.length;j++){
    const a=nodes[i],b=nodes[j],d=Math.hypot(a.x-b.x,a.y-b.y);
    if(d<125){ctx.strokeStyle=`rgba(184,255,87,${(1-d/125)*.11})`;ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke()}
  }
  for(const n of nodes){ctx.fillStyle='rgba(184,255,87,.28)';ctx.fillRect(n.x,n.y,1.5,1.5)}
  requestAnimationFrame(draw);
}
addEventListener('resize',resize);resize();draw();

const glow=document.querySelector('.cursor-glow');
addEventListener('pointermove',e=>{glow.style.left=e.clientX+'px';glow.style.top=e.clientY+'px'});

const sections=document.querySelectorAll('section[id]');
const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting) document.title=`Riju Samanta | ${entry.target.id.toUpperCase()}`;
  });
},{threshold:.35});
sections.forEach(s=>observer.observe(s));
