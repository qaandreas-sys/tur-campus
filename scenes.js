// ============================================================
//  Configurarea scenelor / panoramelor
//  Adaugă aici panorame noi: pune imaginea în /images, o
//  miniatură în /images/thumbs (acelasi nume) si un obiect nou.
// ============================================================
window.TOUR = {
  title: "Campus Educational — Piața 13 Septembrie",
  subtitle: "Tur virtual 360°",
  scenes: [
    {
      id: "pano-01",
      title: "Vedere de ansamblu",
      caption: "Curtea interioară a campusului",
      image: "images/pano-01.jpg",
      thumb: "images/thumbs/pano-01.jpg",
      // rotație inițială a privirii (grade pe axa Y)
      startYaw: 0,
      // hotspot-uri de navigare. position = "x y z" în jurul privitorului
      // (z negativ = în față, z pozitiv = în spate). to = id-ul scenei țintă.
      links: [
        { to: "pano-04", label: "Perspectivă clădiri", position: "-4.83 2.7 -2.31" },
        { to: "pano-02", label: "Aleea centrală",       position: "-5.73 1.13 1.36" },
        { to: "pano-03", label: "Grădina campusului",   position: "-5.2 2.6 -1.48" }
      ]
    },
    {
      id: "pano-02",
      title: "Aleea centrală",
      caption: "Spațiu de studiu în aer liber",
      image: "images/pano-02.jpg",
      thumb: "images/thumbs/pano-02.jpg",
      startYaw: 0,
      links: [
        { to: "pano-03", label: "Grădina campusului",   position: "-3.49 2.86 3.96" },
        { to: "pano-04", label: "Perspectivă clădiri",  position: "-4.17 4.24 0.75" },
        { to: "pano-01", label: "Vedere de ansamblu",   position: "-5.37 1.72 -2.05" }
      ]
    },
    {
      id: "pano-03",
      title: "Grădina campusului",
      caption: "Zonă verde de relaxare",
      image: "images/pano-03.jpg",
      thumb: "images/thumbs/pano-03.jpg",
      startYaw: 0,
      links: [
        { to: "pano-04", label: "Perspectivă clădiri",  position: "-5.16 2.56 1.68" },
        { to: "pano-01", label: "Vedere de ansamblu",   position: "-5.95 0.77 0.12" }
      ]
    },
    {
      id: "pano-04",
      title: "Perspectivă clădiri",
      caption: "Vedere către corpurile de clădire",
      image: "images/pano-04.jpg",
      thumb: "images/thumbs/pano-04.jpg",
      startYaw: 0,
      links: [
        { to: "pano-02", label: "Aleea centrală",      position: "-5.91 -0.98 -0.39" },
        { to: "pano-03", label: "Grădina campusului",  position: "-3.08 1.27 -4.99" }
      ]
    }
  ]
};
