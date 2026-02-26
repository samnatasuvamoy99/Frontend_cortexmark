import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Logo } from "../icons/Logo_Landingpage";
import insta_Logo from "../assets/instrgram.png";
import Twitter_Logo from "../assets/Twitter.jpg";
import In_Logo from "../assets/Linkedin-símbolo.png";
import youtube_LOGO from "../assets/youtube.png";
import Facebook_logo from "../assets/FAcebook_logo.jpg"
import Article from "../assets/Articale.jpg"
import url from "../assets/url_logo.jpg"

interface Platform {
  name: string;
  logo: string;
}


const DOWNLOAD_URL =
  "https://drive.usercontent.google.com/download?id=1Ak_12-JNL4aMvh7vl0sDUCGQNwOwbUxL&export=download&authuser=0";

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cabinet+Grotesk:wght@700;800;900&family=Instrument+Sans:wght@400;500;600&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --bg:#060810; --surf:#0f1422; --surf2:#141929;
    --bd:rgba(255,255,255,0.07); --bd2:rgba(255,255,255,0.13);
    --t1:#f0f2ff; --t2:#a8b0c8; --t3:#5a6380;
    --blue:#4f8ef7; --teal:#38d9c0; --purple:#8b7cf8;
  }

  .lp-page { font-family:'Instrument Sans',sans-serif; background:var(--bg); color:var(--t1); overflow-x:hidden; min-height:100vh; position:relative; }

  /* mesh */
  .lp-mesh { position:fixed; inset:0; pointer-events:none; z-index:0; overflow:hidden; }
  .lp-orb  { position:absolute; border-radius:50%; filter:blur(110px); }
  .lp-o1 { width:650px; height:650px; background:radial-gradient(circle,rgba(79,142,247,.13),transparent 70%); top:-180px; left:-120px; animation:orbA 14s ease-in-out infinite; }
  .lp-o2 { width:550px; height:550px; background:radial-gradient(circle,rgba(139,124,248,.10),transparent 70%); top:150px; right:-130px; animation:orbA 14s ease-in-out infinite; animation-delay:-5s; }
  .lp-o3 { width:450px; height:450px; background:radial-gradient(circle,rgba(56,217,192,.08),transparent 70%); bottom:-50px; left:35%; animation:orbA 14s ease-in-out infinite; animation-delay:-9s; }
  @keyframes orbA { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(28px,-36px) scale(1.04)} 66%{transform:translate(-18px,18px) scale(.97)} }

  /* ── nav ── */
  .lp-nav {
    position:fixed; top:0; left:0; right:0; z-index:300;
    display:flex; align-items:center; justify-content:space-between;
    padding:0 48px; height:64px; transition:all .3s;
  }
  .lp-nav.lp-stuck { background:rgba(6,8,16,.9); backdrop-filter:blur(24px) saturate(160%); border-bottom:1px solid var(--bd); }
  .lp-brand { display:flex; align-items:center; gap:10px; font-family:'Cabinet Grotesk',sans-serif; font-weight:900; font-size:20px; color:var(--t1); letter-spacing:-.5px; cursor:pointer; flex-shrink:0; }
  .lp-bmark { width:30px; height:30px; border-radius:9px; background:linear-gradient(135deg,var(--blue),var(--purple)); display:flex; align-items:center; justify-content:center; font-size:14px; box-shadow:0 0 18px rgba(79,142,247,.45); flex-shrink:0; }
  .lp-nav-links { display:flex; gap:2px; }
  .lp-nl { padding:7px 14px; border-radius:8px; font-size:14px; font-weight:500; color:var(--t3); background:none; border:none; cursor:pointer; font-family:'Instrument Sans',sans-serif; transition:all .2s; }
  .lp-nl:hover { color:var(--t2); background:rgba(255,255,255,.04); }
  .lp-nav-actions { display:flex; align-items:center; gap:8px; }

  /* ── buttons ── */
  .lp-btn { display:inline-flex; align-items:center; justify-content:center; gap:7px; font-family:'Instrument Sans',sans-serif; font-weight:600; border:none; border-radius:10px; cursor:pointer; transition:all .18s; white-space:nowrap; }
  .lp-sm  { padding:8px 16px;  font-size:13px; }
  .lp-lg  { padding:14px 28px; font-size:15px; border-radius:12px; }
  .lp-xl  { padding:15px 30px; font-size:16px; border-radius:13px; font-weight:700; }
  .lp-ghost   { background:transparent; color:var(--t3); }
  .lp-ghost:hover { background:rgba(255,255,255,.05); color:var(--t2); }
  .lp-outline { background:transparent; color:var(--t2); border:1px solid var(--bd2); }
  .lp-outline:hover { border-color:rgba(79,142,247,.5); color:var(--blue); }
  .lp-primary { background:linear-gradient(135deg,var(--blue),#6366f1); color:#fff; box-shadow:0 0 0 1px rgba(79,142,247,.28),0 4px 18px rgba(79,142,247,.32); }
  .lp-primary:hover { box-shadow:0 0 0 1px rgba(79,142,247,.5),0 8px 30px rgba(79,142,247,.45); transform:translateY(-2px); }
  .lp-sec { background:rgba(255,255,255,.06); color:var(--t2); border:1px solid var(--bd2); }
  .lp-sec:hover { background:rgba(255,255,255,.1); color:var(--t1); transform:translateY(-1px); }

  /* ── HERO ── */
  .lp-hero {
    position:relative; z-index:2;
    min-height:100vh; display:flex; align-items:center;
    padding:100px 48px 80px;
    max-width:1280px; margin:0 auto;
  }
  .lp-hero-grid { display:grid; grid-template-columns:1fr 1fr; gap:64px; align-items:center; width:100%; }

  .lp-eyebrow { display:inline-flex; align-items:center; gap:8px; padding:5px 14px 5px 8px; border:1px solid rgba(79,142,247,.25); border-radius:100px; background:rgba(79,142,247,.07); font-size:12.5px; font-weight:600; color:var(--blue); margin-bottom:24px; animation:lp-up .5s ease both; }
   .lp-edot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #22c55e;
  box-shadow: 0 0 7px #22c55e;
  animation: lp-pulse 2s infinite;
}
  @keyframes lp-pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.4;transform:scale(.8)} }
  @keyframes lp-up    { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }

  .lp-h1 { font-family:'Cabinet Grotesk',sans-serif; font-weight:900; font-size:clamp(40px,5vw,68px); line-height:1.03; letter-spacing:-3px; margin-bottom:20px; animation:lp-up .5s .1s ease both; opacity:0; }
  .lp-grad { background:linear-gradient(135deg,var(--blue) 0%,var(--teal) 55%,var(--purple) 100%); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; background-size:200%; animation:lp-gs 5s ease infinite; }
  @keyframes lp-gs { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }

  .lp-sub { font-size:17px; line-height:1.8; color:var(--t2); margin-bottom:36px; max-width:440px; animation:lp-up .5s .2s ease both; opacity:0; }
  .lp-cta-row { display:flex; align-items:center; gap:12px; flex-wrap:wrap; animation:lp-up .5s .3s ease both; opacity:0; }
  .lp-note-row { margin-top:18px; display:flex; align-items:center; gap:18px; flex-wrap:wrap; animation:lp-up .5s .4s ease both; opacity:0; }
  .lp-note-item { display:flex; align-items:center; gap:6px; font-size:12.5px; color:var(--t3); }
  .lp-chkc { width:16px; height:16px; border-radius:50%; background:rgba(56,217,192,.13); display:flex; align-items:center; justify-content:center; flex-shrink:0; }

  /* mock window */
  .lp-visual { position:relative; animation:lp-up .5s .15s ease both; opacity:0; padding:24px 36px 36px 0; }
  .lp-window { background:var(--surf); border:1px solid var(--bd2); border-radius:20px; overflow:hidden; box-shadow:0 0 0 1px rgba(255,255,255,.04),0 28px 70px rgba(0,0,0,.55),0 0 60px rgba(79,142,247,.09); animation:lp-wf 7s ease-in-out infinite; }
  @keyframes lp-wf { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
  .lp-winbar { display:flex; align-items:center; gap:7px; padding:12px 16px; background:var(--surf2); border-bottom:1px solid var(--bd); }
  .lp-wdot { width:10px; height:10px; border-radius:50%; }
  .lp-wurl { flex:1; height:24px; background:rgba(255,255,255,.04); border:1px solid var(--bd); border-radius:7px; display:flex; align-items:center; padding:0 10px; font-size:10.5px; color:var(--t3); font-family:monospace; gap:5px; }
  .lp-wbody { display:flex; }
  .lp-sidebar { width:48px; background:rgba(255,255,255,.02); border-right:1px solid var(--bd); padding:12px 0; display:flex; flex-direction:column; align-items:center; gap:8px; flex-shrink:0; }
  .lp-sico { width:30px; height:30px; border-radius:8px; display:flex; align-items:center; justify-content:center; font-size:13px; }
  .lp-sico.lp-on { background:rgba(79,142,247,.15); }
  .lp-wcontent { flex:1; padding:12px; min-width:0; }
  .lp-wchead { display:flex; align-items:center; justify-content:space-between; margin-bottom:10px; }
  .lp-wct { font-family:'Cabinet Grotesk',sans-serif; font-size:13px; font-weight:800; color:var(--t1); }
  .lp-wadd { padding:4px 10px; border-radius:6px; font-size:11px; font-weight:600; background:rgba(79,142,247,.14); color:var(--blue); border:1px solid rgba(79,142,247,.2); }
  .lp-bmlist { display:flex; flex-direction:column; gap:6px; }
  .lp-bm { display:flex; align-items:center; gap:9px; padding:9px 10px; border-radius:10px; background:rgba(255,255,255,.025); border:1px solid var(--bd); transition:all .22s; cursor:default; position:relative; overflow:hidden; }
  .lp-bm::before { content:''; position:absolute; left:0; top:0; bottom:0; width:3px; border-radius:3px 0 0 3px; opacity:0; transition:opacity .22s; }
  .lp-bm:hover { background:rgba(255,255,255,.055); border-color:var(--bd2); transform:translateX(3px); }
  .lp-bm:hover::before { opacity:1; }
  .lp-bthumb { width:30px; height:30px; border-radius:8px; display:flex; align-items:center; justify-content:center; font-size:13px; flex-shrink:0; }
  .lp-binfo { flex:1; min-width:0; }
  .lp-bname { font-size:11.5px; font-weight:600; color:var(--t2); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
  .lp-bmeta { font-size:10px; color:var(--t3); margin-top:2px; }
  .lp-btag  { font-size:10px; font-weight:700; padding:2px 8px; border-radius:100px; flex-shrink:0; }

  /* chips */
  .lp-chip { position:absolute; background:var(--surf2); border:1px solid var(--bd2); border-radius:13px; box-shadow:0 8px 36px rgba(0,0,0,.45),0 0 0 1px rgba(255,255,255,.04); backdrop-filter:blur(16px); }
  .lp-cstat { bottom:4px; right:6px; padding:13px 16px; animation:lp-ca 7s ease-in-out infinite; }
  @keyframes lp-ca { 0%,100%{transform:translateY(0) rotate(-1deg)} 50%{transform:translateY(-13px) rotate(1deg)} }
  .lp-cnum { font-family:'Cabinet Grotesk',sans-serif; font-size:26px; font-weight:900; background:linear-gradient(135deg,var(--blue),var(--teal)); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
  .lp-clbl { font-size:11px; color:var(--t3); margin-top:2px; }
  .lp-cplat { top:6px; right:2px; padding:12px 14px; display:flex; flex-direction:column; gap:6px; animation:lp-cb 9s ease-in-out infinite; }
  @keyframes lp-cb { 0%,100%{transform:translateY(0) rotate(.5deg)} 50%{transform:translateY(11px) rotate(-.5deg)} }
  .lp-prow { display:flex; align-items:center; gap:7px; font-size:12px; font-weight:500; color:var(--t2); }
  .lp-pdot { width:6px; height:6px; border-radius:50%; flex-shrink:0; }
  .lp-clive { top:-16px; left:16px; padding:7px 13px; display:flex; align-items:center; gap:7px; animation:lp-cc 5s ease-in-out infinite; }
  @keyframes lp-cc { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
  .lp-ldot { width:7px; height:7px; border-radius:50%; background:#34d399; animation:lp-pulse 1.5s infinite; flex-shrink:0; }
  .lp-ltxt { font-size:12px; font-weight:600; color:#34d399; }

  /* divider */
  .lp-div { position:relative; z-index:2; display:flex; align-items:center; max-width:1280px; margin:0 auto; padding:0 48px; }
  .lp-dline { flex:1; height:1px; background:linear-gradient(90deg,transparent,var(--bd),transparent); }
  .lp-dtxt  { padding:7px 18px; border-radius:100px; background:var(--surf); border:1px solid var(--bd); font-size:11px; font-weight:600; letter-spacing:2px; text-transform:uppercase; color:var(--t3); }

  /* ── SECTION 2 ── */
  .lp-sec2 { position:relative; z-index:2; padding:88px 48px; max-width:1280px; margin:0 auto; }
  .lp-sbadge { display:inline-flex; align-items:center; gap:7px; padding:4px 14px 4px 9px; border-radius:100px; background:rgba(79,142,247,.08); border:1px solid rgba(79,142,247,.2); font-size:12px; font-weight:700; color:var(--blue); letter-spacing:.5px; margin-bottom:14px; text-transform:uppercase; }
  .lp-sbadge::before { content:''; width:4px; height:4px; border-radius:50%; background:var(--blue); box-shadow:0 0 6px var(--blue); }
  .lp-h2 { font-family:'Cabinet Grotesk',sans-serif; font-weight:900; font-size:clamp(30px,4vw,52px); line-height:1.06; letter-spacing:-2px; margin-bottom:12px; color:var(--t1); }
  .lp-ssub { font-size:17px; color:var(--t2); line-height:1.75; max-width:500px; margin-bottom:52px; }
  .lp-bento { display:grid; grid-template-columns:repeat(12,1fr); gap:14px; }
  .lp-cell { background:var(--surf); border:1px solid var(--bd); border-radius:18px; padding:28px; overflow:hidden; position:relative; transition:all .25s; }
  .lp-cell:hover { border-color:var(--bd2); transform:translateY(-3px); box-shadow:0 16px 48px rgba(0,0,0,.3); }
  .lp-cglow { position:absolute; width:200px; height:200px; border-radius:50%; pointer-events:none; bottom:-70px; right:-50px; filter:blur(55px); opacity:0; transition:opacity .4s; }
  .lp-cell:hover .lp-cglow { opacity:1; }
  .lp-c1 { grid-column:span 5; } .lp-c2 { grid-column:span 7; background:linear-gradient(135deg,rgba(79,142,247,.06),rgba(139,124,248,.06)); }
  .lp-c3,.lp-c4,.lp-c5 { grid-column:span 4; }
  .lp-cico { width:44px; height:44px; border-radius:12px; display:flex; align-items:center; justify-content:center; font-size:19px; margin-bottom:16px; position:relative; z-index:1; }
  .lp-cell h4 { font-family:'Cabinet Grotesk',sans-serif; font-size:17px; font-weight:800; color:var(--t1); margin-bottom:7px; letter-spacing:-.3px; position:relative; z-index:1; }
  .lp-cell p  { font-size:13.5px; color:var(--t2); line-height:1.7; position:relative; z-index:1; }
  .lp-steps { margin-top:20px; display:flex; flex-direction:column; position:relative; z-index:1; }
  .lp-step  { display:flex; gap:13px; padding:15px 0; border-bottom:1px solid var(--bd); }
  .lp-step:last-child { border-bottom:none; padding-bottom:0; }
  .lp-snum { width:27px; height:27px; border-radius:7px; flex-shrink:0; background:rgba(79,142,247,.12); border:1px solid rgba(79,142,247,.25); color:var(--blue); font-family:'Cabinet Grotesk',sans-serif; font-size:12px; font-weight:800; display:flex; align-items:center; justify-content:center; }
  .lp-si h5 { font-size:13px; font-weight:700; color:var(--t1); margin-bottom:3px; }
  .lp-si p  { font-size:12.5px; color:var(--t2); line-height:1.6; }

  /* ── SECTION 3 ── */
  .lp-sec3 { position:relative; z-index:2; padding:0 48px 88px; max-width:1280px; margin:0 auto; }
  .lp-banner { border-radius:24px; overflow:hidden; position:relative; padding:68px 60px; background:var(--surf); border:1px solid var(--bd); }
  .lp-bmesh { position:absolute; inset:0; pointer-events:none; background:radial-gradient(ellipse 600px 380px at 0% 50%,rgba(79,142,247,.11),transparent),radial-gradient(ellipse 380px 280px at 100% 30%,rgba(139,124,248,.09),transparent),radial-gradient(ellipse 280px 280px at 60% 100%,rgba(56,217,192,.06),transparent); }
  .lp-bgrid { display:grid; grid-template-columns:1fr 1fr; gap:52px; align-items:center; position:relative; z-index:1; }
  .lp-ctaey { display:flex; align-items:center; gap:6px; font-size:12px; font-weight:700; letter-spacing:2px; text-transform:uppercase; color:var(--teal); margin-bottom:16px; }
  .lp-ctaey::before { content:''; width:18px; height:2px; background:var(--teal); border-radius:1px; }
  .lp-h3 { font-family:'Cabinet Grotesk',sans-serif; font-weight:900; font-size:clamp(28px,3.5vw,48px); line-height:1.06; letter-spacing:-2px; color:var(--t1); margin-bottom:13px; }
  .lp-ctasub { font-size:15px; color:var(--t2); line-height:1.75; margin-bottom:26px; }
  .lp-chklist { display:flex; flex-direction:column; gap:9px; margin-bottom:28px; }
  .lp-chk { display:flex; align-items:center; gap:9px; font-size:14px; color:var(--t2); }
  .lp-chkm { width:19px; height:19px; border-radius:5px; background:rgba(56,217,192,.1); border:1px solid rgba(56,217,192,.2); display:flex; align-items:center; justify-content:center; flex-shrink:0; }
  .lp-cbtns { display:flex; gap:11px; flex-wrap:wrap; }
  .lp-ctacards { display:flex; flex-direction:column; gap:13px; }
  .lp-ctacard { padding:22px 24px; border-radius:15px; background:rgba(255,255,255,.03); border:1px solid var(--bd); transition:all .22s; }
  .lp-ctacard:hover { background:rgba(255,255,255,.06); border-color:var(--bd2); }
  .lp-cchead { display:flex; align-items:center; gap:10px; margin-bottom:8px; }
  .lp-ccico { width:33px; height:33px; border-radius:9px; display:flex; align-items:center; justify-content:center; font-size:14px; flex-shrink:0; }
  .lp-cchead h4 { font-family:'Cabinet Grotesk',sans-serif; font-size:14.5px; font-weight:800; color:var(--t1); }
  .lp-ctacard > p { font-size:13px; color:var(--t2); line-height:1.65; }
  .lp-cbtn { display:inline-flex; align-items:center; gap:6px; margin-top:11px; font-size:12.5px; font-weight:700; color:var(--blue); background:rgba(79,142,247,.1); padding:6px 14px; border-radius:8px; border:1px solid rgba(79,142,247,.2); transition:all .2s; cursor:pointer; font-family:'Instrument Sans',sans-serif; }
  .lp-cbtn:hover { background:rgba(79,142,247,.18); border-color:rgba(79,142,247,.4); }
  .lp-cbtn-t { color:var(--teal)!important; background:rgba(56,217,192,.1)!important; border-color:rgba(56,217,192,.2)!important; }
  .lp-cbtn-t:hover { background:rgba(56,217,192,.18)!important; border-color:rgba(56,217,192,.4)!important; }

  /* social logos */
  .lp-social-row { display:flex; align-items:center; gap:14px; margin-top:24px; flex-wrap:wrap; }
  .lp-slogo { width:34px; height:34px; border-radius:8px; object-fit:contain; opacity:.65; transition:all .2s; filter:grayscale(20%); }
  .lp-slogo:hover { opacity:1; filter:grayscale(0%); transform:scale(1.1) rotate(4deg); }

  /* platforms */
  .lp-plats { margin-top:52px; padding-top:44px; border-top:1px solid var(--bd); position:relative; z-index:1; }
  .lp-platslbl { text-align:center; font-size:12px; font-weight:600; letter-spacing:2px; text-transform:uppercase; color:var(--t3); margin-bottom:18px; }
  .lp-platrow { display:flex; justify-content:center; gap:8px; flex-wrap:wrap; }
  .lp-ppill { display:flex; align-items:center; gap:7px; padding:8px 16px; border-radius:100px; background:rgba(255,255,255,.03); border:1px solid var(--bd); font-size:13px; font-weight:500; color:var(--t2); transition:all .2s; cursor:default; }
  .lp-ppill:hover { background:rgba(79,142,247,.08); border-color:rgba(79,142,247,.3); color:var(--blue); transform:translateY(-2px); }

  /* reveal */
  .lp-rv { opacity:0; transform:translateY(24px); transition:opacity .65s ease,transform .65s ease; }
  .lp-rv.lp-in { opacity:1; transform:translateY(0); }

  /* footer */
  .lp-footer { position:relative; z-index:2; border-top:1px solid var(--bd); padding:34px 48px; display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:16px; }
  .lp-fbrand { display:flex; align-items:center; gap:8px; font-family:'Cabinet Grotesk',sans-serif; font-weight:900; font-size:17px; color:var(--t1); }
  .lp-fsep { width:1px; height:18px; background:var(--bd); }
  .lp-fnote { font-size:12.5px; color:var(--t3); }
  .lp-fbadges { display:flex; gap:7px; flex-wrap:wrap; }
  .lp-fbadge { font-size:12px; font-weight:500; padding:4px 11px; border-radius:100px; background:rgba(255,255,255,.04); color:var(--t3); border:1px solid var(--bd); }

  /* responsive */
  @media (max-width:960px) {
    .lp-nav { padding:0 20px; } .lp-nav-links { display:none; }
    .lp-hero { padding:88px 20px 60px; }
    .lp-hero-grid { grid-template-columns:1fr; gap:48px; }
    .lp-visual { padding:20px 0 36px; }
    .lp-cplat,.lp-clive { display:none; }
    .lp-sec2 { padding:64px 20px; }
    .lp-c1,.lp-c2,.lp-c3,.lp-c4,.lp-c5 { grid-column:span 12; }
    .lp-sec3 { padding:0 20px 64px; }
    .lp-banner { padding:40px 24px; }
    .lp-bgrid { grid-template-columns:1fr; gap:36px; }
    .lp-footer { padding:28px 20px; flex-direction:column; align-items:flex-start; }
    .lp-div { padding:0 20px; }
  }
`;

// ─── SVG icons ───────────────────────────────────────
const IconDown = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12l7 7 7-7" /></svg>;
const IconRight = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>;
const IconCheck = () => <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#38d9c0" strokeWidth="3"><path d="M20 6L9 17l-5-5" /></svg>;

// ─── static data ─────────────────────────────────────
const BOOKMARKS = [
  { icon: "📺", title: "How Transformers Work — Andrej Karpathy", src: "youtube.com", time: "2h ago", tag: "AI", tBg: "rgba(79,142,247,.14)", tC: "#60a5fa", ico: "rgba(79,142,247,.12)", acc: "linear-gradient(#4f8ef7,#8b7cf8)" },
  { icon: "🐦", title: "10 startup lessons from building in public", src: "twitter.com", time: "5h ago", tag: "Biz", tBg: "rgba(52,211,153,.13)", tC: "#34d399", ico: "rgba(34,211,238,.10)", acc: "linear-gradient(#22d3ee,#34d399)" },
  { icon: "📄", title: "State of AI 2025 — Full Research Report", src: "medium.com", time: "Yesterday", tag: "Read", tBg: "rgba(245,158,11,.13)", tC: "#fbbf24", ico: "rgba(245,158,11,.10)", acc: "linear-gradient(#f59e0b,#ef4444)" },
  { icon: "🎵", title: "React 19 hidden features thread", src: "tiktok.com", time: "2d ago", tag: "Dev", tBg: "rgba(139,124,248,.13)", tC: "#a78bfa", ico: "rgba(139,124,248,.12)", acc: "linear-gradient(#8b7cf8,#ec4899)" },
  { icon: "📷", title: "5-min morning abs — no equipment", src: "instagram.com", time: "3d ago", tag: "Health", tBg: "rgba(56,217,192,.10)", tC: "#2dd4bf", ico: "rgba(56,217,192,.10)", acc: "linear-gradient(#34d399,#38d9c0)" },
];
const FEATURES = [
  { icon: "⚡", bg: "rgba(79,142,247,.12)", glow: "#4f8ef7", title: "Instant Save", desc: "Paste a link, saved in 2 seconds. Caption it, tag it — done." },
  { icon: "🔍", bg: "rgba(56,217,192,.10)", glow: "#38d9c0", title: "Smart Search", desc: "Find any bookmark instantly by title, tag, platform, or keyword." },
  { icon: "📂", bg: "rgba(245,158,11,.10)", glow: "#f59e0b", title: "Collections", desc: "Group bookmarks into collections for projects, topics, or moods." },
];

const PLATFORMS: Platform[] = [
  { name: "YouTube", logo: youtube_LOGO },
  { name: "Twitter", logo: Twitter_Logo },
  { name: "Instagram", logo: insta_Logo },
  { name: "LinkedIn", logo: In_Logo },
  { name: "Facebook", logo: Facebook_logo }, // add logo if you have it
  { name: "Articles", logo: Article },
  { name: "Any URL", logo: url },
];
const CHECKS = ["No credit card required", "Unlimited bookmarks forever", "Works on every device", "Export your data anytime"];

// ─────────────────────────────────────────────────────
export function LandingPage() {
  const navigate = useNavigate();
  const [stuck, setStuck] = useState(false);

  // sticky nav
  useEffect(() => {
    const h = () => setStuck(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  // scroll reveal
  useEffect(() => {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add("lp-in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll(".lp-rv").forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  const openDownload = () => window.open(DOWNLOAD_URL, "_blank");

  return (
    <>
      <style>{CSS}</style>
      <div className="lp-page">

        {/* mesh */}
        <div className="lp-mesh">
          <div className="lp-orb lp-o1" /><div className="lp-orb lp-o2" /><div className="lp-orb lp-o3" />
        </div>

        {/* ══ NAV ══ */}
        <nav className={`lp-nav${stuck ? " lp-stuck" : ""}`}>
          <div className="lp-brand">






            <div className="lp-bmark w-5"> <Logo /></div>
            CortexMark
          </div>

          <div className="lp-nav-links">
            <button className="lp-nl" onClick={() => scrollTo("features")}>Features</button>
            <button className="lp-nl" onClick={() => scrollTo("platforms")}>Platforms</button>
            <button className="lp-nl" onClick={openDownload}>Download</button>
            <button className="lp-nl" onClick={() => scrollTo("signup")}>Get Started</button>
          </div>

          <div className="lp-nav-actions">
            <button className="lp-btn lp-sm lp-ghost" onClick={() => navigate("/signin")}>Sign In</button>
            <button className="lp-btn lp-sm lp-outline" onClick={() => navigate("/signup")}>Sign Up</button>
            <button className="lp-btn lp-sm lp-primary" onClick={openDownload}>
              <IconDown /> Download Extension
            </button>
          </div>
        </nav>

        {/* ══ SECTION 1 — HERO ══ */}
        <div className="lp-hero">
          <div className="lp-hero-grid">

            {/* left */}
            <div>
                <div className="lp-eyebrow"><span className="lp-edot"/>Chrome Extension Now Live</div>
              <h1 className="lp-h1">
                Bookmark<br/>
                <span className="lp-grad">Everything.</span><br/>
                Browse Nothing.
              </h1>
              <p className="lp-sub">
                Stop jumping between 10 tabs. Save any video, tweet, article or link from every platform — organized in one focused, distraction-free space.
              </p>
              <div className="lp-cta-row">
                <button className="lp-btn lp-xl lp-primary" onClick={openDownload}>
                  <IconDown /> Download Extension — Free
                </button>
                <button className="lp-btn lp-xl lp-sec" onClick={() => navigate("/signup")}>
                  Get Started Free <IconRight />
                </button>
              </div>
              <div className="lp-note-row">
                {["Free forever", "No credit card", "2-min setup"].map(t => (
                  <div key={t} className="lp-note-item">
                    <div className="lp-chkc"><IconCheck /></div>{t}
                  </div>
                ))}
              </div>
            </div>

            {/* right — mock window */}
            <div className="lp-visual">
              <div className="lp-chip lp-clive">
                <div className="lp-ldot" /><span className="lp-ltxt">2 bookmarks saved just now</span>
              </div>
              <div className="lp-window">
                <div className="lp-winbar">
                  <span className="lp-wdot" style={{ background: "#ff5f57" }} />
                  <span className="lp-wdot" style={{ background: "#febc2e" }} />
                  <span className="lp-wdot" style={{ background: "#28c840" }} />
                  <div className="lp-wurl">🔒 app.cortexmark.io/library</div>
                </div>
                <div className="lp-wbody">
                  <div className="lp-sidebar">
                    {["🔖", "📂", "🔍", "⚙️"].map((ic, i) => (
                      <div key={i} className={`lp-sico${i === 0 ? " lp-on" : ""}`}>{ic}</div>
                    ))}
                  </div>
                  <div className="lp-wcontent">
                    <div className="lp-wchead">
                      <span className="lp-wct">My Library</span>
                      <span className="lp-wadd">+ Add</span>
                    </div>
                    <div className="lp-bmlist">
                      {BOOKMARKS.map((bm, i) => (
                        <div key={i} className="lp-bm">
                          <style>{`.lp-bm:nth-child(${i + 1})::before{background:${bm.acc}}`}</style>
                          <div className="lp-bthumb" style={{ background: bm.ico }}>{bm.icon}</div>
                          <div className="lp-binfo">
                            <div className="lp-bname">{bm.title}</div>
                            <div className="lp-bmeta">{bm.src} · {bm.time}</div>
                          </div>
                          <span className="lp-btag" style={{ background: bm.tBg, color: bm.tC }}>{bm.tag}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="lp-chip lp-cstat">
                <div className="lp-cnum">2.4k</div>
                <div className="lp-clbl">Bookmarks saved this week</div>
              </div>
              <div className="lp-chip lp-cplat">
                {[["#ff4444", "YouTube"], ["#1da1f2", "Twitter"], ["#e1306c", "Instagram"], ["#69c9d0", "TikTok"]].map(([c, n]) => (
                  <div key={n} className="lp-prow"><div className="lp-pdot" style={{ background: c }} />{n}</div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* divider */}
        <div className="lp-div lp-rv"><div className="lp-dline" /><div className="lp-dtxt">Features</div><div className="lp-dline" /></div>

        {/* ══ SECTION 2 — BENTO ══ */}
        <div className="lp-sec2" id="features">
          <div className="lp-rv">
            <div className="lp-sbadge">Platform</div>
            <h2 className="lp-h2">Built for heavy<br />content consumers</h2>
            <p className="lp-ssub">Everything saved, organized and searchable. No more "where did I see that?"</p>
          </div>
          <div className="lp-bento">
            <div className="lp-cell lp-c1 lp-rv">
              <div className="lp-cglow" style={{ background: "#4f8ef7" }} />
              <div className="lp-cico" style={{ background: "rgba(79,142,247,.12)" }}>✦</div>
              <h4>How it works</h4><p>Save anything in seconds. Just 3 steps.</p>
              <div className="lp-steps">
                {[{ n: "1", t: "Find content anywhere", d: "Any site, any platform — copy the URL." },
                { n: "2", t: "Paste & tag it", d: "Open CortexMark, paste link, add a note." },
                { n: "3", t: "Never open those apps again", d: "One clean dashboard. Zero distractions." }
                ].map(s => (
                  <div key={s.n} className="lp-step">
                    <div className="lp-snum">{s.n}</div>
                    <div className="lp-si"><h5>{s.t}</h5><p>{s.d}</p></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="lp-cell lp-c2 lp-rv">
              <div className="lp-cglow" style={{ background: "#8b7cf8" }} />
              <div className="lp-cico" style={{ background: "rgba(139,124,248,.12)" }}>⚡</div>
              <h4>Instant save with Chrome Extension</h4>
              <p style={{ maxWidth: 360 }}>One click from any tab. No copy-paste, no app switching. Auto-fills title, source, and thumbnail.</p>
              <div style={{ marginTop: 20, display: "flex", alignItems: "center", gap: 10, position: "relative", zIndex: 1 }}>
                <div onClick={openDownload} style={{ padding: "8px 15px", borderRadius: 10, background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.12)", fontSize: 13, color: "var(--t2)", cursor: "pointer" }}>
                  🔌 Install from Chrome Store
                </div>
                <div style={{ fontSize: 12, color: "var(--t3)" }}>Chrome · Edge · Brave</div>
              </div>
            </div>
            {FEATURES.map((f, i) => (
              <div key={f.title} className={`lp-cell lp-c${i + 3} lp-rv`}>
                <div className="lp-cglow" style={{ background: f.glow }} />
                <div className="lp-cico" style={{ background: f.bg }}>{f.icon}</div>
                <h4>{f.title}</h4><p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* divider */}
        <div className="lp-div lp-rv"><div className="lp-dline" /><div className="lp-dtxt">Get Started</div><div className="lp-dline" /></div>

        {/* ══ SECTION 3 — CTA ══ */}
        <div className="lp-sec3" id="download">
          <div className="lp-banner lp-rv">
            <div className="lp-bmesh" />
            <div className="lp-bgrid">
              {/* left — signup */}
              <div id="signup">
                <div className="lp-ctaey">Start Today</div>
                <h2 className="lp-h3">Ready to take back<br />your time?</h2>
                <p className="lp-ctasub">Join thousands who stopped endless scrolling and started saving intentionally.</p>
                <div className="lp-chklist">
                  {CHECKS.map(t => (
                    <div key={t} className="lp-chk"><div className="lp-chkm"><IconCheck /></div>{t}</div>
                  ))}
                </div>
                <div className="lp-cbtns">
                  <button className="lp-btn lp-lg lp-primary" onClick={() => navigate("/signup")}>
                    Start Bookmarking — Free <IconRight />
                  </button>
                  <button className="lp-btn lp-lg lp-ghost" style={{ color: "var(--t3)" }} onClick={() => navigate("/signin")}>
                    Sign in instead
                  </button>
                </div>


                ── Uncomment when assets are imported ──
                <div className="lp-social-row w-15 h-15">
                  <img src={insta_Logo} alt="Instagram" className="lp-slogo " />
                  <img src={Twitter_Logo} alt="Twitter" className="lp-slogo" />
                  <img src={In_Logo} alt="LinkedIn" className="lp-slogo" />
                  <img src={youtube_LOGO} alt="YouTube" className="lp-slogo" />
                </div>

              </div>

              {/* right — cards */}
              <div className="lp-ctacards">
                <div className="lp-ctacard">
                  <div className="lp-cchead">
                    <div className="lp-ccico" style={{ background: "rgba(79,142,247,.12)" }}>🔌</div>
                    <h4>Chrome Extension</h4>
                  </div>
                  <p>Install once. Bookmark anything with one click — no copy-paste. Auto-fills title and source.</p>
                  <div className="lp-cbtn" onClick={openDownload}>
                    <IconDown /> Download from Chrome Store
                  </div>
                </div>
                <div className="lp-ctacard">
                  <div className="lp-cchead">
                    <div className="lp-ccico" style={{ background: "rgba(56,217,192,.10)" }}>🌐</div>
                    <h4>Web App</h4>
                  </div>
                  <p>Full dashboard on any browser. Manage, search and organize all bookmarks from one clean interface.</p>
                  <div className="lp-cbtn lp-cbtn-t" onClick={() => navigate("/signup")}>
                    Open Web App <IconRight />
                  </div>
                </div>
              </div>
            </div>

            {/* platform pills */}
            <div className="lp-plats" id="platforms">
              <div className="lp-platslbl">Works with content from every platform</div>
              <div className="lp-platrow">

                {PLATFORMS.map((platform) => {
                  const isSmallLogo =
                    platform.logo === Article || platform.logo === url;

                  return (
                    <span
                      key={platform.name}
                      className="ppill flex items-center gap-1"
                    >
                      {platform.logo && (
                        <img
                          src={platform.logo}
                          alt={platform.name}
                          className={`
            object-contain
            ${isSmallLogo ? "w-6 h-6" : "w-8 h-8"}
            ${platform.name === "YouTube" ? "scale-225" : ""}
          `}
                        />
                      )}
                      {platform.name}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ══ FOOTER ══ */}
        <footer className="lp-footer">
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <div className="lp-fbrand">
              
              <div className="lp-bmark" style={{ width: 24, height: 24, fontSize: 11, borderRadius: 7 }}>  <Logo/></div>
              CortexMark
            </div>
            <div className="lp-fsep" />
            <div className="lp-fnote">Made with  by Suvamoy</div>
          </div>
          <div className="lp-fbadges">
            {["Free forever", "No ads", "Privacy first", "Open source"].map(b => (
              <span key={b} className="lp-fbadge">✓ {b}</span>
            ))}
          </div>
        </footer>

      </div>
    </>
  );
}