# Specification

## Summary
**Goal:** Fix inaccessible module pages for Subject-to-Career and Regional Language in CareerSphere by correcting route registrations and ensuring valid page components exist.

**Planned changes:**
- Register the `/subject-to-career` route in `App.tsx` with the correct import and rendering of the `SubjectToCareer` component
- Register the `/regional-language` route in `App.tsx` with the correct import and rendering of the `RegionalLanguage` component
- Fix `Modules.tsx` to pass `path='/subject-to-career'` and `path='/regional-language'` to the respective `ModuleCard` components
- Ensure `SubjectToCareer.tsx` exists as a valid React component with a header, description, and coming-soon placeholder styled consistently with other module pages
- Ensure `RegionalLanguage.tsx` exists as a valid React component with a header, description about regional language career guidance, and a coming-soon placeholder styled consistently with other module pages

**User-visible outcome:** Users can navigate to the Subject-to-Career and Regional Language module pages without encountering a 404 or blank screen, and clicking Explore on the respective module cards correctly routes to each page.
