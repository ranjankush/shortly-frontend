/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  darkMode: 'class', // Enable dark mode support
  theme: {
    extend: {
         backgroundImage: {
           "custom-gradient": "linear-gradient(to right, #3b82f6, #9333ea)", // equivalent to from-blue-500 to-purple-600
           "custom-gradient-2": "linear-gradient(to left, #3b82f6, #f43f5e)",
           "card-gradient": "linear-gradient(to right, #38b2ac, #4299e1)",
         },
         colors: {
           navbarColor: "#ffffff",
           btnColor: "#3364F7",
           linkColor: "#2a5bd7",
         },
         boxShadow: {
           custom: "0 0 15px rgba(0, 0, 0, 0.3)",
           right: "10px 0px 10px -5px rgba(0, 0, 0, 0.3)",
         },
         fontFamily: {
           roboto: ["Roboto", "sans-serif"],
           montserrat: ["Montserrat"],
         },
       },
     },
   
     variants: {
       extend: {
         backgroundImage: ["responsive"],
       },
     },
   
     plugins: [],
};