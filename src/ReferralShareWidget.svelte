<script>
  import { getContext, onMount } from "svelte";
  import copy from 'copy-to-clipboard';
  import ContentLoader from 'svelte-content-loader';
  import SimpleModal from './SimpleModal.svelte';
  export let email;
  export let firstName;
  export let lastName;

  let referralLink = null
  let referralLinkEncoded = null
  let twitterShareMessage = null

  const { open } = getContext('simple-modal');

  function handleCopy() {
    copy(referralLink || '')
    open(SimpleModal, { message: "Copied!" });
  }

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
    referralLinkEncoded = encodeURIComponent(referralLink)
    twitterShareMessage = encodeURIComponent(`I love this product! Use my referral link to get $10 off! ${referralLink}`)
  });

</script>

<main>
  <div class="referrals">
    <h2>Give $10, Get $10</h2>
    <p>Share your referral link with your friends! Get rewarded for every order.</p>
    {#if referralLink && referralLinkEncoded && twitterShareMessage}
      <div class="referral_link">{referralLink}</div>
      <div class="share">
        <a class="btn btn--share fb" href="https://www.facebook.com/sharer/sharer.php?u={referralLinkEncoded}">Share via Facebook</a>
        <a class="btn btn--share tw" href="https://twitter.com/intent/tweet?text={twitterShareMessage}">Share via Twitter</a>
        <button class="btn btn--share clipboard" on:click={handleCopy}>Copy to Clipboard</button>
      </div>
    {:else}
      <ContentLoader width={"100%"} height={80} />
    {/if}
  </div>
</main>

<style>
  .referrals {
    border-top: 1px solid var(--accents-3);
    padding-top: 1.5rem;
  }

  .referral_link {
    border-radius: 0.5rem;
    padding: 1.5rem 0.75rem;
    background-color: var(--accents-2);
    text-align: center;
    text-overflow: ellipsis;
    color: var(--primary);
    margin-bottom: 1.5rem;
    word-break: break-all;
  }

  .btn {
    padding: 0.6rem 0.2rem;
    border: 0;
    outline: none;
    border-radius: 3rem;
    text-align: center;
    margin-bottom: 2rem;
  }

  .btn.btn--share {
    padding: 1rem 1.5rem;
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
    margin-left: auto;
    margin-right: auto;
    justify-content: space-between;
  }

  @media (max-width: 1024px) {
    .share {
      flex-direction: column;
    }

    .btn.btn--share {
      margin-bottom: 0.5rem;
    }
  }
</style>
