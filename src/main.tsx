import {useEffect,useState} from 'react';
import {createRoot} from 'react-dom/client';
import rawMenu from './menu.json';
import {providers} from './ordering';
import './styles.css';

type Dish = {id:string; name:string; description:string; price:number|null; variants:{name:string;price:number}[]; image:string|null; sourceLabels:string[]; modifiers:unknown[]; review:string[]};
const menu: {id:string;name:string;items:Dish[]}[] = rawMenu;
const assetUrl = (path: string) => import.meta.env.BASE_URL + path.replace(/^\//, '');
const money = (price: number) => new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(price);
const shortNames = ['Appetizers','Breakfast','Vegetarian & vegan','Beef','Lamb','Doro wot','Combination platters','Pasta','Seafood','Sides','Coffee & tea','Desserts','Ethiopian wines','Juices','Sodas','Red wines','White wines'];
const cleanName = (name: string) => name.replace(/^Copy of /,'');
function Price({dish}:{dish:Dish}) {return <span className="price">{dish.price === 0 ? 'Please ask' : dish.price !== null ? money(dish.price) : dish.variants.map(v => `${v.name} ${money(v.price)}`).join(' · ')}</span>}

function OrderingOptions(){return <div className="providers">{providers.map(p=><div className="provider" key={p.name}><img className="provider-logo" src={assetUrl(p.logo)} alt={p.name} loading="lazy"/><div><h3 className="sr-only">{p.name}</h3>{p.url&&<p>Choose available delivery or pickup at checkout.</p>}</div>{p.url?<a className="button small" href={p.url} target="_blank" rel="noopener noreferrer">Order</a>:<button className="button small" disabled>Coming soon</button>}</div>)}</div>}
function App(){
 const [isMobile,setIsMobile]=useState(()=>matchMedia('(max-width:760px)').matches);
 const [activeHash,setActiveHash]=useState(()=>window.location.hash);
 const mobileStory=isMobile&&activeHash==='#story';
 useEffect(()=>{
  const media=matchMedia('(max-width:760px)');
  const onResize=()=>setIsMobile(media.matches);
  const onHash=()=>setActiveHash(window.location.hash);
  media.addEventListener('change',onResize);
  window.addEventListener('hashchange',onHash);
  return ()=>{media.removeEventListener('change',onResize);window.removeEventListener('hashchange',onHash);};
 },[]);
 useEffect(()=>{
  if(!isMobile)return;
  const frame=requestAnimationFrame(()=>{
   if(mobileStory){window.scrollTo({top:0,behavior:'instant'});document.getElementById('mobile-story-title')?.focus({preventScroll:true});}
   else if(activeHash){document.getElementById(activeHash.slice(1))?.scrollIntoView({behavior:'instant',block:'start'});}
  });
  return ()=>cancelAnimationFrame(frame);
 },[isMobile,mobileStory,activeHash]);
 const [navOpen,setNavOpen]=useState(false); const [category,setCategory]=useState('all'); const [query,setQuery]=useState('');
 const filtered=menu.map((section,index)=>({...section,index,items:section.items.filter(d=>`${d.name} ${d.description}`.toLocaleLowerCase().includes(query.toLocaleLowerCase().trim()))})).filter(s=>(category==='all'||category===s.id)&&s.items.length);
 return <><a className="skip" href="#main">Skip to content</a>
 <header><a href="#home" className="brand" aria-label="Conspagna home"><img className="brand-logo" src={assetUrl('/images/conspagna-logo.png')} alt="Conspagna Ethiopian Bar & Restaurant logo" width="80" height="80"/><span>CONSPAGNA<small>Ethiopian Restaurant and Bar</small></span></a><button className="nav-toggle" aria-label="Toggle navigation" aria-expanded={navOpen} aria-controls="navigation" onClick={()=>setNavOpen(!navOpen)}>{navOpen?'Close ✕':'Menu ☰'}</button><nav id="navigation" className={navOpen?'open':''} aria-label="Main navigation" onClick={()=>setNavOpen(false)}><a href="#home">Home</a><a href="#menu">Our menu</a><a href="#story">Our story</a><a href="#visit">Visit us</a><a className="button small" href="#order">Order online</a></nav></header>
 <main id="main" className={mobileStory?'mobile-story-view':undefined}>{mobileStory&&<div className="mobile-story-header"><a className="text-link" href="#home">Back home</a><h1 id="mobile-story-title" tabIndex={-1}>Our story</h1></div>}<section className="hero" id="home"><div className="hero-copy"><h1 className="hero-title"><span className="hero-title-opening">Big flavor.</span><em className="hero-title-shared">Shared</em><span className="hero-title-ending">together<span className="title-dot">.</span></span></h1><p className="intro">Bold spices. Generous platters. A little taste of home. Pull up a chair and discover Ethiopian food made for good company.</p><div className="hero-actions"><a href="#menu" className="button">Menu</a><a href="#order" className="button">Order online</a></div></div><div className="hero-photo"><img src={assetUrl('/images/mesob-hero.jpg')} alt="Traditional Ethiopian mesob handwoven in natural straw with red, green, and yellow geometric patterns" width="1254" height="1254" fetchPriority="high"/><div className="photo-shade"/><div className="photo-caption"><span>THE CONSPAGNA WAY</span><p>Hands in.<br/>Hearts full.</p></div></div></section>
 <hr className="section-separator"/>

 <section className="story section" id="story"><div className="story-image"><div className="story-photo"><img src={assetUrl('/images/86f55a8b19d9baeec0f8.png')} alt="Traditional Ethiopian vegetable platter with lentils, greens, cabbage, and salad on injera" loading="lazy"/><span className="image-label">FROM OUR FAMILY TO YOUR TABLE</span></div></div><div className="story-copy"><p className="eyebrow">02 / OUR ROOTS</p><h2>Food brings us<br/><em>closer.</em></h2><p>At Conspagna, our family shares a love of traditional Ethiopian cooking and the simple pleasure of bringing people together.</p><p>From richly seasoned stews to soft, tangy injera, our food invites you to slow down, share a platter, and enjoy each other's company. Whether it is your first Ethiopian meal or a familiar favorite, there is a place for you at our table.</p><a className="text-link" href="#visit">Come join us <span>↗</span></a></div></section>
 <section className="section menu-section" id="menu"><div className="section-heading"><div><h2>Menu</h2></div><label className="search"><span aria-hidden="true">⌕</span><input type="search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search the menu" aria-label="Search menu dishes"/></label></div><div className="menu-browser"><div className="filters" role="group" aria-label="Menu categories"><button onClick={()=>setCategory('all')} aria-pressed={category==='all'}>All dishes</button>{menu.map((s,i)=><button key={s.id} onClick={()=>setCategory(s.id)} aria-pressed={category===s.id}>{shortNames[i]||s.name}</button>)}</div><div className="menu-content"><p className="result-count" role="status">{filtered.reduce((sum,s)=>sum+s.items.length,0)} dishes {query&&`matching “${query}”`}</p><div className="menu-results">{filtered.length?filtered.map(s=><section key={s.id} className="menu-category"><h3>{shortNames[s.index]||s.name}</h3><div className="dish-grid">{s.items.map(d=><article className="dish" key={d.id}><div className="dish-info"><div className="dish-heading"><h4>{cleanName(d.name)}</h4><Price dish={d}/></div>{d.description&&<p>{d.description}</p>}</div></article>)}</div></section>):<div className="empty"><h3>No dishes found</h3><p>Try another dish name or choose a different category.</p><button className="button" onClick={()=>{setCategory('all');setQuery('')}}>Reset filters</button></div>}</div></div></div></section>
 <section className="order-section section" id="order"><div><p className="eyebrow">04 / TAKE THE GOODNESS HOME</p><h2>Your place.<br/><em>Our flavors.</em></h2><p>Online delivery and pickup links are on their way. For current ordering options, give us a call.</p><a className="text-link" href="tel:+12064535269">Call 206-453-5269 ↗</a></div><OrderingOptions/></section>
 <section className="section visit" id="visit"><div><p className="eyebrow">05 / COME THROUGH</p><h2>See you at<br/>the table.</h2><p>Come for the flavors.<br/>Stay for the feeling of home.</p></div><div className="visit-detail"><span>COME BY</span><address>1306 S King St<br/>Seattle, WA 98144</address><a className="button small directions-button" href="https://www.google.com/maps/dir/?api=1&destination=1306+S+King+St+Seattle+WA+98144" target="_blank" rel="noopener noreferrer">Get directions</a></div><div className="visit-detail"><span>GET IN TOUCH</span><a href="tel:+12064535269">206-453-5269</a><a href="mailto:info@conspagna.com">info@conspagna.com</a></div></section></main>
 <footer><a className="brand" href="#home"><img className="brand-logo" src={assetUrl('/images/conspagna-logo.png')} alt="Conspagna Ethiopian Bar & Restaurant logo" width="80" height="80"/><span>CONSPAGNA<small>Ethiopian Restaurant and Bar</small></span></a><p>Experience Ethiopia, one bite at a time.</p><span>© {new Date().getFullYear()} Conspagna</span></footer></>
}
createRoot(document.getElementById('root')!).render(<App/>);







