# Settlement App

## Project Overview

This project is a Settlement Application that allows Party A and Party B to negotiate and agree on settlement amounts. The main features include:

- Party A can submit and modify settlement amounts.
- Party B can view settlement proposals, agree, or object to them.
- Real-time updates to ensure both parties see the latest information.
- Handling of simultaneous modifications and responses.

## Technologies Used

- React
- TypeScript
- Redux Toolkit
- React Router
- Classnames (for conditionally applying CSS classes)
- Tailwind CSS

## Getting Started

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/DrTevzadze/challenge.git
   cd challenge

   ```

2. **Install Dependencies:**

   ```bash
   npm install

   ```

3. **Run the Project:**
   ```bash
   npm run dev
   ```

## Project Structure

- **components**: Contains the main UI components for the application.

  - **Notification.tsx**: Component to display notifications.
  - **PartyA.tsx**: Component for Party A's view.
  - **PartyB.tsx**: Component for Party B's view.
  - **forms**: Contains form components for Party B.
    - **PartyBForm.tsx**: Form component for Party B to respond to settlement proposals.
  - **formList**: Contains the FormList and FormCard components.
    - **FormList.tsx**: Component to display a list of forms.
    - **FormCard.tsx**: Component to display individual form details.
  - **Modal.tsx**: Component to display modals.

- **slices**: Contains Redux slices for managing the application's state.

  - **formSlice.ts**: Redux slice for managing form states.

- **store**: Contains the Redux store configuration.

- **pages**: Contains the main pages for the application.
  - **Homepage.tsx**: The main page of the application.
  - **Welcome.tsx**: A welcome page before redirecting to the main page.

## Main Functionalities

- **Switch Views**: You can switch between Party A and Party B views using the button on the homepage.
- **Submit Form (Party A)**: Party A can submit a settlement proposal using the form provided.
- **Respond to Form (Party B)**: Party B can view the submitted forms, approve, reject, or dispute them.
- **Notifications**: When Party B makes changes, a notification will appear at the top center of the page indicating the change.

## State Management

State management is handled using Redux Toolkit. There are two main slices:

- **formSlice**: Manages the state of forms.

  - `addForm`: Adds a new form.
  - `updateFormsStatus`: Updates the status of a form.
  - `updateFormAmount`: Updates the amount in a form.
  - `updateForm`: Updates the entire form.

## Future Improvements

- **Backend Integration**: Connect the application to a backend API to persist data and handle real-time updates more efficiently.
- **User Authentication**: Implement user authentication to secure the application.
- **Enhanced Notifications**: Improve the notification system to handle multiple notifications and provide more detailed information.
