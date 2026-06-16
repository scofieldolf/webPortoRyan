# API and Components Reference Manual

This document provides a comprehensive reference of all backend REST API endpoints and key React components in this project.

## Quick-Reference Table

### REST API Endpoints

| Endpoint | Method | Input Parameters | Return Types | Status Codes |
|---|---|---|---|---|
| [`/api/projects`](#get-apiprojects) | `GET` | None | `Project[]` | `200`, `500` |
| [`/api/contact`](#post-apicontact) | `POST` | `name: string`, `email: string`, `message: string` (JSON body) | `{ message: string }` | `210`, `400`, `500` |

### Core UI/UX Components

| Component | Type | Props Interface | Description |
|---|---|---|---|
| [`Navbar`](#navbar-component) | Client | `name: string`, `cvUrl?: string` | Sticky header with scroll detection, active section highlights, and theme toggling. |
| [`ContactForm`](#contactform-component) | Client | None | Interactive form that posts submissions to `/api/contact` and displays feedback status. |
| [`ProjectCard`](#projectcard-component) | Client | `Project` interface | 3D-tilting preview card displaying project details and external links. |
| [`TiltCard`](#tiltcard-component) | Client | `children: ReactNode`, `className?: string` | Custom 3D gyroscope tilt effect wrapper using Framer Motion. |
| [`FloatingParticles`](#floatingparticles-component) | Client | None | Canvas-alternative particle system animating background shapes. |
| [`ThemeToggle`](#themetoggle-component) | Client | None | Dark/light mode switcher with local storage persistence. |
| [`VaporizeTextCycle`](#vaporizetextcycle-component) | Client | `VaporizeTextCycleProps` | Advanced canvas-based text animation that morphs characters into floating vapor particles. |
| [`GooeyText`](#gooeytext-component) | Client | `GooeyTextProps` | Text cycle effect utilizing SVGs to render smooth fluid gooey transitions. |
| [`ContainerScroll`](#containerscroll-component) | Client | `titleComponent: ReactNode`, `children: ReactNode` | 3D scrolling panel effect that tilts backward on scroll. |

---

## REST API Endpoints

### GET `/api/projects`

Reads the list of registered portfolio projects from `data/projects.json` and returns them as a JSON array.

*   **Parameters:** None
*   **Success Response:**
    *   **Status Code:** `200 OK`
    *   **Content Type:** `application/json`
    *   **Response Body:**
        ```json
        [
          {
            "title": "E-Commerce Web",
            "description": "Built with Next.js 14 and Tailwind CSS.",
            "tech": ["Next.js", "React", "Tailwind CSS"],
            "github_url": "https://github.com/scofieldolf/commerce",
            "demo_url": "https://commerce.demo.com"
          }
        ]
        ```
*   **Error Cases:**
    *   **JSON File Unreadable/Corrupted:**
        *   **Status Code:** `500 Internal Server Error`
        *   **Response Body:**
            ```json
            { "error": "Failed to load projects." }
            ```
*   **Usage Example (cURL):**
    ```bash
    curl -X GET http://localhost:3000/api/projects
    ```
*   **Usage Example (fetch):**
    ```javascript
    const fetchProjects = async () => {
      const response = await fetch('/api/projects');
      if (!response.ok) throw new Error('Failed to load projects');
      const projects = await response.json();
      return projects;
    };
    ```

---

### POST `/api/contact`

Receives contact/feedback message submissions from the client, validates input fields, and saves the message data to `data/contacts.json`. Fallback writing is done to `/tmp/contacts.json` if write permissions on the workspace folder are denied (e.g., in read-only serverless cloud runs like Vercel).

*   **Request Body (JSON):**
    *   `name` (`string`): Sender's name. (Required, non-empty)
    *   `email` (`string`): Sender's contact email. (Required, non-empty)
    *   `message` (`string`): Message body content. (Required, non-empty)
*   **Success Response:**
    *   **Status Code:** `201 Created`
    *   **Content Type:** `application/json`
    *   **Response Body:**
        ```json
        { "message": "Message sent successfully!" }
        ```
*   **Error Cases:**
    *   **Missing Required Fields:**
        *   **Status Code:** `400 Bad Request`
        *   **Response Body:**
            ```json
            { "error": "Name, email, and message are required." }
            ```
    *   **Internal Write/Processing Failure:**
        *   **Status Code:** `500 Internal Server Error`
        *   **Response Body:**
            ```json
            { "error": "An internal server error occurred." }
            ```
*   **Usage Example (cURL):**
    ```bash
    curl -X POST http://localhost:3000/api/contact \
      -H "Content-Type: application/json" \
      -d '{"name": "Ryan", "email": "ryan@test.com", "message": "Let'\''s collaborate!"}'
    ```
*   **Usage Example (fetch):**
    ```javascript
    const sendMessage = async (name, email, message) => {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      return data.message;
    };
    ```

---

## Core UI/UX Components

### `Navbar` Component

A client-side navigation header component. It renders brand logos, section-based links, a theme switcher toggle, and a download link for the portfolio owner's CV. It detects window scrolling to shrink the padding and add a blurry glass panel style.

*   **Location:** `app/components/Navbar.tsx`
*   **Properties Interface:**
    ```typescript
    interface NavbarProps {
      name: string;      // Profile owner's display name
      cvUrl?: string;    // Custom URL/path to the CV pdf document
    }
    ```
*   **Interactive Features:**
    *   Automatically highlights the active section based on the current window scroll offset.
    *   Implements a collapsible navigation drawer for mobile viewports.
*   **Related Components:** Utilizes the [`ThemeToggle`](#themetoggle-component) component.

---

### `ContactForm` Component

A client-side contact submission form component. It accepts user input for name, email, and message, validates form fields, handles loading spinners during fetch requests, and renders success/error feedback banners.

*   **Location:** `app/components/ContactForm.tsx`
*   **Properties Interface:** None
*   **Interactive Features:**
    *   Posts submissions to the [`POST /api/contact`](#post-apicontact) REST API endpoint.
    *   Clears input fields upon successful submission.
*   **Related API Endpoint:** Integrates with [`POST /api/contact`](#post-apicontact).

---

### `ProjectCard` Component

A component that renders a stylized card for a specific portfolio project. It uses the custom 3D tilting animation element to react to cursor hover movements, listing the tech tags and external project references.

*   **Location:** `app/components/ProjectCard.tsx`
*   **Properties Interface (Project):**
    ```typescript
    interface Project {
      title: string;
      description: string;
      tech: string[];
      github_url: string;
      demo_url: string;
    }
    ```
*   **Interactive Features:**
    *   Evaluates whether `github_url` or `demo_url` are missing (or contain `#`) and renders placeholder indicators ("No Code" / "Demo Offline") if disabled.
*   **Related Components:** Wrapped inside [`TiltCard`](#tiltcard-component).
*   **Related API Endpoint:** Renders objects returned from [`GET /api/projects`](#get-apiprojects).

---

### `TiltCard` Component

A client-side structural wrapper component. It applies a realistic 3D rotation and dynamic glare/sheen overlay following cursor movement over desktop viewports. On mobile screens, it automatically deactivates these operations to optimize rendering.

*   **Location:** `app/components/TiltCard.tsx`
*   **Properties Interface:**
    ```typescript
    interface TiltCardProps {
      children: React.ReactNode;
      className?: string;
    }
    ```
*   **Interactive Features:**
    *   Norms client cursor X and Y coordinates to calculate tilt angles using Framer Motion springs (`useSpring`, `useTransform`, `useMotionValue`).

---

### `FloatingParticles` Component

An ambient background component. It generates random floating geometric particles (circles, squares, triangles) using Framer Motion cycles to establish an interactive "cyberpunk/cyber grid" visual mood.

*   **Location:** `app/components/FloatingParticles.tsx`
*   **Properties Interface:** None
*   **Interactive Features:**
    *   Uses client-side hook generation (`useEffect`) to avoid hydration mismatches between server-side static layout rendering and client-side random generation.

---

### `ThemeToggle` Component

A small client toggle button which alters the class list of the root HTML element between dark and light themes, reading and writing the active choice to local storage.

*   **Location:** `app/components/ThemeToggle.tsx`
*   **Properties Interface:** None
*   **Interactive Features:**
    *   Falsely matches system preferences via `window.matchMedia("(prefers-color-scheme: dark)")` if no local storage preference is set.

---

### `VaporizeTextCycle` Component

A canvas-rendered text cycling animation. It draws text characters on a high-DPI canvas context, samples individual pixels, transforms them into custom particle objects, and animate-vaporizes them into a mist effect when the viewport scrolls them into focus.

*   **Location:** `components/ui/vapour-text-effect.tsx`
*   **Properties Interface:**
    ```typescript
    type VaporizeTextCycleProps = {
      texts: string[];
      font?: {
        fontFamily?: string;
        fontSize?: string;
        fontWeight?: number;
      };
      color?: string;
      spread?: number;
      density?: number;
      animation?: {
        vaporizeDuration?: number;
        fadeInDuration?: number;
        waitDuration?: number;
      };
      direction?: "left-to-right" | "right-to-left";
      alignment?: "left" | "center" | "right";
      tag?: Tag; // HTML semantic tag for SEO (h1, h2, h3, p)
    };
    ```

---

### `GooeyText` Component

A text cycle component that overlays two span elements with SVG Gaussian filters to morph characters into one another using a fluid gooey transition.

*   **Location:** `components/ui/gooey-text-morphing.tsx`
*   **Properties Interface:**
    ```typescript
    interface GooeyTextProps {
      texts: string[];
      morphTime?: number;
      cooldownTime?: number;
      className?: string;
      textClassName?: string;
    }
    ```

---

### `ContainerScroll` Component

A 3D scroll-tilting wrap container. It monitors page scroll progress to dynamically tilt and scale its child element, simulating an interactive 3D table scroll canvas.

*   **Location:** `components/ui/container-scroll-animation.tsx`
*   **Properties Interface:**
    ```typescript
    interface ContainerScrollProps {
      titleComponent: string | React.ReactNode;
      children: React.ReactNode;
    }
    ```
