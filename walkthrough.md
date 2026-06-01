# Visual Construction Blueprint: Rebuilding PX Labs in Framer

This master blueprint is a step-by-step visual and technical guide for rebuilding the **PX Labs Microsite** on **Framer**. Since your primary corporate website, [www.pxltd.ca](https://www.pxltd.ca), is already built on Framer, you can follow these exact instructions to deploy this new section in the same workspace with pixel-perfect brand alignment.

---

## 🛠 Step 1: Establish Corporate Brand Styling & Design Tokens

To align with the **Web & Digital Brand Standard v1.0** and inherit the styles from your corporate site, first define your global colors and fonts in your Framer project sidebar:

1.  **Framer Color Palette Config**:
    *   Create a color style named **`Ink`**: `#0D1117` (Main Dark Backdrop)
    *   Create a color style named **`Ink 2`**: `#1C2333` (Card Backdrop Background)
    *   Create a color style named **`Ink 3`**: `#222B3A` (Card Hover Surface)
    *   Create a color style named **`Gold`**: `#C9A84C` (Main Brand Accent)
    *   Create a color style named **`Gold-Light`**: `#E8C97A` (Link and Text Highlight)
    *   Create a color style named **`Slate`**: `#8892A4` (Muted Body Text)
    *   Create a color style named **`Slate 2`**: `#5A6478` (Under-labels & Roadmaps)
    *   Create a color style named **`Smoke`**: `#F4F6FA` (Light Contrast Backdrops)
    *   Create a color style named **`Green`**: `#1A7F4B` (Completed Gate Badge text)
    *   Create a color style named **`Green-Light`**: `#D4EDDA` (Completed Gate Badge background)
2.  **Typography Setup**:
    *   Framer automatically integrates with Google Fonts. Configure your text styles:
        *   **Headings / Serif Titles**: Choose `DM Serif Display` (Italic style allowed for italic emphasis tags).
        *   **Body Text**: Choose `DM Sans` (Weights: 300, 400, 500, 600).
        *   **Badges / UI Stats / Mono Text**: Choose `DM Mono` (Weights: 400, 500).
3.  **Background Grid & Noise Overlay Layers**:
    *   To get that premium glowing grid texture, create a parent frame and set its background color to `Ink`.
    *   Add an absolute child frame locked to the back, name it **`Grid-Backdrop`**. Set its background to a tiled SVG grid (or create a simple linear gradient repeating background at `64px x 64px` with a very thin `Gold` border at `0.04` opacity).
    *   Add another absolute child frame named **`Noise-Overlay`** locked to `100% width and height`. Set its background to a repeating SVG noise pattern (opacity `0.035`, pointer-events `None`).

---

## 📂 Step 2: One-Click CMS Database Upload

You do not need to manually copy-paste the text of all 7 offerings! 

1.  Open the **CMS** tab in Framer.
2.  Click **Import CSV** and choose the pre-packaged import file we generated:
    *   [offerings_cms_import.csv](file:///Users/haywiremac/.gemini/antigravity-ide/brain/e8f2e80a-b8a0-4fe5-9c8a-7491be6151a5/offerings_cms_import.csv)
3.  Framer will automatically detect all field types. Verify that:
    *   `Name` is mapped as **Title**
    *   `Slug` is mapped as **Slug**
    *   `Accent Color` is mapped as **Color**
    *   `Hero Stat 1 Num`, `Hero Stat 2 Num` are mapped as **Plain Text** or **Number**
    *   All long-form text (e.g. `Problem Quote Text`, `Solution Lead`) is mapped as **Plain Text** or **Rich Text**.
4.  Click **Import**. All 7 offerings are now fully populated in your database!

---

## 💻 Step 3: Implement Dynamic Real-Time Filtering Overrides

To replicate your dynamic filtering chips natively in Framer:

1.  In the left sidebar of Framer, click on **Code** (under Assets) and select **New File**.
2.  Name the file `PortfolioFilterOverride` (set type to **Override**).
3.  Delete the template code and copy-paste the exact React code we wrote for you:
    *   [PortfolioFilterOverride.tsx](file:///Users/haywiremac/.gemini/antigravity-ide/brain/e8f2e80a-b8a0-4fe5-9c8a-7491be6151a5/PortfolioFilterOverride.tsx)
4.  Save the file.
5.  **Apply overrides to your canvas elements**:
    *   **Family Filter Buttons**:
        *   Select your "All" Family Chip. In the properties panel, under **Code Override**, select `PortfolioFilterOverride` and choose function `ChipFamilyAll`.
        *   Select the "Accelerator Suite" Chip, map it to `ChipFamilyAccelerator`.
        *   Select the "IQ Suite" Chip, map it to `ChipFamilyIQ`.
    *   **Industry Filter Buttons**:
        *   Select "All" Industry Chip, map to `ChipIndustryAll`.
        *   Select "Real Estate" Chip, map to `ChipIndustryRealEstate`.
        *   Select "Retail" Chip, map to `ChipIndustryRetail`.
        *   Select "Accounting" Chip, map to `ChipIndustryAccounting`.
        *   Select "Legal" Chip, map to `ChipIndustryLegal`.
    *   **CMS Collection Item**:
        *   Select the **CMS Card Container** element inside your CMS collection wrapper list.
        *   Map its Code Override to `CMSCardItem`. 
    *   **Done!** Your portfolio grid is now dynamic, responsive, and updates in real-time as users click.

---

## 🏗 Step 4: Rebuilding the Layout Structure

### A. The Landing Page Layout (`index.html`)

1.  **Blurred Navigation Header**:
    *   Drag a row Stack, pin it to `Top: 0, Left: 0, Right: 0` with `position: Fixed, z-index: 100`.
    *   Set background color to `#0D1117` at `0.88` opacity. Add a blur effect: `backdrop-filter: blur(12px)`.
    *   Add a bottom border: `1px solid rgba(201, 168, 76, 0.2)`.
    *   *Tip:* You can literally copy the navbar component from your existing corporate site `www.pxltd.ca` and paste it here!
2.  **Clamping Hero Section**:
    *   Use vertical stacking. Inject the eyebrow (`DM Mono`, Gold color, letter spacing).
    *   Set Title text style to custom sizing: clamp it from `48px` to `92px` in layout properties using `DM Serif Display`.
    *   Recreate the statistics boxes using an auto-wrapping row stack with a solid border of `1px solid rgba(201,168,76,0.2)`.
3.  **CMS Portfolio Grid**:
    *   Add a **CMS Collection List** frame. Set display layout to **Grid** with `grid-template-columns: repeat(auto-fill, minmax(320px, 1fr))`.
    *   Inside the collection item, place a vertical frame (`Ink 2` background, padded `36px 32px`).
    *   Bind elements to CMS fields:
        *   Card Title ➔ `Name`
        *   Card Description ➔ `Description`
        *   Card Buyer ➔ `Buyer Persona`
        *   Card Pilot Badge ➔ `Pilot Program Scope`
        *   View Offering Button ➔ Link to the generated CMS page item.
4.  **Coming Soon Roadmaps**:
    *   Below the grid, create a simple static grid for Phase 2 offerings using `Ink` background cards, styled with coming soon pill labels.

---

### B. Rebuilding the Dynamic Offering Detail Page Template

The generated subpage template automatically populates itself for all 7 dynamic paths. Organize the canvas using a parent vertical stack (`gap: 0`):

1.  **Detail Hero Section**:
    *   Bind the eyebrow category badge to `Family`.
    *   Bind the main page title to `Name`.
    *   Bind the subtitle to `Hero Subtitle`.
    *   Recreate the three metadata stats boxes and bind their num/labels to `Hero Stat 1 Num`, `Hero Stat 1 Label`, etc.
2.  **The Challenge Section (`Ink 2` Background)**:
    *   Bind the title to `Challenge Title`.
    *   Bind the left column bullet items to `Problem Statements` (Rich Text).
    *   Bind the quote card to `Problem Quote Text` (Italicized Serif Display) and `Problem Quote Cite` (DM Mono).
3.  **The Solution Section (`Ink 1` Background)**:
    *   Bind the paragraph description to `Solution Lead`.
    *   Recreate the 3 (or 6) solution grid cards mapping to `What It Is Cards` CMS elements.
4.  **Interactive 6-Gate Methodology (`Smoke` Background)**:
    *   Place a horizontal stack representing the Gate line.
    *   Create a Gate circle component with a visual variant for "Complete" (lit in `Accent Color`) and "Planned" (grey border).
    *   Set dynamic variants in Framer properties to match the database `Gate Progress` field (1 to 6) to automatically light up the correct number of gates.
5.  **Tech Stack Section (`Smoke` Background)**:
    *   A grid stack containing technical tools (Python, Snowflake, Apache Airflow, Streamlit) that binds to your `Tech Stack List` field.
6.  **CTA Footer Section**:
    *   A large styled button linking to `mailto:shayward@pxltd.ca` with pre-filled subject templates.
    *   Reuse your global navbar/footer components for absolute style synchronicity.

---

## 📱 Step 5: Responsive Brekapoints Config (Zero Layout Drift)

To make sure your microsite looks stunning on iPads and mobile screens:

1.  Add two native breakpoints in Framer: **Tablet (`768px`)** and **Phone (`390px`)**.
2.  On the **Tablet** viewport:
    *   Set the **Portfolio Grid** columns to a simple `2-column` wrap or flow.
    *   Reduce outer stack side margins from `7vw` to a fixed `40px` or `5vw`.
3.  On the **Phone** viewport:
    *   Set all grids (Portfolio grid, Solution cards, and Target Audience grids) to a `1-column` vertical layout block.
    *   Set stats row containers to stack vertically rather than horizontally.
    *   Reduce outer margins to `20px` or `7vw`.
    *   Let the heading title typography shrink gracefully using Framer's viewport-relative sizing controls.
