import { useState } from 'react';
import { FadeIn, ScaleIn, SlideInLeft, SlideInRight, Hover } from '../components/Animation';
import Head from 'next/head';
import Image from 'next/image';
import { fetchSheetData } from '../utils/googleSheets';

export async function getStaticProps() {
  try {
    const content = await fetchSheetData();
    return {
      props: {
        content,
      },
      // Revalidate every hour
      revalidate: 3600,
    };
  } catch (error) {
    console.error('Error fetching content:', error);
    return {
      props: {
        error: 'Failed to load content',
      },
    };
  }
}

export default function Home({ content, error }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-xl text-white bg-gradient-to-br from-[#110C9A] via-[#9B0F7A] to-[#F7870F]">
      Error loading content. Please try again later.
    </div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#110C9A] via-[#9B0F7A] to-[#F7870F]">
      <Head>
        <title>{content.meta.title}</title>
        <link rel="icon" href="/images/favicon.ico" />
      </Head>
      {/* Header */}
      <header className="absolute w-full z-50">
        <nav className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex-shrink-0">
              <SlideInLeft>
                <a href="/" className="text-white flex items-center">
                  <Image 
                    src={content.header.logo || Logo} 
                    alt="Seyu Logo" 
                    width={180} 
                    height={40} 
                    className="h-[24px] md:h-[40px] w-auto"
                    priority 
                  />
                </a>
              </SlideInLeft>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              {content.header.navigation.map((item, index) => (
                <SlideInRight key={index} delay={0.2 + (index * 0.1)}>
                  <a
                    href={item.href}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {item.value}
                  </a>
                </SlideInRight>
              ))}
              {content.header.buttons && content.header.buttons.map((button, index) => (
                <SlideInRight key={`button-${index}`} delay={0.2 + ((content.header.navigation.length + index) * 0.1)}>
                  <Hover>
                    <a
                      href={button.href}
                      className="px-4 py-2 bg-[#F7870F] text-white rounded-full font-semibold hover:bg-[#FECF01] transition-colors"
                    >
                      {button.value}
                    </a>
                  </Hover>
                </SlideInRight>
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
                  <a key={index} href={item.href} className="block text-white py-2">{item.value}</a>
                ))}
                {content.header.buttons && content.header.buttons.map((button, index) => (
                  <a key={`button-${index}`} href={button.href} className="block text-white py-2 font-semibold">{button.value}</a>
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
                  <a href={content.hero.buttons[0].href} className="px-8 py-4 bg-gradient-to-r from-[#F7870F] to-[#FECF01] text-[#343434] rounded-full text-lg font-semibold hover:shadow-lg transition-all">
                    {content.hero.buttons[0].value}
                  </a>
                </Hover>
                <Hover>
                  <a href={content.hero.buttons[1].href} className="px-8 py-4 bg-white/10 text-white rounded-full text-lg font-semibold hover:bg-white/20 transition-colors backdrop-blur-sm">
                    {content.hero.buttons[1].value}
                  </a>
                </Hover>
              </div>
            </FadeIn>
          </div>
        </div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      </section>

      {/* Features Section */}
      <section id="services" className="py-20 relative bg-[#110C9A]">
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
                  <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-[#F7870F]/50 transition-colors">
                    <h3 className="text-xl font-semibold text-white mb-4">{feature.title}</h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </div>
                </Hover>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.4}>
            <div className="flex flex-col md:flex-row gap-6 justify-center mt-12">
              <Hover>
                <a href={content.features.buttons[0].href} className="px-8 py-4 bg-gradient-to-r from-[#F7870F] to-[#FECF01] text-[#343434] rounded-full text-lg font-semibold hover:shadow-lg transition-all">
                  {content.features.buttons[0].value}
                </a>
              </Hover>
              <Hover>
                <a href={content.features.buttons[1].href} className="px-8 py-4 bg-white/10 text-white rounded-full text-lg font-semibold hover:bg-white/20 transition-colors backdrop-blur-sm">
                  {content.features.buttons[1].value}
                </a>
              </Hover>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-gradient-to-b from-[#110C9A]/20 to-[#9B0F7A]/20">
        <div className="container mx-auto px-6">
          <ScaleIn>
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-16">
              {content.statistics.title}
            </h2>
          </ScaleIn>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {content.statistics.items.map((stat, index) => (
              <ScaleIn key={index} delay={index * 0.2}>
                <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-[#F7870F]/50 transition-colors">
                  <div className="text-4xl font-bold text-white mb-2">{stat.title}</div>
                  <div className="text-xl font-semibold text-gray-200 mb-3">{stat.subtitle}</div>
                  <div className="text-gray-300">{stat.value}</div>
                </div>
              </ScaleIn>
            ))}
          </div>
          {content.statistics.buttons && content.statistics.buttons.length > 0 && (
            <FadeIn delay={0.4}>
              <div className="flex flex-col md:flex-row gap-6 justify-center mt-12">
                {content.statistics.buttons.map((button, index) => (
                  <Hover key={index}>
                    <a 
                      href={button.href || "#"} 
                      className={index === 0 ? 
                        "px-8 py-4 bg-gradient-to-r from-[#F7870F] to-[#FECF01] text-[#343434] rounded-full text-lg font-semibold hover:shadow-lg transition-all" : 
                        "px-8 py-4 bg-white/10 text-white rounded-full text-lg font-semibold hover:bg-white/20 transition-colors backdrop-blur-sm"
                      }
                    >
                      {button.value}
                    </a>
                  </Hover>
                ))}
              </div>
            </FadeIn>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#110C9A] py-12 mt-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <FadeIn>
              <div className="mb-8 md:mb-0">
                <Image 
                  src={content.footer.logo}
                  alt="Seyu Logo"
                  width={180}
                  height={40}
                  className="h-[24px] md:h-[40px] w-auto"
                />
              </div>
            </FadeIn>
            <div className="flex flex-wrap gap-8 text-gray-400">
              {content.footer.links.map((item, index) => (
                <FadeIn key={index} delay={index * 0.1}>
                  <a href={item.href} className="hover:text-white transition-colors">{item.value}</a>
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
