<div align="center">

## Run Locally

**Prerequisites:** Node.js (v18 or higher recommended)

> **For Windows Users:** If you don't have Node.js installed, you can download the installer from [nodejs.org](https://nodejs.org/) or install it via command prompt using `winget install OpenJS.NodeJS`.

1. Clone the repository and navigate into the project directory:
   ```bash
   git clone https://github.com/mksonti/dharmicviews.git
   cd dharmicviews
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the app:
   ```bash
   npm run dev
   ```

## Checking & Validating URLs

Over time, external websites may go offline. We have provided an automated script that securely fetches every URL listed in `src/data.ts` and updates their `isActive` property without needing manual verification.

To run the script:
1. Open your terminal in the project root folder.
2. Execute the validation script:
   ```bash
   node check_fetch.cjs
   ```
3. The script will output which links are `ACTIVE` and `INACTIVE`, and seamlessly rewrite the TypeScript array in `src/data.ts`.
4. You can review the changes and commit them to keep the directory healthy. If you want to see the inactive links in the UI, navigate to the route `dharmicviews.com/#showInactive`.

### Flagging Squatted & Spam Domains

Some domains may still be technically online, but their content has been replaced by domain squatters or inappropriate content (like gambling or casinos). 

To automatically scan the fetched descriptions and flag these domains:
1. Run the spam-flagging script:
   ```bash
   node flag_spam.cjs
   ```
2. The script will search for keywords like "for sale", "casino", "poker", etc., and inject a `tags` array (e.g. `["gambling"]`) into the link object.
3. These tagged links are immediately marked as `isActive: false`, automatically moving them to the archived `/#showInactive` section with a red tag badge.
