<template>
  <div class="about">
    <h1>This is the about page</h1>
    <p>
      Why is there an about page here? I don't know, but I checked "Add
      routing?" when Nx asked me while generating a new Vue project. So here it
      is.
    </p>
    <p>
      Since where here, I might as well tell what this App is all about: this is
      a to do list for Luke Skywalker. Where he can keep track of the stuff he
      needs to do while/after/before saving the galaxy.
    </p>
    <p>Look at him. He's so happy!</p>
    <img
      src="https://kesseljunkie.files.wordpress.com/2017/09/wwn-achtobaby.jpg?w=1000"
    />
  </div>
</template>

<style scoped lang="scss">
.about {
  max-width: 600px;
  margin: 0 auto;

  img {
    max-width: 100%;
  }
}
</style>
