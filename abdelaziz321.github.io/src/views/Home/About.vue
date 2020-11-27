<template>
  <section class="paper">
    <div class="row pt-40 pb-40">
      <!-- BIO SIDE -->
      <div class="col-md-8">
        <div class="pr-15 mb-20">
          <p>Assalamualaikum,</p>
          <p>My name is Abdelaziz Sliem.</p>
          <p>I live in a lovely <span style="color: #f44336">💓</span> blue <span style="color: #1570a9">🌊</span> city in Egypt. Alexandria.</p>
          <p>I work as a Full-Stack developer with one year of experience. I build websites, web apps, SPAs, REST APIs and Electron desktop apps.</p>
          <p>Also, I'm studying CS/Statistics At Faculty of Sciences, Alexandria University.</p>
          <a
            target="_blank"
            :href="`${baseUrl}/AbdelazizSliem.pdf`"
            class="btn btn-dark mt-15"
          >Download My CV</a>
        </div>
      </div>

      <!-- IMAGE SIDE -->
      <div class="col-md-4">
        <div class="pl-30 text-center">
          <img width="100%" style="max-width: 350px" src="@/assets/images/me.jpeg" />
        </div>
      </div>
    </div>

    <!-- CONTACTS -->
    <div class="contacts summary pb-10 pt-25">
      <a
        :key="index"
        v-for="(contact, index) in contacts"
        target="_blank"
        :href="contact.link"
      >
        <component :is="contact.icon" />
      </a>
    </div>
  </section>
</template>


<script>
import gmail from '@/assets/images/contacts/gmail.svg';
import github from '@/assets/images/contacts/github.svg';
import linkedin from '@/assets/images/contacts/linkedin.svg';
import stackoverflow from '@/assets/images/contacts/stackoverflow.svg';
import upwork from '@/assets/images/contacts/upwork.svg';
import freelancer from '@/assets/images/contacts/freelancer.svg';
import themeforest from '@/assets/images/contacts/themeforest.svg';
import facebook from '@/assets/images/contacts/facebook.svg';
import twitter from '@/assets/images/contacts/twitter.svg';
import whatsapp from '@/assets/images/contacts/whatsapp.svg';

export default {
  name: 'about',

  data: function () {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,

      contacts: [
        { icon: gmail,         link: 'mailto:abdelazizmahmoud321@gmail.com?subject=personal site | guest' },
        { icon: github,        link: 'https://github.com/abdelaziz321' },
        { icon: linkedin,      link: 'https://linkedin.com/in/abdelaziz-sliem-2b344b138/' },
        { icon: stackoverflow, link: 'https://stackoverflow.com/users/6739241/abdelaziz-sliem' },
        { icon: upwork,        link: 'https://upwork.com/freelancers/~014b83515ee721dcb4' },
        { icon: freelancer,    link: 'https://freelancer.ca/u/abdelaziz321' },
        { icon: themeforest,   link: 'https://themeforest.net/user/abdelaziz_sliem/portfolio' },
        { icon: facebook,      link: 'https://facebook.com/abdelazizsliem321' },
        { icon: twitter,       link: 'https://twitter.com/abdelaziz_sliem' },
        { icon: whatsapp,      link: '#' },
      ]
    };
  }
};
</script>