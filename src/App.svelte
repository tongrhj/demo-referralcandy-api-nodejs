<script>
  import ReferralShareWidget from "./ReferralShareWidget.svelte";
  export let email;
  export let firstName;
  export let lastName;
  import Modal from 'svelte-simple-modal';
</script>


<Modal>
  <main>
    <p>Demo Store</p>
    <p>
      Example product page with custom <a href="https://referralcandy.com/api">ReferralCandy API</a> Integration
    </p>
    <div class="catalog">
      <div class="product">
        <img src="./headphones-monochrome.svg" alt="headphones" loading="lazy" />
      </div>
      <div class="details">
        <h1>Product</h1>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio, tenetur. Dolorum ab veniam odit placeat, provident culpa totam minima molestiae! Nemo cumque qui dignissimos? Modi aliquam obcaecati maiores magni commodi.</p>

        <div class="primary btn" href="#">Buy Now</div>
        <ReferralShareWidget email={email} firstName={firstName} lastName={lastName} />
      </div>
    </div>

    <p>
      The code for this example can be found on <a href="https://github.com/tongrhj/demo-referralcandy-api-nodejs/">Github</a>.
    </p>
  </main>
</Modal>

<style>
  main {
    margin: 0 auto;
    max-width: 70rem;
    padding: 1rem 1.5rem;
  }

  .catalog {
    margin: 1.5rem 0;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto;
    gap: 2.5rem;
  }

  @media (max-width: 768px) {
    .catalog {
      grid-template-columns: auto;
    }
  }

  .product img {
    max-width: 100%;
  }

  .details h1 {
    margin-top: 0;
  }

  .details > p {
    margin-bottom: 2rem;
  }

  .btn {
    padding: 0.6rem 0.2rem;
    border: 0;
    outline: none;
    border-radius: 3rem;
    text-align: center;
    margin-bottom: 2rem;
  }

  .btn.primary {
    background-color: var(--color);
    color: var(--accents-1);
  }
</style>
