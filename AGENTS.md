# AGENTS.md
## Project Overview
This project is the official website for SM Green Energy Solutions, a solar energy solutions company serving customers in Rajasthan, India.
The website must be:

Fast
SEO-friendly
Accessible
Mobile-first
Responsive
Secure
Professional
Conversion-focused
Easy to maintain
Scalable for future features such as case studies, blogs, lead management and CRM integration


1. Technology Stack
Use the existing project stack:

Next.js
React
TypeScript
Tailwind CSS
React Compiler
ESLint

Use the Next.js App Router.
Do not introduce another framework or CSS framework unless there is a strong technical reason.
Prefer modern Next.js patterns and APIs.

2. Coding Conventions
TypeScript

Use TypeScript everywhere.
Do not create JavaScript files unless absolutely necessary.
Avoid any.
Prefer explicit types for component props, API responses and important data structures.
Use interfaces or type aliases consistently.
Keep types close to the feature when appropriate.

Naming
Use:

PascalCase for React components.
camelCase for variables and functions.
UPPER_CASE only for true constants.
Descriptive names instead of abbreviations.

Examples:
SolarServices
CaseStudyCard
getSolarProjects()

Avoid:
SC
getData()
x
temp

Components
Create reusable components.
Do not duplicate the same UI in multiple files.
Prefer:
components/
├── ui/
├── layout/
├── sections/
└── features/

Keep components focused on one responsibility.
Avoid extremely large components.

3. Component Architecture
Use Server Components by default.
Only use:
"use client";

when client-side functionality is actually required.
Examples requiring Client Components:

Interactive navigation
Forms with client-side interaction
Modals
Carousels
Interactive filters
Browser APIs
React state/effects

Do not convert an entire page into a Client Component unnecessarily.
Prefer composition over large monolithic components.
Recommended structure:
src/
├── app/
│   ├── page.tsx
│   ├── layout.tsx
│   ├── sitemap.ts
│   ├── robots.ts
│   └── ...
│
├── components/
│   ├── ui/
│   ├── layout/
│   ├── sections/
│   └── features/
│
├── lib/
│   ├── seo/
│   ├── validation/
│   └── utils/
│
├── data/
│
├── types/
│
└── styles/


4. Responsive Design
Use a mobile-first approach.
The website must work correctly on:

Small mobile phones
Large mobile phones
Tablets
Laptops
Desktop monitors
Large screens

Use Tailwind responsive utilities.
Avoid fixed widths that break layouts.
Prefer:
w-full
max-w-7xl
mx-auto
grid
flex

over unnecessary fixed dimensions.
Test every major section at mobile, tablet and desktop widths.
Do not allow:

Horizontal scrolling
Text overflow
Broken navigation
Overlapping elements
Images overflowing containers
Buttons becoming unusable on mobile

Mobile navigation must be easy to use with touch.

5. Accessibility
Follow WCAG-oriented accessibility practices.
Use semantic HTML:
<header>
<nav>
<main>
<section>
<article>
<footer>

Use headings in logical order:
H1
 ├── H2
 │    ├── H3
 │    └── H3
 └── H2

Each important page should normally have one primary H1.
All meaningful images must have descriptive alt text.
Decorative images should use appropriate empty alt text.
All form inputs must have accessible labels.
Buttons must be actual <button> elements.
Links must be actual <a> elements.
Do not use clickable <div> elements when a button or link is appropriate.
Ensure keyboard navigation works.
Ensure visible focus states.
Maintain sufficient color contrast.
Do not communicate important information using color alone.
Respect reduced-motion preferences where animations are used.

6. SEO
SEO is a core requirement of this project.
Every important page must have:

Unique title
Unique meta description
Canonical URL when appropriate
Correct heading hierarchy
Descriptive URLs
Relevant structured data
Open Graph metadata where appropriate
Twitter/X metadata where appropriate
Descriptive image alt text
Internal links

Use Next.js Metadata APIs.
Avoid duplicate metadata.
Do not keyword-stuff titles, descriptions or content.
Do not create thin pages.
Do not generate hundreds of pages simply by replacing city names.
Every location page must provide genuinely useful information.

7. Local SEO
The business targets Rajasthan and relevant service locations.
Potential locations include:

Jaipur
Jhunjhunu
Sikar
Churu

Location pages must contain useful, original information.
Never create fake addresses.
Never claim the company has an office at a location unless that is true.
Never publish fake reviews, fake projects or fake customer information.
Use appropriate structured data for the business only when the information is accurate.

8. Structured Data
Use JSON-LD where appropriate.
Potential schemas include:

Organization
LocalBusiness or the most appropriate specific business type
WebSite
BreadcrumbList
Article
FAQPage where genuinely appropriate

Structured data must match visible page content.
Never add fake:

Ratings
Reviews
Prices
Addresses
Business information
Offers


9. URL Structure
URLs should be:

Short
Descriptive
Lowercase
Hyphen-separated
Stable

Examples:
/solar-installation-jaipur
/solar-installation-jhunjhunu
/case-studies/5kw-solar-installation-jhunjhunu
/services/residential-solar
/blog/5kw-solar-system-guide

Avoid:
/page?id=123
/services/page1
/solar123456

Avoid unnecessary URL changes after pages are indexed.

10. Internal Linking
Create logical internal links between related pages.
Example:
Solar Installation Jaipur
        ↓
Residential Solar
        ↓
5kW Solar System
        ↓
Jhunjhunu Case Study

Use descriptive anchor text.
Avoid excessive exact-match anchor repetition.
Every important page should be reachable through internal navigation or contextual links.

11. Performance
Performance is a major requirement.
Optimize for Core Web Vitals.
Prioritize:

LCP
INP
CLS

Use Next.js image optimization.
Prefer:
next/image

for website images.
Use properly sized images.
Prefer modern formats such as WebP or AVIF when practical.
Do not load huge images unnecessarily.
Avoid unnecessary JavaScript.
Avoid unnecessary Client Components.
Lazy-load below-the-fold media when appropriate.
Do not add large libraries for simple functionality.
Avoid excessive animations.
Avoid autoplay video unless it provides real value.
Optimize fonts and avoid unnecessary font weights.

12. Image Rules
All important images should be optimized.
Use meaningful filenames when possible.
Example:
5kw-solar-installation-jhunjhunu.webp
rooftop-solar-jaipur.webp

Avoid:
IMG_1234.jpg
DSC_9999.jpg

Do not use filenames as a replacement for proper alt text.
Use responsive image sizes.
Do not unnecessarily load full-resolution photographs on mobile.

13. Security
Never expose secrets in client-side code.
Never commit:
.env
.env.local
API keys
database passwords
private tokens
credentials

Use environment variables for secrets.
Validate all user input on the server.
Never trust client-side validation alone.
Sanitize user-generated content before rendering it.
Protect API routes from abuse where appropriate.
Do not expose internal database errors to users.
Use safe error messages.
Do not log sensitive customer information.
Do not store personal information unless it is necessary.

14. Forms and Lead Generation
The website will contain lead-generation forms.
Possible fields:

Name
Phone
City
Monthly electricity bill
Message

Forms must have:

Accessible labels
Client-side validation
Server-side validation
Clear error messages
Loading state
Success state
Failure state

Never expose API credentials in frontend code.
Protect public endpoints against spam and abuse.

15. Case Studies
Case studies represent real solar projects.
A case study may include:

Location
System capacity
Customer requirement
Site condition
Solar panels
Inverter
Structure
Quotation date
Installation date
Subsidy status
Project photographs
Project outcome
Customer testimonial

Do not publish personally identifiable customer information without permission.
Do not invent project results.
Do not claim electricity savings or generation unless supported by actual data.

16. Content Rules
Content should be written for humans first and search engines second.
Use clear and professional language.
Avoid keyword stuffing.
Avoid exaggerated or unsupported claims.
Do not claim:

Guaranteed savings
Guaranteed electricity bill reduction
Guaranteed Google rankings
Fake customer counts
Fake installations
Fake reviews
Unsupported subsidy amounts

Use factual information and clearly explain estimates when used.

17. Tailwind CSS
Use Tailwind CSS for styling.
Prefer reusable utility patterns.
Avoid excessive arbitrary values unless necessary.
Keep spacing, typography, radius and layout consistent.
Maintain a consistent design system.
Primary visual direction:

White / off-white
Deep green
Subtle solar-yellow accents
Dark charcoal text

Design should feel:

Premium
Clean
Trustworthy
Modern
Professional

Avoid excessive gradients, animations and visual clutter.

18. Error Handling
Provide proper:

Loading states
Error states
Empty states
Not-found pages

Do not leave users with blank screens.
Use appropriate Next.js error and not-found handling.

19. Dependencies
Before installing a new package:

Check whether the functionality can be implemented using existing tools.
Prefer lightweight, well-maintained packages.
Avoid unnecessary dependencies.
Do not add a package only for a trivial utility.


20. React Compiler
React Compiler is enabled.
Do not add unnecessary useMemo or useCallback purely for optimization.
Only use manual memoization when there is a demonstrated technical reason or an external API requires it.

21. Code Quality
Before completing a feature:
Run:
npm run lint

Check for TypeScript errors.
Verify the application builds successfully.
Check the feature on mobile and desktop.
Check keyboard accessibility.
Check metadata and SEO.
Check images and performance.
Remove unused imports and dead code.
Do not leave debugging statements such as:
console.log()

unless intentionally required.

22. AI Coding Agent Rules
Before modifying code:

Inspect the relevant existing files.
Understand the current architecture.
Reuse existing components where possible.
Do not rewrite unrelated files.
Do not introduce unnecessary dependencies.
Preserve existing functionality.
Make the smallest clean change that solves the requested task.

When adding a new feature:

Keep it responsive.
Keep it accessible.
Keep it SEO-friendly.
Keep it performant.
Keep it type-safe.
Follow the existing component structure.
Avoid unnecessary client-side JavaScript.

When unsure, prefer the simpler maintainable solution.

23. Definition of Done
A feature is considered complete only when:

TypeScript passes
ESLint passes
Build succeeds
Desktop layout works
Mobile layout works
Keyboard navigation works
Images are optimized
SEO metadata is correct
Accessibility requirements are met
No secrets are exposed
No unnecessary dependencies were added
Existing functionality remains intact