class PhotoViewer {
  constructor(rootElm, images) {
    this.rootElm = rootElm;
    this.images = images;
    this.currentIndex = 0;
  }

  init() {
    const frameElm = this.rootElm.querySelector(".frame");
    const image = this.images[this.currentIndex];

    frameElm.innerHTML = `
        <div class="currentImage">
            <img src="${image}" />
        </div>
    `;
  }
}
new PhotoViewer().init();
