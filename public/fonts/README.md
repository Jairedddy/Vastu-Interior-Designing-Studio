# Custom Fonts Directory

This directory contains custom font files (OTF/TTF formats) for the Vastu luxury typography system.

## Required Font Files

Place your custom font files in this directory with the following naming convention:

### Display Font (VastuDisplay) - For Headings
- `VastuDisplay-Regular.otf` or `VastuDisplay-Regular.ttf`
- `VastuDisplay-RegularItalic.otf` or `VastuDisplay-RegularItalic.ttf`
- `VastuDisplay-Medium.otf` or `VastuDisplay-Medium.ttf`
- `VastuDisplay-MediumItalic.otf` or `VastuDisplay-MediumItalic.ttf`
- `VastuDisplay-Semibold.otf` or `VastuDisplay-Semibold.ttf`
- `VastuDisplay-SemiboldItalic.otf` or `VastuDisplay-SemiboldItalic.ttf`
- `VastuDisplay-Bold.otf` or `VastuDisplay-Bold.ttf`
- `VastuDisplay-BoldItalic.otf` or `VastuDisplay-BoldItalic.ttf`

### Body Font (VastuBody) - For Content
- `VastuBody-Light.otf` or `VastuBody-Light.ttf`
- `VastuBody-LightItalic.otf` or `VastuBody-LightItalic.ttf`
- `VastuBody-Regular.otf` or `VastuBody-Regular.ttf`
- `VastuBody-RegularItalic.otf` or `VastuBody-RegularItalic.ttf`
- `VastuBody-Medium.otf` or `VastuBody-Medium.ttf`
- `VastuBody-MediumItalic.otf` or `VastuBody-MediumItalic.ttf`

### Accent Font (VastuAccent) - Optional, For Special Elements
- `VastuAccent-Regular.otf` or `VastuAccent-Regular.ttf`
- `VastuAccent-RegularItalic.otf` or `VastuAccent-RegularItalic.ttf`
- `VastuAccent-Medium.otf` or `VastuAccent-Medium.ttf`
- `VastuAccent-Bold.otf` or `VastuAccent-Bold.ttf`

## Font Recommendations

For a luxury real estate application, consider:

**Display Font (Serif):**
- Elegant serif fonts like: Playfair Display, Cormorant Garamond, Libre Baskerville, or custom luxury serif fonts
- Should convey sophistication and elegance

**Body Font (Sans-serif):**
- Clean, readable sans-serif fonts like: Inter, Poppins, Work Sans, or custom modern sans-serif fonts
- Should be highly readable at all sizes

**Accent Font (Optional):**
- Distinctive font for special elements like quotes, callouts, or decorative text
- Can be script, monospace, or another distinctive style

## Notes

- Both OTF and TTF formats are supported (OTF preferred)
- If you don't have italic variants, the regular font will be used
- If you don't have all weight variants, the closest available weight will be used
- Font files will automatically fall back to system fonts if they fail to load
- Critical fonts (Display Regular and Bold) are preloaded for optimal performance

## Updating Font Names

If your font files have different names, update the font file paths in `src/fonts.css` to match your actual file names.
