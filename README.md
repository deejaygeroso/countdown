# Countdown Timer  

A shared countdown timer that can be simultaneously experienced by multiple users.  

![App Screenshot](./public/screenshot.png)

## Features

- Clicking the **Reset** button resets the timer to `3:00` minutes
- Clicking the **Start/Stop** button unpause and pause the timer respectively
- The timer counts downward, updating every second until it reaches `0:00`
- Multiple users can be able to visit the site and all simultaneously see the same value
- Closing or reloading the browser does not impact the timer's behavior. On reload, the site displays the same content as if the page was never closed.
- Implementation of this app avoids excessive writes to persistent storage. This means that the app **does not** update the database every second with the current time.
