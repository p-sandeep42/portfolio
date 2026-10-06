import { ArrowDown, ExternalLink, Mail, FileDown, Code2, Sparkles, Send } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { CHAPTERS } from '../data/chapters';

export default function Overlay({ onSelectChapter }) {
  const [hero, about, skills, projects, contact] = CHAPTERS;

  return (
    <div className="chapters-scroll-track">
      {/* 1. HERO CHAPTER */}
      <section id="hero" className="chapter-section align-left">
        <div className="chapter-card">
          <div className="badge-tag">
            <Sparkles size={13} /> {hero.badge}
          </div>
          <h1 className="chapter-title">{hero.title}</h1>
          <div className="chapter-subtitle">{hero.subtitle}</div>
          <p className="chapter-desc">{hero.description}</p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button className="btn-primary" onClick={() => onSelectChapter(1)}>
              Explore Journey <ArrowDown size={16} />
            </button>
            <a href="mailto:sandeep@example.com" className="btn-secondary">
              <Mail size={16} /> Get In Touch
            </a>
          </div>
        </div>
      </section>

      {/* 2. ABOUT CHAPTER */}
      <section id="about" className="chapter-section align-right">
        <div className="chapter-card">
          <div className="badge-tag" style={{ background: '#e0533c' }}>
            {about.badge}
          </div>
          <h2 className="chapter-title">{about.title}</h2>
          <div className="chapter-subtitle">{about.subtitle}</div>
          <p className="chapter-desc">{about.description}</p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '10px',
              marginTop: '1.2rem',
              marginBottom: '1.4rem',
            }}
          >
            {about.highlights.map((h, i) => (
              <div
                key={i}
                style={{
                  background: '#f7f6f8',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  border: '1.5px solid var(--color-ink)',
                }}
              >
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#777' }}>
                  {h.label}
                </div>
                <div style={{ fontWeight: 700, fontSize: '0.92rem', marginTop: '2px' }}>
                  {h.value}
                </div>
              </div>
            ))}
          </div>

          <button className="btn-primary" onClick={() => onSelectChapter(2)}>
            Inspect Engine & Skills →
          </button>
        </div>
      </section>

      {/* 3. SKILLS CHAPTER */}
      <section id="skills" className="chapter-section align-left">
        <div className="chapter-card">
          <div className="badge-tag" style={{ background: '#2a9d8f' }}>
            <Code2 size={13} /> {skills.badge}
          </div>
          <h2 className="chapter-title">{skills.title}</h2>
          <div className="chapter-subtitle">{skills.subtitle}</div>
          <p className="chapter-desc">{skills.description}</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {skills.categories.map((cat, idx) => (
              <div key={idx}>
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    color: '#666',
                    marginBottom: '6px',
                  }}
                >
                  {cat.name}
                </div>
                <div className="skills-grid">
                  {cat.skills.map((s, sIdx) => (
                    <span key={sIdx} className="skill-chip">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '1.6rem' }}>
            <button className="btn-primary" onClick={() => onSelectChapter(3)}>
              View Projects On The Road →
            </button>
          </div>
        </div>
      </section>

      {/* 4. PROJECTS CHAPTER */}
      <section id="projects" className="chapter-section align-right">
        <div className="chapter-card" style={{ maxWidth: '520px' }}>
          <div className="badge-tag" style={{ background: '#f2a900', color: '#2a2530' }}>
            {projects.badge}
          </div>
          <h2 className="chapter-title">{projects.title}</h2>
          <div className="chapter-subtitle">{projects.subtitle}</div>
          <p className="chapter-desc">{projects.description}</p>

          <div className="projects-container">
            {projects.projectsList.map((p) => (
              <div key={p.id} className="project-item">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      color: '#d9453d',
                    }}
                  >
                    {p.badge}
                  </span>
                  <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#888' }}>
                    {p.category}
                  </span>
                </div>
                <h4>{p.title}</h4>
                <p>{p.description}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '10px' }}>
                  {p.stack.map((t, ti) => (
                    <span
                      key={ti}
                      style={{
                        background: '#edf2f7',
                        fontSize: '0.7rem',
                        fontFamily: 'var(--font-mono)',
                        padding: '2px 8px',
                        borderRadius: '4px',
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <a href={p.liveUrl} target="_blank" rel="noreferrer" className="btn-secondary" style={{ padding: '6px 14px', fontSize: '0.75rem' }}>
                    <ExternalLink size={13} /> Demo
                  </a>
                  <a href={p.githubUrl} target="_blank" rel="noreferrer" className="btn-secondary" style={{ padding: '6px 14px', fontSize: '0.75rem' }}>
                    <GithubIcon size={13} /> Code
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '1.5rem' }}>
            <button className="btn-primary" onClick={() => onSelectChapter(4)}>
              Pull Over & Connect →
            </button>
          </div>
        </div>
      </section>

      {/* 5. CONTACT CHAPTER */}
      <section id="contact" className="chapter-section align-center">
        <div className="chapter-card dark-theme-card" style={{ maxWidth: '620px' }}>
          <div className="badge-tag">
            {contact.badge}
          </div>
          <h2 className="chapter-title">{contact.title}</h2>
          <div className="chapter-subtitle">{contact.subtitle}</div>
          <p className="chapter-desc">{contact.description}</p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
              gap: '12px',
              margin: '1.6rem 0',
            }}
          >
            {contact.socials.map((s, idx) => (
              <a
                key={idx}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="btn-secondary"
                style={{
                  backgroundColor: '#272332',
                  color: '#fff',
                  borderColor: '#ffd98a',
                  flexDirection: 'column',
                  padding: '12px',
                  boxShadow: '3px 3px 0px #ffd98a',
                }}
              >
                {s.name === 'Email' && <Mail size={18} color="#ffd98a" />}
                {s.name === 'GitHub' && <GithubIcon size={18} color="#ffd98a" />}
                {s.name === 'LinkedIn' && <LinkedinIcon size={18} color="#ffd98a" />}
                {s.name === 'LeetCode' && <Code2 size={18} color="#ffd98a" />}
                <span style={{ fontSize: '0.8rem', marginTop: '4px' }}>{s.name}</span>
              </a>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href="mailto:sandeep@example.com?subject=Opportunity%20Discussion"
              className="btn-primary"
              style={{ backgroundColor: '#ffd98a', color: '#2a2530', borderColor: '#2a2530' }}
            >
              <Send size={16} /> Hire Me
            </a>
            <a
              href="/resume.pdf"
              download
              className="btn-secondary"
              style={{ backgroundColor: '#2a2530', color: '#ffffff', borderColor: '#ffffff' }}
            >
              <FileDown size={16} /> Download Resume
            </a>
          </div>

          <div style={{ marginTop: '2rem', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', opacity: 0.6 }}>
            © {new Date().getFullYear()} P. SANDEEP • VITS (2024–2028) • BUILT WITH THREE.JS & REACT
          </div>
        </div>
      </section>
    </div>
  );
}
