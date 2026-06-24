'use client'

export function NewsletterForm({ dark = false }: { dark?: boolean }) {
  return (
    <form
      className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        type="email"
        placeholder="Enter your email"
        className={`flex-1 px-5 py-3 text-sm focus:outline-none focus:border-evara-gold border ${
          dark
            ? 'bg-white/10 border-white/20 text-white placeholder-gray-500'
            : 'bg-white border-evara-black/20 text-evara-black placeholder-gray-400'
        }`}
      />
      <button
        type="submit"
        className="bg-evara-gold text-evara-black px-8 py-3 text-xs tracking-widest uppercase font-semibold hover:bg-evara-gold-light transition-colors"
      >
        Join
      </button>
    </form>
  )
}

export function NewsletterFormVertical() {
  return (
    <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
      <input
        type="email"
        placeholder="Your email address"
        className="bg-white/10 border border-white/20 text-white placeholder-gray-500 px-4 py-3 text-sm focus:outline-none focus:border-evara-gold"
      />
      <button
        type="submit"
        className="bg-evara-gold text-evara-black text-xs tracking-widest uppercase font-semibold py-3 hover:bg-evara-gold-light transition-colors"
      >
        Subscribe
      </button>
    </form>
  )
}
