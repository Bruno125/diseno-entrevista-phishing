## Product Specifications: Phishing Vulnerability Tester

**1. Goal:** To provide a simple, interactive experience during user interviews to gauge a user's susceptibility to common phishing tactics.

**2. Context:** Used exclusively by researchers during user interviews with BCP bank users in Peru, as part of a design investigation into reducing successful phishing scams.

**3. "Game" Vibe:** The interface should be simple, direct, and feel more like a quick test or game than a formal security training module.

**4. Core Functionality:**
    * Present users with simulated phishing attempts (e.g., fake emails, SMS messages, WhatsApp messages).
    * Allow users to interact with the simulations (e.g., click links, fill out forms).
    * Track user interactions to determine if they fall for the scam.
    * Provide immediate, simple feedback on whether the user identified the scam or was vulnerable.
    * Move through a predefined sequence of phishing scenarios.

**5. Content (Scenarios):**
    * Include 3-5 distinct phishing scenarios.
    * Scenarios should mimic common tactics observed in Peru, potentially including:
        * Fake bank login page (email link).
        * Urgent account alert (SMS with link).
        * Prize notification (WhatsApp message with link/request for info).
        * Request for personal information update (email with form).
    * Content within scenarios should be in Spanish and culturally relevant (e.g., mentioning BCP, using common Peruvian phrasing).

**6. User Interface:**
    * Clean, minimalist design.
    * Clearly present each scenario (e.g., simulating an email client, phone screen).
    * Interactive elements (links, input fields) should be clearly clickable/editable.
    * Feedback should be immediate and easy to understand ("Correct!" or "This was a phishing attempt.").

**7. Technical Constraints:**
    * Plain HTML, CSS, and JavaScript.
    * Must run entirely in a web browser without a backend server.
    * No data persistence required (results only matter during the interview).
    * Responsive design is not a strict requirement given controlled interview environment, but simple mobile-first CSS might be helpful if using tablets.

**8. Non-Goals:**
    * Comprehensive security training.
    * Collection or storage of user data.
    * Robust error handling or edge case management.
    * Integration with any external services.
    * Production-ready, scalable, or maintainable code.

## High-Level Implementation Plan

This plan breaks down the website into core components and their interactions.

**1. HTML Structure (`index.html`):**
    * Basic HTML5 structure.
    * A main container div to hold the current scenario display.
    * Within the container, divs or sections for:
        * The scenario content area (where the fake email, SMS, etc., is shown).
        * Interactive elements (simulated links, input fields).
        * A feedback area to display results.
        * A button to proceed to the next scenario or finish.
    * Link to the CSS file (`style.css`).
    * Link to the JavaScript file (`script.js`) at the end of the body.

**2. CSS Styling (`style.css`):**
    * Basic styling for layout (flexbox or grid for the main container).
    * Styles for the scenario content area to make it look like an email, SMS, etc.
    * Styling for interactive elements (buttons, input fields) to make them look clickable/usable.
    * Styling for the feedback message area (e.g., green for correct, red for vulnerable).
    * Simple visual cues to indicate interactive areas (e.g., hover effects on simulated links).

**3. JavaScript Logic (`script.js`):**
    * **Data Structure:** An array of objects, where each object represents a phishing scenario. Each scenario object should contain:
        * A unique ID or index.
        * The HTML content for the scenario display.
        * Definitions of interactive elements within the HTML (e.g., their selectors).
        * The expected "safe" action (e.g., not clicking anything, clicking a specific "report" button if included).
        * The expected "vulnerable" actions (e.g., clicking a fake link, submitting a fake form).
        * Feedback messages for both safe and vulnerable outcomes.
    * **State Management:** A variable to keep track of the current scenario index.
    * **`loadScenario(index)` function:**
        * Takes the scenario index as input.
        * Clears the previous scenario content.
        * Loads the HTML content for the new scenario into the main container.
        * Attaches event listeners to the interactive elements defined in the scenario data.
        * Clears the feedback area.
        * Hides the "Next" button initially.
    * **Event Handlers (for interactive elements):**
        * These functions are triggered when a user interacts with a simulated element (e.g., clicks a link, submits a form).
        * They will compare the user's action against the predefined safe and vulnerable actions for the current scenario.
        * Based on the outcome, they will:
            * Display the appropriate feedback message in the feedback area.
            * Disable further interaction with the current scenario's elements.
            * Show the "Next" button.
    * **`nextScenario()` function:**
        * Increments the current scenario index.
        * Checks if there are more scenarios.
        * If yes, calls `loadScenario()` with the new index.
        * If no, displays a "Test Complete" message.
    * **Initialization:**
        * Call `loadScenario(0)` when the page loads to start the first scenario.
        * Add an event listener to the "Next" button to call `nextScenario()`.

**4. Scenario Content (within `script.js` or separate data file):**
    * Write the HTML markup for each phishing simulation (fake email body, SMS text, etc.).
    * Ensure the interactive elements within this HTML have specific classes or IDs that can be targeted by the JavaScript event listeners.

**Implementation Steps (for the AI Coding Agent):**

1.  Create the basic `index.html` file with the main container and script/link tags.
2.  Create the `style.css` file and add basic layout and element styling.
3.  Create the `script.js` file.
4.  Define the array of scenario objects within `script.js`, including HTML content, interactive element definitions, and outcome logic/messages for 3-5 distinct scenarios.
5.  Implement the `loadScenario()` function to display scenario content and attach event listeners.
6.  Implement the event handler functions for interactive elements to check user actions and provide feedback.
7.  Implement the `nextScenario()` function to advance through scenarios.
8.  Add the initial call to `loadScenario(0)` and the event listener for the "Next" button.
9.  Refine CSS for a simple, clear presentation and "game" feel.