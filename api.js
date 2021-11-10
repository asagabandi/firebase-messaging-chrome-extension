import firebase from 'firebase';

var config = {
 /* Firebase config here */ 
};

firebase.initializeApp(config);

export default class FirebaseAPI {
    firebase() {
        return firebase;
    }

    static firebase() {
        return firebase;
    }

    /**
     * Register service worker, tell firebase to use it, and attempt to get the token.
     *
     * The token request WILL fail from a background script if a page did not call this method beforehand.
     * Notification permissions aside (as they can be granted through manifest), Firebase will try to
     * subscribe using GCM's PushManager and will be halted indefinitely.
     */
    setUpFirebase() {
        // request permission
        const messaging = firebase.messaging();

        messaging
            .requestPermission()
            .then(function ()
            {
                console.log('Notification permission granted.');
            })
            .catch(function (err)
            {
                console.log('Unable to get permission to notify.', err);
            });

        //register service worker
        if ("serviceWorker" in navigator)
        {
            navigator.serviceWorker
                .register("./firebase-messaging-sw.js")
                .then((registration) =>
                {
                    console.log("Registration successful, scope is:", registration.scope);
                    messaging.useServiceWorker(registration);
                    return messaging.getToken({vapidKey: '<your key>', serviceWorkerRegistration : registration })
                        .then((currentToken) =>
                        {
                            if (currentToken)
                            {
                                console.log('current token for client: ', currentToken);
                            } else
                            {

                                console.log('No registration token available. Request permission to generate one.');
                            }
                        }).catch((err) =>
                        {
                            console.log('An error occurred while retrieving token. ', err);
                        });
                })
                .catch(function(err)
                {
                    console.log("Service worker registration failed, error:"  , err );
                });
        }

        messaging.onMessage((payload) => {
            console.log('Message received. ', payload);
        });
    }
}
