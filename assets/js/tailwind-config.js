tailwind.config = {
  theme: {
    extend: {
      colors: {
        brandGreen: "#2F5B50",
        brandOrange: "#FF9257",
        brandOrangeDeep: "#FF8B4B",
        ink: "#141414",
        line: "#E5E7EB",
      },
      boxShadow: { soft: "0 20px 60px rgba(0,0,0,.08)" },
      screens: {
        xs: "480px",
        minilap: "900px",   // mini laptop
        laptop: "1024px",   // normal laptop
        desktop: "1280px",  // desktop
        xdesktop: "1500px", // desktop
      },
    },
  },
};
