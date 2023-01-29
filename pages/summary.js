import Head from 'next/head';
import React from 'react';
import { useState } from 'react';
import styles from './index.module.css';

export default function Home() {
  const [text, settext] = useState('');
  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState('');

  async function onSubmit(event) {
    event.preventDefault();
    if (loading) {
      return;
    }
    setLoading(true);
    setResult('');
    const response = await fetch('/api/smartbrief', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });
    const data = await response.json();
    setResult(data.result.replaceAll('\n', '<br />'));
    setLoading(false);
  }

  return (
    <div style={{backgroundColor: '#F5F5F5'}}>
  <Head>
    <title>ChatGPT Gift Suggestions</title>
    <link rel="icon" href="/icon.png" />
  </Head>

  <main style={{display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px'}}>
    <h1 style={{color: '#3F3F3F'}}>Smartbrief</h1>
    <form onSubmit={onSubmit} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: '80%', marginTop: '10px'}}>
      <label style={{color: '#3F3F3F'}}>Summary Generator:</label>
      <input
        style={{width: '100%', height: '40px', marginTop: '10px', paddingLeft: '10px', borderRadius: '5px', border: '1px solid #C1C1C1'}}
        type="text"
        name="Text"
        placeholder="Enter text for summary"
        value={text}
        onChange={(e) => settext(e.target.value)}
      />
      <input type="submit" value="Generate Summary" style={{width: '100%', height: '40px', marginTop: '20px', backgroundColor: '#3F3F3F', color: 'white', borderRadius: '5px', border: 'none'}} />
    </form>
    {loading && (
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px'}}>
        <h3 style={{color: '#3F3F3F'}}>Looking for the best summary 💡</h3>
        <img src="/yay.webp" style={{width: '50px', height: '50px'}} />
      </div>
    )}
    <div
      style={{marginTop: '20px', width: '80%', padding: '20px', backgroundColor: 'white', borderRadius: '5px'}}
      dangerouslySetInnerHTML={{ __html: result }}
    />
  </main>
</div>
);

}