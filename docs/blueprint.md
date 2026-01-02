# **App Name**: LibWise

## Core Features:

- Role-Based Authentication: Secure authentication using Firebase Authentication with custom roles stored in Firestore for access control.
- Book Management: Add, edit, and delete books with details such as title, author, ISBN, category, edition type, and copies. (Admin only).
- Issue and Return Tracking: Issue and return books, tracking issue date, due date, and return date. Automatically update availableCopies in Firestore.
- Book Reservation System: Allow users to reserve books with a priority queue, managed via Firestore, ensuring the first registered user gets priority.
- Writer's Dashboard: Enable writers to create, edit, and manage their writings with draft and publish statuses.
- Smart Book Recommendations: AI-powered tool that provides book recommendations by extracting text from uploaded syllabus images, and recommends the most appropriate books based on matched keywords, categories, and subjects using LLM reasoning and Firestore data.
- Real-Time Notifications: In-app notifications for book issue/return, overdue alerts, reservation confirmations, and writing approval status.

## Style Guidelines:

- Primary color: Deep purple (#673AB7) to represent knowledge and sophistication.
- Background color: Light grey (#F5F5F5), a desaturated version of purple at approximately 20% saturation, to create a clean, readable surface.
- Accent color: Blue-violet (#3F51B5), analogous to purple but shifted slightly on the color wheel, for interactive elements.
- Headline font: 'Space Grotesk' sans-serif for headlines and short body copy. Body font: 'Inter' sans-serif for longer body text.
- Use a consistent set of minimalist icons to represent different sections and actions.
- A clean, responsive layout with a sidebar for easy navigation.
- Subtle animations for transitions and feedback to enhance user experience.