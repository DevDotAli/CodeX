const cursor = document.getElementById("cursor");

let mouseX = 0;
let mouseY = 0;
let currentX = 0;
let currentY = 0;

let lastX = 0;
let lastY = 0;
let speed = 0;
let duration = 0.1;
document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX - 20;
  mouseY = e.clientY - 20;
});

function animate() {
  // Smooth interpolation
  currentX += (mouseX - currentX) * duration;
  currentY += (mouseY - currentY) * duration;

  // Calculate speed (Euclidean distance between frames)
  const dx = currentX - lastX;
  const dy = currentY - lastY;
  speed = Math.sqrt(dx * dx + dy * dy);

  // Optional: Scale cursor based on speed
  const scale = 1 + Math.min(speed / 20, 1); // Max scale of 1.5
  cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) scale(${scale})`;

  // Save last position
  lastX = currentX;
  lastY = currentY;

  requestAnimationFrame(animate);
}
animate();

/*
//  Shrink on leave
let cursorWidth = cursor.getBoundingClientRect();
document.addEventListener("mouseleave", () => {
  let currentSize = cursorWidth.width;
  const shrink = setInterval(() => {
    if (currentSize <= 0) {
      clearInterval(shrink);
      cursor.style.display = "none";
      return;
    }
    currentSize--;
    cursor.style.width = `${currentSize}px`;
    cursor.style.height = `${currentSize}px`;
  }, 10);
});

//  Grow on enter
document.addEventListener("mouseenter", () => {
  let currentSize = 0;
  cursor.style.display = "block";
  const grow = setInterval(() => {
    if (currentSize >= cursorWidth.width) {
      clearInterval(grow);
      return;
    }
    currentSize++;
    cursor.style.width = `${currentSize}px`;
    cursor.style.height = `${currentSize}px`;
  }, 10);
});

*/
const blendTargets = document.querySelectorAll(".blend");

blendTargets.forEach((el) => {
  el.addEventListener("mouseenter", () => {
    cursor.style.mixBlendMode = "multiply";
  });
  el.addEventListener("mouseleave", () => {
    cursor.style.mixBlendMode = "normal";
  });
});

const cursorDisappear = document.querySelectorAll(".disappear");

cursorDisappear.forEach((el) => {
  el.addEventListener("mouseenter", () => {
    cursor.style.opacity = 0;
  });

  el.addEventListener("mouseleave", () => {
    cursor.style.opacity = 1;
  });
});

const wrapper = document.querySelector(".magnet-wrapper");
const button = wrapper.querySelector(".magnet-button");

let magnetX = 0;
let magnetY = 0;

const strength = 1.7;

wrapper.addEventListener("mousemove", (e) => {
  const rect = wrapper.getBoundingClientRect();
  const x = e.clientX - rect.left - rect.width / 2;
  const y = e.clientY - rect.top - rect.height / 2;

  magnetX = x / strength;
  magnetY = y / strength;

  button.style.transform = `translate(${magnetX}px, ${magnetY}px)`;
});

wrapper.addEventListener("mouseleave", () => {
  const decay = 0.5;
  const bounces = 4;
  const giggleFrames = [];

  let factor = 0.6;
  let direction = 2.5;

  for (let i = 0; i < bounces; i++) {
    const x = magnetX * factor * direction;
    const y = magnetY * factor * direction;
    giggleFrames.push([x, y]);
    direction *= -1;
    factor *= decay;
  }

  giggleFrames.push([0, 0]);

  let i = 0;
  const runGiggle = () => {
    if (i >= giggleFrames.length) return;
    const [x, y] = giggleFrames[i];
    button.style.transform = `translate(${x}px, ${y}px)`;
    i++;
    setTimeout(runGiggle, 40);
  };

  runGiggle();
});

const scroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
});

const album = document.querySelector("#album");
const image = document.querySelector(".pictures");
album.addEventListener("mouseenter", () => {
  image.style.display = "block";
});
album.addEventListener("mouseleave", () => {
  image.style.display = "none";
});
var rect = document.querySelectorAll(".rect");
rect.forEach((el) => {
  el.addEventListener("mouseenter", () => {
    var images = el.getAttribute("data-image");
    image.style.backgroundImage = `url(${images})`;
  });
});
