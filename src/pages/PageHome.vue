<template>
  <q-page>
    <div class="q-py-lg q-px-md row items-end q-col-gutter-md">
      <div class="col">
        <q-input
          bottom-slots
          v-model="newQweetContent"
          class="new-qweet"
          placeholder="What's happening?"
          counter
          maxlength="280"
          autogrow
        >
          <template v-slot:before>
            <q-avatar size="xl">
              <img
                src="https://es.gravatar.com/userimage/140485787/ded6e4a586fac7c16cbe46c7358b45bf.jpg?size=200"
              />
            </q-avatar>
          </template>
        </q-input>
      </div>
      <div class="col col-shrink">
        <q-btn
          color="primary"
          label="Qweet"
          rounded
          unelevated
          no-caps
          :disable="newQweetContent"
          class="q-mb-lg"
        />
      </div>
    </div>

    <q-separator size="10px" color="grey-2" class="divider" />

    <q-list>
      <q-item class="q-py-md">
        <q-item-section avatar top>
          <q-avatar size="xl">
            <img
              src="https://es.gravatar.com/userimage/140485787/ded6e4a586fac7c16cbe46c7358b45bf.jpg?size=200"
            />
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-subtitle1"
            ><strong>Jorge Barcos</strong>
            <span class="text-grey-7">@jorge__barcos</span>
          </q-item-label>
          <q-item-label class="qweet-content text-body1">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Rationeitaque vitae nemo animi? Veniam temporibus aliquid placeat
            dolores sapiente hic. Error distinctio molestias ex porro, facilis
            ducimus eveniet necessitatibus nulla?
          </q-item-label>
          <div class="qweet-icons row justify-between q-mt-sm">
            <q-btn color="grey" icon="far fa-comment" size="sm" flat round />
            <q-btn color="grey" icon="fas fa-retweet" size="sm" flat round />
            <q-btn color="grey" icon="far fa-heart" size="sm" flat round />
            <q-btn color="grey" icon="fas fa-trash" size="sm" flat round />
          </div>
        </q-item-section>

        <q-item-section side top>
          1 min ago
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
export default {
  name: "PageHome",
  data() {
    return {
      newQweetContent: ""
    };
  }
};
</script>

<style lang="sass">
.new-qweet
  textarea
    font-size: 19px
    line-height: 1.4 !important
.divider
  border-top: 1px solid
  border-bottom: 1px solid
  border-color: $grey-4
.qweet-content
  white-space: pre-line
.qweet-icons
  margin-left: -5px
</style>
