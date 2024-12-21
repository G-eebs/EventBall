# EventBall - events platform

EventBall is a serverless events platform website and Android app built using `Angular`, `Netlify functions` and `Capacitor`.

**There is a hosted site [here](https://eventball.netlify.app)**

**A prebuilt Android debug apk can be downloaded from the repo. Click the `EventBall-debug.apk` file or [here](EventBall-debug.apk) then in the top right either the download button `↓` , or `...` then download.**  
This can then be installed on your Android device or emulator of choice.
If installing the apk using an emulator with Android Studio I recommend navigating to the GitHub repo on the emulated device and downloading from there.

## Summary

The home page displays upcoming events from the `EventBrite` API in date order with options to view more details or sign up.

Selecting more info presents the user with full details on the event and the option to attend.

Selecting attend prompts the user to submit their name and email to sign up, with the ability to add the event to various calendars once they're signed up.

The EventBall heading in the toolbar can be clicked at any time to navigate back to the homepage.

Staff can sign in to create and manage events using the button in the top right. Sign in is available using email or Google through `Firebase` authentication.  
Test account email and password are:  
`test@test.test`  
`test12`

Once signed in, clicking the button in the top right shows options to create an event or sign out.

The create event page presents fields for the event name and description as well as dates and online or physical locations. Once all details are filled out and the event is created it can be viewed directly as well as appearing on the home page.

If the user is signed in, they can delete any event created through EventBall on the event details page.


## Local setup

Node.js version: `23.1.0`

First clone the repository:
```bash
git clone https://github.com/G-eebs/EventBall.git
```
And navigate into it:
```bash
cd EventBall
```

Next install the required packages:
```bash
npm install
```

You will need [Angular CLI](https://github.com/angular/angular-cli) in order to compile the app:
```bash
npm install -g @angular/cli
```

As this is a serverless application it uses Netlify functions to make API calls in order to protect the EventBrite API key.  
To run the project locally [Netlify CLI](https://docs.netlify.com/cli/get-started) must be installed:
```bash
npm install -g netlify-cli
```

An [EventBrite](https://www.eventbrite.com/) account will be required in order to make requests to their API.  
Once you have created one and signed in, click your account in the top right and navigate to `Account settings` -> `Developer Links` -> `API Keys` or click [here](https://www.eventbrite.com/account-settings/apps).  
Now select Create API Key and fill in the details as you like to create the key.  
On the API Keys page select `Show API key, client secret and tokens` then copy your private token.  
Back in the project files open `netlify.toml` and add the following to the end, replacing `__TOKEN__` with your private token:
```
[context.dev.environment]  
  EVENTBRITE_PRIVATE_TOKEN = "__TOKEN__"
```
Now run the following to build the app:
```bash
ng build
```
And finally to run the dev server:
```bash
netlify dev
```
This configuration will use the existing Firebase project's authorisation and users so the test account details will work. If you want to use a new [Firebase project](https://console.firebase.google.com/), change the firebaseConfig in the `src/environments` files to the one from your new project. These configuration objects are safe to put on the frontend as the apiKey and other data are only used to identify the project, not for authorisation.
### Android
If you wish to run the Android project locally, first install [Android Studio](https://developer.android.com/studio).  
Then compile the project:
```bash
ng build
```
Sync files with the Capacitor project:
```bash
npx cap sync
```
Finally open the project in Android Studio:
```bash
npx cap open android
```