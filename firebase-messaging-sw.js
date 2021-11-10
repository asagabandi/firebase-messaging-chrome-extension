import firebase from 'firebase/app';

firebase.initializeApp({
 /* Firebase config here */
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler((payload) => {
    console.log('[firebase-sw.js] Received background message ', payload);
    const notificationTitle = 'Firebase notification';
    const notificationOptions = {
        body: 'Test notification',
        icon: 'sample logo'
    };
    return self.registration.showNotification(notificationTitle, notificationOptions);
});
