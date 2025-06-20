# SABAH College Union Website

A modern, responsive website for the SABAH college union featuring elegant animations and a beautiful user interface.

[python -m http.server 8000]

## Features

### 🎨 Design & Animations
- **Modern UI/UX**: Clean, elegant design with smooth animations
- **Responsive Design**: Works perfectly on all devices (desktop, tablet, mobile)
- **Smooth Animations**: 
  - Typing effect on hero title
  - Scroll-triggered animations
  - Floating elements with parallax effect
  - Particle effects in hero section
  - Hover animations on cards
  - Loading screen with spinner

### 📱 Navigation
- **Fixed Navigation Bar**: Sticky navigation with smooth scrolling
- **Mobile-Friendly**: Hamburger menu for mobile devices
- **Active Section Highlighting**: Navigation links highlight current section
- **Scroll Progress Indicator**: Visual progress bar at the top

### 🏠 Sections
1. **Hero Section**: Eye-catching landing page with animated elements
2. **About Us**: Mission, vision, and values of SABAH
3. **Programs**: Six featured programs with icons and descriptions
4. **Publications**: Latest publications and reports
5. **Members**: Team members with roles and descriptions
6. **Footer**: Contact information and social links

## File Structure

```
SABAH web project/
├── index.html          # Main HTML file
├── styles.css          # CSS styles and animations
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## How to Use

### 1. Open the Website
Simply open `index.html` in any modern web browser to view the website.

### 2. Customize Content

#### Update Text Content
Edit the `index.html` file to change:
- Union name and taglines
- About us content
- Program descriptions
- Member information
- Contact details

#### Update Images
Replace the placeholder elements with actual images:
- Add real photos for members
- Include actual publication covers
- Add program event photos
- Include college union building images

#### Update Colors
Modify the color scheme in `styles.css`:
- Primary colors: `#667eea` and `#764ba2` (gradient)
- Secondary color: `#3498db`
- Text colors: `#2c3e50` and `#7f8c8d`

### 3. Add Real Images
To add real images, replace the placeholder divs with `<img>` tags:

```html
<!-- Instead of this placeholder -->
<div class="image-placeholder">
    <i class="fas fa-user"></i>
    <p>Member Photo</p>
</div>

<!-- Use this -->
<img src="path/to/your/image.jpg" alt="Member Name" class="member-photo">
```

### 4. Customize Programs
Add or modify programs in the programs section:

```html
<div class="program-card">
    <div class="program-icon">
        <i class="fas fa-your-icon"></i>
    </div>
    <h3>Your Program Name</h3>
    <p>Your program description here.</p>
</div>
```

### 5. Update Contact Information
Modify the footer section with real contact details:
- Phone numbers
- Email addresses
- Physical address
- Social media links

## Browser Compatibility

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers

## Performance Features

- **Optimized Animations**: Smooth 60fps animations
- **Lazy Loading**: Images load efficiently
- **Responsive Images**: Automatically scaled for different screen sizes
- **Minimal Dependencies**: Only uses Font Awesome for icons

## Customization Tips

### Adding New Sections
1. Add a new `<section>` in `index.html`
2. Add corresponding navigation link
3. Style the section in `styles.css`
4. Add scroll animations in `script.js`

### Changing Animations
Modify animation speeds and effects in:
- `styles.css` for CSS animations
- `script.js` for JavaScript animations

### Adding More Members
Duplicate the member card structure and update:
- Name
- Role
- Description
- Photo

## Technical Details

### Technologies Used
- **HTML5**: Semantic markup
- **CSS3**: Modern styling with Flexbox and Grid
- **JavaScript (ES6+)**: Interactive features
- **Font Awesome**: Icons
- **Google Fonts**: Typography (Poppins)

### Key Features
- **Intersection Observer API**: For scroll animations
- **CSS Grid & Flexbox**: For responsive layouts
- **CSS Custom Properties**: For easy theming
- **Event Listeners**: For interactive elements

## Support

For any questions or customization help, refer to the code comments in each file or modify the content as needed.

## License

This website template is created for the SABAH college union. Feel free to modify and use as needed.

---

**SABAH College Union** - Empowering Students, Building Community 