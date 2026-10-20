/** Client-approved October 2026 website PDF. Prices are AUD, not inferred from older Timely snapshots. */
export type ApprovedPrice = { name: string; aud: number; description?: string; note?: string };
export type ApprovedCategory = { id: string; title: string; intro?: string; items: ApprovedPrice[]; footer?: string };
export const APPROVED_SERVICE_CATALOG: ApprovedCategory[] = [
  {
    id: 'cosmetic', title: 'Cosmetic Tattooing',
    intro: 'Enhance your brows and lips with colour and definition designed around you. Every treatment starts with a consultation to understand your preferences and plan a result that complements your features.',
    items: [
      { name: 'Microblading – Nano Strokes', aud: 630, note: 'Initial treatment · Touch-up after 45–60 days A$120', description: "Nano Strokes is an advanced form of microblading focused on creating delicate, realistic hair-like strokes. Using a manual tool called a Tebori, I design each pattern to follow the natural flow of your brow hairs, adding definition and filling gaps while respecting your individual features." },
      { name: 'Shadow Brows', aud: 630, note: 'Initial treatment · Touch-up at 45 days A$120', description: "Shading creates a softly filled-in appearance, similar to brow powder. The shape, colour and intensity are tailored to your features and preferences, from gentle definition to a more noticeable makeup effect." },
      { name: 'Lip Blush – Lip Tattooing', aud: 630, note: 'Initial treatment · Touch-up after 45–60 days A$120', description: "Enhance your natural lip colour and add definition with a shade selected especially for you. Lip Blush uses a cosmetic tattoo machine to introduce pigment into the lips. The colour looks stronger immediately after treatment and softens as the lips heal." },
      { name: 'Cosmetic Tattoo Removal', aud: 150, description: "Looking to lighten unwanted cosmetic tattoo pigment? I use THink Pigment Remover as a non-laser removal treatment, with suitability assessed before we begin. The number of sessions needed varies depending on the existing tattoo and how your skin responds. Multiple sessions may be required." },
    ],
    footer: 'Nano Strokes, Shadow Brows and Lip Blush are A$750 each including touch-up. A consultation is available if you are unsure which treatment to book.',
  },
  {
    id: 'brows', title: 'Brow Services',
    items: [
      { name: 'Brow Sculpt Signature', aud: 56, description: "Personalised brow shaping with mapping, trimming, waxing and tweezing where needed. Defines your natural shape while preserving fullness. No colour included." },
      { name: 'Brow Sculpt & Tint', aud: 76, description: "Personalised shaping with traditional tint to enhance lighter brow hairs, creating a fuller-looking, naturally defined finish. Ideal for a subtle colour boost, with colour focused mainly on the hairs." },
      { name: 'Brow Sculpt & Hybrid Dye', aud: 79, description: "Personalised shaping with hybrid dye to colour the hairs and temporarily stain the skin, helping disguise gaps for a more defined, filled-in finish. Includes detailed colour application, with the intensity tailored to your preference." },
      { name: 'Brow Lamination, Shape & Tint', aud: 133, description: "Brow lamination softens and restructures your existing brow hairs, making them easier to reposition and style. By lifting and spreading the hairs, it can help narrow or uneven brows appear fuller and soften the appearance of small gaps where there is enough hair to work with. It also helps tame unruly or downward-growing hairs. Includes personalised shaping, tint and a conditioning treatment for a groomed finish. Fullness comes from repositioning your existing hairs; results depend on their length, density and condition." },
      { name: 'Male Brow Sculpt', aud: 42, description: "Natural brow grooming with trimming, waxing and tweezing where needed. Removes stray hairs and reduces bulk while maintaining your brows’ natural character." },
      { name: 'Dreamy Brows – Brow Sculpt & Relaxing Massage', aud: 156, description: "Give your brows some love and yourself a moment to unwind. Enjoy a personalised brow sculpt, followed by gentle facial lymphatic drainage and a soothing scalp massage with slow, relaxing movements. A dreamy escape from your busy routine." },
    ],
    footer: 'Colour longevity depends on the product, skin type and aftercare. Skin staining usually fades sooner than colour on hairs.',
  },
  {
    id: 'skin', title: 'Skin & Hair Treatments',
    items: [
      { name: 'Dermaplaning', aud: 140, note: 'Optional LED light therapy +A$20', description: "Refresh dull skin with gentle exfoliation that removes dead skin cells and fine facial hair, leaving your skin feeling smoother and your makeup sitting more evenly. Includes double cleansing, skin assessment, tailored skincare, moisturiser and SPF." },
      { name: 'Microneedling', aud: 185, description: "A targeted treatment that stimulates the skin’s natural repair process and collagen production to help improve the appearance of fine lines, uneven texture and acne scars. Treatment is personalised to your skin’s needs." },
      { name: 'Lip Bliss Hydration', aud: 99, description: "Give dry lips some extra care with a treatment designed to hydrate and soften, leaving them feeling smoother and looking refreshed. Enhances your natural lips without adding tattoo colour or injectable volume." },
      { name: 'Facial Spa', aud: 150, description: "A moment to unwind while caring for your skin. Enjoy facial cleansing, gentle exfoliation, personalised serums, a facial mask and relaxing massage movements, leaving your skin feeling soft, hydrated and refreshed." },
      { name: 'Deluxe Facial', aud: 360, note: '2 hours', description: "Enjoy a personalised combination of facial cleansing, dermaplaning and microneedling, with each step selected according to your skin’s needs and suitability. Finished with a facial mask and LED light therapy for a complete skin-care experience." },
      { name: 'Grow Up Hair – Brows', aud: 150, description: "Targeted care for sparse or overplucked brows, with a personalised assessment and treatment plan focused on your natural brow hair and the skin beneath it. Ideal for those working towards fuller-looking brows." },
      { name: 'Grow Up Hair – Scalp', aud: 200, description: "Personalised scalp care for those concerned about thinning hair. Treatment focuses on scalp condition, with an individual plan and aftercare guidance based on your needs." },
    ],
  },
  {
    id: 'lashes', title: 'Lashes',
    items: [
      { name: 'Lash Lift & Tint', aud: 133, description: "A lash lift lifts and curls your own natural lashes, making them appear longer and more defined. Professional lifting and setting lotions reshape the lashes and hold their new curl, creating a more open-eyed look. Tint adds a darker finish, while a conditioning treatment completes the service. A beautiful way to enhance what you already have, with no extensions needed." },
      { name: 'Lash Lift Only', aud: 119, description: "Enhances the curl of your natural lashes for a more lifted, open-eyed appearance. No extensions or tint included." },
      { name: 'Classic Lash Extensions', aud: 145, description: "One extension is applied to each natural lash to enhance length and definition. Perfect if you love a subtle, polished look." },
      { name: 'Hybrid Lash Extensions', aud: 180, description: "A blend of classic extensions and volume fans, with a focus on creating fullness. Ideal for anyone wanting more volume, a denser lash line and a fuller-looking set." },
      { name: 'Wet Look Lash Extensions', aud: 150, description: "Love the classic look but want more definition? Wet Look lashes create a denser, darker and more striking finish, with a defined, textured effect." },
      { name: 'Lash Tint', aud: 45, description: "Darkens your natural lashes for added definition, especially lighter lash tips. Colour only; no lift or extensions included." },
      { name: 'Lash Extension Removal', aud: 40, description: "Professional removal of lash extensions using a dedicated remover." },
      { name: 'Classic Lash Infill – 2 weeks', aud: 85 },
      { name: 'Classic Lash Infill – 3 weeks', aud: 105 },
      { name: 'Hybrid Lash Infill – 2 weeks', aud: 120 },
      { name: 'Hybrid Lash Infill – 3 weeks', aud: 150 },
    ],
    footer: 'Infills require at least 50% lash retention at two weeks or 40% at three weeks. Additional time and charges may apply if fewer remain.',
  },
  {
    id: 'women-waxing', title: 'Waxing – Women',
    intro: 'I use two types of wax, depending on the treatment area. Hard wax, removed without strips, is used for Brazilian waxing, underarms, facial waxing — including the sides of the face — and selected areas of the back. Strip wax, removed with waxing strips, is used for legs, arms, the abdomen and selected areas of the back, as well as smaller areas where appropriate.',
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
      { name: 'Teeth Whitening', aud: 199, description: "Brighten your smile with a cosmetic teeth whitening treatment designed to lighten the shade of your natural teeth. We discuss your goals and suitability before treatment, with aftercare guidance to help you maintain your result. Results vary depending on your starting shade and the type of discolouration. Whitening does not change the colour of crowns, veneers or fillings." },
    ],
  },
];

/** Exact English description from the studio's approved PDF, where the service has a direct match. */
const APPROVED_NAMES_BY_SERVICE_ID: Record<string,string> = {
  "cosmetic-tattoo-removal": "Cosmetic Tattoo Removal",
  "male-brow-sculpt": "Male Brow Sculpt",
  "dreamy-brows": "Dreamy Brows – Brow Sculpt & Relaxing Massage",
  "lash-lift-only": "Lash Lift Only",
  "wet-look-lashes": "Wet Look Lash Extensions",
  "lash-tint": "Lash Tint",
  "lash-extension-removal": "Lash Extension Removal",
  "nano-strokes": "Microblading – Nano Strokes",
  "shadow-brows": "Shadow Brows",
  "lip-blush": "Lip Blush – Lip Tattooing",
  "brow-sculpt": "Brow Sculpt Signature",
  "brow-sculpt-tint": "Brow Sculpt & Tint",
  "shadow-hybrid": "Brow Sculpt & Hybrid Dye",
  "brow-lamination": "Brow Lamination, Shape & Tint",
  "lash-lift": "Lash Lift & Tint",
  "classic-eyelashes": "Classic Lash Extensions",
  "hybrid-eyelashes": "Hybrid Lash Extensions",
  "dermaplaning": "Dermaplaning",
  "microneedling": "Microneedling",
  "facial-spa": "Facial Spa",
  "deluxe-facial": "Deluxe Facial",
  "lip-bliss-hydration": "Lip Bliss Hydration",
  "grow-up-hair-brows": "Grow Up Hair – Brows",
  "grow-up-hair-scalp": "Grow Up Hair – Scalp",
  "teeth-whitening": "Teeth Whitening",
  "waxing": "Brazilian"
};
export const approvedDescriptionFor = (serviceId: string): string | undefined => {
  const name = APPROVED_NAMES_BY_SERVICE_ID[serviceId];
  if (!name) return undefined;
  return APPROVED_SERVICE_CATALOG.flatMap(group => group.items).find(item => item.name === name)?.description;
};
