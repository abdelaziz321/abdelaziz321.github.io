<template>
  <section>
    <div class="row pt-40 pb-40">
      <!-- BIO SIDE -->
      <div class="col-md-8">
        <div class="pr-15 mb-25">
          <p>Assalamualaikum,</p>
          <p>My name is Abdelaziz Mahmoud.</p>
          <p>I live in a lovely <span style="color: #f44336">💓</span> blue <span style="color: #1570a9">🌊</span> city in Egypt. Alexandria.</p>
          <p>I work as a software developer with around {{ yearsOfExperience() }} years of experience. I build web apps, SPAs, REST APIs, and Electron desktop apps.</p>
          <p>Also, I'm studying CS/Statistics At Faculty of Sciences, Alexandria University.</p>
          <!-- <a
            target="_blank"
            href="Abdelaziz Mahmoud - Software Developer.pdf"
            class="btn btn-download mt-15"
          >Download My CV</a> -->
        </div>
      </div>

      <!-- IMAGE SIDE -->
      <div class="col-md-4">
        <div class="text-center">
          <img width="100%" style="max-width: 240px" src="@/assets/images/me.webp" />
        </div>
      </div>
    </div>

    <hr class="divider-line hide-mobile" />

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
import gmail from '@/assets/images/contacts/gmail.svg?inline';
import github from '@/assets/images/contacts/github.svg?inline';
import linkedin from '@/assets/images/contacts/linkedin.svg?inline';
import stackoverflow from '@/assets/images/contacts/stackoverflow.svg?inline';
import upwork from '@/assets/images/contacts/upwork.svg?inline';
// import freelancer from '@/assets/images/contacts/freelancer.svg?inline';
// import themeforest from '@/assets/images/contacts/themeforest.svg?inline';
// import facebook from '@/assets/images/contacts/facebook.svg?inline';
// import twitter from '@/assets/images/contacts/twitter.svg?inline';
import whatsapp from '@/assets/images/contacts/whatsapp.svg?inline';

export default {
  name: 'about',

  data: function () {
    return {
      contacts: [
        { icon: gmail,         link: 'mailto:abdelazizmahmoud321@gmail.com' },
        { icon: github,        link: 'https://github.com/abdelaziz321' },
        { icon: linkedin,      link: 'https://www.linkedin.com/in/abdelaziz-mahmoud-2b344b138/' },
        { icon: stackoverflow, link: 'https://stackoverflow.com/users/6739241/abdelaziz-mahmoud' },
        { icon: upwork,        link: 'https://upwork.com/freelancers/~014b83515ee721dcb4' },
        // { icon: freelancer,    link: 'https://freelancer.ca/u/abdelaziz321' },
        // { icon: themeforest,   link: 'https://themeforest.net/user/abdelaziz_sliem/portfolio' },
        // { icon: facebook,      link: 'https://www.facebook.com/profile.php?id=100077407050340' },
        // { icon: twitter,       link: 'https://twitter.com/abdelaziz3210' },
        { icon: whatsapp,      link: 'https://wa.me/+201026642884' },
      ]
    };
  },

  methods: {
    yearsOfExperience() {
      const startDate = new Date('2019-09-01');
      const currentDate = new Date();
      let years = currentDate.getFullYear() - startDate.getFullYear();
  
      if (currentDate.getMonth() < startDate.getMonth()) {
          years--;
      }
  
      return years;
    }
  }

};
</script>


<style lang="scss">
.contacts {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  svg {
    width: 20px;
    fill: #BBBBBB;
    margin: 0 10px;

    body.dark-mode & {
      fill: #888888;
    }

    &:hover {
      fill: #222222;

      body.dark-mode & {
        fill: #DDDDDD;
      }
    }
  }
}
</style>
