import React from 'react'

function ResponsiveImage({alt, base}){
  // `base` is the filename without size, e.g. '/images/work-1'
  // Prefer AVIF, then WebP, then fallback (SVG/PNG).
  return (
    <picture>
      <source type="image/avif" srcSet={`${base}-400.avif 400w, ${base}-800.avif 800w`} />
      <source type="image/webp" srcSet={`${base}-400.webp 400w, ${base}-800.webp 800w`} />
      <img src={`${base}-400.webp`} alt={alt} loading="lazy" width="800" height="600" />
    </picture>
  )
}

export default function Gallery(){
  return (
    <section id="works" className="mt-32" aria-labelledby="works-heading">
      <h2 id="works-heading">Student Works</h2>
      <p className="muted">A curated selection of student projects.</p>
      <div className="grid mt-12">
        <div className="card"><ResponsiveImage base="/images/work-1" alt="Student work 1" /></div>
        <div className="card"><ResponsiveImage base="/images/work-2" alt="Student work 2" /></div>
        <div className="card"><ResponsiveImage base="/images/work-3" alt="Student work 3" /></div>
      </div>
    </section>
  )
}

