<template>
  <router-view/>
</template>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  --primary-color: #44AFBB;
  --background-color: #262626;
  --text-color: #FFFFFF;
}

body,
input,
textarea {
  font-family: Poppins, Helvetica, Arial, sans-serif;
}

#app {
  color: var(--text-color);
  // background: var(--background-color);
}

.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.flex-col {
  flex-direction: column;
}

h1 {
  letter-spacing: 1px;
  font-weight: 600;
  line-height: 1.3;
  text-align: center;

  b, strong {
    color: var(--primary-color);
  }
}

h2 {
  font-weight: 200;
  font-size: 19px;
}

.container {
  width: 1200px;
}

.btn {
  border: none;
  outline: none;
  font-size: 18px;
  padding: 14px 22px;
  border-radius: 6px;
  font-weight: 700;

  &.btn-primary {
    background: var(--primary-color);
    color: #161616;
    transition: .3s;

    &:hover {
      background: lighten(#44AFBB, 10);
    }
  }
}

.flex-center-100vh {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
