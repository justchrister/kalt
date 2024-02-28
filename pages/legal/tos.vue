<template>
  <main>
    <block margin="3">
      <h1> Terms of service </h1>
      <p>At Kalt LLC, we value transparency.</p>
    </block>
    <block margin="3">
      <h2>Introduction</h2>
      <p>
        By using our website and services ("Platform"), you agree to these terms of use ("Terms"). These Terms apply to
        everyone who uses the Platform, whether you're a registered member or just browsing.
      </p>
      <p>
        Important: Read these Terms carefully. They include a clause that requires binding arbitration for
        resolving disputes.
      </p>
    </block>
    <block margin="half">
      <h2>Updates to these terms</h2>
      <p>
        We may update these Terms at any time. If we do, we'll notify you on the Platform. Your continued use of the
        Platform means you agree to the updated Terms.
      </p>
    </block>
    <block margin="half">
      <h2>Who can use our platform</h2>
      <p>
        You must be at least 18 years old to use our Platform. By using it, you confirm that you meet this age
        requirement.
      </p>
    </block>
    <block margin="half">
      <h2>Ownership and use of content</h2>
      <p>
        All content on the Platform is our property. You're granted a limited license to use it for personal purposes, as
        long as you don't remove any copyright notices.
      </p>
      <p>
        Everything you see on our Platform is owned by us or used with permission. You can use it for personal,
        non-commercial purposes. Any other use is not allowed without our written consent.
      </p>
    </block>
    <block margin="half">
      <h2>Market volatility and withdrawal suspension clause:</h2>
      <p>
        In recognition of the unpredictable nature of financial markets and other extraordinary circumstances beyond our
        control, we reserve the right to temporarily suspend withdrawals and divesting activities for up to a period of 12
        months. This action may be deemed necessary in situations where market volatility reaches levels that
        significantly impair the orderly function of trading or other critical operational aspects. Such measures are
        intended to protect the interests of our clients and the integrity of our operations during times of extreme
        market stress or other force majeure events. During such periods, we will endeavor to provide timely
        communications and support to our clients, and we will resume normal operations as soon as it is feasible and safe
        to do so. This clause is intended to provide a safeguard against extraordinary market conditions or other
        significant events that could adversely affect the ability to process transactions in a fair and orderly manner.
      </p>
    </block>
    <block margin="half">
      <h2>Asset allocation clause:</h2>
      <p>
        We endeavor to manage our clients' investments in accordance with their chosen fund allocations. However, it is
        important to understand that there may not always be a precise one-to-one correspondence between the allocation
        percentages defined by users and the actual composition of assets in their accounts. This discrepancy can arise
        due to a variety of factors, including but not limited to, market fluctuations, timing of order execution,
        liquidity constraints, and regulatory requirements. These factors may necessitate adjustments in asset allocation
        and may lead to temporary disparities between your specified preferences and the actual holdings. Our commitment
        is to closely align your portfolio with your specified preferences within the constraints of practical market
        realities, while maintaining the flexibility needed to adapt to changing market conditions and to safeguard your
        interests.
      </p>
    </block>
    <block margin="half">
      <h2>Your responsibilities</h2>
      <p>-> You won't post any content that violates someone else's rights or breaks the law.</p>
      <p>-> You won't use the Platform to send spam or scam others.</p>
      <p>-> You're responsible for all activity on your account.</p>
    </block>
    <block margin="half">
      <h2>Privacy</h2>
      <p>
        We collect and process your data to provide our services. We don't share this data with third parties. For data
        deletion, email us at <a href="mailto:gdpr@ka.lt">gdpr@ka.lt</a>.
      </p>
    </block>
    <block margin="half">
      <h2>Arbitration clause</h2>
      <p>
        Disputes between you and Kalt LLC will be resolved by binding arbitration on an individual basis, rather than in
        court.
      </p>
    </block>
    <block margin="half">
      <h2>Limitation of liability</h2>
      <p>
        Kalt LLC is not liable for any damages that result from your use or inability to use the Platform.
      </p>
    </block>
  </main>
</template>
<script lang="ts" setup>
  definePageMeta({
    pagename: 'Terms of service'
  })
  
  useSeoMeta({
    title: 'Terms of service',
    ogTitle: 'Kalt — Terms of service',
    description: 'Our terms of service.',
    ogDescription: 'Our terms of service.',
    ogImage: 'https://ka.lt/images/meta-legal.png'
  })

</script>
<style scoped lang="scss">
  main {
    margin-top: 0;
  }
</style>