/** Client-approved October 2026 website PDF. Prices are AUD, not inferred from older Timely snapshots. */
export type ApprovedPrice = { name: string; aud: number; description?: string; note?: string };
export type ApprovedCategory = { id: string; title: string; intro?: string; items: ApprovedPrice[]; footer?: string };
export const APPROVED_SERVICE_CATALOG: ApprovedCategory[] = [
  {
    id: 'cosmetic', title: 'Cosmetic Tattooing',
    intro: 'Enhance your brows and lips with personalised colour and definition. Each treatment begins with a consultation.',
    items: [
      { name: 'Microblading – Nano Strokes', aud: 630, note: 'Initial treatment · Touch-up at 45 days A$120', description: 'Fine, realistic hair-like strokes made with a manual Tebori tool to complement your natural brow shape.' },
      { name: 'Shadow Brows', aud: 630, note: 'Initial treatment · Touch-up at 45 days A$120', description: 'Customisable powder-like shading, from softly defined brows to a more noticeable makeup effect.' },
      { name: 'Lip Blush – Lip Tattooing', aud: 630, note: 'Initial treatment · Touch-up at 50–60 days A$120', description: 'Pigment is applied to enhance the natural shade and definition of your lips. The colour softens as lips heal.' },
      { name: 'Cosmetic Tattoo Removal', aud: 150, description: 'Non-laser THink Pigment Remover; suitability is assessed first. Multiple sessions may be required.' },
    ],
    footer: 'Nano Strokes, Shadow Brows and Lip Blush are A$750 each including touch-up. A consultation is available if you are unsure which treatment to book.',
  },
  {
    id: 'brows', title: 'Brow Services',
    items: [
      { name: 'Brow Sculpt Signature', aud: 56, description: 'Personalised brow shaping with mapping, trimming, waxing and tweezing. No colour included.' },
      { name: 'Brow Sculpt & Tint', aud: 76, description: 'Shape and traditional tint for subtle colour and natural-looking definition focused mainly on the hairs.' },
      { name: 'Brow Sculpt & Hybrid Dye', aud: 79, description: 'Personalised brow shaping with hybrid dye that colours the hairs and temporarily stains the skin.' },
      { name: 'Brow Lamination, Shape & Tint', aud: 133, description: 'Lifting and repositioning natural brow hairs, with shaping, tinting and conditioning.' },
      { name: 'Male Brow Sculpt', aud: 42, description: 'Natural grooming, trimming, waxing and tweezing while preserving the character of your brows.' },
      { name: 'Dreamy Brows – Brow Sculpt & Relaxing Massage', aud: 156, description: 'Personalised brow sculpt followed by gentle facial lymphatic drainage and a soothing scalp massage.' },
    ],
    footer: 'Colour longevity depends on the product, skin type and aftercare. Skin staining usually fades sooner than colour on hairs.',
  },
  {
    id: 'skin', title: 'Skin & Hair Treatments',
    items: [
      { name: 'Dermaplaning', aud: 140, note: 'Optional LED light therapy +A$20', description: 'Gentle exfoliation of dead skin cells and fine facial hair; includes cleansing, assessment, skincare, moisturiser and SPF.' },
      { name: 'Microneedling', aud: 185, description: 'Personalised skin treatment to help improve the appearance of fine lines, uneven texture and acne scars.' },
      { name: 'Lip Bliss Hydration', aud: 99, description: 'Hydration treatment for dry lips, without tattoo pigment or injectable volume.' },
      { name: 'Facial Spa', aud: 150, description: 'Cleansing, gentle exfoliation, selected serums, mask and facial massage.' },
      { name: 'Deluxe Facial', aud: 360, note: '2 hours', description: 'A personalised combination of cleansing, dermaplaning, microneedling, mask and LED light therapy when suitable.' },
      { name: 'Grow Up Hair – Brows', aud: 150, description: 'Personalised care for sparse or overplucked natural brows and the skin beneath them.' },
      { name: 'Grow Up Hair – Scalp', aud: 200, description: 'Scalp care, assessment and aftercare guidance for thinning-hair concerns.' },
    ],
  },
  {
    id: 'lashes', title: 'Lashes',
    items: [
      { name: 'Lash Lift & Tint', aud: 133, description: 'Lift, curl, tint and condition your own natural lashes.' },
      { name: 'Lash Lift Only', aud: 119, description: 'Lift and curl natural lashes, without tint or extensions.' },
      { name: 'Classic Lash Extensions', aud: 145, description: 'One extension per natural lash for a subtle, polished appearance.' },
      { name: 'Hybrid Lash Extensions', aud: 180, description: 'A mix of classic extensions and volume fans for a fuller lash line.' },
      { name: 'Wet Look Lash Extensions', aud: 150, description: 'Defined, textured, darker-looking extensions.' },
      { name: 'Lash Tint', aud: 45, description: 'Darken natural lashes without lifting or extensions.' },
      { name: 'Lash Extension Removal', aud: 40, description: 'Professional removal with a dedicated remover.' },
      { name: 'Classic Lash Infill – 2 weeks', aud: 85 },
      { name: 'Classic Lash Infill – 3 weeks', aud: 105 },
      { name: 'Hybrid Lash Infill – 2 weeks', aud: 120 },
      { name: 'Hybrid Lash Infill – 3 weeks', aud: 150 },
    ],
    footer: 'Infills require at least 50% lash retention at two weeks or 40% at three weeks. Additional time and charges may apply if fewer remain.',
  },
  {
    id: 'women-waxing', title: 'Waxing – Women',
    intro: 'Hard wax is used for Brazilian, underarms and many facial areas; strip wax is used for limbs, abdomen and other suitable areas.',
    items: [
      { name: 'Side Face', aud: 45 }, { name: 'Facial Waxing', aud: 80 },
      { name: 'Upper Lip', aud: 18 }, { name: 'Upper Lip & Chin', aud: 40 },
      { name: 'Upper Lip & Nose', aud: 30 }, { name: 'Upper Lip, Nose & Chin', aud: 48 },
      { name: 'Chin & Neck', aud: 30 }, { name: 'Nose Waxing', aud: 15 },
      { name: 'Ear Waxing', aud: 25 }, { name: 'Underarms', aud: 44 },
      { name: 'Full Arms', aud: 48 }, { name: 'Half Arms', aud: 38 },
      { name: 'Abdomen', aud: 20 }, { name: 'Bikini', aud: 58 },
      { name: 'Brazilian', aud: 82 }, { name: 'Buttocks', aud: 39 },
      { name: 'Full Legs', aud: 78 }, { name: 'Half Legs', aud: 50 },
    ],
  },
  {
    id: 'men-waxing', title: 'Waxing – Men',
    items: [
      { name: 'Chest', aud: 65 }, { name: 'Abdomen', aud: 65 },
      { name: 'Back', aud: 82 }, { name: 'Shoulders', aud: 45 },
      { name: 'Full Arms', aud: 60 }, { name: 'Full Legs', aud: 85 },
      { name: 'Tops of Feet', aud: 15 }, { name: 'Nose Waxing', aud: 15 },
      { name: 'Ear Waxing', aud: 25 },
    ],
  },
  {
    id: 'smile', title: 'Teeth Whitening',
    items: [
      { name: 'Teeth Whitening', aud: 199, description: 'A cosmetic treatment designed to lighten the shade of natural teeth. Results vary; crowns, veneers and fillings do not change colour.' },
    ],
  },
];
