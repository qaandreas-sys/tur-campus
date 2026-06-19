// ============================================================
//  Componente A-Frame pentru hotspot-uri de navigare (buline)
//  - se maresc la hover (mouse) sau gaze (privire in VR / Vision Pro)
//  - la selectare (click / pinch / privire sustinuta) teleporteaza
// ============================================================

// Mentine bulina mereu cu fata spre camera (billboard) si o face
// sa "pluteasca" usor pentru a atrage atentia.
AFRAME.registerComponent('face-camera', {
  init: function () {
    this._v = new THREE.Vector3();
    this._t0 = Math.random() * 10;
  },
  tick: function (time) {
    const cam = this.el.sceneEl.camera;
    if (!cam) return;
    const o = this.el.object3D;
    cam.getWorldPosition(this._v);
    o.lookAt(this._v);
    o.rotateY(Math.PI); // ca fata vizibila (+Z) sa priveasca spre camera
    // plutire subtila pe verticala
    o.position.y = this._baseY + Math.sin((time / 1000 + this._t0) * 1.4) * 0.06;
  },
  update: function () {
    this._baseY = this.el.object3D.position.y;
  }
});

// Bulina de navigare propriu-zisa.
AFRAME.registerComponent('hotspot', {
  schema: {
    to:    { type: 'string' },
    label: { type: 'string', default: '' }
  },
  init: function () {
    const el = this.el;
    el.classList.add('hotspot');

    this.cur = 1;          // scara curenta
    this.target = 1;       // scara tinta (1 normal, 1.45 la hover)
    this.hovered = false;

    const ringFill  = el.querySelector('.hs-fill');
    const labelEl   = el.querySelector('.hs-label');
    const labelBg   = el.querySelector('.hs-labelbg');

    const showLabel = (v) => {
      if (labelEl) labelEl.setAttribute('visible', v);
      if (labelBg) labelBg.setAttribute('visible', v && !!this.data.label);
    };
    showLabel(false);

    el.addEventListener('mouseenter', () => {
      this.hovered = true;
      this.target = 1.45;
      if (ringFill) ringFill.setAttribute('material', 'opacity', 0.55);
      showLabel(true);
    });

    el.addEventListener('mouseleave', () => {
      this.hovered = false;
      this.target = 1;
      if (ringFill) ringFill.setAttribute('material', 'opacity', 0.22);
      showLabel(false);
    });

    el.addEventListener('click', () => {
      if (window.navigateTo) window.navigateTo(this.data.to);
    });
  },

  // scalare lină (lerp) – garantat sa scrie object3D.scale in fiecare cadru
  tick: function (t, dt) {
    const k = Math.min(1, (dt || 16) / 90);
    this.cur += (this.target - this.cur) * k;
    if (Math.abs(this.cur - this.target) < 0.001) this.cur = this.target;
    this.el.object3D.scale.set(this.cur, this.cur, this.cur);
  }
});

// Helper global: construieste o bulina-hotspot ca entitate A-Frame.
window.buildHotspot = function (link) {
  // root billboard
  const root = document.createElement('a-entity');
  root.setAttribute('position', link.position || '0 -0.6 -5');
  root.setAttribute('face-camera', '');
  root.setAttribute('hotspot', `to: ${link.to}; label: ${link.label || ''}`);

  // disc translucid (zona de hover / click)
  const fill = document.createElement('a-circle');
  fill.classList.add('hs-fill');
  fill.setAttribute('radius', '0.42');
  fill.setAttribute('material', 'color: #5ec8ff; shader: flat; opacity: 0.22; side: double');
  root.appendChild(fill);

  // inel exterior
  const ring = document.createElement('a-ring');
  ring.setAttribute('radius-inner', '0.42');
  ring.setAttribute('radius-outer', '0.5');
  ring.setAttribute('material', 'color: #ffffff; shader: flat; opacity: 0.95; side: double');
  root.appendChild(ring);

  // sageata (chevron) catre interior - sugereaza "intra / mergi acolo"
  const arrow = document.createElement('a-triangle');
  arrow.setAttribute('vertex-a', '0 0.16 0.01');
  arrow.setAttribute('vertex-b', '-0.15 -0.08 0.01');
  arrow.setAttribute('vertex-c', '0.15 -0.08 0.01');
  arrow.setAttribute('material', 'color: #ffffff; shader: flat; side: double');
  root.appendChild(arrow);

  // eticheta text (vizibila la hover)
  if (link.label) {
    const lblbg = document.createElement('a-plane');
    lblbg.classList.add('hs-labelbg');
    lblbg.setAttribute('position', '0 0.95 -0.02');
    lblbg.setAttribute('width', Math.max(1.4, link.label.length * 0.16));
    lblbg.setAttribute('height', '0.42');
    lblbg.setAttribute('material', 'color: #0b0f14; shader: flat; opacity: 0.75; side: double');
    lblbg.setAttribute('visible', 'false');
    root.appendChild(lblbg);

    const lbl = document.createElement('a-text');
    lbl.classList.add('hs-label');
    lbl.setAttribute('value', link.label);
    lbl.setAttribute('align', 'center');
    lbl.setAttribute('color', '#ffffff');
    lbl.setAttribute('width', '4');
    lbl.setAttribute('position', '0 0.95 0');
    lbl.setAttribute('visible', 'false');
    root.appendChild(lbl);
  }

  return root;
};
