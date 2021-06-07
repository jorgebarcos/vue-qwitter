<template>
  <q-page class="relative-position">
    <q-scroll-area class="absolute fullscreen">
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
            @click="addNewQweet"
            color="primary"
            label="Qweet"
            rounded
            unelevated
            no-caps
            :disable="!newQweetContent"
            class="q-mb-lg"
          />
        </div>
      </div>

      <q-separator size="10px" color="grey-2" class="divider" />

      <q-list separator>
        <transition-group
          appear
          enter-active-class="animated fadeIn slow"
          leave-active-class="animated fadeOut slow"
        >
          <q-item class="q-py-md qweet" v-for="qweet in qweets" :key="qweet.id">
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
                <span class="text-grey-7"
                  >@jorge__barcos<br class="lt-md" />
                  &bull; {{ qweet.date | relativeDate }}
                </span>
              </q-item-label>
              <q-item-label class="qweet-content text-body1">
                {{ qweet.content }}
              </q-item-label>
              <div class="qweet-icons row justify-between q-mt-sm">
                <q-btn
                  color="grey"
                  icon="far fa-comment"
                  size="sm"
                  flat
                  round
                />
                <q-btn
                  color="grey"
                  icon="fas fa-retweet"
                  size="sm"
                  flat
                  round
                />
                <q-btn
                  @click="toggleQweet(qweet)"
                  :color="qweet.liked ? 'pink' : 'grey'"
                  :icon="qweet.liked ? 'fas fa-heart' : 'far fa-heart'"
                  size="sm"
                  flat
                  round
                />
                <q-btn
                  color="grey"
                  icon="fas fa-trash"
                  size="sm"
                  flat
                  round
                  @click="deleteQweet(qweet)"
                />
              </div>
            </q-item-section>
          </q-item>
        </transition-group>
      </q-list>
    </q-scroll-area>
  </q-page>
</template>

<script>
import db from "src/boot/firebase";
import { formatDistance } from "date-fns";
export default {
  name: "PageHome",
  data() {
    return {
      newQweetContent: "",
      qweets: [
        // {
        //   id: "ID1",
        //   content:
        //     "Mauris quis euismod mauris. Nam tortor nunc, cursus in molestie vitae, ultrices non erat. Morbi risus est, venenatis vel ultrices id, semper non risus. Duis mauris ante, molestie sit amet nulla a, convallis vulputate leo. Suspendisse eu pulvinar sem, sed luctus tellus. Etiam eu magna mollis, efficitur lectus quis, finibus risus. Vestibulum ornare euismod orci, vitae porttitor odio lacinia non. Quisque ut tincidunt quam.",
        //   date: 1623021755581,
        //   liked: false
        // },
        // {
        //   id: "ID2",
        //   content:
        //     "Mauris quis euismod mauris. Nam tortor nunc, cursus in molestie vitae, ultrices non erat. Morbi risus est, venenatis vel ultrices id, semper non risus. Duis mauris ante, molestie sit amet nulla a, convallis vulputate leo. Suspendisse eu pulvinar sem, sed luctus tellus. Etiam eu magna mollis, efficitur lectus quis, finibus risus. Vestibulum ornare euismod orci, vitae porttitor odio lacinia non. Quisque ut tincidunt quam.",
        //   date: 1623021778431,
        //   liked: true
        // }
      ]
    };
  },
  methods: {
    addNewQweet() {
      let newQweet = {
        content: this.newQweetContent,
        date: Date.now(),
        liked: false
      };
      // this.qweets.unshift(newQweet);
      // Add a new document with a generated id.
      db.collection("qweets")
        .add(newQweet)
        .then(docRef => {
          console.log("Document written with ID: ", docRef.id);
        })
        .catch(error => {
          console.error("Error adding document: ", error);
        });
      this.newQweetContent = "";
    },
    deleteQweet(qweet) {
      db.collection("qweets")
        .doc(qweet.id)
        .delete()
        .then(() => {
          console.log("Document successfully deleted!");
        })
        .catch(error => {
          console.error("Error removing document: ", error);
        });
    },
    toggleQweet(qweet) {
      db.collection("qweets")
        .doc(qweet.id)
        .update({
          liked: !qweet.liked
        })
        .then(() => {
          console.log("Document successfully updated!");
        })
        .catch(error => {
          console.error("Error updating document: ", error);
        });
    }
  },
  filters: {
    relativeDate(value) {
      return formatDistance(value, new Date());
    }
  },
  mounted() {
    db.collection("qweets")
      .orderBy("date")
      .onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          let qweetChange = change.doc.data();
          qweetChange.id = change.doc.id;
          if (change.type === "added") {
            console.log("New qweet: ", qweetChange);
            this.qweets.unshift(qweetChange);
          }
          if (change.type === "modified") {
            console.log("Modified qweet: ", qweetChange);
            let index = this.qweets.findIndex(
              qweet => qweet.id === qweetChange.id
            );
            Object.assign(this.qweets[index], qweetChange);
          }
          if (change.type === "removed") {
            console.log("Removed qweet: ", qweetChange);
            let index = this.qweets.findIndex(
              qweet => qweet.id === qweetChange.id
            );
            this.qweets.splice(index, 1);
          }
        });
      });
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
.qweet:not(:first-child)
  border-top: 1px solid rgba(0, 0, 0, 0.12)
.qweet-content
  white-space: pre-line
.qweet-icons
  margin-left: -5px
</style>
