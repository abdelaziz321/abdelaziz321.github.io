<template>
  <section class="tools mb-40 paper">
    <!-- TOOLS -->
    <div class="row pt-40 pb-20 text-center">
      <div class="col-12">
        <p class="mb-20 subtitle">Usually I use these tools while working, but also I have passion to learn and use new Technologies</p>

        <div class="tools-list text-center">
          <div class="tool" :key="tool.key" v-for="(tool) in tools" :class="tool.key">
            <component :is="tool.icon" />
            <span class="title">
              <span :class="`level mr-3 ${tool.level}`"></span>
              {{ tool.title }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- SUMMARY -->
    <div class="summary text-left pb-20 pt-25">
      <p>
        <span class="level high mr-15"></span>
        using it regulary
      </p>
      <p>
        <span class="level mid mr-15"></span>
        already used it, but don't have a deep understanding
      </p>
      <p>
        <span class="level low mr-15"></span>
        know the basic stuff
      </p>
    </div>
  </section>
</template>


<script>
import php from '@/assets/images/tools/php.svg';
import javascript from '@/assets/images/tools/javascript.svg';
import mysql from '@/assets/images/tools/mysql.svg';
import laravel from '@/assets/images/tools/laravel.svg';
import vuejs from '@/assets/images/tools/vuejs.svg';
import vuetify from '@/assets/images/tools/vuetify.svg';
import postman from '@/assets/images/tools/postman.svg';
import git from '@/assets/images/tools/git.svg';
import linux from '@/assets/images/tools/linux.svg';
import digitalocean from '@/assets/images/tools/digitalocean.svg';
import bootstrap from '@/assets/images/tools/bootstrap.svg';
import trello from '@/assets/images/tools/trello.svg';
import scss from '@/assets/images/tools/scss.svg';
import python from '@/assets/images/tools/python.svg';
import django from '@/assets/images/tools/django.svg';
import nginx from '@/assets/images/tools/nginx.svg';
import nuxtjs from '@/assets/images/tools/nuxtjs.svg';
import electron from '@/assets/images/tools/electron.svg';
import socketio from '@/assets/images/tools/socketio.svg';
import cpanel from '@/assets/images/tools/cpanel.svg';
import mongodb from '@/assets/images/tools/mongodb.svg';
import firebase from '@/assets/images/tools/firebase.svg';
import quasar from '@/assets/images/tools/quasar.svg';
import jquery from '@/assets/images/tools/jquery.svg';
import apache from '@/assets/images/tools/apache.svg';
import webpack from '@/assets/images/tools/webpack.svg';
import redis from '@/assets/images/tools/redis.svg';
import nestjs from '@/assets/images/tools/nestjs.svg';
import jenkins from '@/assets/images/tools/jenkins.svg';
import nodejs from '@/assets/images/tools/nodejs.svg';
import typescript from '@/assets/images/tools/typescript.svg';

export default {
  name: 'tools',

  data: function () {
    return {
      tools: [
        { key: 'php',          icon: php,          title: 'php',          level: 'high' },
        { key: 'javascript',   icon: javascript,   title: 'javascript',   level: 'high' },
        { key: 'mysql',        icon: mysql,        title: 'mysql',        level: 'high' },
        { key: 'laravel',      icon: laravel,      title: 'laravel',      level: 'high' },
        { key: 'vuejs',        icon: vuejs,        title: 'vuejs',        level: 'high' },
        { key: 'vuetify',      icon: vuetify,      title: 'vuetify',      level: 'high' },
        { key: 'postman',      icon: postman,      title: 'postman',      level: 'high' },
        { key: 'git',          icon: git,          title: 'git',          level: 'high' },
        { key: 'linux',        icon: linux,        title: 'linux',        level: 'high' },
        { key: 'digitalocean', icon: digitalocean, title: 'digitalocean', level: 'high' },
        { key: 'bootstrap',    icon: bootstrap,    title: 'bootstrap',    level: 'high' },
        { key: 'trello',       icon: trello,       title: 'trello',       level: 'high' },
        { key: 'scss',         icon: scss,         title: 'scss',         level: 'high' },
        { key: 'python',       icon: python,       title: 'python',       level: 'mid'  },
        { key: 'django',       icon: django,       title: 'django',       level: 'mid'  },
        { key: 'nginx',        icon: nginx,        title: 'nginx',        level: 'mid'  },
        { key: 'nuxtjs',       icon: nuxtjs,       title: 'nuxt.js',      level: 'mid'  },
        { key: 'electron',     icon: electron,     title: 'electron',     level: 'mid'  },
        { key: 'socketio',     icon: socketio,     title: 'socket.io',    level: 'mid'  },
        { key: 'cpanel',       icon: cpanel,       title: 'cpanel',       level: 'mid'  },
        { key: 'mongodb',      icon: mongodb,      title: 'mongodb',      level: 'mid'  },
        { key: 'firebase',     icon: firebase,     title: 'firebase',     level: 'mid'  },
        { key: 'quasar',       icon: quasar,       title: 'quasar',       level: 'mid'  },
        { key: 'jquery',       icon: jquery,       title: 'jquery',       level: 'mid'  },
        { key: 'apache',       icon: apache,       title: 'apache',       level: 'low'  },
        { key: 'webpack',      icon: webpack,      title: 'webpack',      level: 'low'  },
        { key: 'redis',        icon: redis,        title: 'redis',        level: 'low'  },
        { key: 'nestjs',       icon: nestjs,       title: 'nest.js',      level: 'low'  },
        { key: 'jenkins',      icon: jenkins,      title: 'jenkins',      level: 'low'  },
        { key: 'nodejs',       icon: nodejs,       title: 'nodejs',       level: 'low'  },
        { key: 'typescript',   icon: typescript,   title: 'typescript',   level: 'low'  },
      ]
    }
  }
};
</script>