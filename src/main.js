import App from './App.svelte';

const app = new App({
  target: document.body,
  props: {
    email: 'demo+referralcandy@example.com',
    firstName: 'Jane',
    lastName: 'Doe'
  },
});

export default app;
