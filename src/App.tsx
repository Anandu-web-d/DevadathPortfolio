import Navbar from './components/Navbar'
import './App.css'
import Hero from './components/Hero'
function App() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />

        <section id="work">
          <h2>Selected Work</h2>
        </section>

        <section id="services">
          <h2>What I Do</h2>
        </section>

        <section id="about">
          <h2>About Me</h2>
        </section>

        <section id="contact">
          <h2>Let's Work Together</h2>
        </section>
      </main>
    </>
  )
}

export default App