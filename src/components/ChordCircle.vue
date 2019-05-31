<template>
    <b-container>
      <b-row style="background-color: lightgray;">
        <b-navbar toggleable="lg" variant="light">
          <b-navbar-brand href="#">Chord Maker</b-navbar-brand>
            <b-nav-item-dropdown text="Mode" style="list-style-type: none;">
              <b-dropdown-item href="#" @click="modeChosen('Ionian')">Ionian</b-dropdown-item>
              <b-dropdown-item href="#" disabled>Aeolian</b-dropdown-item>
            </b-nav-item-dropdown>

            <b-nav-item-dropdown text="Root" style="list-style-type: none;">
              <b-dropdown-item href="#" @click="rootChosen('C')">C</b-dropdown-item>
              <b-dropdown-item href="#" disabled>C#</b-dropdown-item>
            </b-nav-item-dropdown>

            <b-nav-text>
              You are in the key of: {{root}} {{ mode }}
            </b-nav-text>
        </b-navbar>
      </b-row>

      <b-row>

        <!-- this column houses chord circle -->
        <b-col md="8" style="position: relative">
          <template>
            <button class="note"
              @click="inputNote(index)"
              :class="{ 
                diatonic: currentKey[index].diatonic, 
                chromatic: !currentKey[index].diatonic,
                one: index == 0,
                two: index == 1,
                three: index == 2,
                four: index == 3,
                five: index == 4,
                six: index == 5,
                seven: index == 6,
                eight: index == 7,
                nine: index == 8,
                ten: index == 9,
                eleven: index == 10,
                twelve: index == 11
              }" 
              v-for="(item, index) in currentKey" :key="index">
              {{ currentKey[index].note }}
            </button>
          </template>
        </b-col>

        <!-- this column houses start, mode, root, score. Save option later. -->
        <b-col md="4">
          <b-button variant="success" @click="getRandChord">Get a chord</b-button>
          <template>
            <p style="margin-top: 100px">Click all the notes in the</p>
            <h3>{{ currentChordName }}</h3>
            <p>chord</p>
            <p>Your answer: {{ userAnswers.toString() }}</p>
            <b-button
              variant="primary"
              @click="checkAnswer"
              style="margin-top: 40px">Submit
            </b-button>
          </template>
        </b-col>

      </b-row>

    </b-container>
</template>

<script>
import db from '@/firebase/init'
import _ from 'lodash'

export default {
  name: 'ChordCircle',
  data() {
    return {
      choseMode: false,    // return to false when done testing
      choseRoot: false,    // return to false when done testing
      mode: '',
      root: '',
      currentChordName: '',
      currentKey: [],
      userAnswers: [],
      currentChordBank: [],
      currentChordAnswer: []
    } 
  },
  methods: {
    getRandChord: function() {
      if (this.choseMode != true || this.choseRoot != true) {
        alert('Please select a mode and root.')
      } 
      else {
        let range = this.currentChordBank.length
        let randNum = Math.floor(Math.random() * range);
        this.currentChordAnswer = this.currentChordBank[randNum].chordnotes
        this.currentChordName = this.currentChordBank[randNum].chordname
      }
    },
    inputNote: function(index) {
      let note = this.currentKey[index].note
      console.log('pushed ' + note + ' to userAnswers array')
      this.userAnswers.push(note)
    },
    modeChosen: function(mode) {
      this.choseMode = true
      this.mode = mode
    },
    rootChosen: function(root) {
      this.choseRoot = true
      this.root = root
    },
    checkAnswer: function() {
      if (_.isEqual(_.sortBy(this.userAnswers), _.sortBy(this.currentChordAnswer))) {
        alert('Correct!')
        this.getRandChord();
      }
      else {
        alert('Sorry! Incorrect.')
      }
      this.userAnswers = []
    }  
  },
  mounted(){
    // fetch data from the firestore
    db.collection('CIonian').get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        this.currentKey.push(doc.data())
      })
    })
    db.collection('CIonianChords').get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        this.currentChordBank.push(doc.data())
      })
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

/* changes color of diatonic vs chromatic notes */
.diatonic {
  background-color: lightblue;
  border: none;
}
.chromatic {
  background-color: lightgreen;
  border: none;
}

/* common style for all circular note buttons */
.note {
  border-radius: 100px;
  height: 70px;
  width: 70px;
}
.note:hover {
  border-style: solid;
  border-width: 3px;
  border-color: gray;
}
/* classes below to position each note button in circular arrangement */
.one {
  position: absolute;
  top: 40px;
  left: 300px;
}
.two {
  position: absolute;
  top: 64px;
  left: 390px;
}
.three {
  position: absolute;
  top: 130px;
  left: 456px;
}
.four {
  position: absolute;
  top: 220px;
  left: 480px;
}
.five {
  position: absolute;
  top: 310px;
  left: 456px;
}
.six {
  position: absolute;
  top: 376px;
  left: 390px;
}
.seven {
  position: absolute;
  top: 400px;
  left: 300px;
}
.eight {
  position: absolute;
  top: 376px;
  left: 210px;
}
.nine {
  position: absolute;
  top: 310px;
  left: 144px;
}
.ten {
  position: absolute;
  top: 220px;
  left: 120px;
}
.eleven {
  position: absolute;
  top: 130px;
  left: 144px;
}
.twelve {
  position: absolute;
  top: 64px;
  left: 210px;
}


</style>
