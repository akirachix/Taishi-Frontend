
import puppeteer, { Browser, Page } from 'puppeteer';

// Function to join a meeting with Google sign-in
export async function joinMeeting(meetingLink: string): Promise<void> {
  let browser: Browser | null = null;
  try {
    console.log(`Starting Puppeteer to join the meeting: ${meetingLink}`);

    // Launch Puppeteer with a specific user profile directory
    browser = await puppeteer.launch({
      headless: false,
      userDataDir: '/home/student/.config/google-chrome/Profile 6', // Using the existing Chrome profile path
      args: [
        '--use-fake-ui-for-media-stream', // Allows automatic camera and mic permissions
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-blink-features=AutomationControlled', // Disables detection as an automated browser
        '--disable-infobars',
      ],
      defaultViewport: null,
    });

    const page: Page = await browser.newPage();

    // Navigate to the meeting link
    await page.goto(meetingLink, { waitUntil: 'networkidle2' });

    // Debugging: Screenshot to confirm page load state
    await page.screenshot({ path: 'meeting-page.png' });

    // Adjust selector based on the actual button class or ID on the meeting platform
    const joinButtonSelector = 'button.join-btn'; // Update this selector as per the actual button

    // Wait for the join button to appear and click it
    try {
      await page.waitForSelector(joinButtonSelector, { visible: true, timeout: 10000 });
      console.log('Join button found, attempting to join...');
      await page.click(joinButtonSelector);
      console.log('Successfully joined the meeting');

      // Adding a manual wait using setTimeout
      console.log('Keeping the meeting page open...');
      await new Promise((resolve) => setTimeout(resolve, 60000 * 120)); // Keeps the page open for 10 minutes

      // Alternatively, keep the browser running indefinitely (useful for debugging)
      // await new Promise(() => {}); // Keeps the script running indefinitely until manually stopped

    } catch (err) {
      // Assert err as Error to access the message property
      if (err instanceof Error) {
        throw new Error(`Join button not found or clickable: ${err.message}`);
      } else {
        throw new Error('Join button not found or clickable: Unknown error occurred');
      }
    }

  } catch (error) {
    console.error('Error joining meeting:', error);
  } 
}

// Get the meeting link from command-line arguments
const meetingLink = process.argv[2];
if (meetingLink) {
  joinMeeting(meetingLink);
} else {
  console.error('No meeting link provided');
}



// File: joinMeeting.ts
// import puppeteer, { Browser, Page } from 'puppeteer';

// // Function to join a meeting with Google sign-in
// export async function joinMeeting(meetingLink: string): Promise<void> { // Make sure this function is exported
//   let browser: Browser | null = null;
//   try {
//     console.log(`Starting Puppeteer to join the meeting: ${meetingLink}`);

//     // Launch Puppeteer with a specific user profile directory
//     browser = await puppeteer.launch({
//       headless: false,
//       userDataDir: '/home/student/.config/google-chrome/Profile 6', // Using the existing Chrome profile path
//       args: [
//         '--use-fake-ui-for-media-stream', // Allows automatic camera and mic permissions
//         '--no-sandbox',
//         '--disable-setuid-sandbox',
//         '--disable-blink-features=AutomationControlled', // Disables detection as an automated browser
//         '--disable-infobars',
//       ],
//       defaultViewport: null,
//     });

//     const page: Page = await browser.newPage();

//     // Navigate to the meeting link
//     await page.goto(meetingLink, { waitUntil: 'networkidle2' });

//     // Debugging: Screenshot to confirm page load state
//     await page.screenshot({ path: 'meeting-page.png' });

//     // Adjust selector based on the actual button class or ID on the meeting platform
//     const joinButtonSelector = 'button.join-btn'; // Update this selector as per the actual button

//     // Wait for the join button to appear and click it
//     try {
//       await page.waitForSelector(joinButtonSelector, { visible: true, timeout: 10000 });
//       console.log('Join button found, attempting to join...');
//       await page.click(joinButtonSelector);
//       console.log('Successfully joined the meeting');

//       // Adding a manual wait using setTimeout
//       console.log('Keeping the meeting page open...');
//       await new Promise((resolve) => setTimeout(resolve, 60000 * 10)); // Keeps the page open for 10 minutes

//     } catch (err) {
//       // Assert err as Error to access the message property
//       if (err instanceof Error) {
//         throw new Error(`Join button not found or clickable: ${err.message}`);
//       } else {
//         throw new Error('Join button not found or clickable: Unknown error occurred');
//       }
//     }

//   } catch (error) {
//     console.error('Error joining meeting:', error);
//   } finally {
//     // Optionally, close the browser after debugging is done
//     // if (browser) await browser.close();
//   }
// }



// // File: joinMeeting.ts
// import puppeteer, { Browser, Page } from 'puppeteer';

// // Function to join a meeting with Google sign-in
// export async function joinMeeting(meetingLink: string): Promise<void> {
//   let browser: Browser | null = null;
//   try {
//     console.log(`Starting Puppeteer to join the meeting: ${meetingLink}`);

//     // Launch Puppeteer with a specific user profile directory
//     browser = await puppeteer.launch({
//       headless: false,
//       userDataDir: '/home/student/.config/google-chrome/Profile 6', // Using the existing Chrome profile path
//       args: [
//         '--use-fake-ui-for-media-stream', // Allows automatic camera and mic permissions
//         '--no-sandbox',
//         '--disable-setuid-sandbox',
//         '--disable-blink-features=AutomationControlled', // Disables detection as an automated browser
//         '--disable-infobars',
//       ],
//       defaultViewport: null,
//     });

//     const page: Page = await browser.newPage();

//     // Navigate to the meeting link
//     await page.goto(meetingLink, { waitUntil: 'networkidle2' });

//     // Debugging: Screenshot to confirm page load state
//     await page.screenshot({ path: 'meeting-page.png' });

//     // Adjust selector based on the actual button class or ID on the meeting platform
//     const joinButtonSelector = 'button.join-btn'; // Update this selector as per the actual button

//     // Wait for the join button to appear and click it
//     try {
//       await page.waitForSelector(joinButtonSelector, { visible: true, timeout: 10000 });
//       console.log('Join button found, attempting to join...');
//       await page.click(joinButtonSelector);
//       console.log('Successfully joined the meeting');

//       // Adding a manual wait using setTimeout
//       console.log('Keeping the meeting page open...');
//       await new Promise((resolve) => setTimeout(resolve, 60000 * 10)); // Keeps the page open for 10 minutes

//     } catch (err) {
//       if (err instanceof Error) {
//         throw new Error(`Join button not found or clickable: ${err.message}`);
//       } else {
//         throw new Error('Join button not found or clickable: Unknown error occurred');
//       }
//     }

//   } catch (error) {
//     console.error('Error joining meeting:', error);
//   } finally {
//     // Optionally, close the browser after debugging is done
//     // if (browser) await browser.close();
//   }
// }
