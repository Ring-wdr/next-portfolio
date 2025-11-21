# Project Detail Page Implementation

## Overview
This document describes the implementation of the project detail page feature using Next.js 16 Parallel Routes (Intercept Routes) and the View Transition API for smooth animations.

## Features Implemented

### 1. **Intercept Routes with Modal Display**
- Created a parallel route slot `@modal` for displaying project details in a modal overlay
- Implemented intercept route at `@modal/(.)project/[slug]` to catch navigation from the project list page
- Modal displays project details without full page navigation when accessed from the list
- Direct navigation to `/project/[slug]` still works normally and shows the full page

### 2. **View Transition API Integration**
- Added custom `TransitionLink` component that wraps the i18n Link with View Transition API support
- Smooth animations when navigating between project list and detail views
- View transition names applied to key elements:
  - `project-image-{slug}` - Animates the project thumbnail
  - `project-title-{slug}` - Animates the project title
- Graceful fallback for browsers that don't support View Transitions API

### 3. **Modal Component**
- Created a reusable Modal component using native HTML `<dialog>` element
- Features:
  - Backdrop blur effect
  - Close button
  - Click outside to close (via dialog.close())
  - Keyboard ESC key to close
  - Prevents body scroll when open
  - Smooth enter/exit animations

## File Structure

```
src/
├── app/
│   └── [locale]/
│       ├── @modal/                          # Parallel route slot for modals
│       │   ├── default.tsx                  # Default (empty) modal state
│       │   └── (.)project/                  # Intercept route
│       │       └── [slug]/
│       │           └── page.tsx             # Modal project detail page
│       ├── project/
│       │   ├── page.tsx                     # Project list page
│       │   └── [slug]/
│       │       └── page.tsx                 # Full project detail page
│       └── layout.tsx                       # Updated to support modal slot
├── pages-layer/
│   └── project/
│       ├── index.tsx                        # Project list component
│       ├── item/
│       │   └── index.tsx                    # Project item (updated with TransitionLink)
│       └── [slug]/
│           └── index.tsx                    # Project detail component (with view-transition-name)
├── shared/
│   ├── constant/
│   │   └── project-detail.tsx               # Project detail data
│   └── ui/
│       ├── modal.tsx                        # Modal component (NEW)
│       ├── transition-link.tsx              # TransitionLink wrapper (NEW)
│       └── image-gallery.tsx                # Image gallery component
└── globals.css                              # Added view transition styles
```

## Key Implementation Details

### Layout Update (src/app/[locale]/layout.tsx)
```tsx
export default async function LocaleLayout({
  children,
  modal,  // Added modal slot
  params,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;  // Parallel route slot
  params: Promise<{ locale: string }>;
}) {
  // ...
  return (
    // ...
    {children}
    {modal}  // Modal renders here when active
    // ...
  );
}
```

### Intercept Route (@modal/(.)project/[slug]/page.tsx)
- Uses `(.)` syntax to intercept same-level navigation
- Wraps ProjectDetailPage in Modal component
- Server component that fetches project data

### TransitionLink Component
- Client component that wraps i18n Link
- Checks for View Transition API support
- Triggers `document.startViewTransition()` on navigation
- Falls back to normal navigation if API not supported

### View Transition Styles (globals.css)
```css
@view-transition {
  navigation: auto;
}

::view-transition-old(project-image),
::view-transition-new(project-image) {
  height: 100%;
  overflow: clip;
}
```

## Browser Compatibility

### View Transition API
- ✅ Chrome 111+
- ✅ Edge 111+
- ✅ Opera 97+
- ❌ Firefox (not yet supported)
- ❌ Safari (not yet supported)

The implementation includes automatic fallback for unsupported browsers - they will see instant navigation without transitions.

### Intercept Routes
- Works on all browsers as it's a Next.js routing feature
- No special browser requirements

## Testing

### Manual Testing Steps
1. **Start dev server**: `pnpm dev`
2. **Navigate to projects page**: `/project`
3. **Click on a project card**: Should open modal with smooth transition
4. **Test close modal**:
   - Click close button
   - Press ESC key
   - Click backdrop
5. **Test direct navigation**: Open `/project/pocaz` in new tab - should show full page
6. **Test browser back**: Click project → modal opens → press browser back → modal closes
7. **Test transitions**: Observe smooth animation of image and title (Chrome/Edge only)

### Expected Behavior
- ✅ Modal opens smoothly when clicking project from list
- ✅ View transitions animate (Chrome/Edge)
- ✅ Direct URL access shows full page (not modal)
- ✅ Browser back/forward works correctly
- ✅ Modal closes on ESC, close button, or backdrop click
- ✅ Body scroll locked when modal open
- ✅ Accessibility: Focus management, keyboard navigation

## Performance Considerations

1. **Code Splitting**: Modal and transition code only loads when needed
2. **Image Optimization**: Next.js Image component handles lazy loading
3. **View Transitions**: GPU-accelerated animations
4. **Server Components**: Project data fetched on server, reducing client JS

## Future Enhancements

- [ ] Add swipe gestures to close modal (mobile)
- [ ] Implement keyboard navigation between projects in modal
- [ ] Add more sophisticated view transition animations
- [ ] Consider adding loading states for transitions
- [ ] Add analytics tracking for modal interactions

## References

- [Next.js Parallel Routes](https://nextjs.org/docs/app/building-your-application/routing/parallel-routes)
- [Next.js Intercepting Routes](https://nextjs.org/docs/app/building-your-application/routing/intercepting-routes)
- [View Transitions API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API)
- [HTML Dialog Element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog)
