<script>
  import { onMount } from "svelte";
  import ContentLoader from 'svelte-content-loader';
  export let email;

  let rewards = null;

  onMount(async () => {
    const res = await fetch(`/api/rewards?email=${encodeURIComponent(email)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const response = await res.json();
    rewards = response.rewards
  });

</script>

<main>
  <div class="profile">
    <h2>Customer Profile</h2>
    <h3>Rewards</h3>
    {#if rewards}
      {#each rewards as reward}
        <div class="reward">
          <p>Get {reward.description}</p>
          {#if reward.coupon_code}<p><b>{reward.coupon_code}</b></p>{/if}
          {#if reward.coupon_code_expiry}<p>Expires on: {new Date(reward.coupon_code_expiry).toDateString()}</p>{/if}
        </div>
      {/each}
    {:else if rewards && rewards.length === 0}
      <p>No rewards found</p>
    {:else}
      <ContentLoader width={"100%"} height={80} />
    {/if}
  </div>
</main>

<style>
  .profile {
    border-top: 1px solid var(--accents-3);
    padding-top: 1.5rem;
  }

  .reward {
    border-radius: 0.5rem;
    padding: 1.5rem 0.75rem;
    background-color: var(--accents-2);
    text-align: center;
    text-overflow: ellipsis;
    color: var(--primary);
    margin-bottom: 1.5rem;
  }
  .reward > p {
    margin-bottom: 0;
  }
</style>
