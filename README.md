# Exam Dates Finder

A modern web application that helps students find their exam days based on subject, gender, and section. Built with Node.js, Express.js, and a beautiful responsive frontend.

## Features

- 🎯 **Easy Search**: Simple form to find exam days
- 📱 **Responsive Design**: Works perfectly on all devices
- 🔌 **RESTful API**: Full API support for integration
- 🎨 **Modern UI**: Beautiful gradient design with smooth animations
- 📊 **Complete Schedule**: View all exam schedules on demand
- ⌨️ **Keyboard Shortcuts**: Ctrl+Enter to submit, Escape to clear
- 📋 **Copy to Clipboard**: Click on exam days to copy them

## Quick Start

### Prerequisites

- Node.js (version 14 or higher)
- npm (comes with Node.js)

### Installation

1. **Clone or download** the project files
2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the server**:
   ```bash
   npm start
   ```

4. **Open your browser** and go to `http://localhost:3000`

### Development Mode

For development with auto-restart:
```bash
npm run dev
```

## Usage

### Web Interface

1. Select your **Subject** (Physics or MATH)
2. Choose your **Gender** (Male or Female)
3. Pick your **Section** (A or B)
4. Click **"Find Exam Day"** to see your result
5. **Optional**: Click **"Show Complete Schedule"** to view all exam schedules

### API Usage

The application provides several API endpoints:

#### Get All Schedules
```bash
GET /api/schedule
```

#### Find Exam Day (GET)
```bash
GET /api/find-day?subject=Physics&gender=M&section=A
```

#### Find Exam Day (POST)
```bash
POST /api/find-day
Content-Type: application/json

{
  "subject": "Physics",
  "gender": "M",
  "section": "A"
}
```

#### Get Available Subjects
```bash
GET /api/subjects
```

#### Get Available Sections
```bash
GET /api/sections
```

## API Response Examples

### Successful Response
```json
{
  "subject": "Physics",
  "gender": "M",
  "section": "A",
  "day": "THURSDAY"
}
```

### Error Response
```json
{
  "error": "No exam found for the given criteria."
}
```

## Exam Schedule Data

The application contains the following exam schedule:

| Subject | Gender | Section | Day      |
|---------|--------|---------|----------|
| Physics | M      | A       | THURSDAY |
| Physics | M      | B       | FRIDAY   |
| MATH    | M      | A       | WEDNESDAY|
| MATH    | M      | B       | MONDAY   |
| Physics | F      | A       | TUESDAY  |
| Physics | F      | B       | THURSDAY |
| MATH    | F      | A       | MONDAY   |
| MATH    | F      | B       | THURSDAY |

## Project Structure

```
Examdates/
├── server.js          # Main server file
├── package.json       # Dependencies and scripts
├── public/            # Frontend files
│   ├── index.html     # Main HTML page
│   ├── styles.css     # CSS styling
│   └── script.js      # Frontend JavaScript
└── README.md          # This file
```

## Technologies Used

- **Backend**: Node.js, Express.js
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Custom CSS with gradients and animations
- **Icons**: Font Awesome
- **Fonts**: Google Fonts (Inter)

## Customization

### Adding New Subjects/Sections

To add new exam schedules, edit the `examSchedule` array in `server.js`:

```javascript
const examSchedule = [
    // ... existing schedules ...
    { subject: 'Chemistry', gender: 'M', section: 'A', day: 'MONDAY' },
    { subject: 'Chemistry', gender: 'M', section: 'B', day: 'TUESDAY' }
];
```

### Changing the Port

Modify the `PORT` variable in `server.js`:

```javascript
const PORT = process.env.PORT || 5000; // Change 3000 to your preferred port
```

### Styling Changes

Edit `public/styles.css` to customize colors, fonts, and layout.

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## Troubleshooting

### Port Already in Use
If you get "port already in use" error:
```bash
# Find process using port 3000
netstat -ano | findstr :3000

# Kill the process (replace PID with actual process ID)
taskkill /PID <PID> /F
```

### Dependencies Issues
If you encounter dependency issues:
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## Contributing

Feel free to contribute by:
- Adding new features
- Improving the UI/UX
- Fixing bugs
- Adding more exam schedules
- Enhancing the API

## License

This project is open source and available under the MIT License.

## Support

If you have any questions or need help, please:
1. Check the troubleshooting section above
2. Review the API documentation
3. Check the browser console for errors
4. Ensure all dependencies are properly installed

---

**Happy Exam Planning! 📚✨**
