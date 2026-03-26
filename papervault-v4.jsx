import { useState, useEffect } from "react";

// ── PALETTE ───────────────────────────────────────────────────────────────────
const P = {
  bg:"#07080F", bgMid:"#0D0F1E", bgCard:"#111327", surface:"#161930",
  rim:"#1E2240", cyan:"#00FFD1", violet:"#9B5DE5", magenta:"#FF2D78",
  gold:"#FFD166", lime:"#A8FF3E", ice:"#7DF9FF", coral:"#FF6B6B",
  sky:"#4CC9F0", white:"#EEF0FF", muted:"#5A5F80", dim:"#1E2240",
};
const G = {
  aurora:"linear-gradient(135deg,#00FFD1 0%,#9B5DE5 50%,#FF2D78 100%)",
  plasma:"linear-gradient(135deg,#4CC9F0 0%,#9B5DE5 60%,#FF2D78 100%)",
  nova:  "linear-gradient(135deg,#FFD166 0%,#FF6B6B 50%,#FF2D78 100%)",
  arctic:"linear-gradient(135deg,#7DF9FF 0%,#4CC9F0 60%,#9B5DE5 100%)",
  acid:  "linear-gradient(135deg,#A8FF3E 0%,#00FFD1 60%,#4CC9F0 100%)",
  ember: "linear-gradient(135deg,#FFD166 0%,#FF6B6B 100%)",
  card:  "linear-gradient(145deg,rgba(22,25,48,0.92),rgba(13,15,30,0.96))",
  rA:"linear-gradient(135deg,#00FFD1,#9B5DE5,#FF2D78,#FFD166)",
  rP:"linear-gradient(135deg,#4CC9F0,#9B5DE5,#FF2D78)",
  rN:"linear-gradient(135deg,#FFD166,#FF6B6B,#FF2D78)",
  rAc:"linear-gradient(135deg,#A8FF3E,#00FFD1,#4CC9F0)",
  rAm:"linear-gradient(135deg,#FFD166,#FF6B6B)",
};

const PAPERS = [
  { id:1, title:"Attention Is All You Need", authors:"Vaswani et al.", pub:"Google Brain", handle:"@googlebrain", av:"GB", grad:G.plasma, rim:G.rP, abstract:"We propose the Transformer — a model architecture based solely on attention mechanisms, achieving state-of-the-art on translation tasks with no recurrence or convolutions.", tags:["NLP","Transformers","AI"], year:2017, journal:"NeurIPS", likes:4821, comments:312, saves:2310, cited:98000, color:P.violet, emoji:"🧠" },
  { id:2, title:"Denoising Diffusion Probabilistic Models", authors:"Ho, Jain & Abbeel", pub:"UC Berkeley", handle:"@ucberkeley", av:"UC", grad:G.nova, rim:G.rN, abstract:"High quality image synthesis using diffusion probabilistic models with a novel connection to denoising score matching with Langevin dynamics.", tags:["Diffusion","Vision","DDPM"], year:2020, journal:"NeurIPS", likes:3102, comments:198, saves:1890, cited:14200, color:P.coral, emoji:"🎨" },
  { id:3, title:"CLIP: Learning from Natural Language Supervision", authors:"Radford et al.", pub:"OpenAI", handle:"@openai", av:"OA", grad:G.arctic, rim:G.rA, abstract:"Learning visual representations directly from raw text, enabling impressive zero-shot transfer across a wide range of vision tasks.", tags:["Multimodal","Vision-Language","Zero-Shot"], year:2021, journal:"ICML", likes:2788, comments:231, saves:1540, cited:21800, color:P.cyan, emoji:"🔗" },
  { id:4, title:"AlphaFold: Protein Structure Prediction", authors:"Jumper et al.", pub:"DeepMind", handle:"@deepmind", av:"DM", grad:G.acid, rim:G.rAc, abstract:"A deep learning solution to the 50-year protein structure prediction challenge, achieving accuracy competitive with experimental methods.", tags:["Biology","AlphaFold","Science"], year:2021, journal:"Nature", likes:5610, comments:410, saves:3200, cited:30000, color:P.lime, emoji:"🧬" },
];

const PUBLISHERS = [
  { id:"nature",  name:"Nature",     av:"N",  grad:G.nova,   rim:G.rN,  field:"Multi-disciplinary", IF:"69.5", accept:"8%",  review:"6 wks",  tags:["Biology","Physics","Medicine"],      desc:"World's most prestigious scientific journal accepting groundbreaking cross-disciplinary research.", badge:"🏆", color:P.coral },
  { id:"neurips", name:"NeurIPS",    av:"N",  grad:G.plasma, rim:G.rP,  field:"Machine Learning",   IF:"N/A",  accept:"25%", review:"4 wks",  tags:["AI","ML","Deep Learning"],           desc:"Premier venue for machine learning and computational neuroscience research.", badge:"⚡", color:P.violet },
  { id:"icml",    name:"ICML",       av:"I",  grad:G.arctic, rim:G.rA,  field:"Machine Learning",   IF:"N/A",  accept:"22%", review:"5 wks",  tags:["ML","Optimization","Theory"],        desc:"International Conference on Machine Learning — top-tier ML venue.", badge:"🔬", color:P.cyan },
  { id:"ieee",    name:"IEEE Trans.",av:"IE", grad:G.ember,  rim:G.rAm, field:"Engineering & Tech",  IF:"14.3", accept:"18%", review:"8 wks",  tags:["Engineering","Robotics","EE"],       desc:"IEEE peer-reviewed research across engineering and computer science.", badge:"💡", color:P.gold },
  { id:"cell",    name:"Cell",       av:"C",  grad:G.acid,   rim:G.rAc, field:"Life Sciences",       IF:"66.9", accept:"6%",  review:"10 wks", tags:["Biology","Genetics","Medicine"],     desc:"Leading cell biology journal for remarkable advances in life sciences.", badge:"🧬", color:P.lime },
  { id:"arxiv",   name:"arXiv",      av:"aX", grad:G.aurora, rim:G.rA,  field:"Preprint Server",     IF:"Open", accept:"95%", review:"1-2d",   tags:["Physics","CS","Math"],               desc:"Open-access preprint repository for instant sharing before peer review.", badge:"🚀", color:P.ice },
  { id:"plos",    name:"PLOS ONE",   av:"PL", grad:G.ember,  rim:G.rAm, field:"Open Access",         IF:"3.7",  accept:"45%", review:"6 wks",  tags:["Biology","Ecology","Medicine"],      desc:"Inclusive open-access journal welcoming rigorous research from all disciplines.", badge:"🌍", color:P.gold },
];

const RESEARCHERS = [
  { name:"Yann LeCun",      handle:"@ylecun",   av:"YL", field:"Deep Learning",  grad:G.plasma, rim:G.rP },
  { name:"Andrej Karpathy", handle:"@karpathy", av:"AK", field:"AI / Vision",     grad:G.nova,   rim:G.rN },
  { name:"Fei-Fei Li",      handle:"@feifeili", av:"FL", field:"Computer Vision", grad:G.arctic, rim:G.rA },
];
const CHANNELS = [
  {name:"NeurIPS",av:"N",grad:G.plasma,fresh:true},{name:"ICML",av:"I",grad:G.arctic,fresh:true},
  {name:"OpenAI", av:"O",grad:G.nova,  fresh:true},{name:"DeepMind",av:"D",grad:G.acid,fresh:true},
  {name:"Stanford",av:"S",grad:G.plasma,fresh:false},{name:"MIT",av:"M",grad:G.ember,fresh:false},
  {name:"Google", av:"G",grad:G.aurora,fresh:true},
];
const STEPS = ["Publisher","Details","Checklist","Submit"];

// ── HEX AVATAR ────────────────────────────────────────────────────────────────
function hexPts(cx,cy,r){ return [...Array(6)].map((_,i)=>{const a=(Math.PI/180)*(60*i-30);return `${cx+r*Math.cos(a)},${cy+r*Math.sin(a)}`;}).join(" "); }
function HexAvatar({text,grad,size=48,fontSize=14,glowColor="#00FFD1"}){
  const uid=`hx-${text}-${size}`;
  return(
    <div style={{width:size,height:size,position:"relative",flexShrink:0}}>
      <svg width={size} height={size} style={{position:"absolute",top:0,left:0}}>
        <defs>
          <linearGradient id={`rim-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00FFD1"/><stop offset="50%" stopColor="#9B5DE5"/><stop offset="100%" stopColor="#FF2D78"/>
          </linearGradient>
          <linearGradient id={`fill-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={glowColor} stopOpacity="0.8"/><stop offset="100%" stopColor="#FF2D78" stopOpacity="0.8"/>
          </linearGradient>
        </defs>
        <polygon points={hexPts(size/2,size/2,size/2-0.5)} fill={`url(#rim-${uid})`}/>
        <polygon points={hexPts(size/2,size/2,size/2-2.5)} fill="#111327"/>
        <polygon points={hexPts(size/2,size/2,size/2-3)} fill={`url(#fill-${uid})`} opacity="0.7"/>
      </svg>
      <div style={{position:"absolute",inset:3,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Rajdhani',sans-serif",fontSize,fontWeight:800,color:"#fff",textShadow:`0 0 10px ${glowColor}`,letterSpacing:"0.04em"}}>{text}</div>
    </div>
  );
}

// ── GLOW CARD ─────────────────────────────────────────────────────────────────
function GC({rim=G.rP,children,style={},onClick}){
  return(
    <div onClick={onClick} style={{borderRadius:20,padding:1.5,background:rim,boxShadow:"0 4px 24px rgba(0,0,0,0.4)",...style}}>
      <div style={{background:G.card,borderRadius:19,backdropFilter:"blur(12px)"}}>{children}</div>
    </div>
  );
}

export default function PaperVault(){
  const [view,setView]=useState("home");
  const [activePaper,setAP]=useState(null);
  const [liked,setLiked]=useState(new Set());
  const [saved,setSaved]=useState(new Set());
  const [followed,setFollowed]=useState(new Set());
  const [activeTag,setAT]=useState("All");
  const [search,setSearch]=useState("");
  const [comment,setComment]=useState("");
  const [msg,setMsg]=useState("");
  const [tapAnim,setTA]=useState(null);
  const [activeChat,setActiveChat]=useState(RESEARCHERS[0]);

  const [step,setStep]=useState(0);
  const [selPub,setSelPub]=useState(null);
  const [form,setForm]=useState({title:"",abstract:"",authors:"",keywords:"",file:false,cover:false,data:false,ethics:false,orig:false});
  const [done,setDone]=useState(false);
  const [pf,setPF]=useState("All");

  const dbl=(id)=>{if(!liked.has(id))setLiked(p=>new Set([...p,id]));setTA(id);setTimeout(()=>setTA(null),1000);};
  const allChk=form.cover&&form.data&&form.ethics&&form.orig;
  const canN1=form.title&&form.authors&&form.abstract&&form.file;

  const finish=()=>{setDone(true);setTimeout(()=>{setDone(false);setStep(0);setSelPub(null);setForm({title:"",abstract:"",authors:"",keywords:"",file:false,cover:false,data:false,ethics:false,orig:false});setView("home");},3600);};
  const goBack=()=>{if(view==="submit"&&!done){if(step>0)setStep(s=>s-1);else setView("home");}else setView("home");};

  const fp=PAPERS.filter(p=>{const mt=activeTag==="All"||p.tags.includes(activeTag);const ms=!search||p.title.toLowerCase().includes(search.toLowerCase());return mt&&ms;});
  const fpubs=pf==="All"?PUBLISHERS:PUBLISHERS.filter(p=>p.tags.some(t=>t.toLowerCase().includes(pf.toLowerCase())));

  return(
    <div style={{fontFamily:"'Rajdhani',sans-serif",background:P.bg,minHeight:"100vh",maxWidth:480,margin:"0 auto",position:"relative",paddingBottom:90,color:P.white,overflowX:"hidden"}}>
      {/* Ambient orbs */}
      <div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0,overflow:"hidden"}}>
        <div style={{position:"absolute",top:"-18%",left:"-22%",width:440,height:440,borderRadius:"50%",background:"radial-gradient(circle,rgba(155,93,229,0.16) 0%,transparent 70%)"}}/>
        <div style={{position:"absolute",top:"28%",right:"-28%",width:400,height:400,borderRadius:"50%",background:"radial-gradient(circle,rgba(0,255,209,0.11) 0%,transparent 70%)"}}/>
        <div style={{position:"absolute",bottom:"-12%",left:"8%",width:360,height:360,borderRadius:"50%",background:"radial-gradient(circle,rgba(255,45,120,0.1) 0%,transparent 70%)"}}/>
        <div style={{position:"absolute",top:"58%",right:"4%",width:240,height:240,borderRadius:"50%",background:"radial-gradient(circle,rgba(255,209,102,0.08) 0%,transparent 70%)"}}/>
      </div>
      {/* Scanlines */}
      <div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:1,backgroundImage:"repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,255,209,0.012) 3px,rgba(0,255,209,0.012) 4px)"}}/>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=Cinzel:wght@400;600;700&family=Space+Mono&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        ::-webkit-scrollbar{display:none;}
        input,textarea,button{font-family:'Rajdhani',sans-serif;outline:none;}
        @keyframes fadeUp{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes slideUp{from{opacity:0;transform:translateY(36px)}to{opacity:1;transform:translateY(0)}}
        @keyframes scaleIn{from{opacity:0;transform:scale(0.85)}to{opacity:1;transform:scale(1)}}
        @keyframes heartPop{0%{transform:scale(0) rotate(-20deg);opacity:0}50%{transform:scale(1.5);opacity:1}100%{transform:scale(1.1);opacity:0}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
        @keyframes glowPulse{0%,100%{box-shadow:0 0 20px rgba(0,255,209,0.3)}50%{box-shadow:0 0 44px rgba(0,255,209,0.65),0 0 80px rgba(155,93,229,0.25)}}
        @keyframes glowText{0%,100%{text-shadow:0 0 10px rgba(0,255,209,0.4)}50%{text-shadow:0 0 28px rgba(0,255,209,0.9),0 0 54px rgba(155,93,229,0.4)}}
        @keyframes confetti{0%{transform:translateY(-20px) rotate(0deg);opacity:1}100%{transform:translateY(100px) rotate(720deg);opacity:0}}
        @keyframes bounceIn{0%{transform:scale(0);opacity:0}60%{transform:scale(1.15)}80%{transform:scale(0.95)}100%{transform:scale(1);opacity:1}}
        @keyframes rimShift{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
        .gc{background:linear-gradient(145deg,rgba(22,25,48,0.92),rgba(13,15,30,0.96));backdrop-filter:blur(14px);}
        .tag{display:inline-block;padding:5px 14px;border-radius:4px;font-size:11px;font-weight:700;cursor:pointer;transition:all 0.2s;white-space:nowrap;letter-spacing:0.09em;text-transform:uppercase;}
        .nb{background:none;border:none;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:3px;padding:8px 12px;font-size:9px;font-family:'Rajdhani',sans-serif;font-weight:700;letter-spacing:0.1em;transition:all 0.2s;text-transform:uppercase;}
        .ab{background:none;border:none;cursor:pointer;padding:10px;transition:transform 0.15s;display:flex;align-items:center;gap:6px;}
        .ab:active{transform:scale(0.82);}
        .ri{width:100%;background:rgba(26,30,56,0.7);border:1.5px solid rgba(90,95,128,0.35);border-radius:10px;padding:13px 16px;font-size:15px;color:#EEF0FF;transition:all 0.2s;letter-spacing:0.03em;}
        .ri:focus{border-color:#00FFD1;box-shadow:0 0 0 3px rgba(0,255,209,0.1);}
        .rta{width:100%;background:rgba(26,30,56,0.7);border:1.5px solid rgba(90,95,128,0.35);border-radius:10px;padding:13px 16px;font-size:15px;color:#EEF0FF;resize:none;min-height:110px;line-height:1.65;transition:all 0.2s;}
        .rta:focus{border-color:#00FFD1;box-shadow:0 0 0 3px rgba(0,255,209,0.1);}
        .cb{border:none;border-radius:12px;padding:15px 24px;font-weight:700;font-size:16px;cursor:pointer;font-family:'Rajdhani',sans-serif;letter-spacing:0.07em;text-transform:uppercase;transition:all 0.2s;}
        .cb:active{transform:scale(0.96);}
        .fhx{border:1.5px solid rgba(0,255,209,0.3);background:transparent;border-radius:7px;padding:6px 14px;font-size:12px;font-weight:700;cursor:pointer;transition:all 0.22s;color:#00FFD1;letter-spacing:0.08em;text-transform:uppercase;font-family:'Rajdhani',sans-serif;}
        .fhx.on{background:rgba(0,255,209,0.12);box-shadow:0 0 14px rgba(0,255,209,0.2);}
        .pc{cursor:pointer;transition:all 0.28s;}
        .pc:hover{transform:translateY(-3px);}
      `}</style>

      {/* ── HEADER ── */}
      <header style={{background:"rgba(7,8,15,0.88)",backdropFilter:"blur(22px)",borderBottom:"1px solid rgba(0,255,209,0.1)",padding:"13px 18px",position:"sticky",top:0,zIndex:400,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        {view!=="home"&&view!=="explore"?(
          <button onClick={goBack} style={{background:"none",border:"none",cursor:"pointer",color:P.cyan,fontSize:20,padding:4}}>←</button>
        ):(
          <div style={{display:"flex",alignItems:"center",gap:9}}>
            <div style={{width:32,height:32,borderRadius:9,background:G.aurora,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,boxShadow:"0 0 18px rgba(0,255,209,0.45)"}}>📜</div>
            <span style={{fontFamily:"'Cinzel',serif",fontSize:21,fontWeight:700,background:G.aurora,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",letterSpacing:"0.08em",animation:"glowText 3s ease infinite"}}>PAPERVAULT</span>
          </div>
        )}
        {view==="submit"&&!done&&<span style={{fontFamily:"'Cinzel',serif",fontSize:13,color:P.cyan,letterSpacing:"0.12em"}}>SUBMIT PAPER</span>}
        {view==="paper"&&activePaper&&<span style={{fontFamily:"'Cinzel',serif",fontSize:12,color:P.muted,letterSpacing:"0.1em"}}>RESEARCH</span>}
        {view==="messages"&&<span style={{fontFamily:"'Cinzel',serif",fontSize:12,color:P.muted,letterSpacing:"0.1em"}}>MESSAGES</span>}
        {view==="profile"&&<span style={{fontFamily:"'Cinzel',serif",fontSize:12,color:P.muted,letterSpacing:"0.1em"}}>PROFILE</span>}
        {view==="notifications"&&<span style={{fontFamily:"'Cinzel',serif",fontSize:12,color:P.muted,letterSpacing:"0.1em"}}>ALERTS</span>}
        {(view==="home"||view==="explore")&&(
          <div style={{display:"flex",gap:2}}>
            <button onClick={()=>setView("notifications")} style={{background:"none",border:"none",cursor:"pointer",fontSize:18,position:"relative",padding:8}}>
              <span style={{filter:"drop-shadow(0 0 6px rgba(0,255,209,0.6))"}}>🔔</span>
              <span style={{position:"absolute",top:6,right:6,width:7,height:7,background:P.magenta,borderRadius:"50%",border:"1.5px solid #07080F",boxShadow:`0 0 8px ${P.magenta}`}}/>
            </button>
            <button onClick={()=>setView("messages")} style={{background:"none",border:"none",cursor:"pointer",fontSize:18,padding:8}}>
              <span style={{filter:"drop-shadow(0 0 6px rgba(155,93,229,0.6))"}}>✉️</span>
            </button>
          </div>
        )}
        <div style={{width:36}}/>
      </header>

      {/* ══════════════ HOME ══════════════ */}
      {view==="home"&&(
        <div style={{position:"relative",zIndex:2}}>
          {/* Channel rail */}
          <div style={{padding:"16px 0 16px 16px",display:"flex",gap:14,overflowX:"auto",borderBottom:"1px solid rgba(0,255,209,0.07)"}}>
            <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:6,flexShrink:0}}>
              <div style={{padding:2,borderRadius:"50%",background:G.aurora,boxShadow:"0 0 16px rgba(0,255,209,0.35)"}}>
                <div style={{width:60,height:60,borderRadius:"50%",background:P.bgCard,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,border:"2px solid #111327"}}>🎓</div>
              </div>
              <span style={{fontSize:10,color:P.muted,fontWeight:700,letterSpacing:"0.07em"}}>YOU</span>
            </div>
            {CHANNELS.map((ch,i)=>(
              <div key={i} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:6,flexShrink:0}}>
                <div style={{padding:ch.fresh?2:0,borderRadius:"50%",background:ch.fresh?G.aurora:"none",border:ch.fresh?"none":`1.5px solid ${P.dim}`,boxShadow:ch.fresh?"0 0 14px rgba(0,255,209,0.22)":"none"}}>
                  <div style={{width:60,height:60,borderRadius:"50%",background:ch.grad,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,fontWeight:800,color:"#fff",border:"2.5px solid #111327",letterSpacing:"0.04em"}}>{ch.av}</div>
                </div>
                <span style={{fontSize:10,color:ch.fresh?P.cyan:P.muted,fontWeight:ch.fresh?700:500,letterSpacing:"0.06em",maxWidth:66,textAlign:"center",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{ch.name}</span>
              </div>
            ))}
          </div>

          {/* Tag rail */}
          <div style={{padding:"10px 14px",display:"flex",gap:8,overflowX:"auto",background:"rgba(7,8,15,0.55)"}}>
            {["All","AI","NLP","Vision","Transformers","Diffusion","RL","Biology","Quantum","Robotics"].map(tag=>(
              <span key={tag} className="tag" onClick={()=>setAT(tag)} style={{background:activeTag===tag?"linear-gradient(135deg,rgba(0,255,209,0.18),rgba(155,93,229,0.18))":"rgba(30,34,64,0.5)",color:activeTag===tag?P.cyan:P.muted,border:`1px solid ${activeTag===tag?P.cyan+"55":P.dim}`,boxShadow:activeTag===tag?"0 0 14px rgba(0,255,209,0.18)":"none"}}>{tag}</span>
            ))}
          </div>

          {/* Feed */}
          {fp.map((paper,idx)=>(
            <div key={paper.id} style={{margin:"14px 14px 0",animation:`fadeUp 0.5s ease ${idx*0.1}s both`}}>
              <div style={{borderRadius:22,padding:1.5,background:paper.rim,boxShadow:`0 8px 40px ${paper.color}1A`}}>
                <div className="gc" style={{borderRadius:21}}>
                  {/* Header */}
                  <div style={{display:"flex",alignItems:"center",padding:"12px 14px",gap:10}}>
                    <div onClick={()=>setView("profile")} style={{cursor:"pointer"}}><HexAvatar text={paper.av} grad={paper.grad} size={46} fontSize={13} glowColor={paper.color}/></div>
                    <div style={{flex:1}}>
                      <div style={{display:"flex",alignItems:"center",gap:7}}>
                        <span style={{fontWeight:700,fontSize:15,letterSpacing:"0.04em"}}>{paper.pub}</span>
                        <span style={{fontSize:10,color:P.cyan,background:"rgba(0,255,209,0.1)",padding:"2px 7px",borderRadius:4,fontWeight:700,letterSpacing:"0.06em"}}>✓ VERIFIED</span>
                      </div>
                      <span style={{fontSize:12,color:P.muted,letterSpacing:"0.05em"}}>{paper.journal} · {paper.year}</span>
                    </div>
                    <button style={{background:"none",border:"none",cursor:"pointer",color:P.muted,fontSize:16}}>⋯</button>
                  </div>

                  {/* Visual */}
                  <div onDoubleClick={()=>dbl(paper.id)} onClick={()=>{setAP(paper);setView("paper");}} style={{position:"relative",margin:"0 12px",borderRadius:16,overflow:"hidden",aspectRatio:"4/3",background:paper.grad,cursor:"pointer"}}>
                    <div style={{position:"absolute",inset:0,backgroundImage:"linear-gradient(rgba(0,255,209,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(0,255,209,0.05) 1px,transparent 1px)",backgroundSize:"30px 30px",zIndex:1}}/>
                    <div style={{position:"absolute",inset:0,background:"radial-gradient(circle at 50% 38%,rgba(255,255,255,0.14) 0%,transparent 58%)",zIndex:2}}/>
                    <div style={{position:"relative",zIndex:3,height:"100%",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"0 24px"}}>
                      <div style={{fontSize:70,marginBottom:14,filter:`drop-shadow(0 0 28px ${paper.color}aa)`,animation:"float 4s ease infinite"}}>{paper.emoji}</div>
                      <h2 style={{fontFamily:"'Cinzel',serif",fontSize:19,color:"#fff",textAlign:"center",lineHeight:1.42,textShadow:`0 0 32px ${paper.color}88`}}>{paper.title}</h2>
                      <p style={{fontSize:13,color:"rgba(255,255,255,0.62)",marginTop:9,fontStyle:"italic",textAlign:"center"}}>{paper.authors}</p>
                    </div>
                    <div style={{position:"absolute",bottom:12,right:12,zIndex:4,background:"rgba(7,8,15,0.68)",backdropFilter:"blur(10px)",borderRadius:8,padding:"5px 12px",border:`1px solid ${paper.color}38`}}>
                      <span style={{fontSize:11,color:paper.color,fontWeight:700,letterSpacing:"0.06em"}}>📚 {(paper.cited/1000).toFixed(0)}K CITED</span>
                    </div>
                    <div style={{position:"absolute",top:12,left:12,zIndex:4,display:"flex",gap:5}}>
                      {paper.tags.slice(0,2).map(t=><span key={t} style={{background:"rgba(7,8,15,0.62)",backdropFilter:"blur(6px)",color:paper.color,border:`1px solid ${paper.color}45`,padding:"3px 9px",borderRadius:4,fontSize:10,fontWeight:700,letterSpacing:"0.07em"}}>{t}</span>)}
                    </div>
                    {tapAnim===paper.id&&(
                      <div style={{position:"absolute",inset:0,zIndex:10,display:"flex",alignItems:"center",justifyContent:"center",pointerEvents:"none"}}>
                        <span style={{fontSize:100,animation:"heartPop 1s ease forwards",filter:"drop-shadow(0 0 32px rgba(255,45,120,0.9))"}}>❤️</span>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div style={{display:"flex",alignItems:"center",padding:"6px 8px 0"}}>
                    <button className="ab" onClick={()=>setLiked(p=>{const n=new Set(p);n.has(paper.id)?n.delete(paper.id):n.add(paper.id);return n;})}>
                      <span style={{fontSize:22,filter:liked.has(paper.id)?`drop-shadow(0 0 10px ${P.magenta})`:"none"}}>{liked.has(paper.id)?"❤️":"🤍"}</span>
                      <span style={{fontSize:13,color:liked.has(paper.id)?P.magenta:P.muted,fontWeight:700}}>{(paper.likes+(liked.has(paper.id)?1:0)).toLocaleString()}</span>
                    </button>
                    <button className="ab" onClick={()=>{setAP(paper);setView("paper");}}>
                      <span style={{fontSize:20}}>💬</span>
                      <span style={{fontSize:13,color:P.muted,fontWeight:700}}>{paper.comments}</span>
                    </button>
                    <button className="ab"><span style={{fontSize:20}}>📤</span></button>
                    <div style={{flex:1}}/>
                    <button className="ab" onClick={()=>setSaved(p=>{const n=new Set(p);n.has(paper.id)?n.delete(paper.id):n.add(paper.id);return n;})}>
                      <span style={{fontSize:20,filter:saved.has(paper.id)?`drop-shadow(0 0 10px ${P.gold})`:"none"}}>{saved.has(paper.id)?"🔖":"🏷️"}</span>
                    </button>
                  </div>
                  <div style={{padding:"4px 16px 16px"}}>
                    <p style={{fontSize:13,color:P.muted,lineHeight:1.65}}>
                      <span style={{color:P.white,fontWeight:600}}>{paper.pub}: </span>{paper.abstract.slice(0,110)}…
                      <span style={{color:P.cyan,cursor:"pointer"}} onClick={()=>{setAP(paper);setView("paper");}}> read more</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Suggested */}
          <div style={{margin:"22px 14px 14px"}}>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16}}>
              <div style={{height:1,flex:1,background:`linear-gradient(90deg,${P.cyan}40,transparent)`}}/>
              <span style={{fontFamily:"'Cinzel',serif",fontSize:10,color:P.muted,letterSpacing:"0.16em"}}>SUGGESTED RESEARCHERS</span>
              <div style={{height:1,flex:1,background:`linear-gradient(270deg,${P.violet}40,transparent)`}}/>
            </div>
            {RESEARCHERS.map(r=>(
              <div key={r.name} style={{display:"flex",alignItems:"center",gap:12,padding:"12px 0",borderBottom:`1px solid ${P.dim}`}}>
                <HexAvatar text={r.av} grad={r.grad} size={50} fontSize={13} glowColor={P.cyan}/>
                <div style={{flex:1}}>
                  <p style={{fontWeight:700,fontSize:15,letterSpacing:"0.04em"}}>{r.name}</p>
                  <p style={{fontSize:12,color:P.muted,letterSpacing:"0.04em"}}>{r.handle} · {r.field}</p>
                </div>
                <button className={`fhx ${followed.has(r.name)?"on":""}`} onClick={()=>setFollowed(p=>{const n=new Set(p);n.has(r.name)?n.delete(r.name):n.add(r.name);return n;})}>{followed.has(r.name)?"✓ ON":"+ FOLLOW"}</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ══════════════ EXPLORE ══════════════ */}
      {view==="explore"&&(
        <div style={{padding:16,position:"relative",zIndex:2}}>
          <div style={{position:"relative",marginBottom:22}}>
            <span style={{position:"absolute",left:14,top:"50%",transform:"translateY(-50%)",fontSize:16,filter:`drop-shadow(0 0 6px ${P.cyan})`}}>🔍</span>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search papers, topics, authors…" className="ri" style={{paddingLeft:44}}/>
          </div>
          <p style={{fontFamily:"'Cinzel',serif",fontSize:11,color:P.muted,letterSpacing:"0.16em",marginBottom:14}}>BROWSE TOPICS</p>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:26}}>
            {[{tag:"Transformers",emoji:"⚡",grad:G.plasma,rim:G.rP,color:P.violet},{tag:"Diffusion",emoji:"🎨",grad:G.nova,rim:G.rN,color:P.coral},{tag:"Biology",emoji:"🧬",grad:G.acid,rim:G.rAc,color:P.lime},{tag:"Robotics",emoji:"🤖",grad:G.ember,rim:G.rAm,color:P.gold},{tag:"Quantum",emoji:"⚛️",grad:G.aurora,rim:G.rA,color:P.cyan},{tag:"RL",emoji:"🎮",grad:G.arctic,rim:G.rA,color:P.ice}].map(({tag,emoji,grad,rim,color})=>(
              <div key={tag} onClick={()=>{setAT(tag);setView("home");}} style={{borderRadius:18,padding:1.5,background:rim,cursor:"pointer",transition:"transform 0.2s",boxShadow:`0 4px 20px ${color}22`}}>
                <div style={{background:grad,borderRadius:17,padding:"22px 14px",display:"flex",alignItems:"center",gap:10,backgroundImage:"linear-gradient(rgba(255,255,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.04) 1px,transparent 1px)",backgroundSize:"18px 18px"}}>
                  <span style={{fontSize:28,filter:"drop-shadow(0 0 12px rgba(255,255,255,0.5))"}}>{emoji}</span>
                  <span style={{fontFamily:"'Cinzel',serif",fontWeight:700,fontSize:13,color:"#fff",letterSpacing:"0.05em"}}>{tag}</span>
                </div>
              </div>
            ))}
          </div>
          <p style={{fontFamily:"'Cinzel',serif",fontSize:11,color:P.muted,letterSpacing:"0.16em",marginBottom:14}}>TRENDING</p>
          {PAPERS.map((p,i)=>(
            <div key={p.id} onClick={()=>{setAP(p);setView("paper");}} style={{borderRadius:18,padding:1.5,background:p.rim,marginBottom:12,cursor:"pointer",animation:`fadeUp 0.4s ease ${i*0.07}s both`}}>
              <div className="gc" style={{borderRadius:17,padding:14,display:"flex",gap:12}}>
                <div style={{width:72,height:72,borderRadius:14,background:p.grad,display:"flex",alignItems:"center",justifyContent:"center",fontSize:30,flexShrink:0,boxShadow:`0 0 20px ${p.color}44`}}>{p.emoji}</div>
                <div style={{flex:1,minWidth:0}}>
                  <p style={{fontWeight:700,fontSize:14,lineHeight:1.35,letterSpacing:"0.02em"}}>{p.title}</p>
                  <p style={{fontSize:12,color:P.muted,marginTop:3,letterSpacing:"0.04em"}}>{p.pub} · {p.year}</p>
                  <div style={{marginTop:8,display:"flex",gap:12}}>
                    <span style={{fontSize:12,color:P.muted}}>❤️ {p.likes.toLocaleString()}</span>
                    <span style={{fontSize:12,color:P.muted}}>📚 {(p.cited/1000).toFixed(0)}K</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ══════════════ PAPER DETAIL ══════════════ */}
      {view==="paper"&&activePaper&&(
        <div style={{position:"relative",zIndex:2,animation:"fadeIn 0.35s ease"}}>
          <div style={{position:"relative",padding:"40px 24px 52px",background:activePaper.grad,overflow:"hidden"}}>
            <div style={{position:"absolute",inset:0,backgroundImage:"linear-gradient(rgba(255,255,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.04) 1px,transparent 1px)",backgroundSize:"28px 28px"}}/>
            <div style={{position:"absolute",inset:0,background:"radial-gradient(circle at 50% 30%,rgba(255,255,255,0.16) 0%,transparent 58%)"}}/>
            <div style={{position:"relative",zIndex:2}}>
              <div style={{fontSize:66,textAlign:"center",marginBottom:18,animation:"float 4s ease infinite",filter:`drop-shadow(0 0 32px ${activePaper.color}cc)`}}>{activePaper.emoji}</div>
              <h1 style={{fontFamily:"'Cinzel',serif",fontSize:22,color:"#fff",textAlign:"center",lineHeight:1.4,textShadow:`0 0 40px ${activePaper.color}88`}}>{activePaper.title}</h1>
              <p style={{textAlign:"center",color:"rgba(255,255,255,0.68)",fontSize:14,marginTop:10,fontStyle:"italic"}}>{activePaper.authors}</p>
              <div style={{display:"flex",justifyContent:"center",gap:26,marginTop:22}}>
                {[["❤️",activePaper.likes+(liked.has(activePaper.id)?1:0)],["💬",activePaper.comments],["📚",`${(activePaper.cited/1000).toFixed(0)}K`]].map(([ic,v])=>(
                  <div key={ic} style={{textAlign:"center"}}>
                    <p style={{fontSize:20,fontWeight:700,color:"#fff",fontFamily:"'Space Mono',monospace"}}>{typeof v==="number"?v.toLocaleString():v}</p>
                    <p style={{fontSize:12,color:"rgba(255,255,255,0.62)",marginTop:2}}>{ic}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{padding:18}}>
            {/* Publisher */}
            <GC rim={activePaper.rim} style={{marginBottom:20}}>
              <div style={{padding:"14px 16px",display:"flex",alignItems:"center",gap:12}}>
                <HexAvatar text={activePaper.av} grad={activePaper.grad} size={50} fontSize={14} glowColor={activePaper.color}/>
                <div style={{flex:1}}>
                  <div style={{display:"flex",alignItems:"center",gap:7}}>
                    <span style={{fontWeight:700,fontSize:15}}>{activePaper.pub}</span>
                    <span style={{fontSize:10,color:P.cyan,background:"rgba(0,255,209,0.1)",padding:"2px 7px",borderRadius:4,fontWeight:700,letterSpacing:"0.05em"}}>✓</span>
                  </div>
                  <span style={{fontSize:12,color:P.muted,letterSpacing:"0.04em"}}>{activePaper.handle} · {activePaper.journal}</span>
                </div>
                <button className={`fhx ${followed.has(activePaper.pub)?"on":""}`} onClick={()=>setFollowed(p=>{const n=new Set(p);n.has(activePaper.pub)?n.delete(activePaper.pub):n.add(activePaper.pub);return n;})}>{followed.has(activePaper.pub)?"✓ ON":"+ FOLLOW"}</button>
              </div>
            </GC>

            {/* Tags */}
            <div style={{display:"flex",flexWrap:"wrap",gap:7,marginBottom:20}}>
              {activePaper.tags.map(t=><span key={t} style={{background:`${activePaper.color}16`,color:activePaper.color,border:`1px solid ${activePaper.color}38`,padding:"5px 13px",borderRadius:5,fontSize:12,fontWeight:700,letterSpacing:"0.08em"}}>#{t}</span>)}
            </div>

            {/* Abstract */}
            <GC rim={activePaper.rim} style={{marginBottom:20}}>
              <div style={{padding:18}}>
                <p style={{fontSize:10,fontWeight:700,color:activePaper.color,textTransform:"uppercase",letterSpacing:"0.14em",marginBottom:10}}>Abstract</p>
                <p style={{fontSize:14,color:"rgba(238,240,255,0.8)",lineHeight:1.8}}>{activePaper.abstract}</p>
              </div>
            </GC>

            {/* Action buttons */}
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8,marginBottom:20}}>
              {[
                {icon:liked.has(activePaper.id)?"❤️":"🤍",label:"LIKE",fn:()=>setLiked(p=>{const n=new Set(p);n.has(activePaper.id)?n.delete(activePaper.id):n.add(activePaper.id);return n;}),active:liked.has(activePaper.id),col:P.magenta},
                {icon:saved.has(activePaper.id)?"🔖":"🏷️",label:"SAVE",fn:()=>setSaved(p=>{const n=new Set(p);n.has(activePaper.id)?n.delete(activePaper.id):n.add(activePaper.id);return n;}),active:saved.has(activePaper.id),col:P.gold},
                {icon:"📄",label:"PDF",fn:()=>{},active:false,col:P.sky},
                {icon:"📤",label:"SHARE",fn:()=>{},active:false,col:P.violet},
              ].map(({icon,label,fn,active,col})=>(
                <button key={label} onClick={fn} style={{background:active?`${col}20`:"rgba(26,30,56,0.5)",border:`1px solid ${active?col+"55":P.dim}`,borderRadius:12,padding:"13px 6px",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:5,transition:"all 0.2s",boxShadow:active?`0 0 16px ${col}28`:"none"}}>
                  <span style={{fontSize:20}}>{icon}</span>
                  <span style={{fontSize:10,fontWeight:700,color:active?col:P.muted,letterSpacing:"0.08em"}}>{label}</span>
                </button>
              ))}
            </div>

            {/* Submit CTA */}
            <div onClick={()=>setView("submit")} style={{borderRadius:18,padding:1.5,background:G.rA,marginBottom:22,cursor:"pointer",animation:"glowPulse 3s ease infinite"}}>
              <div className="gc" style={{borderRadius:17,padding:"18px 20px",display:"flex",alignItems:"center",gap:14}}>
                <div style={{width:52,height:52,borderRadius:14,background:"rgba(0,255,209,0.1)",border:"1px solid rgba(0,255,209,0.28)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,flexShrink:0}}>🚀</div>
                <div style={{flex:1}}>
                  <p style={{fontFamily:"'Cinzel',serif",fontWeight:700,fontSize:13,color:P.cyan,letterSpacing:"0.07em"}}>SUBMIT TO A PUBLISHER</p>
                  <p style={{fontSize:13,color:P.muted,marginTop:4,lineHeight:1.5}}>Send directly to Nature, NeurIPS, arXiv & more — no emails, no portals</p>
                </div>
                <span style={{color:P.cyan,fontSize:20}}>→</span>
              </div>
            </div>

            {/* Comments */}
            <p style={{fontFamily:"'Cinzel',serif",fontSize:11,color:P.muted,letterSpacing:"0.14em",marginBottom:16}}>DISCUSSION ({activePaper.comments})</p>
            <div style={{display:"flex",gap:10,marginBottom:22}}>
              <HexAvatar text="DR" grad={G.aurora} size={40} fontSize={11} glowColor={P.cyan}/>
              <div style={{flex:1,display:"flex",gap:8}}>
                <input value={comment} onChange={e=>setComment(e.target.value)} placeholder="Add to the discussion…" className="ri" style={{flex:1}}/>
                {comment&&<button onClick={()=>setComment("")} style={{background:G.aurora,border:"none",borderRadius:10,padding:"0 18px",color:"#07080F",fontWeight:700,cursor:"pointer",fontSize:13,letterSpacing:"0.05em"}}>POST</button>}
              </div>
            </div>
            {[{user:"prof_santos",av:"PS",text:"The attention mechanism here fundamentally changed sequence modeling. A landmark paper.",time:"2d",likes:234,grad:G.arctic},{user:"dr_raj_ml",av:"RM",text:"Has anyone tried replicating on low-resource languages? WMT results are impressive.",time:"3d",likes:87,grad:G.nova},{user:"alice.chen",av:"AC",text:"This completely changed my research direction. Worth 10 reads, minimum.",time:"1w",likes:156,grad:G.plasma}].map((c,i)=>(
              <div key={i} style={{display:"flex",gap:10,marginBottom:18}}>
                <HexAvatar text={c.av} grad={c.grad} size={36} fontSize={10} glowColor={P.cyan}/>
                <div style={{flex:1}}>
                  <span style={{fontWeight:700,fontSize:14,color:P.cyan}}>@{c.user} </span>
                  <span style={{fontSize:14,color:"rgba(238,240,255,0.8)"}}>{c.text}</span>
                  <div style={{display:"flex",gap:14,marginTop:6}}>
                    <span style={{fontSize:11,color:P.muted}}>{c.time}</span>
                    <span style={{fontSize:11,color:P.muted,cursor:"pointer"}}>{c.likes} likes</span>
                    <span style={{fontSize:11,color:P.cyan,cursor:"pointer"}}>REPLY</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ══════════════ SUBMIT ══════════════ */}
      {view==="submit"&&(
        <div style={{position:"relative",zIndex:2,animation:"fadeIn 0.3s ease"}}>

          {/* SUCCESS */}
          {done&&(
            <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:"72vh",padding:32,textAlign:"center"}}>
              {[...Array(10)].map((_,i)=>(
                <div key={i} style={{position:"fixed",top:0,left:`${4+i*9}%`,width:12,height:12,borderRadius:"50%",background:[P.cyan,P.violet,P.magenta,P.gold,P.lime,P.ice,P.coral,P.sky,P.cyan,P.violet][i],animation:`confetti ${1.4+i*0.12}s ease ${i*0.08}s both`,pointerEvents:"none",zIndex:999}}/>
              ))}
              <div style={{width:96,height:96,borderRadius:"50%",background:G.acid,display:"flex",alignItems:"center",justifyContent:"center",fontSize:42,marginBottom:28,animation:"bounceIn 0.7s ease",boxShadow:`0 0 60px ${P.lime}55`}}>✅</div>
              <h2 style={{fontFamily:"'Cinzel',serif",fontSize:26,background:G.aurora,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",marginBottom:14,letterSpacing:"0.07em"}}>TRANSMITTED</h2>
              <p style={{fontSize:15,color:P.muted,lineHeight:1.7,maxWidth:280}}>Paper sent to <span style={{color:P.cyan,fontWeight:700}}>{selPub?.name}</span>. Confirmation incoming.</p>
              <GC rim={G.rA} style={{marginTop:28,width:"100%"}}>
                <div style={{padding:"16px 20px",textAlign:"left"}}>
                  <p style={{fontSize:10,color:P.cyan,fontWeight:700,letterSpacing:"0.14em",marginBottom:12}}>WHAT HAPPENS NEXT</p>
                  {["Editorial review (1–2 days)","Peer review assignment","Decision notification","Publication if accepted"].map((s,i)=>(
                    <div key={i} style={{display:"flex",gap:12,alignItems:"center",marginBottom:i<3?10:0}}>
                      <div style={{width:24,height:24,borderRadius:"50%",background:i===0?G.acid:"rgba(42,45,74,0.7)",border:`1px solid ${i===0?P.lime:P.dim}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:700,color:i===0?P.bg:P.muted,flexShrink:0}}>{i+1}</div>
                      <span style={{fontSize:13,color:i===0?P.white:P.muted,letterSpacing:"0.02em"}}>{s}</span>
                    </div>
                  ))}
                </div>
              </GC>
            </div>
          )}

          {!done&&(
            <>
              {/* Progress */}
              <div style={{background:"rgba(7,8,15,0.9)",padding:"16px 20px 14px",borderBottom:"1px solid rgba(0,255,209,0.1)"}}>
                <div style={{display:"flex",gap:6,marginBottom:12}}>
                  {STEPS.map((s,i)=>(
                    <div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:6}}>
                      <div style={{width:28,height:28,borderRadius:"50%",background:i<step?G.acid:i===step?G.aurora:"rgba(42,45,74,0.8)",border:`1px solid ${i<=step?P.cyan:P.dim}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,color:i<=step?"#07080F":P.muted,transition:"all 0.35s",boxShadow:i===step?"0 0 20px rgba(0,255,209,0.5)":"none"}}>
                        {i<step?"✓":i+1}
                      </div>
                      <span style={{fontSize:9,color:i<=step?P.cyan:P.muted,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase"}}>{s}</span>
                    </div>
                  ))}
                </div>
                <div style={{height:3,background:P.dim,borderRadius:3,overflow:"hidden"}}>
                  <div style={{height:"100%",background:G.aurora,borderRadius:3,width:`${(step/3)*100}%`,transition:"width 0.4s ease",boxShadow:"0 0 10px rgba(0,255,209,0.6)"}}/>
                </div>
              </div>

              {/* STEP 0 */}
              {step===0&&(
                <div style={{padding:16,animation:"slideUp 0.35s ease"}}>
                  <h2 style={{fontFamily:"'Cinzel',serif",fontSize:19,background:G.aurora,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",letterSpacing:"0.07em",marginBottom:6}}>CHOOSE PUBLISHER</h2>
                  <p style={{fontSize:13,color:P.muted,marginBottom:18,lineHeight:1.55}}>Select a verified publisher. Direct submission — no emails, no external portals.</p>
                  <div style={{display:"flex",gap:8,overflowX:"auto",marginBottom:18,paddingBottom:4}}>
                    {["All","AI","Biology","Engineering","Open Access"].map(f=>(
                      <span key={f} className="tag" onClick={()=>setPF(f)} style={{background:pf===f?"linear-gradient(135deg,rgba(0,255,209,0.15),rgba(155,93,229,0.15))":"rgba(30,34,64,0.5)",color:pf===f?P.cyan:P.muted,border:`1px solid ${pf===f?P.cyan+"50":P.dim}`,flexShrink:0}}>{f}</span>
                    ))}
                  </div>
                  {fpubs.map((pub,i)=>(
                    <div key={pub.id} className="pc" onClick={()=>setSelPub(pub)} style={{borderRadius:20,padding:1.5,background:selPub?.id===pub.id?pub.rim:G.rP,marginBottom:12,animation:`fadeUp 0.4s ease ${i*0.06}s both`,boxShadow:selPub?.id===pub.id?`0 0 24px ${pub.color}30`:"none"}}>
                      <div className="gc" style={{borderRadius:19,padding:18}}>
                        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:14}}>
                          <div style={{width:52,height:52,borderRadius:14,background:pub.grad,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,fontWeight:800,color:"#fff",flexShrink:0,boxShadow:`0 0 20px ${pub.color}44`}}>{pub.av}</div>
                          <div style={{flex:1}}>
                            <div style={{display:"flex",alignItems:"center",gap:7}}>
                              <span style={{fontFamily:"'Cinzel',serif",fontWeight:700,fontSize:14,letterSpacing:"0.04em"}}>{pub.name}</span>
                              <span style={{fontSize:10,color:P.cyan,background:"rgba(0,255,209,0.1)",padding:"2px 7px",borderRadius:4,fontWeight:700}}>✓</span>
                              <span style={{fontSize:14}}>{pub.badge}</span>
                            </div>
                            <span style={{fontSize:12,color:P.muted}}>{pub.field}</span>
                          </div>
                          <div style={{width:22,height:22,borderRadius:"50%",border:`2px solid ${selPub?.id===pub.id?P.cyan:P.dim}`,background:selPub?.id===pub.id?G.aurora:"transparent",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.2s",flexShrink:0,boxShadow:selPub?.id===pub.id?`0 0 12px rgba(0,255,209,0.45)`:"none"}}>
                            {selPub?.id===pub.id&&<div style={{width:8,height:8,borderRadius:"50%",background:"#07080F"}}/>}
                          </div>
                        </div>
                        <p style={{fontSize:13,color:P.muted,lineHeight:1.65,marginBottom:14}}>{pub.desc}</p>
                        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginBottom:14}}>
                          {[["IF",pub.IF,"📊"],["Accept",pub.accept,"✅"],["Review",pub.review,"⏱️"]].map(([l,v,e])=>(
                            <div key={l} style={{background:"rgba(7,8,15,0.6)",border:`1px solid ${P.dim}`,borderRadius:10,padding:"10px 8px",textAlign:"center"}}>
                              <p style={{fontSize:10,color:P.muted,marginBottom:3,letterSpacing:"0.06em"}}>{e} {l}</p>
                              <p style={{fontSize:13,fontWeight:700,color:P.white,fontFamily:"'Space Mono',monospace"}}>{v}</p>
                            </div>
                          ))}
                        </div>
                        <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                          {pub.tags.slice(0,4).map(t=><span key={t} style={{background:`${pub.color}16`,color:pub.color,border:`1px solid ${pub.color}28`,padding:"3px 10px",borderRadius:4,fontSize:10,fontWeight:700,letterSpacing:"0.07em"}}>{t}</span>)}
                        </div>
                      </div>
                    </div>
                  ))}
                  <button className="cb" disabled={!selPub} onClick={()=>setStep(1)} style={{width:"100%",background:selPub?G.aurora:"rgba(42,45,74,0.5)",color:selPub?"#07080F":P.muted,marginTop:8,boxShadow:selPub?"0 8px 30px rgba(0,255,209,0.3)":"none"}}>
                    {selPub?`CONTINUE → ${selPub.name}`:"SELECT A PUBLISHER FIRST"}
                  </button>
                </div>
              )}

              {/* STEP 1 */}
              {step===1&&(
                <div style={{padding:16,animation:"slideUp 0.35s ease"}}>
                  <GC rim={selPub.rim} style={{marginBottom:22}}>
                    <div style={{padding:"12px 14px",display:"flex",alignItems:"center",gap:10}}>
                      <div style={{width:42,height:42,borderRadius:12,background:selPub.grad,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,fontWeight:800,color:"#fff"}}>{selPub.av}</div>
                      <div>
                        <p style={{fontWeight:700,fontSize:14,letterSpacing:"0.04em"}}>{selPub.name}</p>
                        <p style={{fontSize:12,color:P.muted}}>Accept: <span style={{color:P.cyan}}>{selPub.accept}</span> · Review: <span style={{color:P.gold}}>{selPub.review}</span></p>
                      </div>
                    </div>
                  </GC>
                  <h2 style={{fontFamily:"'Cinzel',serif",fontSize:18,background:G.plasma,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",letterSpacing:"0.07em",marginBottom:18}}>MANUSCRIPT DETAILS</h2>
                  <div style={{display:"flex",flexDirection:"column",gap:14}}>
                    {[{k:"title",l:"Paper Title",ph:"e.g. Attention Is All You Need"},{k:"authors",l:"Authors",ph:"e.g. Vaswani A., Shazeer N., Parmar N., et al."},{k:"keywords",l:"Keywords",ph:"e.g. transformers, NLP, self-attention"}].map(({k,l,ph})=>(
                      <div key={k}>
                        <label style={{fontSize:10,fontWeight:700,color:P.muted,marginBottom:7,display:"block",textTransform:"uppercase",letterSpacing:"0.12em"}}>{l}</label>
                        <input className="ri" value={form[k]} onChange={e=>setForm(d=>({...d,[k]:e.target.value}))} placeholder={ph}/>
                      </div>
                    ))}
                    <div>
                      <label style={{fontSize:10,fontWeight:700,color:P.muted,marginBottom:7,display:"block",textTransform:"uppercase",letterSpacing:"0.12em"}}>Abstract</label>
                      <textarea className="rta" value={form.abstract} onChange={e=>setForm(d=>({...d,abstract:e.target.value}))} placeholder="Summarize your research in 150–300 words…"/>
                    </div>
                    <div>
                      <label style={{fontSize:10,fontWeight:700,color:P.muted,marginBottom:7,display:"block",textTransform:"uppercase",letterSpacing:"0.12em"}}>Upload PDF</label>
                      <div onClick={()=>setForm(d=>({...d,file:!d.file}))} style={{border:`2px dashed ${form.file?P.cyan:P.dim}`,borderRadius:14,padding:"26px 16px",textAlign:"center",cursor:"pointer",background:form.file?"rgba(0,255,209,0.04)":"rgba(7,8,15,0.4)",transition:"all 0.25s",boxShadow:form.file?`0 0 24px rgba(0,255,209,0.15)`:"none"}}>
                        {form.file?(
                          <div style={{animation:"scaleIn 0.3s ease"}}>
                            <div style={{fontSize:32,marginBottom:8,filter:`drop-shadow(0 0 14px ${P.lime})`}}>✅</div>
                            <p style={{fontWeight:700,fontSize:14,color:P.cyan,letterSpacing:"0.04em"}}>manuscript.pdf uploaded</p>
                            <p style={{fontSize:12,color:P.muted,marginTop:4}}>Tap to replace</p>
                          </div>
                        ):(
                          <>
                            <div style={{fontSize:32,marginBottom:10}}>📄</div>
                            <p style={{fontWeight:600,fontSize:14,color:P.muted,letterSpacing:"0.05em"}}>TAP TO UPLOAD PDF</p>
                            <p style={{fontSize:12,color:P.muted,marginTop:4,opacity:0.6}}>Max 50MB · PDF format</p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div style={{display:"flex",gap:10,marginTop:22}}>
                    <button className="cb" onClick={()=>setStep(0)} style={{flex:1,background:"rgba(42,45,74,0.5)",color:P.muted,border:`1px solid ${P.dim}`}}>← BACK</button>
                    <button className="cb" disabled={!canN1} onClick={()=>setStep(2)} style={{flex:2,background:canN1?G.plasma:"rgba(42,45,74,0.5)",color:canN1?"#fff":P.muted,boxShadow:canN1?"0 8px 24px rgba(155,93,229,0.4)":"none"}}>NEXT: CHECKLIST →</button>
                  </div>
                </div>
              )}

              {/* STEP 2 */}
              {step===2&&(
                <div style={{padding:16,animation:"slideUp 0.35s ease"}}>
                  <h2 style={{fontFamily:"'Cinzel',serif",fontSize:18,background:G.nova,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",letterSpacing:"0.07em",marginBottom:18}}>REQUIREMENTS</h2>
                  {[{k:"cover",icon:"📝",t:"Cover Letter",d:"Letter to editor explaining significance and fit."},{k:"data",icon:"💾",t:"Data Availability",d:"Statement on how datasets can be accessed."},{k:"ethics",icon:"⚖️",t:"Ethics & Compliance",d:"Research adheres to all ethical guidelines."},{k:"orig",icon:"🔒",t:"Originality Declaration",d:"Work is original and not under review elsewhere."}].map(req=>(
                    <div key={req.k} onClick={()=>setForm(d=>({...d,[req.k]:!d[req.k]}))} style={{borderRadius:16,padding:1.5,background:form[req.k]?G.rA:`linear-gradient(135deg,${P.dim},${P.rim})`,marginBottom:10,cursor:"pointer",transition:"all 0.2s",boxShadow:form[req.k]?"0 4px 22px rgba(0,255,209,0.18)":"none"}}>
                      <div className="gc" style={{borderRadius:15,padding:"14px 16px",display:"flex",gap:14,alignItems:"flex-start"}}>
                        <div style={{width:26,height:26,borderRadius:7,background:form[req.k]?G.aurora:P.dim,border:`1px solid ${form[req.k]?P.cyan:P.muted}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,color:form[req.k]?"#07080F":P.muted,transition:"all 0.2s",flexShrink:0,fontWeight:700,boxShadow:form[req.k]?"0 0 12px rgba(0,255,209,0.4)":"none"}}>
                          {form[req.k]?"✓":""}
                        </div>
                        <div style={{flex:1}}>
                          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
                            <span style={{fontSize:16}}>{req.icon}</span>
                            <p style={{fontWeight:700,fontSize:14,color:form[req.k]?P.cyan:P.white,letterSpacing:"0.03em"}}>{req.t}</p>
                          </div>
                          <p style={{fontSize:13,color:P.muted,lineHeight:1.55}}>{req.d}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                  <GC rim={selPub.rim} style={{margin:"16px 0 22px"}}>
                    <div style={{padding:"14px 16px"}}>
                      <p style={{fontWeight:700,fontSize:11,color:selPub.color,letterSpacing:"0.12em",marginBottom:6}}>ℹ️ {selPub.name.toUpperCase()}</p>
                      <p style={{fontSize:13,color:P.muted,lineHeight:1.6}}>Avg review: <span style={{color:P.gold,fontWeight:700}}>{selPub.review}</span> · Acceptance rate: <span style={{color:P.lime,fontWeight:700}}>{selPub.accept}</span>. Status updates at each stage.</p>
                    </div>
                  </GC>
                  <div style={{display:"flex",gap:10}}>
                    <button className="cb" onClick={()=>setStep(1)} style={{flex:1,background:"rgba(42,45,74,0.5)",color:P.muted,border:`1px solid ${P.dim}`}}>← BACK</button>
                    <button className="cb" disabled={!allChk} onClick={()=>setStep(3)} style={{flex:2,background:allChk?G.nova:"rgba(42,45,74,0.5)",color:allChk?"#fff":P.muted,boxShadow:allChk?"0 8px 24px rgba(255,45,120,0.35)":"none"}}>REVIEW & SUBMIT →</button>
                  </div>
                </div>
              )}

              {/* STEP 3 */}
              {step===3&&(
                <div style={{padding:16,animation:"slideUp 0.35s ease"}}>
                  <h2 style={{fontFamily:"'Cinzel',serif",fontSize:18,background:G.acid,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",letterSpacing:"0.07em",marginBottom:18}}>FINAL REVIEW</h2>
                  <div style={{borderRadius:20,padding:1.5,background:selPub.rim,marginBottom:16,boxShadow:`0 6px 30px ${selPub.color}28`}}>
                    <div style={{borderRadius:19,padding:18,background:selPub.grad,position:"relative",overflow:"hidden"}}>
                      <div style={{position:"absolute",inset:0,backgroundImage:"linear-gradient(rgba(255,255,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.04) 1px,transparent 1px)",backgroundSize:"22px 22px"}}/>
                      <div style={{position:"relative",zIndex:2}}>
                        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:14}}>
                          <div style={{width:48,height:48,borderRadius:13,background:"rgba(255,255,255,0.18)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,fontWeight:800,color:"#fff"}}>{selPub.av}</div>
                          <div>
                            <p style={{fontFamily:"'Cinzel',serif",fontWeight:700,fontSize:15,color:"#fff",letterSpacing:"0.06em"}}>{selPub.name} ✅</p>
                            <p style={{fontSize:12,color:"rgba(255,255,255,0.62)"}}>{selPub.handle||`@${selPub.id}`}</p>
                          </div>
                        </div>
                        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                          {[["Accept Rate",selPub.accept],["Avg Review",selPub.review]].map(([l,v])=>(
                            <div key={l} style={{background:"rgba(7,8,15,0.3)",borderRadius:10,padding:"10px 12px",backdropFilter:"blur(6px)"}}>
                              <p style={{fontSize:10,color:"rgba(255,255,255,0.5)",letterSpacing:"0.08em",marginBottom:3}}>{l}</p>
                              <p style={{fontSize:15,fontWeight:700,color:"#fff",fontFamily:"'Space Mono',monospace"}}>{v}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <GC rim={G.rP} style={{marginBottom:16}}>
                    <div style={{padding:18}}>
                      <p style={{fontSize:10,fontWeight:700,color:P.cyan,letterSpacing:"0.14em",marginBottom:14}}>YOUR PAPER</p>
                      {[["Title",form.title||"—"],["Authors",form.authors||"—"],["Keywords",form.keywords||"—"],["File","manuscript.pdf ✅"]].map(([l,v])=>(
                        <div key={l} style={{display:"flex",gap:12,marginBottom:10,paddingBottom:10,borderBottom:`1px solid ${P.dim}`}}>
                          <span style={{fontSize:10,color:P.muted,fontWeight:700,minWidth:70,letterSpacing:"0.08em",textTransform:"uppercase"}}>{l}</span>
                          <span style={{fontSize:13,color:P.white,flex:1,wordBreak:"break-word"}}>{v}</span>
                        </div>
                      ))}
                      <div style={{display:"flex",gap:12}}>
                        <span style={{fontSize:10,color:P.muted,fontWeight:700,minWidth:70,letterSpacing:"0.08em",textTransform:"uppercase"}}>Abstract</span>
                        <span style={{fontSize:13,color:"rgba(238,240,255,0.75)",flex:1,lineHeight:1.6}}>{form.abstract.slice(0,130)}{form.abstract.length>130?"…":""}</span>
                      </div>
                    </div>
                  </GC>
                  <GC rim={G.rAc} style={{marginBottom:24}}>
                    <div style={{padding:"14px 16px"}}>
                      <p style={{fontWeight:700,fontSize:10,color:P.lime,letterSpacing:"0.14em",marginBottom:12}}>✓ ALL REQUIREMENTS MET</p>
                      {["Cover Letter","Data Availability","Ethics & Compliance","Originality Declaration"].map(s=>(
                        <div key={s} style={{display:"flex",gap:10,alignItems:"center",marginBottom:8}}>
                          <div style={{width:18,height:18,borderRadius:"50%",background:G.acid,display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,color:P.bg,fontWeight:700,flexShrink:0}}>✓</div>
                          <span style={{fontSize:13,color:P.muted}}>{s}</span>
                        </div>
                      ))}
                    </div>
                  </GC>
                  <div style={{display:"flex",gap:10}}>
                    <button className="cb" onClick={()=>setStep(2)} style={{flex:1,background:"rgba(42,45,74,0.5)",color:P.muted,border:`1px solid ${P.dim}`}}>← BACK</button>
                    <button className="cb" onClick={finish} style={{flex:2,background:G.aurora,color:"#07080F",boxShadow:"0 8px 36px rgba(0,255,209,0.5)",animation:"glowPulse 2s ease infinite"}}>🚀 TRANSMIT TO {selPub.name.toUpperCase()}</button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* ══════════════ PROFILE ══════════════ */}
      {view==="profile"&&(
        <div style={{position:"relative",zIndex:2}}>
          <div style={{padding:20,borderBottom:`1px solid ${P.dim}`}}>
            <div style={{display:"flex",alignItems:"flex-start",gap:20,marginBottom:18}}>
              <div style={{padding:2.5,borderRadius:"50%",background:G.aurora,boxShadow:"0 0 28px rgba(0,255,209,0.45)"}}>
                <div style={{width:82,height:82,borderRadius:"50%",background:G.plasma,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Cinzel',serif",fontSize:24,fontWeight:700,color:"#fff",border:"3px solid #111327"}}>DR</div>
              </div>
              <div style={{flex:1}}>
                <div style={{display:"flex",justifyContent:"space-around",marginBottom:16}}>
                  {[["12","Papers"],["47","Followers"],["18","Following"]].map(([n,l])=>(
                    <div key={l} style={{textAlign:"center"}}>
                      <p style={{fontWeight:700,fontSize:22,fontFamily:"'Space Mono',monospace",background:G.aurora,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>{n}</p>
                      <p style={{fontSize:10,color:P.muted,letterSpacing:"0.1em"}}>{l}</p>
                    </div>
                  ))}
                </div>
                <button style={{width:"100%",background:"rgba(30,34,64,0.7)",border:`1px solid ${P.dim}`,borderRadius:10,padding:"9px 14px",fontWeight:700,fontSize:13,cursor:"pointer",color:P.white,letterSpacing:"0.08em"}}>EDIT PROFILE</button>
              </div>
            </div>
            <p style={{fontWeight:700,fontSize:16,letterSpacing:"0.04em"}}>Dr. Researcher</p>
            <p style={{fontSize:13,color:P.muted}}>Machine Learning Researcher</p>
            <p style={{fontSize:13,color:P.cyan,marginTop:4}}>Stanford University · @dr.researcher</p>
            <div style={{display:"flex",gap:7,marginTop:12,flexWrap:"wrap"}}>
              {["Deep Learning","NLP","Vision"].map(t=><span key={t} style={{background:"rgba(0,255,209,0.07)",border:"1px solid rgba(0,255,209,0.18)",padding:"5px 12px",borderRadius:5,fontSize:11,fontWeight:700,color:P.cyan,letterSpacing:"0.07em"}}>#{t}</span>)}
            </div>
            <div onClick={()=>setView("submit")} style={{marginTop:18,borderRadius:14,padding:1.5,background:G.rA,cursor:"pointer",boxShadow:"0 4px 22px rgba(0,255,209,0.2)"}}>
              <div className="gc" style={{borderRadius:13,padding:"14px 16px",display:"flex",alignItems:"center",gap:12}}>
                <span style={{fontSize:24,filter:`drop-shadow(0 0 10px ${P.cyan})`}}>🚀</span>
                <div>
                  <p style={{fontFamily:"'Cinzel',serif",fontWeight:700,fontSize:12,color:P.cyan,letterSpacing:"0.09em"}}>SUBMIT A RESEARCH PAPER</p>
                  <p style={{fontSize:12,color:P.muted,marginTop:2}}>Transmit to Nature, NeurIPS, arXiv & 4 more</p>
                </div>
                <span style={{color:P.cyan,marginLeft:"auto"}}>→</span>
              </div>
            </div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:2,background:P.bg}}>
            {PAPERS.map(p=>(
              <div key={p.id} onClick={()=>{setAP(p);setView("paper");}} style={{aspectRatio:"1/1",background:p.grad,display:"flex",alignItems:"center",justifyContent:"center",fontSize:36,cursor:"pointer",position:"relative",overflow:"hidden"}}>
                <div style={{position:"absolute",inset:0,backgroundImage:"linear-gradient(rgba(0,255,209,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(0,255,209,0.05) 1px,transparent 1px)",backgroundSize:"16px 16px"}}/>
                <span style={{position:"relative",zIndex:1,filter:`drop-shadow(0 0 16px ${p.color}cc)`}}>{p.emoji}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ══════════════ MESSAGES ══════════════ */}
      {view==="messages"&&(
        <div style={{position:"relative",zIndex:2}}>
          {[...RESEARCHERS,{name:"ML Research Group",handle:"@mlgroup",av:"ML",field:"Group · 18 members",grad:G.acid,rim:G.rAc}].map((r,i)=>(
            <div key={i} onClick={()=>{setActiveChat(r);setView("chat");}} style={{display:"flex",gap:12,padding:"14px 18px",borderBottom:`1px solid ${P.dim}`,cursor:"pointer",background:i%2===0?"rgba(13,15,30,0.5)":"rgba(7,8,15,0.3)"}}>
              <HexAvatar text={r.av} grad={r.grad} size={52} fontSize={14} glowColor={P.cyan}/>
              <div style={{flex:1,minWidth:0}}>
                <div style={{display:"flex",justifyContent:"space-between"}}>
                  <p style={{fontWeight:700,fontSize:15,letterSpacing:"0.04em"}}>{r.name}</p>
                  <span style={{fontSize:11,color:P.muted,fontFamily:"'Space Mono',monospace"}}>2h</span>
                </div>
                <p style={{fontSize:13,color:P.muted,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",marginTop:3}}>Have you seen the new paper on sparse attention?</p>
              </div>
              {i<2&&<div style={{width:9,height:9,background:P.cyan,borderRadius:"50%",alignSelf:"center",flexShrink:0,boxShadow:`0 0 10px ${P.cyan}`}}/>}
            </div>
          ))}
        </div>
      )}

      {/* ══════════════ CHAT ══════════════ */}
      {view==="chat"&&(
        <div style={{display:"flex",flexDirection:"column",height:"calc(100vh - 130px)",position:"relative",zIndex:2}}>
          <div style={{flex:1,overflow:"auto",padding:16,display:"flex",flexDirection:"column",gap:10}}>
            {[{from:"other",text:"Have you read the new paper on sparse attention?"},{from:"me",text:"Yes! The efficiency gains are incredible. Sharing on PaperVault today 🔥"},{from:"other",text:"Perfect. Are you going to NeurIPS? We should collab on the poster session."},{from:"me",text:"Absolutely! I have a draft on multi-modal transformers that could work great."},{from:"other",text:"Send it over! Really looking forward to it 🚀"}].map((m,i)=>(
              <div key={i} style={{display:"flex",justifyContent:m.from==="me"?"flex-end":"flex-start"}}>
                <div style={{maxWidth:"76%",borderRadius:1.5,padding:1.5,background:m.from==="me"?G.rA:G.rP}}>
                  <div style={{background:G.card,padding:"11px 15px",borderRadius:m.from==="me"?"18px 18px 4px 18px":"18px 18px 18px 4px"}}>
                    <p style={{fontSize:14,color:P.white,lineHeight:1.55}}>{m.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{padding:"10px 14px",borderTop:`1px solid ${P.dim}`,background:"rgba(7,8,15,0.92)",backdropFilter:"blur(16px)",display:"flex",gap:10,alignItems:"center"}}>
            <input value={msg} onChange={e=>setMsg(e.target.value)} placeholder="Message…" className="ri" style={{flex:1}} onKeyDown={e=>e.key==="Enter"&&setMsg("")}/>
            {msg?(
              <button onClick={()=>setMsg("")} style={{background:G.aurora,border:"none",width:44,height:44,borderRadius:"50%",color:"#07080F",fontSize:16,cursor:"pointer",fontWeight:700,boxShadow:"0 0 16px rgba(0,255,209,0.5)"}}>↑</button>
            ):(
              <div style={{display:"flex",gap:6}}>
                <button style={{background:"none",border:"none",fontSize:20,cursor:"pointer"}}>❤️</button>
                <button style={{background:"none",border:"none",fontSize:20,cursor:"pointer"}}>📸</button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ══════════════ NOTIFICATIONS ══════════════ */}
      {view==="notifications"&&(
        <div style={{position:"relative",zIndex:2}}>
          <div style={{padding:"14px 18px",borderBottom:`1px solid ${P.dim}`}}>
            <p style={{fontFamily:"'Cinzel',serif",fontSize:11,color:P.muted,letterSpacing:"0.16em"}}>THIS WEEK</p>
          </div>
          {[
            {av:"YL",name:"ylecun",  action:"liked your paper",     target:"Attention Is All You Need",time:"2h", grad:G.plasma,emoji:"❤️"},
            {av:"AK",name:"karpathy",action:"started following you", target:"",                        time:"5h", grad:G.nova,  emoji:"👤"},
            {av:"FL",name:"feifeili",action:"commented on your post",target:"",                        time:"1d", grad:G.arctic,emoji:"💬"},
            {av:"OA",name:"openai",  action:"saved your paper",     target:"CLIP: Learning from NL",  time:"2d", grad:G.ember, emoji:"🔖"},
            {av:"DM",name:"deepmind",action:"cited your work in",   target:"AlphaFold Paper",          time:"3d", grad:G.acid,  emoji:"📚"},
            {av:"N", name:"neurips", action:"reviewed your submission",target:"requested revisions",  time:"4d", grad:G.plasma,emoji:"🔬"},
          ].map((n,i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",gap:12,padding:"13px 18px",borderBottom:`1px solid rgba(30,34,64,0.5)`,animation:`fadeUp 0.4s ease ${i*0.07}s both`}}>
              <HexAvatar text={n.av} grad={n.grad} size={46} fontSize={12} glowColor={P.cyan}/>
              <p style={{flex:1,fontSize:13,lineHeight:1.5}}>
                <span style={{fontWeight:700,color:P.cyan}}>@{n.name}</span>
                <span style={{color:P.muted}}> {n.action} </span>
                {n.target&&<span style={{color:P.white,fontWeight:600}}>{n.target}</span>}
                <span style={{color:P.muted,fontSize:11}}> · {n.time}</span>
              </p>
              <span style={{fontSize:18}}>{n.emoji}</span>
            </div>
          ))}
        </div>
      )}

      {/* ══════════════ NAV ══════════════ */}
      <nav style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:480,background:"rgba(7,8,15,0.94)",backdropFilter:"blur(24px)",borderTop:"1px solid rgba(0,255,209,0.12)",display:"flex",justifyContent:"space-around",padding:"8px 0 12px",zIndex:400}}>
        {[{id:"home",icon:"⌂",label:"HOME"},{id:"explore",icon:"◎",label:"EXPLORE"},{id:"submit",icon:null,label:"SUBMIT",sp:true},{id:"notifications",icon:"◉",label:"ALERTS"},{id:"profile",icon:"◈",label:"PROFILE"}].map(n=>(
          <button key={n.id} className="nb" onClick={()=>{if(n.id==="submit"){setStep(0);setSelPub(null);setDone(false);}setView(n.id);}} style={{color:view===n.id?P.cyan:P.muted}}>
            {n.sp?(
              <div style={{width:46,height:46,borderRadius:13,background:G.aurora,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,marginBottom:-2,boxShadow:view==="submit"?"0 0 32px rgba(0,255,209,0.75)":"0 0 14px rgba(0,255,209,0.35)",transform:view==="submit"?"scale(1.12)":"scale(1)",transition:"all 0.25s"}}>🚀</div>
            ):(
              <>
                <span style={{fontSize:20,filter:view===n.id?`drop-shadow(0 0 9px ${P.cyan})`:"none",transition:"filter 0.2s"}}>{n.icon}</span>
                <span style={{letterSpacing:"0.09em",fontSize:9}}>{n.label}</span>
              </>
            )}
          </button>
        ))}
      </nav>
    </div>
  );
}
