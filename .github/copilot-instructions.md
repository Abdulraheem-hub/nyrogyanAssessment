<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Healthcare Website Project Instructions

This is a modern healthcare website built with the following tech stack:

## Tech Stack
- **Frontend**: React.js with TypeScript
- **Styling**: Tailwind CSS with Shadcn UI components
- **Build Tool**: Vite
- **Authentication**: JWT (to be implemented)
- **Backend**: Node.js with Express.js (to be implemented)
- **Database**: SQL (to be implemented)

## Project Structure
- Follow feature-first architecture
- Components are organized by features in `src/features/`
- Shared UI components use Shadcn UI in `src/components/ui/`
- Use TypeScript for all components and utilities

## Code Style Guidelines
- Use functional components with hooks
- Use Tailwind CSS classes for styling
- Import Shadcn UI components from `@/components/ui/`
- Use proper TypeScript types and interfaces
- Follow the existing file naming conventions

## Key Features
- Doctor search and filtering
- Appointment booking
- User authentication
- Health records management
- Responsive design

When implementing new features:
1. Create feature-specific directories under `src/features/`
2. Use Shadcn UI components when possible
3. Maintain consistent styling with Tailwind CSS
4. Ensure TypeScript compliance
5. Follow accessibility best practices
