# **Logo**

## **1\. Composition and Layout**

The logo is a vertically stacked composition consisting of three primary tiers:

- **Tier 1 (Main Glyph):** The "OV" monogram.
- **Tier 2 (Separator):** A thin horizontal accent line.
- **Tier 3 (Wordmark):** The brand name "OUTCOME VAULT" in wide-set typography.

The entire layout is governed by a **460x320 coordinate system** (ViewBox). When the wordmark is removed, the monogram tier re-centers vertically within the viewport.

---

## **2\. Geometry and Shape Style**

### **The "O" Glyph**

- **Form:** A horizontal capsule (rounded rectangle).
- **Dimensions:** **160 units (W) x 100 units (H)**.
- **Corner Radius:** **50 units** (creating perfectly semi-circular ends).
- **Stroke Weight:** **18 units**, centered on the path.
- **Fill:** None.

### **The "V" Glyph**

- **Form:** An open-top, two-point diagonal path.
- **Construction:** Starts at the top left, descends to a centered bottom vertex, and ascends to the top right.
- **Angles:** Symmetrical isosceles dip.
- **Stroke Weight:** **18 units**.
- **Terminals:** **Rounded caps** (stroke-linecap: round) and a **rounded joint** (stroke-linejoin: round).

### **The Accent Dot**

- **Form:** A small rounded square.
- **Dimensions:** **22 x 22 units**.
- **Corner Radius:** **4 units** (softened corners).
- **Position:** Mathematically aligned to the **bottom-right visual extremity** of the "V". It accounts for the 9-unit stroke expansion of the "V" to sit flush with the letterform's outer boundary.

### **The Underline (Separator)**

- **Form:** A horizontal vector line.
- **Stroke Weight:** **6 units** (exactly 1/3 the thickness of the main glyphs).
- **Terminals:** **Rounded caps**.
- **Horizontal Span:** Aligned to the **visual outer edges** of the "O" and the "V" (spanning approximately 363 units).

---

## **3\. Spacing and Alignment**

The logo utilizes a **Constant Gap ($G$)** of **33 units** to maintain vertical rhythm:

1. **Upper Gap:** 33 units between the bottom of the OV glyphs and the top of the underline.
2. **Lower Gap:** 33 units between the bottom of the underline and the top of the "OUTCOME VAULT" text.
3. **Horizontal Centering:** Both the underline and the wordmark are anchored to the absolute horizontal midpoint (**X \= 230**).

---

## **4\. Typography**

- **Brand Text:** "OUTCOME VAULT"
- **Case:** **All Caps** (Force Uppercase).
- **Font Family:** **Syncopate** (specifically the **Bold/700** weight).
- **Font Style:** A modern, ultra-wide sans-serif with extended horizontal proportions.
- **Font Size:** Default **32px** (adjustable via controls).
- **Baseline:** The text uses a **hanging baseline** for its vertical coordinate to ensure the 33-unit gap is measured from the top of the letter height.

---

## **5\. Color Palette**

The logo uses a high-contrast, professional palette:

- **Primary Text/Glyphs:** **\#111827** (a deep, near-black Navy).
- **Accent/Separator:** **\#EAC448** (a muted, sophisticated Gold).
- **Background:** **\#FFFFFF** (Pure White) by default, though the system supports any Hex-defined background.

---

## **6\. Technical Reconstruction Data (SVG Specs)**

To recreate this logo with 100% fidelity, use the following stroke and path properties:

- **Monogram Stroke:** 18px, round join/cap.
- **Separator Stroke:** 6px, round cap.
- **Text Anchor:** middle (centered at X=230).
- **ViewBox:** 0 0 460 320 (Full) or 0 30 460 218 (Centered Monogram Only).

### **7\. Precise Coordinate Map (SVG Path Data)**

For a developer to "hard-code" the shapes without seeing the source, these coordinates are the DNA of the logo:

- **O-Capsule:** Top-left origin at $(55, 65)$.
- **V-Vector:** Path M 245 65 L 322.5 165 L 400 65. The vertex $(322.5, 165)$ is the lowest mathematical point before stroke expansion.
- **Accent Dot:** Anchor at $(387, 152)$.
- **Underline:** From $(48.5, 210)$ to $(401.5, 210)$.
- **Text Anchor:** Midpoint $X$ at $230$.

### **8\. Visual Weight and Optical Balances**

- **Stroke-to-Negative Space Ratio:** The internal "counter" (the hole inside the **O**) has a width of **124 units** ($160 \- 18 \- 18$), creating a balanced relationship between the thickness of the line and the empty space it encloses.
- **Stroke Scaling:** The stroke weights (18, 6, and 32px font) follow a **divisible ratio of 3**, ensuring that as the logo scales, the relative "boldness" of the elements feels harmonious rather than random.

### **9\. Clear Space Guidelines (Safe Zone)**

To maintain the logo's integrity, a "Safe Zone" should be defined:

- **Minimum Margin:** A padding equal to the height of the **O** (100 units) should be maintained on all four sides of the logo before any other page elements or text are introduced.
- **Text Padding:** When the wordmark is active, the safe zone extends from the bottom of the "OUTCOME VAULT" text rather than the underline.

### **10\. Design Intent and "Vibe"**

Describing the _intent_ helps a human designer understand how to treat the logo in different contexts:

- **Style:** Modern Minimalist / Architectural.
- **Connotation:** The wide **Syncopate** font and the heavy-duty stroke weights are intended to convey **stability, security, and transparency** (the "Vault" aspect).
- **Motion Capability:** Because it is built on a grid, the logo is "motion-ready." For example, the underline could draw in from the center, or the **O** and **V** could fade in as the dot "drops" into its corner position.

### **11\. Accessibility and Rendering**

- **Contrast Ratio:** The \#111827 Navy against \#FFFFFF White provides a contrast ratio of **18.4:1**, exceeding WCAG AAA standards for visual accessibility.
- **SVG Rendering:** The use of shape-rendering: geometricPrecision is recommended in the SVG tag to ensure that the diagonal lines of the "V" do not appear jagged on low-resolution screens.
