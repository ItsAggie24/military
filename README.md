# Link Organizer

A beautiful, organized website for managing and accessing your links with categories and search functionality.

## Features

✨ **Easy Organization** - Organize links into customizable categories
🔍 **Search Functionality** - Search links by title, description, or category
📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
🎨 **Modern UI** - Clean, gradient design with smooth animations
⚡ **Fast & Lightweight** - No dependencies, pure HTML, CSS, and JavaScript

## Structure

```
military/
├── index.html      # Main HTML file
├── styles.css      # Styling with responsive design
├── script.js       # JavaScript for search and filtering
├── data.json       # Link data and categories
└── README.md       # Documentation
```

## How to Customize

### Adding or Modifying Links

Edit `data.json` and add/modify links in the `links` array:

```json
{
  "id": 9,
  "title": "Your Link Title",
  "url": "https://example.com",
  "description": "Brief description of the link",
  "category": "CategoryName"
}
```

### Adding or Modifying Categories

Edit the `categories` array in `data.json`:

```json
"categories": [
  "Development",
  "Documentation",
  "Design",
  "Resources",
  "Tools",
  "Learning",
  "YourNewCategory"
]
```

## Usage

1. Open `index.html` in a web browser
2. Use the **search bar** to search for links by title, description, or category
3. Click **category buttons** to filter links by category
4. Click **Visit →** to open a link in a new tab

## Customization Options

### Colors

Edit the color values in `styles.css`:
- Primary gradient: `#667eea` to `#764ba2`
- Hover states and animations can be customized throughout the CSS

### Layout

The grid layout can be adjusted in `styles.css`:
- Change `grid-template-columns: repeat(auto-fill, minmax(300px, 1fr))` to adjust card sizes
- Modify `gap: 20px` to change spacing between cards

### Animations

All animations are defined in the CSS and can be modified:
- `slideDown` - Header animation
- `slideUp` - Search section animation
- `fadeIn` - Links container animation

## Browser Compatibility

Works in all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Opera (latest)

## Tips

💡 Keep descriptions concise for better readability
💡 Use meaningful category names for easier organization
💡 Test links regularly to ensure they're still valid
💡 Consider grouping similar categories together
