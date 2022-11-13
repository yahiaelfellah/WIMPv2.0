<template>
  <div id="profile">
    <header>
      <img class="logo" :src="require('../assets/logo.svg')" />
      <h1>WIMP</h1>
      <button id="logout-btn" class="pntr">Logout</button>
    </header>
      <iframe src="http://127.0.0.1:1880/#flow/f0e112650fd4fdc6" height="300px" width="500px"></iframe>
    <section id="main">
      <article>
        <img id="pp" value="{{pp}}" alt="Profile photo" />
        <h1>{{ name }}</h1>
        <h3>{{ id }}</h3>
      </article>

      <main id="main">
        <h2>Your states :</h2>
        <div id="states">
          <div id="state-{{id}}" class="state">
            <i
              id="delete-btn-{{id}}"
              class="fa-solid fa-xmark fa-lg delete-btn"
            ></i>
            <h1>{{ id }}</h1>
            <section>
              <div class="cont">
                <div class="input">
                  <p>Message :</p>
                  <input
                    id="state-msg-{{id}}"
                    type="text"
                    value="{{msg}}"
                    maxlength="25"
                  />
                </div>

                <div class="input">
                  <p>Color :</p>
                  <select id="color-selector-{{id}}" init="{{color}}">
                    <option value="green">green</option>
                    <option value="orange">orange</option>
                    <option value="red">red</option>
                  </select>
                </div>
              </div>

              <div class="visibility input">
                <p>Visibility :</p>
                <label>Student</label>
                <input
                  type="checkbox"
                  init="{{visibility.student}}"
                  id="visibility-student"
                />
                <label>Researcher</label>
                <input
                  type="checkbox"
                  init="{{visibility.researcher}}"
                  id="visibility-researcher"
                />
                <label>Colleague</label>
                <input
                  type="checkbox"
                  init="{{visibility.colleague}}"
                  id="visibility-colleague"
                />
              </div>
            </section>
            <p id="preview-{{id}}" class="status {{color}} crop">{{ msg }}</p>
          </div>
        </div>
        <button class="pntr" id="add-state" style="margin-top: 0px">
          + State
        </button>
        <div id="default-messages" class="default-messages">
          <h1 style="margin: 100px 0 30px 20px">Default messages :</h1>
          <div class="input-default">
            <div id="default-message-available" class="default-message">
              <p>Available default message :</p>
              <input type="text" value="{{default.available}}" maxlength="25" />
            </div>
            <p class="status green">{{ msg }}</p>
          </div>

          <div class="input-default">
            <div id="default-message-busy" class="default-message">
              <p>Busy default message :</p>
              <input type="text" value="{{default.busy}}" maxlength="25" />
            </div>
            <p class="status orange">{{ msg }}</p>
          </div>

          <div class="input-default">
            <div id="default-message-unavailable" class="default-message">
              <p>Unavailable default message :</p>
              <input
                type="text"
                value="{{default.unavailable}}"
                maxlength="25"
              />
            </div>
            <p class="status red">{{ msg }}</p>
          </div>
        </div>

        <div class="states-control">
          <button class="pntr" id="save-states">Save</button>
          <button class="pntr" id="tracker" value="{{tracking}}">
            Tracker {{ tracking }}
          </button>
          <button class="pntr" id="my-flow">My flow</button>
        </div>
      </main>
    </section>
    <footer class="relative-footer">
      <h3>&copy; 2022 wimp</h3>
    </footer>
  </div>
</template>
<script>
export default {
  name: "vue-admin",
  data: () => ({
    myIframe: null
  }),
  methods: {
    onLoad(frame) {
      this.myIframe = frame.contentWindow
    }
  }
};
</script>
<style scoped>
#profile article {
  display: flex;
  flex-flow: column;
  align-items: center;
}
#profile article img {
  border-radius: 100px;
  height: 120px;
  width: 120px;
  margin-bottom: 20px;
}

#profile main {
  margin-top: 30px;
  width: 100%;
  display: flex;
  flex-flow: column;
  align-items: center;
}

.state {
  width: 800px;
  display: flex;
  flex-flow: row;
  align-items: center;
  padding: 60px 0;
  border-bottom: 2px solid rgb(230, 230, 230);
}
.state:last-child {
  border-bottom: 2px solid transparent;
  padding: 60px 0 30px 0;
}

.cont {
  display: flex;
  flex-flow: row;
  align-items: center;
}
.state h1 {
  margin-right: 20px;
}

/* #profile section{
    display: flex;
    flex-flow: column;
    align-items: center;
} */

.state div.input {
  display: flex;
  flex-flow: row;
  align-items: center;
  margin: auto 10px;
  box-shadow: var(--shadow);
  background-color: var(--bg);
  padding: 12px 20px;
  border-radius: 100px;
  border: 1px solid transparent;
}

.crop {
  width: 200px !important;
  margin-left: auto;
  overflow-wrap: break-word;
  padding: 7px 20px !important;
  font-size: var(--small-text) !important;
}
.state input {
  padding: 0;
  font-size: var(--small-text);
}

.state div.input:hover {
  border: 1px solid var(--main);
}

.state p {
  font-size: var(--small-text);
  margin-right: 10px;
}

.state select {
  border: none;
  border-radius: 10%;
}

#profile button:disabled {
  color: grey;
  border-color: grey;
}

#profile button:disabled:hover {
  background-color: transparent;
  cursor: not-allowed;
}

#profile header button {
  margin-top: 0px;
}

.states-control {
  width: 800px;
  margin: 100px auto 40px auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}

.states-control > * {
  margin: 0 25px;
}

.states-control button {
  width: 150px;
  margin: 0 auto;
}

.arrow-size {
  font-size: medium;
}

.ajs-ok {
  color: var(--main) !important;
}

.visibility {
  margin-top: 20px !important;
}
.visibility > p {
  margin-right: auto;
}
.visibility input {
  margin-right: 30px;
}

.visibility label {
  margin-right: 10px;
  font-size: var(--small-text);
}

.default-messages {
  width: 800px;
}

.default-message {
  display: flex;
  flex-direction: row;
  align-items: center;
  box-shadow: var(--shadow);
  background-color: var(--bg);
  padding: 12px 20px;
  border-radius: 100px;
  font-size: var(--small-text);
  margin-bottom: 20px;
  border: 1px solid transparent;
  float: left;
  width: 450px;
}

.default-message > * {
  padding: 0;
}

.default-message > p {
  margin-right: 10px;
  float: right;
  width: 200px;
}

.default-message > input {
  font-size: var(--small-text);
}

.default-message:hover {
  border: 1px solid var(--main);
}

.input-default {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.input-default > p {
  font-size: var(--small-text);
  margin-left: auto;
}

.tracker-on {
  border-color: var(--green);
  color: var(--green);
}

.tracker-on:hover {
  border-color: var(--red);
  color: var(--bg);
  background-color: var(--red);
}

.tracker-off {
  border-color: var(--red);
  color: var(--red);
}

.tracker-off:hover {
  border-color: var(--green);
  color: var(--bg);
  background-color: var(--green);
}

#my-flow {
  width: 150px;
}

.delete-btn {
  margin-right: 20px;
  color: var(--grey);
}

.delete-btn:hover {
  cursor: pointer;
  color: var(--main);
}
</style>