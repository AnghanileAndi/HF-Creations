import React from 'react'

export default function Hero(){
  return (
    <section className="hero" aria-labelledby="hero-heading">
      <div className="hero-content">
        <h1 id="hero-heading">World-class design & motion courses for creatives</h1>
        <p className="muted">Join 40,000+ learners from 150+ countries. Project-based courses, career-focused curriculum and portfolio-ready work.</p>
        <a className="cta" href="/all-courses/">Explore Courses</a>
        <p className="muted small mt-8">Upskill at your pace — beginner to pro level.</p>
      </div>
      <aside className="card hero-side" aria-hidden="false">
        <div className="hero-image-wrap" data-parallax>
          <img src="/images/hero.svg" alt="Decorative hero art" className="hero-art" />
        </div>
        <h3>Most Popular</h3>
        <ul>
          <li>Adobe Photoshop — Beginner to Advanced</li>
          <li>After Effects — Motion & VFX</li>
          <li>Illustrator — Logo & Vector</li>
        </ul>
      </aside>
    </section>
  )
}

// Simple parallax: move hero art slightly based on pointer movement for depth
import { useEffect } from 'react'
useEffect(() => {
  const wrap = document.querySelector('[data-parallax]');
  if(!wrap) return;
  function onMove(e){
    const rect = wrap.getBoundingClientRect();
    const cx = rect.left + rect.width/2;
    const cy = rect.top + rect.height/2;
    const dx = (e.clientX - cx) / rect.width;
    const dy = (e.clientY - cy) / rect.height;
    const art = wrap.querySelector('.hero-art');
    if(art) art.style.transform = `translate3d(${dx*10}px,${dy*10}px,0) scale(1.01)`;
  }
  function onLeave(){ const art = wrap.querySelector('.hero-art'); if(art) art.style.transform = '' }
  window.addEventListener('pointermove', onMove);
  window.addEventListener('pointerleave', onLeave);
  return () => { window.removeEventListener('pointermove', onMove); window.removeEventListener('pointerleave', onLeave); }
}, [])
