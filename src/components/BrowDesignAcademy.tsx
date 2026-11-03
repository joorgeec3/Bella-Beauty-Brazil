import React from 'react';
import { Award, BookOpen, ClipboardList, GraduationCap, MessageCircle } from 'lucide-react';
import type { Language } from '../data/siteData';

type AcademyCopy = {
  eyebrow: string;
  title: string;
  lead: string;
  notice: string;
  curriculum: string;
  activity: string;
  clear: string;
  exam: string;
  examIntro: string;
  answer: string;
  passing: string;
  certificate: string;
  certificateNote: string;
  enquiry: string;
};

const copy: Record<Language, AcademyCopy> = {
  en: {
    eyebrow: 'Bella Beauty Brazil Academy · Professional training',
    title: 'Professional Eyebrow Design — Advanced Learning',
    lead: 'Explore Modules 21–27, consultation and design practice, professional standards, the final examination and a sample completion certificate. Training content is presented in English.',
    notice: 'Training practice only. Do not enter actual client identities or medical information. These examples are not connected to a database, email, booking system or permanent record; entries disappear when the page reloads. Use the studio’s approved confidential records for real clients.',
    curriculum: 'Course modules', activity: 'Interactive practice worksheet', clear: 'Clear practice entries',
    exam: 'Final examination', examIntro: 'Answer all eight questions. An instructor reviews your answers and practical work before any completion certificate can be issued.',
    answer: 'Your answer', passing: 'Passing grade: 80%', certificate: 'Certificate of completion — sample',
    certificateNote: 'Example layout only. This page cannot award certification; completion and instructor approval must be verified by Bella Beauty Brazil Academy.',
    enquiry: 'Enquire about eyebrow design training',
  },
  pt: {
    eyebrow: 'Bella Beauty Brazil Academy · Formação profissional',
    title: 'Design Profissional de Sobrancelhas — Conteúdo Avançado',
    lead: 'Conheça os módulos 21–27, exercícios de consulta e design, práticas profissionais, avaliação final e modelo de certificado. O conteúdo fornecido está em inglês.',
    notice: 'Apenas para treinamento. Não insira dados pessoais ou informações médicas de clientes reais. Os campos não enviam nem salvam informações; os dados são perdidos ao recarregar a página. Use o sistema confidencial aprovado pelo estúdio para clientes reais.',
    curriculum: 'Módulos do curso', activity: 'Ficha prática interativa', clear: 'Limpar exercícios',
    exam: 'Avaliação final', examIntro: 'Responda às oito perguntas. A instrutora deve avaliar as respostas e a prática antes da emissão de qualquer certificado.',
    answer: 'Sua resposta', passing: 'Nota mínima: 80%', certificate: 'Certificado de conclusão — modelo',
    certificateNote: 'Modelo ilustrativo. Esta página não emite certificados; a conclusão e a aprovação dependem da Bella Beauty Brazil Academy.',
    enquiry: 'Consultar sobre o curso de design de sobrancelhas',
  },
  es: {
    eyebrow: 'Bella Beauty Brazil Academy · Formación profesional',
    title: 'Diseño Profesional de Cejas — Aprendizaje Avanzado',
    lead: 'Explora los módulos 21–27, ejercicios de consulta y diseño, prácticas profesionales, examen final y modelo de certificado. El contenido proporcionado está en inglés.',
    notice: 'Solo para formación. No introduzcas datos personales ni médicos de clientes reales. Los campos no envían ni guardan datos; las entradas se pierden al recargar la página. Usa el sistema confidencial aprobado por el estudio para clientes reales.',
    curriculum: 'Módulos del curso', activity: 'Ficha práctica interactiva', clear: 'Borrar ejercicios',
    exam: 'Examen final', examIntro: 'Responde las ocho preguntas. La instructora debe revisar las respuestas y la práctica antes de emitir cualquier certificado.',
    answer: 'Tu respuesta', passing: 'Nota mínima: 80%', certificate: 'Certificado de finalización — ejemplo',
    certificateNote: 'Ejemplo ilustrativo. Esta página no emite certificados; la finalización y aprobación dependen de Bella Beauty Brazil Academy.',
    enquiry: 'Consultar sobre formación en diseño de cejas',
  },
};

const medicalHistory = [
  'Pregnancy', 'Breastfeeding', 'Diabetes', 'Thyroid Disorder', 'Psoriasis', 'Eczema',
  'Dermatitis', 'Skin Infection', 'Alopecia', 'Recent Cosmetic Procedures', 'Allergies',
  'Blood Thinners', 'None',
];
const browHistory = ['Brow Tint', 'Henna', 'Brow Lamination', 'Microblading', 'Cosmetic Tattoo', 'Laser Removal', 'No Previous Treatments'];
const clientGoals = ['Shape', 'Symmetry', 'Thickness', 'Colour', 'Density', 'General Appearance'];

const exercises = [
  { title: 'Brow Mapping on Paper', objective: 'Develop understanding of proportion and symmetry.', minimum: '10 Mapping Exercises' },
  { title: 'Brow Mapping on Live Models', objective: 'Apply mapping techniques to different face shapes.', minimum: '5 Models' },
  { title: 'Hair Removal Practice', objective: 'Develop precision and confidence.', minimum: '5 Models' },
  { title: 'Henna Application', objective: 'Master colour selection and application.', minimum: '5 Models' },
  { title: 'Complete Brow Design', objective: 'Perform consultation, mapping, shaping and finishing.', minimum: '10 Models' },
];
const mistakes = [
  { title: 'Over-Thinning', explanation: 'One of the most common mistakes. Consequences: loss of shape, sparse appearance and longer recovery time.', solution: 'Remove only necessary hairs.' },
  { title: 'Excessive Trimming', explanation: 'Over-trimming creates visible gaps and weakens the brow structure.', solution: 'Trim conservatively.' },
  { title: 'Incorrect Mapping', explanation: 'Incorrect measurements create imbalance.', solution: 'Always double-check measurements before beginning hair removal.' },
  { title: 'Following Trends Instead of Anatomy', explanation: 'Not every trend suits every face.', solution: 'Design brows according to the individual client.' },
  { title: 'Ignoring Hair Growth Patterns', explanation: 'Removing hairs without understanding natural growth can create irregularities.', solution: 'Respect natural direction and density.' },
];
const questions = [
  'What is the purpose of brow mapping?',
  'What are the three main brow points?',
  'Why is facial analysis important?',
  'What is the purpose of visagism?',
  'What are the contraindications for brow lamination?',
  'Why is client consultation essential?',
  'What is the ideal brow position according to the A-B-C Brow Theory?',
  'How often should brow lamination be maintained?',
];

const Field: React.FC<{ label: string; name: string; type?: 'text' | 'date' | 'tel' | 'email' }> = ({ label, name, type = 'text' }) => (
  <label className="block min-w-0 font-montserrat text-xs font-semibold text-[#5b3239]">
    {label}
    <input name={name} type={type} autoComplete="off" className="mt-1.5 block w-full min-w-0 rounded-lg border border-[#dcbfc8] bg-white px-3 py-2.5 font-montserrat text-sm text-[#34272c] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9a5967]" />
  </label>
);
const Notes: React.FC<{ label: string; name: string }> = ({ label, name }) => (
  <label className="block font-montserrat text-xs font-semibold text-[#5b3239]">
    {label}
    <textarea name={name} rows={3} className="mt-1.5 block w-full rounded-lg border border-[#dcbfc8] bg-white px-3 py-2.5 font-montserrat text-sm text-[#34272c] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9a5967]" />
  </label>
);
const Choices: React.FC<{ label: string; name: string; values: readonly string[]; exclusive?: boolean }> = ({ label, name, values, exclusive = false }) => (
  <fieldset className="min-w-0">
    <legend className="mb-3 font-montserrat text-xs font-bold uppercase tracking-wider text-[#5b3239]">{label}</legend>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
      {values.map((value) => (
        <label key={value} className="flex min-w-0 items-center gap-2 rounded-lg border border-[#ebd9dd] bg-white px-3 py-2.5 font-montserrat text-xs text-[#4c3c43] cursor-pointer">
          <input type={exclusive ? 'radio' : 'checkbox'} name={name} value={value} className="accent-[#794656] shrink-0" />
          <span>{value}</span>
        </label>
      ))}
    </div>
  </fieldset>
);
const MiniHeading: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h4 className="font-raleway text-lg font-semibold text-[#5b3239]">{children}</h4>
);
const Module: React.FC<{ number: number; title: string; children: React.ReactNode }> = ({ number, title, children }) => (
  <details className="group overflow-hidden rounded-2xl border border-[#e7d2d8] bg-white shadow-sm">
    <summary className="flex cursor-pointer list-none items-center gap-4 px-4 sm:px-6 py-5 font-raleway text-lg sm:text-xl font-semibold text-[#5b3239] marker:content-none [&::-webkit-details-marker]:hidden">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#f3d9e0] font-montserrat text-sm font-bold">{number}</span>
      <span className="flex-1">{title}</span>
      <span aria-hidden="true" className="font-montserrat text-2xl font-light transition-transform group-open:rotate-45">+</span>
    </summary>
    <div className="space-y-5 border-t border-[#f0e1e5] px-4 sm:px-6 py-6 font-montserrat text-sm leading-relaxed text-[#5a4a50]">{children}</div>
  </details>
);
const Reset: React.FC<{ label: string }> = ({ label }) => (
  <button type="reset" className="rounded-full border border-[#9a5967] px-5 py-2.5 font-montserrat text-xs font-semibold text-[#5b3239] hover:bg-[#f3d9e0] focus-visible:outline-2 focus-visible:outline-offset-2">
    {label}
  </button>
);

export const BrowDesignAcademy: React.FC<{ language: Language }> = ({ language }) => {
  const t = copy[language];
  return (
    <section id="brow-design-academy" aria-labelledby="brow-academy-heading" className="border-t border-[#ebd9dd] bg-[#fff9f7] py-16 lg:py-24 scroll-mt-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center gap-2 font-montserrat text-[11px] font-bold uppercase tracking-[0.17em] text-[#9a5967]"><GraduationCap size={17} aria-hidden="true" />{t.eyebrow}</p>
          <h2 id="brow-academy-heading" className="mt-4 font-raleway text-3xl sm:text-4xl font-semibold text-[#5b3239]">{t.title}</h2>
          <p className="mt-4 font-montserrat text-sm sm:text-base leading-relaxed text-[#64545a]">{t.lead}</p>
          <p className="mt-5 rounded-xl border border-[#ead4da] bg-white p-4 font-montserrat text-xs leading-relaxed text-[#66515a]">{t.notice}</p>
        </div>

        <div className="mt-12">
          <h3 className="mb-5 flex items-center gap-2 font-raleway text-2xl font-semibold text-[#5b3239]"><BookOpen size={22} aria-hidden="true" />{t.curriculum}</h3>
          <div className="space-y-4">
            <Module number={21} title="Client Consultation Form">
              <p>Every treatment should begin with a professional consultation. The consultation helps identify contraindications, understand client expectations, and create a personalised treatment plan.</p>
              <form autoComplete="off" onSubmit={(event) => event.preventDefault()} className="space-y-7" aria-label="Client consultation practice form">
                <div className="space-y-4"><MiniHeading>Client Information</MiniHeading>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Full Name" name="practice-full-name" />
                    <Field label="Date of Birth" name="practice-date-of-birth" type="date" />
                    <Field label="Phone Number" name="practice-phone" type="tel" />
                    <Field label="Email" name="practice-email" type="email" />
                    <Field label="Emergency Contact" name="practice-emergency-contact" />
                  </div>
                </div>
                <div className="space-y-4"><MiniHeading>Medical History</MiniHeading>
                  <p>Do you currently have any of the following?</p>
                  <Choices label="Medical history checklist" name="practice-medical-history" values={medicalHistory} />
                  <Notes label="Please provide details" name="practice-medical-details" />
                </div>
                <div className="space-y-4"><MiniHeading>Brow History</MiniHeading>
                  <Choices label="Have you previously had" name="practice-brow-history" values={browHistory} />
                  <Field label="Date of last treatment" name="practice-last-treatment" type="date" />
                </div>
                <div className="space-y-4"><MiniHeading>Client Goals</MiniHeading>
                  <p>What would you like to improve about your brows?</p>
                  <Choices label="Improvement goals" name="practice-goals" values={clientGoals} />
                  <Notes label="Notes" name="practice-goal-notes" />
                </div>
                <div className="space-y-4"><MiniHeading>Consent</MiniHeading>
                  <p>I confirm that all information provided is accurate and complete.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Client Signature (practice placeholder)" name="practice-signature" />
                    <Field label="Date" name="practice-sign-date" type="date" />
                  </div>
                </div>
                <Reset label={t.clear} />
              </form>
            </Module>

            <Module number={22} title="Brow Design Worksheet">
              <form autoComplete="off" onSubmit={(event) => event.preventDefault()} className="space-y-6" aria-label="Brow design practice worksheet">
                <MiniHeading>Facial Assessment</MiniHeading>
                <Choices label="Face Shape" name="practice-face-shape" values={['Oval', 'Round', 'Long', 'Square', 'Heart', 'Triangle']} exclusive />
                <MiniHeading>Eye Assessment</MiniHeading>
                <Choices label="Eye Characteristics" name="practice-eye-assessment" values={['Small Eyes', 'Large Eyes', 'Hooded Eyes', 'Close-Set Eyes', 'Wide-Set Eyes', 'Downturned Eyes']} />
                <MiniHeading>Hair Assessment</MiniHeading>
                <Choices label="Density" name="practice-hair-density" values={['Sparse', 'Medium', 'Dense']} exclusive />
                <Choices label="Growth Pattern" name="practice-growth-pattern" values={['Straight', 'Curved', 'Downward', 'Irregular']} />
                <Notes label="Recommended Design" name="practice-recommended-design" />
                <Reset label={t.clear} />
              </form>
            </Module>

            <Module number={23} title="Practical Training Guidelines">
              <p>Students should complete the following practical exercises before certification. Completion must be verified by the instructor.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {exercises.map((exercise, index) => (
                  <article key={exercise.title} className="rounded-xl border border-[#ead5da] bg-[#fffbfb] p-4 sm:p-5">
                    <h4 className="font-raleway text-lg font-bold text-[#5b3239]">Exercise {index + 1}: {exercise.title}</h4>
                    <p className="mt-2"><strong>Objective:</strong> {exercise.objective}</p>
                    <p className="mt-2"><strong>Minimum Requirement:</strong> {exercise.minimum}</p>
                    <p className="mt-3 font-semibold text-[#5b3239]">Completed (self-check):</p>
                    <div className="mt-2 flex gap-4">
                      {['Yes', 'No'].map((answer) => (
                        <label key={answer} className="flex items-center gap-2 cursor-pointer"><input name={'exercise-' + (index + 1)} type="radio" value={answer} className="accent-[#794656]" />{answer}</label>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </Module>

            <Module number={24} title="Common Mistakes in Eyebrow Design">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mistakes.map((mistake) => (
                  <article key={mistake.title} className="rounded-xl border border-[#ebd9dd] bg-[#fffbfb] p-4">
                    <MiniHeading>{mistake.title}</MiniHeading>
                    <p className="mt-2">{mistake.explanation}</p>
                    <p className="mt-2"><strong className="text-[#5b3239]">Solution:</strong> {mistake.solution}</p>
                  </article>
                ))}
              </div>
            </Module>

            <Module number={25} title="Client Aftercare">
              <p>Proper aftercare helps maintain results and improve longevity. Adapt guidance to the actual treatment and the individual client.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div><MiniHeading>First 24 Hours — Avoid</MiniHeading>
                  <ul className="mt-3 list-disc space-y-1 pl-5"><li>Excessive touching</li><li>Swimming</li><li>Steam</li><li>Heavy sweating</li><li>Oil-based products</li></ul>
                </div>
                <div><MiniHeading>Daily Maintenance — Recommend</MiniHeading>
                  <ul className="mt-3 list-disc space-y-1 pl-5"><li>Brushing brows daily</li><li>Using nourishing products when appropriate</li><li>Following maintenance schedules</li><li>Returning for regular appointments</li></ul>
                </div>
              </div>
              <MiniHeading>Recommended Maintenance Schedule</MiniHeading>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  ['Brow Design', 'Every 3–5 weeks'],
                  ['Henna', 'Every 2–4 weeks'],
                  ['Hybrid Dye', 'Every 4–6 weeks'],
                  ['Brow Lamination', 'Every 6–8 weeks'],
                ].map(([treatment, interval]) => <div key={treatment} className="rounded-lg bg-[#f8eff1] px-4 py-3"><strong className="text-[#5b3239]">{treatment}</strong><span className="ml-2">{interval}</span></div>)}
              </div>
            </Module>

            <Module number={26} title="Professional Photography for Brow Artists">
              <p>Beautiful results deserve professional presentation. Obtain the client's permission before taking or publishing identifiable photographs.</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div><MiniHeading>Camera Position</MiniHeading><p>Always photograph:</p><ul className="mt-2 list-disc pl-5"><li>Front view</li><li>Right profile</li><li>Left profile</li></ul><p className="mt-2">Maintain consistent angles.</p></div>
                <div><MiniHeading>Lighting</MiniHeading><p>Best results:</p><ul className="mt-2 list-disc pl-5"><li>Natural light</li><li>Soft white lighting</li></ul><p className="mt-2">Avoid yellow lighting, strong shadows and flash directly on the face.</p></div>
                <div><MiniHeading>Background</MiniHeading><p>Use:</p><ul className="mt-2 list-disc pl-5"><li>White</li><li>Beige</li><li>Light grey</li></ul><p className="mt-2">A clean background keeps attention on your work.</p></div>
              </div>
            </Module>

            <Module number={27} title="Social Media for Brow Artists">
              <p>Your work deserves visibility. Build trust through education and authentic, consented results.</p>
              <MiniHeading>Content Ideas</MiniHeading>
              <div className="flex flex-wrap gap-2">{['Before & After Results', 'Brow Transformations', 'Client Testimonials', 'Educational Videos', 'Behind The Scenes', 'Healing Results'].map((item) => <span key={item} className="rounded-full bg-[#f6e8ec] px-3 py-2 text-xs text-[#5b3239]">{item}</span>)}</div>
              <MiniHeading>Build Trust Through Education</MiniHeading>
              <p>Clients buy confidence. Teach your audience:</p>
              <ul className="list-disc pl-5"><li>Brow maintenance</li><li>Brow growth</li><li>Lamination benefits</li><li>Brow mapping</li><li>Common mistakes</li></ul>
              <p>Education creates authority.</p>
              <MiniHeading>The Bella Beauty Brazil Formula</MiniHeading>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {[
                  ['40%', 'Education'], ['30%', 'Transformations'], ['20%', 'Personal Branding'], ['10%', 'Promotions'],
                ].map(([percent, item]) => <div key={item} className="rounded-xl border border-[#ebd9dd] bg-[#fff4f6] p-4 text-center"><p className="font-raleway text-3xl font-bold text-[#854b5c]">{percent}</p><p className="mt-1 text-xs font-semibold text-[#5b3239]">{item}</p></div>)}
              </div>
            </Module>
          </div>
        </div>

        <section aria-labelledby="brow-final-exam-heading" className="mt-12 rounded-3xl border border-[#e7d2d8] bg-white p-5 sm:p-8">
          <p className="font-montserrat text-xs font-bold uppercase tracking-wider text-[#9a5967]">Bella Beauty Brazil Academy</p>
          <h3 id="brow-final-exam-heading" className="mt-2 flex items-center gap-2 font-raleway text-2xl sm:text-3xl font-bold text-[#5b3239]"><ClipboardList aria-hidden="true" />{t.exam}</h3>
          <p className="mt-3 font-montserrat text-sm text-[#5a4a50]">{t.examIntro}</p>
          <p className="mt-2 font-montserrat text-xs font-bold text-[#854b5c]">{t.passing}</p>
          <form autoComplete="off" onSubmit={(event) => event.preventDefault()} className="mt-6 space-y-5">
            {questions.map((question, index) => (
              <label key={question} className="block font-montserrat text-sm font-semibold text-[#5b3239]">
                {index + 1}. {question}
                <textarea name={'exam-answer-' + (index + 1)} rows={2} placeholder={t.answer} className="mt-2 block w-full rounded-xl border border-[#dcbfc8] bg-[#fffdfd] px-4 py-3 font-montserrat text-sm font-normal text-[#34272c] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9a5967]" />
              </label>
            ))}
            <Reset label={t.clear} />
          </form>
        </section>

        <section aria-labelledby="brow-certificate-heading" className="mt-10 overflow-hidden rounded-3xl border border-[#d6b6c1] bg-gradient-to-br from-[#fffdf9] via-[#fff4f6] to-[#f4e2e5] p-5 sm:p-10 text-center">
          <Award size={35} className="mx-auto text-[#9a5967]" aria-hidden="true" />
          <p className="mt-3 font-montserrat text-xs font-bold uppercase tracking-[0.17em] text-[#9a5967]">Bella Beauty Brazil Academy</p>
          <h3 id="brow-certificate-heading" className="mt-2 font-raleway text-2xl sm:text-4xl font-semibold uppercase text-[#5b3239]">{t.certificate}</h3>
          <p className="mt-6 font-raleway text-lg text-[#57424a]">This certificate is proudly awarded to</p>
          <p aria-label="Recipient name to be completed by the academy" className="mx-auto my-5 h-9 max-w-md border-b border-[#9a5967]" />
          <p className="mx-auto max-w-xl font-montserrat text-sm leading-relaxed text-[#57424a]">for successfully completing the <strong>Professional Eyebrow Design Course</strong> and demonstrating competency in consultation, facial analysis, brow mapping, eyebrow shaping, henna application, hygiene protocols and professional client care.</p>
          <div className="mx-auto mt-8 grid max-w-xl grid-cols-1 sm:grid-cols-2 gap-6 text-left font-montserrat text-xs text-[#57424a]">
            <p>Date: ________________________</p>
            <p>Instructor: <strong>Livia Rego</strong></p>
            <p>Signature: ________________________</p>
            <p>Bella Beauty Brazil Academy</p>
          </div>
          <p className="mx-auto mt-7 max-w-xl border-t border-[#dbc1c9] pt-5 font-montserrat text-xs text-[#6d5b62]">{t.certificateNote}</p>
        </section>

        <div className="mt-10 text-center">
          <a href={'https://wa.me/61402148437?text=' + encodeURIComponent('Hi Bella Beauty Brazil, I would like to enquire about the Professional Eyebrow Design Course.')} target="_blank" rel="noopener noreferrer" className="inline-flex max-w-full items-center justify-center gap-2 rounded-full bg-[#5b3239] px-6 py-3.5 font-montserrat text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-[#794b59] focus-visible:outline-2 focus-visible:outline-offset-2">
            <MessageCircle size={17} aria-hidden="true" />{t.enquiry}
          </a>
        </div>
      </div>
    </section>
  );
};
