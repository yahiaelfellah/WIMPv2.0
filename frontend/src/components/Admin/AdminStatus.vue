<template>
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
    <button class="pntr" id="add-state" style="margin-top: 0px">+ State</button>
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
          <input type="text" value="{{default.unavailable}}" maxlength="25" />
        </div>
        <p class="status red">{{ msg }}</p>
      </div>
    </div>
    <!-- 
        <div class="states-control">
          <button class="pntr" id="save-states">Save</button>
          <button class="pntr" id="tracker" value="{{tracking}}">
            Tracker {{ tracking }}
          </button>
          <button class="pntr" id="my-flow">My flow</button>
        </div> -->
  </main>
</template>
<script>
export default {};
</script>
