<script>
  import { onMount } from "svelte";
  import copy from 'copy-to-clipboard';
  import Swal from 'sweetalert2'
  export let email;
  export let firstName;
  export let lastName;

  let referralLink = null

  onMount(async () => {
    const res = await fetch("/api/signup", {
      method: 'POST',
      body: JSON.stringify({
        email,
        first_name: firstName,
        last_name: lastName
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const response = await res.json();
    referralLink = response.referral_link
  });

  function handleCopy() {
    copy(referralLink || '')
    Swal.fire({ title: 'Copied!', icon: 'success' })
  }
</script>

<main>
  <p>Demo Store</p>
  <p>
    Example product page with custom <a href="https://referralcandy.com/api">ReferralCandy API</a> Integration
  </p>
  <div class="catalog">
    <div class="product">
      <img src="./headphones-monochrome.svg" alt="headphones" />
    </div>
    <div class="details">
      <h1>Product</h1>
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio, tenetur. Dolorum ab veniam odit placeat, provident culpa totam minima molestiae! Nemo cumque qui dignissimos? Modi aliquam obcaecati maiores magni commodi.</p>

      <div class="primary btn" href="#">Buy Now</div>
      <div class="referrals">
        <h2>Give $10, Get $10</h2>
        <p>Share your referral link with your friends!</p>
        {#if referralLink}
          <div class="referral_link">{referralLink}</div>
          <div class="share">
            <a class="btn btn--share fb" href="https://www.facebook.com/sharer/sharer.php?u={referralLink}">Share via Facebook</a>
            <a class="btn btn--share tw" href="https://twitter.com/intent/tweet?text=I love this product! Use my referral link to get $10 off! {referralLink}">Share via Twitter</a>
            <button class="btn btn--share clipboard" on:click={handleCopy}>Copy to Clipboard</button>
          </div>
        {:else}
          <p style="text-align:center;">Getting your referral link...</p>
        {/if}
      </div>
    </div>
  </div>
</main>

<style>
  main {
    margin: 1rem 1.5rem;
  }
  .catalog {
    margin: 1.5rem 0;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto;
    gap: 1.5rem;
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

  .referrals {
    border-top: 1px solid var(--accents-3);
    padding-top: 1.5rem;
  }

  .referrals > h2 {
    margin-bottom: 1.5rem;
  }

  .referrals > p {
    margin-bottom: 1rem;
  }

  .referral_link {
    border-radius: 3px;
    padding: 1.5rem 0.75rem;
    background-color: var(--accents-2);
    text-align: center;
    text-overflow: ellipsis;
    color: var(--primary);
    margin-bottom: 1rem;
  }

  .btn.btn--share {
    padding: 0.5rem 1rem;
    text-transform: uppercase;
    font-size: 0.75rem;
    display: inline-block;
    cursor: pointer;
    margin: 0.25rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .btn.btn--share.fb {
    background-color: #4267B2;
    color: var(--accents-1);
  }

  .btn.btn--share.tw {
    background-color: #1da1f2;
    color: var(--accents-1);
  }
  .btn.btn--share.clipboard {
    background-color: var(--accents-6);
    color: var(--accents-1);
  }

  .share {
    display: flex;
    max-width: 700px;
    margin-left: auto;
    margin-right: auto;
    justify-content: space-around;
  }

  @media (max-width: 768px) {
    .share {
      flex-direction: column;
    }

    .btn.btn--share {
      margin-bottom: 0.5rem;
    }
  }
</style>
