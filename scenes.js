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
        { to: "pano-02", label: "Aleea centrală",  position: "0 -0.6 -5" }
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
        { to: "pano-03", label: "Grădina campusului", position: "0 -0.6 -5" },
        { to: "pano-01", label: "Înapoi",             position: "0 -0.6 5" }
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
        { to: "pano-04", label: "Perspectivă clădiri", position: "0 -0.6 -5" },
        { to: "pano-02", label: "Înapoi",              position: "0 -0.6 5" }
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
        { to: "pano-03", label: "Înapoi",            position: "0 -0.6 5" },
        { to: "pano-01", label: "Vedere de ansamblu", position: "0 -0.6 -5" }
      ]
    }
  ]
};
