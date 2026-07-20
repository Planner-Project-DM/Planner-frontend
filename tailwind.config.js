export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'bg-main': 'var(--bg-main)',
        'bg-card': 'var(--bg-card)',
        'bg-sidebar': 'var(--bg-sidebar)',
        'bg-input': 'var(--bg-input)',
        'border-col': 'var(--border)',
        'text-main': 'var(--text-main)',
        'text-secondary': 'var(--text-secondary)',
        'text-muted': 'var(--text-muted)',
        'accent': 'var(--accent)',
        'accent-hover': 'var(--accent-hover)',
      },
      backgroundImage: {
        'register-image': "url('assets/loginScreen.png')",
      },
      height: {
        '114': '28rem',
        '128': '32rem',
        '144': '36rem',
        '160': '40rem',
        '176': '44rem',
        '192': '48rem',
        '208': '52rem',
      },
      maxHeight: {
        '114': '28rem',
        '128': '32rem',
        '144': '36rem',
        '160': '40rem',
        '176': '44rem',
        '192': '48rem',
        '208': '52rem',
      },
      width: {
        '128': '32rem',
        '144': '36rem',
        '160': '40rem',
        '176': '44rem',
        '192': '48rem',
        '208': '52rem',
      },
      fontFamily: {
        playpen: ['"Playpen Sans"', 'cursive'],
      },
      keyframes: {
        marching: {
          '0%': { strokeDashoffset: '16' },
          '100%': { strokeDashoffset: '0' },
        },
      },
      animation: {
        marching: 'marching 1s linear infinite',
      },
    }
  },
  plugins: [],
}