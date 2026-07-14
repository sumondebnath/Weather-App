# Weather App

A clean, responsive weather dashboard built with React and powered by WeatherAPI.com.

## Features

- **City search** with autocomplete suggestions
- **Coordinate search** — enter `lat,lon` directly (e.g. `23.81,90.41`)
- **Current weather** — temperature, condition, feels-like, humidity, wind, UV index
- **Hourly forecast** — scrollable strip for the current day
- **7-day forecast** — daily high/low with condition icons
- **Unit toggle** — switch between Celsius and Fahrenheit
- **Geolocation** — auto-detects your location on load, falls back to IP-based detection

## Tech Stack

- [React](https://react.dev/) 19
- [Vite](https://vite.dev/) 8
- [Tailwind CSS](https://tailwindcss.com/) v4
- [Axios](https://axios-http.com/)
- [WeatherAPI.com](https://www.weatherapi.com/)

## Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

## Setup

```bash
# Clone the repo
git clone <repo-url>
cd weather-app

# Install dependencies
npm install

# Create your env file and add your API key
cp .env.example .env
# Edit .env and set VITE_WEATHER_API_KEY to your WeatherAPI.com key

# Start the dev server
npm run dev
```

### Scripts

| Command             | Description                  |
| ------------------- | ---------------------------- |
| `npm run dev`       | Start Vite dev server        |
| `npm run build`     | Build for production         |
| `npm run preview`   | Preview the production build |
| `npm run lint`      | Run ESLint                   |

## Environment Variables

| Variable               | Description                        | Example                          |
| ---------------------- | ---------------------------------- | -------------------------------- |
| `VITE_WEATHER_API_KEY` | API key from [weatherapi.com](https://www.weatherapi.com/) | `abc123def456` |

## Project Structure

```
src/
  api/
    axiosInstance.js        # Centralized Axios instance with interceptors
    weatherApi.js           # WeatherAPI endpoint functions
  components/
    common/                 # Reusable primitives (Button, Card, Alert, Skeleton, etc.)
    layout/                 # Navbar, Footer, PageLayout
    ui/                     # Domain-specific components (SearchBar, WeatherCard, etc.)
  constants/                # App-wide constants and error code maps
  contexts/                 # React context providers (unit toggle)
  hooks/                    # Custom hooks (useWeather, useGeolocation, etc.)
  pages/                    # Route-level page components
  routes/                   # React Router route definitions
  utils/                    # Formatters, validators, icon mapping
  App.jsx                   # Root component
  main.jsx                  # Entry point
  index.css                 # Tailwind v4 theme tokens and global styles
public/
  favicon.svg               # App favicon
  robots.txt                # Search engine crawling rules
```

## SEO

The `index.html` includes standard meta tags for search and social sharing:

- `<title>` and `<meta name="description">` for search engines
- Open Graph tags (`og:title`, `og:description`, `og:type`) for social previews
- `<meta name="theme-color">` matching the app's teal accent
- `public/robots.txt` allowing all crawling

**TODO:** Add an `og-image.png` (1200x630 recommended) to `public/` for social media link previews.

## Browser Support

- Geolocation requires **HTTPS** or **localhost** to work. If the user denies permission or the browser doesn't support it, the app falls back to IP-based location detection automatically.

## Known Limitations

- IP-based location fallback (`auto:ip`) may resolve to a city different from the user's actual location, depending on ISP routing and VPN usage.
- The free tier of WeatherAPI.com limits requests to 1,000,000/month and does not include minute-by-minute forecasts.

## License

MIT
