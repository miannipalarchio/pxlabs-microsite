# Implementation Plan: Converting PX Labs Microsite to Framer

This document outlines a professional, structured plan for converting the static **PX Labs Microsite** (a highly customized HTML/CSS/JS portfolio website) into a **Framer**-based modern, production-grade site. 

The plan focuses on maintaining the premium visual aesthetics of the original site (the dark-gold grid backdrop, custom serif typography, noise texture, and micro-animations) while utilizing Framer's native **CMS Collections**, **Components**, and **No-Code Interactive Layouts** for rapid content expansion and effortless editing.

---

## User Review Required

> [!IMPORTANT]
> **Corporate Alignment with www.pxltd.ca (Framer-to-Framer Integration)**
> Since our web audit reveals the primary corporate site `www.pxltd.ca` is already built and hosted entirely on **Framer**, this is the most seamless path possible. 
> To align perfectly with the corporate site, we recommend:
> 1. **Shared Workspace Account**: Building this microsite inside the same Framer account/team space as `www.pxltd.ca`.
> 2. **Folder-based Subpath Routing**: Deploying the microsite as a subpath (e.g., `www.pxltd.ca/labs` or `www.pxltd.ca/accelerator`). Framer allows linking separate projects under a single domain via reverse-proxy folders. This keeps the SEO juice concentrated on the main domain!
> 3. **Shared Visual Assets**: Copy-pasting the global navigation navbar and footer components directly from the main site's canvas to establish immediate visual continuity, while keeping our premium dark-gold grid layout for the "PX Labs" specific tech vibe.

> [!NOTE]
> **Framer CMS Architecture Strategy**
> Since all 7 full-offering pages (e.g., [PMWeb_Accelerator.html](file:///Users/haywiremac/Library/CloudStorage/OneDrive-SharedLibraries-ProjectXLtd/Project%20X%20-%20Library/Marketing/Offer%20Development/Gen%20AI%20Accelerator/Real%20Estate%20Offering%20-%202026/PX%20Labs%20MicroSite/PMWeb_Accelerator.html), [LeaseIQ.html](file:///Users/haywiremac/Library/CloudStorage/OneDrive-SharedLibraries-ProjectXLtd/Project%20X%20-%20Library/Marketing/Offer%20Development/Gen%20AI%20Accelerator/Real%20Estate%20Offering%20-%202026/PX%20Labs%20MicroSite/LeaseIQ.html)) share an identical section layout structure (Hero, Problem, What it Is, Gate Timeline, ROI Value, Outcomes, Tech Stack, Target Audience, and CTA), we propose rebuilding the subpages as a **single dynamic Framer CMS Detail Template Page**. This avoids maintaining 7 separate static page canvases and allows adding new offerings by simply entering a new row in the Framer CMS.

> [!WARNING]
> **Dynamic Filtering on the Landing Page**
> The current landing page utilizes custom client-side JavaScript to filter cards by "Product Family" (Accelerator vs IQ) and "Industry" (Real Estate, Retail). 
> In Framer, CMS collection lists do not support multi-category tab filters out-of-the-box without either:
> 1. Replicating the list using page variants (one variant per filter state - simple and native, but harder to maintain).
> 2. Using a small **Framer Code Override** on the CMS List to dynamically hide/show items based on selected filter state.
> 3. Leveraging a third-party Framer integration (like *FramerOverrides* or *Formspree/CMS filters*).
> **Recommendation:** We recommend using a native **Framer Code Override** script. It is lightweight, perfectly replicates the current JS filtering behavior, and is easily editable.

---

## Open Questions

> [!NOTE]
> 1. **Framer Hosting and Domain Strategy**: Do you intend to point the official custom subdomain (e.g., `pxlabs.pxltd.ca`) directly to Framer, or export the site as static files for hosting in an existing Snowflake/Supabase/corporate proxy infrastructure? (Framer hosting is highly recommended for CMS support).
> 2. **SVG vs. Image assets**: Do you have the raw vector file for the **PXLTD Brand Logo** base64 images embedded in the headers/footers, or should we extract and convert the base64 code back into a clean SVG for Framer import?

---

## Proposed Changes

We will systematically translate the design tokens, layouts, and data into Framer components.

### 1. Global Styles & Design Tokens Setup (Framer Canvas)
Before building layouts, we must configure Framer's global design environment to enforce the **Web & Digital Brand Standard v1.0**:

*   **Color Palette (Framer Styles)**:
    *   `Ink (Primary Background)`: `#0D1117`
    *   `Ink 2 (Card Background)`: `#1C2333`
    *   `Ink 3 (Card Hover)`: `#222B3A`
    *   `Gold (Brand Accent)`: `#C9A84C`
    *   `Gold-Light (Text/Highlight)`: `#E8C97A`
    *   `Slate (Muted Body)`: `#8892A4`
    *   `Slate 2 (Sub-labels)`: `#5A6478`
    *   `Smoke (Light Accent Section)`: `#F4F6FA`
    *   `White`: `#FFFFFF`
    *   `Green (Done Status)`: `#1A7F4B`
    *   `Green-Light`: `#D4EDDA`
*   **Typography (Google Fonts Integration)**:
    *   **Serif Headings**: `DM Serif Display` (Italic styles enabled for keyword emphasis like *All gates complete*).
    *   **Body Text**: `DM Sans` (Weights: 300 Light, 400 Regular, 500 Medium, 600 Semi-Bold).
    *   **System Codes / Badges**: `DM Mono` (Weights: 400, 500; Letter-spacing: `0.1em`).
*   **Background Effects**:
    *   **Noise Overlay**: Add a global absolute layer at the top of the viewport frame with a tileable SVG noise texture set to `opacity: 0.04` and `pointer-events: none` to mimic the custom CSS fractal noise.
    *   **Grid Backdrop**: Re-create the `64px x 64px` grid overlay by setting a linear-gradient background or placing a locked background wrapper containing the repeating SVG grid.

---

### 2. CMS Collection Schema Design
To power the main grid and offering detail pages, we will set up a Framer CMS Collection named **`Offerings`** with the following schema:

| Field Name | Type | Purpose / original mapping |
| :--- | :--- | :--- |
| `Name` | Title | e.g. `PMWeb Accelerator` |
| `Slug` | Slug | e.g. `pmweb-accelerator` |
| `Family` | Option (Single Select) | `Accelerator` or `IQ` |
| `Industry` | Multiple Select / Text | e.g. `real-estate`, `retail` |
| `Accent Color` | Color | e.g. `#3A9FFF` (custom left border hover color) |
| `Description` | Plain Text | Short deck description for the portfolio card grid. |
| `Buyer Persona` | Plain Text | e.g. `VP IT / Data · Director of Project Controls` |
| `Pilot Program Scope`| Plain Text | e.g. `4 weeks · 2 PMWeb modules` |
| `Phase` | Option | `Live Portfolio` (Phase 1) or `In Development` (Phase 2) |
| `Offering Status` | Option | `Live` or `Coming Soon` |
| **Subpage Specific Content Fields** | | |
| `Hero Subtitle` | Plain Text | The clamping sentence in the detail page hero. |
| `Problem Statements` | Rich Text / Lists | Replaces the left-hand column list in the problem section. |
| `Problem Quote Text` | Plain Text | The text of the italicized executive block quote. |
| `Problem Quote Cite` | Plain Text | e.g. `— VP IT, Global Real Estate Developer` |
| `What It Is Cards` | Rich Text / Multi-Item | Content for the 3 value cards. |
| `Gate Progress` | Number (1–6) | Highlighting completed gates (e.g. Gate 4 complete = 4). |
| `Gate Custom Details` | Rich Text | Customize descriptions for Gate 1 through 6. |
| `ROI Value Items` | Rich Text | Bullet points for the "Unlocking Value" section. |
| `Business Outcomes` | Rich Text | Concrete bullet metrics for the "Concrete Outcomes" cards. |
| `Tech Stack List` | Multiple Select / Text | Snowflake, PMWeb, Fivetran, Coalesce, dbt, etc. |
| `Target Audience List`| Rich Text | The roles highlighted in "Who is it For?" cards. |

---

### 3. Component Architecture & Interactions

We will package elements as reusable **Framer Components** with variables (Variants) to match states:

1.  **Global Header/Navbar Component**:
    *   Responsive layout: row list for desktop, hamburger/overlay menu for mobile.
    *   Visual: semi-transparent `#0D1117` background with `backdrop-filter: blur(12px)` and gold-rule bottom border.
    *   Hover interaction on "Start the Conversation" CTA: background transition from `Gold` (`#C9A84C`) to `Gold-Light` (`#E8C97A`).
2.  **Portfolio Filter Tab Component**:
    *   Interactive filter bar with variant-swapping states (All, Accelerator, IQ, Real Estate, Retail, Accounting, Legal). 
    *   Linked to the CMS collection list using a **Framer Code Override** script to trigger real-time search/hiding of cards.
3.  **Offering Grid Card Component**:
    *   Dynamic sizing (`320px` minimum width).
    *   Hover animation: smooth `Y-translation` (-4px), bottom shadow expansion, and scaling-in the custom `Accent Color` top bar.
4.  **Interactive Gates Track Component**:
    *   A beautifully formatted horizontal progress bar.
    *   Framer implementation: standard flex rows, using component variants to automatically light up dots (Gate 1 through 6) based on the CMS `Gate Progress` number field.
5.  **Global Footer Component**:
    *   Standardized metadata, copyright notice, legal links, and brand logo.

---

### 4. Layout Architecture: Rebuilding Pages
*   **Landing Page (`index.html`) Canvas**:
    *   **Hero Frame**: Floating overlay brand bar,DM Serif Display clamp heading, stats grid boxes, and animated bottom scroll cue.
    *   **Portfolio Filter Section**: Embedded **Portfolio Filter Tab** and CMS Collection List.
    *   **Roadmap Section**: CMS grid showing items where `Phase` is "In Development".
    *   **CTA Section**: Styled button linking directly to email.
*   **Offering Detail Template Page (`[CMS Page]`) Canvas**:
    *   Fully bound to the `Offerings` CMS Collection.
    *   Sections structured hierarchically using Framer stacks (Vertical stack with `gap: 0` for consistent padding):
        *   `Hero`: Injects dynamic Title, Subtitle, and pilot meta boxes.
        *   `Problem (Ink 2 Section)`: Left dynamic list, right executive quote.
        *   `What It Is (Ink 1 Section)`: 3-column layout maps to fields.
        *   `Gates (Smoke Light Section)`: Dynamic progress bar lighting up depending on completed gates.
        *   `Value (Ink 1 Section)`: Visual split layout of ROI.
        *   `Outcomes (Ink 2 Section)`: 3-column outcomes grid.
        *   `Tech Stack (Smoke Light Section)`: Standard logos + descriptions.
        *   `Who is it for (Ink 1 Section)`: Persona card columns.
        *   `CTA & Footer`: Standardized global components.

---

## Verification Plan

### Manual Verification
1.  **Visual Matching**:
    *   Compare font pairings, line heights, and margins in Framer preview against the original HTML code locally.
    *   Validate backdrop filter blurs, noise opacity, and dark-gold grid borders across Chrome and Safari.
2.  **Responsive Layout Auditing**:
    *   Test viewport widths:
        *   **Desktop**: `1440px` and `1200px` (verify navbar and grid columns scale gracefully).
        *   **Tablet**: `768px` (verify grid collapses to 2 columns and stats rows stack vertically).
        *   **Mobile**: `390px` (verify padding shrinks to `7vw` or `20px`, stats list stacks, and fonts clamp down correctly).
3.  **CMS Dynamic Filtering Test**:
    *   Click on filter chips ("All", "Accelerator Suite", "IQ Suite", "Real Estate", "Retail") on the landing page in preview mode. Verify that grid updates in real-time, displays correct family headers with count numbers, and shows the empty state when no elements match.
4.  **Navigation and Links Audit**:
    *   Verify all subpage dynamic cards lead to the correct generated CMS pages (e.g. `/offerings/pmweb-accelerator`).
    *   Test all mailto CTA button links (`mailto:shayward@pxltd.ca`, `mailto:oriboux@pxltd.ca`) to ensure the email clients launch with correct addresses.
