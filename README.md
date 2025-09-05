# MDX-Blog (Scribere)

-	A web application where where user (admins) can create blog using MDX (rich markdown format) with custom components.  
-	Supports Oauth2 authentication using Github and Google providers (Auth.js)
-	Applied different rendering strategies  with client and server components composition like SSR,SSG,ISR.
-	Improved performance and security using  Nextjs’s Server Actions to offload intensive and sensitive operations to server .
-	Integrated services  like  Github repository as storage for storing mdx files,Cloudinary for images etc.
-	Implemented a live MDX Editor  with custom components supporting re-rendering of mdx (on error) on the fly using React error boundaries
-	Redis cache for storing blur(image optimization on server using plaiceholder) and executing jobs (mailing,logs) with cron jobs.

# Architecture (Legacy)
```mermaid
graph TD
    subgraph "Browser"
        A[User/Admin] --> B{Next.js Frontend}
    end

    subgraph "Next.js Application (Vercel)"
        B --> C{NextAuth.js}
        B --> D[API Routes]
        B --> E[SSR/SSG/ISR Pages]
        D --> F[BullMQ Job Producer]
        E --> G[MDX Remote]
    end

    subgraph "Data & Services"
        C --> H[OAuth Providers]
        F --> I((Redis))
        G --> J[GitHub Repository]
        D --> K((PostgreSQL/NeonDB))
        B --> L[Cloudinary]
    end

    subgraph "Background Jobs"
        I --> M{BullMQ Worker}
        M --> N[Email Service]
    end

    A -- "Logs in via" --> C
    A -- "Creates/Edits Post" --> D
    D -- "Stores MDX Content" --> J
    D -- "Stores Metadata" --> K
    F -- "Adds Job to Queue" --> I
    M -- "Processes Job" --> N
    N -- "Sends Email" --> A
    E -- "Fetches Content for Rendering" --> J
    E -- "Fetches Metadata" --> K
    B -- "Uploads/Requests Images" --> L
```


## Getting Started

```bashd
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

<img width="974" alt="Screenshot 2024-08-22 at 12 58 30 AM" src="https://github.com/user-attachments/assets/e18db47e-fbad-436f-9c58-fe3a1d2b14b4">
<img width="1464" alt="Screenshot 2024-08-22 at 12 59 29 AM" src="https://github.com/user-attachments/assets/e9d91202-dbd8-4a4b-9171-99565e688136">


<img width="720" alt="Screenshot 2024-08-22 at 1 07 57 AM" src="https://github.com/user-attachments/assets/0792add4-3eed-4e19-8e1b-befa1750e401">
768-bb9e-e5f6dda70656">

<img width="1257" alt="Screenshot 2024-08-22 at 1 05 27 AM" src="https://github.com/user-attachments/assets/baeaf55a-c76b-4884-aac3-b5c5d00b49d2">

