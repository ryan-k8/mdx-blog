import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "dark": "#202023",
        "light": "#f1e6db",
        "nice-purple": "#8884ff",
        "nice-purple-alt": "#8870ff",
        "washed-teal": "#88CCCA",
        "washed-teal-alt": "#319795",
        "bright-teal": "#7BDACE",
        "pastel-blue": "#3C7AEC",
        "light-grey": "#E1DBD4",
        "light-grey-alt": "#F6F0E8",
        "dark-grey": "#323234",
        "neon-pink": "#EA5CB3",
        "solarized-bg": "#012B36",
        "dracula-bg": "#272A36",
        "vscode-bg": "#1E1E1E",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      typography: () => ({
        DEFAULT: {
          css: {
            maxWidth: "none", // Adjust the max width as needed
          },
        },
      }),
    },
  },
  plugins: [require("daisyui"), require("@tailwindcss/typography"),require('@tailwindcss/aspect-ratio'),],

  // daisyUI config (optional - here are the default values)
  daisyui: {
    themes: "false", // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
    // darkTheme: "dark", // name of one of the included themes for dark mode
    base: false, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
    themeRoot: ":root", // The element that receives theme color CSS variables
  },

  darkMode: "class",
};
export default config;
