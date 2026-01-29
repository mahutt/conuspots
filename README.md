This is [Thomas Mahut](https://github.com/mahutt)'s [SOEN 491](https://www.concordia.ca/academics/undergraduate/calendar/current/section-71-gina-cody-school-of-engineering-and-computer-science/section-71-70-department-of-computer-science-and-software-engineering/section-71-70-10-computer-science-and-software-engineering-courses.html#:~:text=SOEN%20491%20Software%20Engineering%20Project%20(1%20credits)) project.

# conuspots

Conuspots is a searchable, interactive map meant to help students find classrooms and other campus locations.

### Setup Instructions

1. Clone this repository
2. Install dependencies with `npm install`
3. Add a mapbox access token to a local `.env` file like so:

```
VITE_MAPBOX_ACCESS_TOKEN=pk.123...
```

4. Run the local development server with `npm run dev`
5. Visit http://localhost:5173/
