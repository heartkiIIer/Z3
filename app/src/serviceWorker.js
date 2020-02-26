// This optional code is used to register a service worker.
// register() is not called by default.

// This lets the app load faster on subsequent visits in production, and gives
// it offline capabilities. However, it also means that developers (and users)
// will only see deployed updates on subsequent visits to a page, after all the
// existing tabs open on the page have been closed, since previously cached
// resources are updated in the background.

// To learn more about the benefits of this model and instructions on how to
// opt-in, read https://bit.ly/CRA-PWA

import firebase from 'firebase/app';

const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === '[::1]' ||
    // 127.0.0.1/8 is considered localhost for IPv4.
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);

export function register(config) {
  if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    // The URL constructor is available in all browsers that support SW.
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
    if (publicUrl.origin !== window.location.origin) {
      // Our service worker won't work if PUBLIC_URL is on a different origin
      // from what our page is served on. This might happen if a CDN is used to
      // serve assets; see https://github.com/facebook/create-react-app/issues/2374
      return;
    }

    window.addEventListener('load', () => {
      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

      if (isLocalhost) {
        // This is running on localhost. Let's check if a service worker still exists or not.
        checkValidServiceWorker(swUrl, config);

        // Add some additional logging to localhost, pointing developers to the
        // service worker/PWA documentation.
        navigator.serviceWorker.ready.then(() => {
          console.log(
            'This web app is being served cache-first by a service ' +
              'worker. To learn more, visit https://bit.ly/CRA-PWA'
          );
        });
      } else {
        // Is not localhost. Just register service worker
        registerValidSW(swUrl, config);
      }
    });
  }
}

function registerValidSW(swUrl, config) {
  navigator.serviceWorker
    .register(swUrl)
    .then(registration => {
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        if (installingWorker == null) {
          return;
        }
        installingWorker.onstatechange = () => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              // At this point, the updated precached content has been fetched,
              // but the previous service worker will still serve the older
              // content until all client tabs are closed.
              console.log(
                'New content is available and will be used when all ' +
                  'tabs for this page are closed. See https://bit.ly/CRA-PWA.'
              );

              // Execute callback
              if (config && config.onUpdate) {
                config.onUpdate(registration);
              }
            } else {
              // At this point, everything has been precached.
              // It's the perfect time to display a
              // "Content is cached for offline use." message.
              console.log('Content is cached for offline use.');

              // Execute callback
              if (config && config.onSuccess) {
                config.onSuccess(registration);
              }
            }
          }
        };
      };
    })
    .catch(error => {
      console.error('Error during service worker registration:', error);
    });
}

function checkValidServiceWorker(swUrl, config) {
  // Check if the service worker can be found. If it can't reload the page.
  fetch(swUrl)
    .then(response => {
      // Ensure service worker exists, and that we really are getting a JS file.
      const contentType = response.headers.get('content-type');
      if (
        response.status === 404 ||
        (contentType != null && contentType.indexOf('javascript') === -1)
      ) {
        // No service worker found. Probably a different app. Reload the page.
        navigator.serviceWorker.ready.then(registration => {
          registration.unregister().then(() => {
            window.location.reload();
          });
        });
      } else {
        // Service worker found. Proceed as normal.
        registerValidSW(swUrl, config);
      }
    })
    .catch(() => {
      console.log(
        'No internet connection found. App is running in offline mode.'
      );
    });
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(registration => {
      registration.unregister();
    });
  }
}

/**
 * Returns a promise that resolves with an ID token if available.
 * @return {!Promise<?string>} The promise that resolves with an ID token if
 *     available. Otherwise, the promise resolves with null.
 */
const getIdToken = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      unsubscribe();
      if (user) {
        user.getIdToken().then((idToken) => {
          resolve(idToken);
        }, (error) => {
          resolve(null);
        });
      } else {
        resolve(null);
      }
    });
  });
};

const getOriginFromUrl = (url) => {
  // https://stackoverflow.com/questions/1420881/how-to-extract-base-url-from-a-string-in-javascript
  const pathArray = url.split('/');
  const protocol = pathArray[0];
  const host = pathArray[2];
  return protocol + '//' + host;
};

// Get underlying body if available. Works for text and json bodies.
const getBodyContent = (req) => {
  return Promise.resolve().then(() => {
    if (req.method !== 'GET') {
      if (req.headers.get('Content-Type').indexOf('json') !== -1) {
        return req.json()
            .then((json) => {
              return JSON.stringify(json);
            });
      } else {
        return req.text();
      }
    }
  }).catch((error) => {
    // Ignore error.
  });
};

this.addEventListener('fetch', (event) => {
  const requestProcessor = (idToken) => {
    let req = event.request;
    let processRequestPromise = Promise.resolve();
    // For same origin https requests, append idToken to header.
    if (this.location.origin == getOriginFromUrl(event.request.url) &&
        (this.location.protocol == 'http:' ||
            this.location.hostname == 'sleepwebapp.wpi.edu') &&
        idToken) {
      // Clone headers as request headers are immutable.
      const headers = new Headers();
      for (let entry of req.headers.entries()) {
        headers.append(entry[0], entry[1]);
      }
      // Add ID token to header.
      headers.append('Authorization', 'Bearer ' + idToken);
      processRequestPromise = getBodyContent(req).then((body) => {
        try {
          req = new Request(req.url, {
            method: req.method,
            headers: headers,
            mode: 'same-origin',
            credentials: req.credentials,
            cache: req.cache,
            redirect: req.redirect,
            referrer: req.referrer,
            body,
            bodyUsed: req.bodyUsed,
            context: req.context
          });
        } catch (e) {
          // This will fail for CORS requests. We just continue with the
          // fetch caching logic below and do not pass the ID token.
        }
      });
    }
    return processRequestPromise.then(() => {
      return fetch(req);
    });
  };
  // Fetch the resource after checking for the ID token.
  // This can also be integrated with existing logic to serve cached files
  // in offline mode.
  event.respondWith(getIdToken().then(requestProcessor, requestProcessor));
});

// In service worker script.
this.addEventListener('activate', event => {
  event.waitUntil(clients.claim());
});