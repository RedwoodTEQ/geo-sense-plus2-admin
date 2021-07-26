<template>
  <!--If contains items array, create expansion item, and recursively create child item.-->
  <q-expansion-item
    v-if="items"
    expand-separator
    :icon="icon"
    :label="title"
    :caption="caption"
  >
    <q-list class="q-pl-lg">
      <LeftDrawerItem
        v-for="item in items"
        :key="item.title"
        v-bind="item"
      />
    </q-list>
  </q-expansion-item>

  <!--Else, create item.-->
  <q-item v-else
          :to="to" exact
          clickable
          v-ripple
  >
    <q-item-section
      v-if="icon"
      avatar
    >
      <q-icon :name="icon"/>
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>
        {{ caption }}
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script lang="ts">
import { Vue, prop, Options } from 'vue-class-component'

class Props {
  readonly title!: string
  readonly caption = prop({ default: '' })
  readonly to = prop({ default: '#' })
  readonly icon = prop({ default: '' })
  readonly items!: Record<string, unknown>
}

@Options({})
export default class LeftDrawerItem extends Vue.with(Props) {
}
</script>
