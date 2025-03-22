import { useState } from 'react';
import { FadeIn, ScaleIn, SlideInLeft, SlideInRight, Hover } from '../components/Animation';
import Head from 'next/head';
import Image from 'next/image';
import Logo from '../images/seyu_logo.png';
import content from '../content.json';
export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0D0D0D]">
      <Head>
        <title>{content.meta.title}</title>
        <link rel="icon" href="/images/favicon.ico" />
      </Head>
      {/* Header */}
      <header className="fixed w-full z-50 backdrop-blur-sm bg-black/20">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <SlideInLeft>
              <a href="/" className="text-white flex items-center">
                <Image 
                  src={Logo} 
                  alt={content.header.logo} 
                  width={40} 
                  height={40} 
                  className="w-[24px] h-[24px] md:w-[40px] md:h-[40px]" 
                  priority 
                />
              </a>
            </SlideInLeft>
            <div className="hidden md:flex items-center space-x-8">
              {content.header.navigation.map((item, index) => (
                index === content.header.navigation.length - 1 ? (
                  <SlideInRight key={index} delay={0.2 + (index * 0.1)}>
                    <Hover>
                      <a href={item.href} className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
                        {item.label}
                      </a>
                    </Hover>
                  </SlideInRight>
                ) : (
                  <SlideInRight key={index} delay={0.2 + (index * 0.1)}>
                    <a href={item.href} className="text-white hover:text-white/80">{item.label}</a>
                  </SlideInRight>
                )
              ))}
            </div>
            <button
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
          {isMenuOpen && (
            <FadeIn>
              <div className="md:hidden mt-4 pb-4">
                {content.header.navigation.map((item, index) => (
                  <a key={index} href={item.href} className="block text-white py-2">{item.label}</a>
                ))}
              </div>
            </FadeIn>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-600/20 to-purple-600/20 z-0"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <FadeIn>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-8">
                {content.hero.title}<br />
                <span className="text-blue-500">{content.hero.subtitle}</span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed">
                {content.hero.description}
              </p>
            </FadeIn>
            <FadeIn delay={0.4}>
              <div className="flex flex-col md:flex-row gap-6 justify-center">
                <Hover>
                  <button className="px-8 py-4 bg-blue-600 text-white rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors">
                    {content.hero.buttons[0].label}
                  </button>
                </Hover>
                <Hover>
                  <button className="px-8 py-4 bg-white/10 text-white rounded-full text-lg font-semibold hover:bg-white/20 transition-colors backdrop-blur-sm">
                    {content.hero.buttons[1].label}
                  </button>
                </Hover>
              </div>
            </FadeIn>
          </div>
        </div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      </section>

      {/* Features Section */}
      <section id="services" className="py-20 relative">
        <div className="container mx-auto px-6">
          <ScaleIn>
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-16">
              {content.features.title}
            </h2>
          </ScaleIn>
          <div className="grid md:grid-cols-3 gap-8">
            {content.features.items.map((feature, index) => (
              <FadeIn key={index} delay={index * 0.2}>
                <Hover>
                  <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-blue-500/50 transition-colors">
                    <h3 className="text-xl font-semibold text-white mb-4">{feature.title}</h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </div>
                </Hover>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-gradient-to-b from-blue-900/20 to-purple-900/20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {content.statistics.items.map((stat, index) => (
              <ScaleIn key={index} delay={index * 0.2}>
                <div className="p-6">
                  <div className="text-4xl font-bold text-blue-500 mb-2">{stat.number}</div>
                  <div className="text-gray-300">{stat.label}</div>
                </div>
              </ScaleIn>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/40 py-12 mt-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <FadeIn>
              <div className="mb-8 md:mb-0">
                <Image 
                  src={Logo} 
                  alt={content.footer.logo} 
                  width={40} 
                  height={40} 
                  className="w-[24px] h-[24px] md:w-[40px] md:h-[40px]" 
                />
              </div>
            </FadeIn>
            <div className="flex flex-wrap gap-8 text-gray-400">
              {content.footer.links.map((item, index) => (
                <FadeIn key={index} delay={index * 0.1}>
                  <a href={item.href} className="hover:text-white transition-colors">{item.label}</a>
                </FadeIn>
              ))}
            </div>
          </div>
          <FadeIn delay={0.4}>
            <div className="mt-8 pt-8 border-t border-white/10 text-center text-gray-500">
              {content.footer.copyright.replace('{year}', new Date().getFullYear())}
            </div>
          </FadeIn>
        </div>
      </footer>
    </div>
  );
}
