/** @type {import('tailwindcss').Config} */
export const darkMode = ["class"];
export const content = [
  './pages/**/*.{ts,tsx}',
  './components/**/*.{ts,tsx}',
  './app/**/*.{ts,tsx}',
  './src/**/*.{ts,tsx}',
];
export const prefix = "";
export const theme = {
  container: {
    center: true,
    padding: "2rem",
    screens: {
      "2xl": "1400px",
    },
  },
  extend: {
    colors: {
      border: "hsl(var(--border))",
      input: "hsl(var(--input))",
      ring: "hsl(var(--ring))",
      background: "hsl(var(--background))",
      foreground: "hsl(var(--foreground))",
      primary: {
        DEFAULT: "hsl(var(--primary))",
        foreground: "hsl(var(--primary-foreground))",
      },
      secondary: {
        DEFAULT: "hsl(var(--secondary))",
        foreground: "hsl(var(--secondary-foreground))",
      },
      destructive: {
        DEFAULT: "hsl(var(--destructive))",
        foreground: "hsl(var(--destructive-foreground))",
      },
      muted: {
        DEFAULT: "hsl(var(--muted))",
        foreground: "hsl(var(--muted-foreground))",
      },
      accent: {
        DEFAULT: "hsl(var(--accent))",
        foreground: "hsl(var(--accent-foreground))",
      },
      popover: {
        DEFAULT: "hsl(var(--popover))",
        foreground: "hsl(var(--popover-foreground))",
      },
      card: {
        DEFAULT: "hsl(var(--card))",
        foreground: "hsl(var(--card-foreground))",
      },
    },
    borderRadius: {
      lg: "var(--radius)",
      md: "calc(var(--radius) - 2px)",
      sm: "calc(var(--radius) - 4px)",
    },
    keyframes: {
      "accordion-down": {
        from: { height: "0" },
        to: { height: "var(--radix-accordion-content-height)" },
      },
      "accordion-up": {
        from: { height: "var(--radix-accordion-content-height)" },
        to: { height: "0" },
      },
    },
    animation: {
      "accordion-down": "accordion-down 0.2s ease-out",
      "accordion-up": "accordion-up 0.2s ease-out",
    },
    pacing: {
      '0.5/10': '5%',
      '1/10': '10%',
      '1.5/10': '15%',
      '2/10': '20%',
      '2.5/10': '25%',
      '3/10': '30%',
      '3.5/10': '35%',
      '4/10': '40%',
      '4.5/10': '45%',
      '5/10': '50%',
      '5.5/10': '55%',
      '6/10': '60%',
      '6.5/10': '65%',
      '7/10': '70%',
      '7.5/10': '75%',
      '8/10': '80%',
      '8.5/10': '85%',
      '9/10': '90%',
      '9.5/10': '95%',
      '10/10': '100%',
    },

    minWidth: {
      '0.5/10': '5%',
      '1/10': '10%',
      '1.5/10': '15%',
      '2/10': '20%',
      '2.5/10': '25%',
      '3/10': '30%',
      '3.5/10': '35%',
      '4/10': '40%',
      '4.5/10': '45%',
      '5/10': '50%',
      '5.5/10': '55%',
      '6/10': '60%',
      '6.5/10': '65%',
      '7/10': '70%',
      '7.5/10': '75%',
      '8/10': '80%',
      '8.5/10': '85%',
      '9/10': '90%',
      '9.5/10': '95%',
      '10/10': '100%',
    },

    maxWidth: {
      '0.5/10': '5%',
      '1/10': '10%',
      '1.5/10': '15%',
      '2/10': '20%',
      '2.5/10': '25%',
      '3/10': '30%',
      '3.5/10': '35%',
      '4/10': '40%',
      '4.5/10': '45%',
      '5/10': '50%',
      '5.5/10': '55%',
      '6/10': '60%',
      '6.5/10': '65%',
      '7/10': '70%',
      '7.5/10': '75%',
      '8/10': '80%',
      '8.5/10': '85%',
      '9/10': '90%',
      '9.5/10': '95%',
      '10/10': '100%',
    },

    width: {
      '0.5/10': '5%',
      '1/10': '10%',
      '1.5/10': '15%',
      '2/10': '20%',
      '2.5/10': '25%',
      '3/10': '30%',
      '3.5/10': '35%',
      '4/10': '40%',
      '4.5/10': '45%',
      '5/10': '50%',
      '5.5/10': '55%',
      '6/10': '60%',
      '6.5/10': '65%',
      '7/10': '70%',
      '7.5/10': '75%',
      '8/10': '80%',
      '8.5/10': '85%',
      '9/10': '90%',
      '9.5/10': '95%',
      '10/10': '100%',
    },

    minHeight: {
      '0.5/10': '5%',
      '1/10': '10%',
      '1.5/10': '15%',
      '2/10': '20%',
      '2.5/10': '25%',
      '3/10': '30%',
      '3.5/10': '35%',
      '4/10': '40%',
      '4.5/10': '45%',
      '5/10': '50%',
      '5.5/10': '55%',
      '6/10': '60%',
      '6.5/10': '65%',
      '7/10': '70%',
      '7.5/10': '75%',
      '8/10': '80%',
      '8.5/10': '85%',
      '9/10': '90%',
      '9.5/10': '95%',
      '10/10': '100%',
    },

     maxHeight: {
      '0.5/10': '5%',
      '1/10': '10%',
      '1.5/10': '15%',
      '2/10': '20%',
      '2.5/10': '25%',
      '3/10': '30%',
      '3.5/10': '35%',
      '4/10': '40%',
      '4.5/10': '45%',
      '5/10': '50%',
      '5.5/10': '55%',
      '6/10': '60%',
      '6.5/10': '65%',
      '7/10': '70%',
      '7.5/10': '75%',
      '8/10': '80%',
      '8.5/10': '85%',
      '9/10': '90%',
      '9.5/10': '95%',
      '10/10': '100%',
    },

    height: {
      '0.5/10': '5%',
      '1/10': '10%',
      '1.5/10': '15%',
      '2/10': '20%',
      '2.5/10': '25%',
      '3/10': '30%',
      '3.5/10': '35%',
      '4/10': '40%',
      '4.5/10': '45%',
      '5/10': '50%',
      '5.5/10': '55%',
      '6/10': '60%',
      '6.5/10': '65%',
      '7/10': '70%',
      '7.5/10': '75%',
      '8/10': '80%',
      '8.5/10': '85%',
      '9/10': '90%',
      '9.5/10': '95%',
      '10/10': '100%',
      '120': '30rem',
      '180': '45rem',
      '240': '60rem',
      '300': '75rem',
      '360': '90rem',},
    fontSize: {
      'xxs': '.5rem',
      'xxxs': '.4rem',
    },
    fontFamily: {
      edu: ['"Edu AU VIC WA NT Hand"', 'sans-serif'],
      merriweather: ['"Merriweather"', 'serif'],
      noto: ['"Noto Serif Khitan Small Script"', 'serif'],
      poppins: ['"Poppins"', 'sans-serif'],
    },
  },
};
import tailwindcssAnimate from "tailwindcss-animate";

export const plugins = [tailwindcssAnimate];