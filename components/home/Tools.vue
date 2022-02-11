<template>
  <section class="tools mb-40">
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

    <hr class="divider-line hide-mobile" />

    <!-- SUMMARY -->
    <div class="summary text-left pb-20 pt-25">
      <p>
        <span class="level high mr-15"></span>
        using it regulary
      </p>
      <p>
        <span class="level mid mr-15"></span>
        don't have a deep understanding
      </p>
      <p>
        <span class="level low mr-15"></span>
        know the basic stuff
      </p>
    </div>
  </section>
</template>


<script>
import php from '@/assets/images/tools/php.svg?inline';
import python from '@/assets/images/tools/python.svg?inline';
import django from '@/assets/images/tools/django.svg?inline';
import dotnetcore from '@/assets/images/tools/dotnetcore.svg?inline';
import javascript from '@/assets/images/tools/javascript.svg?inline';
import mysql from '@/assets/images/tools/mysql.svg?inline';
import laravel from '@/assets/images/tools/laravel.svg?inline';
import vuejs from '@/assets/images/tools/vuejs.svg?inline';
import vuetify from '@/assets/images/tools/vuetify.svg?inline';
import elementui from '@/assets/images/tools/elementui.svg?inline';
import postman from '@/assets/images/tools/postman.svg?inline';
import git from '@/assets/images/tools/git.svg?inline';
import linux from '@/assets/images/tools/linux.svg?inline';
import digitalocean from '@/assets/images/tools/digitalocean.svg?inline';
// import bootstrap from '@/assets/images/tools/bootstrap.svg?inline';
// import trello from '@/assets/images/tools/trello.svg?inline';
import scss from '@/assets/images/tools/scss.svg?inline';
import tailwindcss from '@/assets/images/tools/tailwindcss.svg?inline';
import nginx from '@/assets/images/tools/nginx.svg?inline';
import nuxtjs from '@/assets/images/tools/nuxtjs.svg?inline';
import electron from '@/assets/images/tools/electron.svg?inline';
import socketio from '@/assets/images/tools/socketio.svg?inline';
import cpanel from '@/assets/images/tools/cpanel.svg?inline';
// import mongodb from '@/assets/images/tools/mongodb.svg?inline';
// import firebase from '@/assets/images/tools/firebase.svg?inline';
import quasar from '@/assets/images/tools/quasar.svg?inline';
// import jquery from '@/assets/images/tools/jquery.svg?inline';
import apache from '@/assets/images/tools/apache.svg?inline';
import webpack from '@/assets/images/tools/webpack.svg?inline';
// import redis from '@/assets/images/tools/redis.svg?inline';
// import nestjs from '@/assets/images/tools/nestjs.svg?inline';
// import jenkins from '@/assets/images/tools/jenkins.svg?inline';
import nodejs from '@/assets/images/tools/nodejs.svg?inline';
// import typescript from '@/assets/images/tools/typescript.svg?inline';

export default {
  name: 'tools',

  data: function () {
    return {
      tools: [
        { key: 'python',       icon: python,       title: 'python',       level: 'mid' },
        { key: 'django',       icon: django,       title: 'django',       level: 'mid' },
        { key: 'php',          icon: php,          title: 'php',          level: 'high' },
        { key: 'dotnetCore',   icon: dotnetcore,   title: 'dotnet core',  level: 'mid' },
        { key: 'javascript',   icon: javascript,   title: 'javascript',   level: 'high' },
        { key: 'mysql',        icon: mysql,        title: 'mysql',        level: 'high' },
        { key: 'laravel',      icon: laravel,      title: 'laravel',      level: 'high' },
        { key: 'postman',      icon: postman,      title: 'postman',      level: 'high' },
        { key: 'git',          icon: git,          title: 'git',          level: 'high' },
        { key: 'socketio',     icon: socketio,     title: 'socket.io',    level: 'mid'  },
        { key: 'vuejs',        icon: vuejs,        title: 'vuejs',        level: 'high' },
        { key: 'nuxtjs',       icon: nuxtjs,       title: 'nuxt.js',      level: 'high'  },
        { key: 'vuetify',      icon: vuetify,      title: 'vuetify',      level: 'high' },
        { key: 'element-ui',   icon: elementui,    title: 'element-ui',   level: 'high'  },
        { key: 'quasar',       icon: quasar,       title: 'quasar',       level: 'mid'  },
        // { key: 'bootstrap',    icon: bootstrap,    title: 'bootstrap',    level: 'high' },
        // { key: 'trello',       icon: trello,       title: 'trello',       level: 'high' },
        { key: 'scss',         icon: scss,         title: 'scss',         level: 'high' },
        { key: 'tailwindcss',  icon: tailwindcss,  title: 'tailwindcss',  level: 'high' },
        { key: 'electron',     icon: electron,     title: 'electron',     level: 'mid'  },
        { key: 'nodejs',       icon: nodejs,       title: 'nodejs',       level: 'low'  },
        { key: 'digitalocean', icon: digitalocean, title: 'digitalocean', level: 'high' },
        { key: 'cpanel',       icon: cpanel,       title: 'cpanel',       level: 'mid'  },
        { key: 'apache',       icon: apache,       title: 'apache',       level: 'low'  },
        { key: 'nginx',        icon: nginx,        title: 'nginx',        level: 'mid'  },
        { key: 'linux',        icon: linux,        title: 'linux',        level: 'mid' },
        // { key: 'mongodb',      icon: mongodb,      title: 'mongodb',      level: 'mid'  },
        // { key: 'firebase',     icon: firebase,     title: 'firebase',     level: 'mid'  },
        // { key: 'jquery',       icon: jquery,       title: 'jquery',       level: 'mid'  },
        // { key: 'redis',        icon: redis,        title: 'redis',        level: 'low'  },
        // { key: 'nestjs',       icon: nestjs,       title: 'nest.js',      level: 'low'  },
        // { key: 'jenkins',      icon: jenkins,      title: 'jenkins',      level: 'low'  },
        // { key: 'typescript',   icon: typescript,   title: 'typescript',   level: 'low'  },
      ]
    }
  }
};
</script>


<style lang="scss">
.tools {
  .discription {
    font-size: 1.05em;
  }

  .tools-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    .tool {
      padding: 1.5em;

      @media(max-width:767px) {
        padding: 1em;
      }
  
      .title {
        display: block;
        text-align: center;
        text-transform: uppercase;
      }

      .level {
        position: relative;
        bottom: 2px;
      }
  
      svg {
        width: 80px;
        fill: #BBBBBB;
        margin: 3px 10px;

        @media(max-width:767px) {
          width: 50px;
          margin: 2px 7px;
        }

        body.dark-mode & {
          fill: #888888;
        }
      }
  
      &:hover {
        background-color: #EEEEEE;
  
        body.dark-mode & {
          background-color: #111518;
        }

        svg {
          fill: #222222;

          body.dark-mode & {
            fill: #DDDDDD;
          }
        }
      }
    }
  }

  .level {
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 3px;
    vertical-align: middle;
    
    &.high { background-color: #14c514; }
    &.mid { background-color: #1478d4; }
    &.low { background-color: #da2c15; }
  }
}

.dotnet-core-icon {
  .transparency {
    fill: #0001;
  }

  .text-color {
    fill: #fff;

    body.dark-mode & {
      fill: #111;
    }
  }

  .background-color {
    fill: #eee;

    body.dark-mode & {
      fill: #444;
    }
  }
}
</style>