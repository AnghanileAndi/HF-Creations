import React, { useState } from 'react'
import Hero from './components/Hero'
import Gallery from './components/Gallery'

export default function App(){
  const [message, setMessage] = useState('');

  async function handleSubscribe(e){
    e.preventDefault();
    const email = e.target.email && e.target.email.value;
    if(!email){ setMessage('Please enter a valid email'); return; }
    setMessage('Subscribing...');
    const res = await subscribeEmail(email);
    if(res.ok){
      setMessage('Thanks! Check your inbox — download link sent.');
      e.target.reset();
    } else {
      setMessage(res.error && typeof res.error === 'string' ? res.error : 'Subscription failed. Try again later.');
    }
  }
  return (
    <div>
      <header className="site-header container">
        <div className="brand">HF Creations</div>
        <nav aria-label="Primary navigation">
          <a href="#courses">Courses</a>
          <a href="#works">Student Works</a>
          <a href="#blog">Blog</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main className="container">
        <Hero />
        <section id="why" className="mt-32">
          <h2>Why HF Creations?</h2>
          <p className="muted">Practical, hands-on projects, real-world briefs and reviews from industry mentors.</p>
          <div className="cards">
            <div className="card"><strong>Project-based</strong><p className="muted">Build real portfolio pieces.</p></div>
            <div className="card"><strong>Mentor Feedback</strong><p className="muted">Personalized reviews to grow faster.</p></div>
            <div className="card"><strong>Certificate</strong><p className="muted">Showcaseable completion certificate.</p></div>
          </div>
        </section>

        <Gallery />

        <section id="newsletter" className="mt-32">
          <h2>Free Design Goodies</h2>
          <p className="muted">Subscribe to get a free asset pack and exclusive tutorials.</p>
          <form id="subscribe" className="card subscribe" onSubmit={handleSubscribe}>
            <input id="email" name="email" type="email" placeholder="Your email" aria-label="Email address" required />
            <button type="submit" className="cta">Subscribe</button>
          </form>
          <p id="subscribe-note" className="muted small mt-8">{message}</p>
        </section>

      </main>

      <footer className="container mt-36 muted small">
        <p>© HF Creations — Courses · Blog · About · Contact</p>
        <p>Follow: <a href="https://www.youtube.com/channel/UCelTEjfw4Db1GB0Lj6JOL7Q">YouTube</a> · <a href="https://www.instagram.com/_hfcreations/">Instagram</a></p>
      </footer>
    </div>
  )
}

// Subscription handler (client) — calls an API endpoint. The actual API
// should be implemented as a serverless function (Netlify/Vercel) to keep
// the Mailchimp/SendGrid API key secure. The client tries common routes.
async function subscribeEmail(email){
  const payload = { email };
  const endpoints = ['/api/subscribe','/.netlify/functions/subscribe'];
  for(const e of endpoints){
    try{
      const res = await fetch(e,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
      if(res.ok) return { ok:true };
      const json = await res.json().catch(()=>null);
      // If 400-ish, return the error
      return { ok:false, error: json || `Status ${res.status}` };
    } catch(err){
      // try next endpoint
    }
  }
  return { ok:false, error: 'No endpoint available' };
}


