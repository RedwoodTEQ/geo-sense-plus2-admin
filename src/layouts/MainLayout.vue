<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <!-- Todo: Environment variables-->
        <q-toolbar-title>
          Geo Sense Plus2 Admin Sandbox
        </q-toolbar-title>
        <div>v{{ 0.01 }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="bg-grey-1"
    >
      <q-list>
        <!-- Group Components-->
        <!-- Todo: Collapse & expanding -->
        <q-item-label
          header
          class="text-grey-8"
        >
          Components
        </q-item-label>

        <LeftDrawerItem
            v-for="item in leftDrawerList"
            :key="item.title"
            v-bind="item"
        />

        <!-- Group external links -->
        <q-expansion-item
          expand-separator
          icon="link"
          label="External links"
          caption="Open in new page"
        >
          <!-- Indentation list by `class="q-pl-lg"` -->
          <q-list class="q-pl-lg">
            <EssentialLink
                v-for="link in essentialLinks"
                :key="link.title"
                v-bind="link"
            />
          </q-list>
        </q-expansion-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import EssentialLink from 'components/EssentialLink.vue'
import LeftDrawerItem from 'components/LeftDrawerItem.vue'

// External links
const linksList = [
  {
    title: 'Docs',
    caption: 'Quasar v2.0.0-beta',
    icon: 'school',
    link: 'https://next.quasar.dev/'
  },
  {
    title: 'Icon set',
    caption: 'Material icon list',
    icon: 'art_track',
    link: 'https://fonts.google.com/icons?selected=Material+Icons&icon.query=public'
  },
  {
    title: 'Github',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework'
  },
  {
    title: 'Discord Chat Channel',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: 'https://chat.quasar.dev'
  },
  {
    title: 'Forum',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev'
  },
  {
    title: 'Twitter',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: 'https://twitter.quasar.dev'
  },
  {
    title: 'Facebook',
    caption: '@QuasarFramework',
    icon: 'public',
    link: 'https://facebook.quasar.dev'
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev'
  }
]

// Internal components
const leftDrawerItems = [
  {
    title: 'Home',
    caption: 'Home page',
    icon: 'home',
    to: '/'
  },
  {
    title: 'Map',
    caption: 'Map placeholder',
    icon: 'place',
    to: '/map'
  },
  {
    // Expansion item
    title: 'Chart',
    icon: 'insights',
    caption: 'Charts components',
    items: [
      // Child item
      {
        caption: 'Chart01 placeholder',
        icon: 'leaderboard',
        to: '/chart/chart01'
      },
      // Child item
      {
        caption: 'Chart02 placeholder',
        icon: 'pie_chart',
        to: '/chart/chart02'
      }
    ]
  }
]

import { Vue, Options } from 'vue-class-component'

@Options({
  components: { EssentialLink, LeftDrawerItem }
})
export default class MainLayout extends Vue {
  leftDrawerOpen = false;
  essentialLinks = linksList;
  leftDrawerList = leftDrawerItems;
  toggleLeftDrawer () {
    this.leftDrawerOpen = !this.leftDrawerOpen
  }
}
</script>
