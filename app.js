const $=id=>document.getElementById(id);
const body=document.body;
const toggles=[...document.querySelectorAll('[data-toggle]')];
const classes={black:'no-black',white:'harsh-white',accent:'dark-accent',surface:'flat-surfaces',photos:'bright-photos',glow:'hard-shadow'};
function apply(){toggles.forEach(t=>body.classList.toggle(classes[t.dataset.toggle],!t.checked));$('activeCount').textContent=toggles.filter(t=>t.checked).length}
toggles.forEach(t=>t.addEventListener('change',apply));
$('reset').addEventListener('click',()=>{toggles.forEach(t=>t.checked=true);apply()});
$('themeToggle').addEventListener('click',()=>body.classList.toggle('light-preview'));

// Functional player controls use a simulated timeline (no external audio file).
const songs=[{title:'Midnight Drive',artist:'Nova Lane',duration:221},{title:'Glass City',artist:'Aero Club',duration:248},{title:'Low Tide',artist:'Mira Sol',duration:178}];
let current=0,seconds=87,playing=true,timer=null;
const seek=$('seek');
function fmt(s){return `${Math.floor(s/60)}:${String(s%60).padStart(2,'0')}`}
function render(){const song=songs[current];$('trackTitle').textContent=song.title;$('trackArtist').textContent=song.artist;$('duration').textContent=fmt(song.duration);seek.max=song.duration;seek.value=Math.min(seconds,song.duration);$('currentTime').textContent=fmt(seconds);$('play').textContent=playing?'Ⅱ':'▶';seek.style.background=`linear-gradient(90deg,var(--accent) 0%,var(--accent) ${seconds/song.duration*100}%,#26384e ${seconds/song.duration*100}%,#26384e 100%)`;document.querySelectorAll('.queue-item').forEach((el,i)=>{el.classList.toggle('active',i===current);el.querySelector('.playing-bars')?.remove();if(i===current){const b=document.createElement('span');b.className='playing-bars';b.textContent='▮▮';el.append(b)}})}
function tick(){if(!playing)return;seconds++;if(seconds>=songs[current].duration){nextSong(1);return}render()}
function startTimer(){clearInterval(timer);timer=setInterval(tick,1000)}
function nextSong(step){current=(current+step+songs.length)%songs.length;seconds=0;render()}
$('play').addEventListener('click',()=>{playing=!playing;render();if(playing)startTimer();else clearInterval(timer)});
$('next').addEventListener('click',()=>nextSong(1));$('prev').addEventListener('click',()=>nextSong(-1));
seek.addEventListener('input',()=>{seconds=Number(seek.value);render()});
document.querySelectorAll('.queue-item').forEach((el,i)=>el.addEventListener('click',()=>{current=i;seconds=0;render()}));
$('likeBtn').addEventListener('click',e=>{e.currentTarget.classList.toggle('liked');e.currentTarget.textContent=e.currentTarget.classList.contains('liked')?'♥':'♡'});
$('shuffle').addEventListener('click',e=>e.currentTarget.classList.toggle('on'));
$('repeat').addEventListener('click',e=>e.currentTarget.classList.toggle('on'));
$('volume').addEventListener('input',e=>{$('volumeValue').textContent=e.target.value+'%';e.target.style.background=`linear-gradient(90deg,var(--accent) 0%,var(--accent) ${e.target.value}%,#26384e ${e.target.value}%,#26384e 100%)`});
$('queueToggle').addEventListener('click',()=>{$('queue').classList.toggle('expanded');$('queueToggle').textContent=$('queue').classList.contains('expanded')?'COLLAPSE ↗':'VIEW ALL ↗'});
apply();render();startTimer();
