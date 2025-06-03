class PhotoViewer {
  constructor(rootElm, images) {
    this.rootElm = rootElm;
    this.images = images;
    this.currentIndex = 0;
  }

  init() {
    const nextButtonElm = this.rootElm.querySelector(".nextButton");
    nextButtonElm.addEventListener("click", () => {
      this.next();
    });

    const prevButtonElm = this.rootElm.querySelector(".prevButton");
    prevButtonElm.addEventListener("click", () => {
      this.prev();
    });

    this.renderImageUrls();
    this.updatePhoto();
  }

  updatePhoto() {
    const frameElm = this.rootElm.querySelector(".frame");
    const imageIndex = this.currentIndex + 1;
    const image = this.images[this.currentIndex];
    frameElm.innerHTML = `
        <div class="currentImage">
            <p class="leftItem">${imageIndex}枚目</p>
            <img src="${image}" />
        </div>
    `;
    this.startTimer();
  }

  startTimer() {
    if (this.timerKey) {
      clearTimeout(this.timerKey);
    }

    this.timerKey = setTimeout(() => {
      this.next();
    }, 3000);
  }

  next() {
    const lastIndex = this.images.length - 1;
    if (lastIndex === this.currentIndex) {
      this.currentIndex = 0;
    } else {
      this.currentIndex++;
    }
    this.updatePhoto();
  }

  prev() {
    const lastIndex = this.images.length - 1;
    if (this.currentIndex === 0) {
      this.currentIndex = lastIndex;
    } else {
      this.currentIndex--;
    }
    this.updatePhoto();
  }

  renderImageUrls() {
    const imageElm = this.rootElm.querySelector(".images");
    let imageUrlsHtml = "";

    // for...of と for...in の違いについての記事
    // https://qiita.com/a05kk/items/d6f49ca5bd15f045ea6c
    for (const image of this.images) {
      imageUrlsHtml += `
            <li>
                <a href="${image}" target="_blank">${image}</a>
            </li>
        `;
    }
    imageElm.innerHTML = imageUrlsHtml;
  }
}

const images = ["./images/S__45899792_0.jpg", "./images/S__45899794_0.jpg", "./images/S__45899795_0.jpg", "./images/S__45899796_0.jpg"];
new PhotoViewer(document.getElementById("photoViewer"), images).init();
