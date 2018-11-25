function addNavigation() {
  if (!document.getElementsByTagName('button')[0]) {
    const htmlBlock = '<div class="navigation">'
      + '<button class="arrow prev"><</button>'
      + '<div class="dots"></div>'
      + '<button class="arrow next">></button>'
      + '</div>';
    document.body.innerHTML += htmlBlock;
  }
}
