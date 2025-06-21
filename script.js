const cursor = document.getElementById("cursor");

let mouseX = 0;
let mouseY = 0;
let currentX = 0;
let currentY = 0;
const speed = 0.2;
let size = 30;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animate() {
  currentX += (mouseX - currentX) * speed;
  currentY += (mouseY - currentY) * speed;
  cursor.style.transform = `translate(${currentX}px, ${currentY}px)`;
  requestAnimationFrame(animate);
}
animate();
/*
//  Shrink on leave
document.addEventListener("mouseleave", () => {
  let currentSize = size;
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
    if (currentSize >= size) {
      clearInterval(grow);
      return;
    }
    currentSize++;
    cursor.style.width = `${currentSize}px`;
    cursor.style.height = `${currentSize}px`;
  }, 10);
});
*/
const wrapper = document.querySelector(".magnet-wrapper");
const button = wrapper.querySelector(".magnet-button");

wrapper.addEventListener("mouseleave", () => {
  button.style.transform = `translate(0, 0)`;
});
let magnetX = 0;
let magnetY = 0;

wrapper.addEventListener("mousemove", (e) => {
  const rect = wrapper.getBoundingClientRect();
  const x = e.clientX - rect.left - rect.width / 2;
  const y = e.clientY - rect.top - rect.height / 2;

  const strength = 3;
  magnetX = x / strength;
  magnetY = y / strength;

  button.style.transform = `translate(${magnetX}px, ${magnetY}px)`;
});

wrapper.addEventListener("mouseleave", () => {
  // create giggle steps from current position
  const decay = 0.4; // how much smaller each bounce is
  const bounces = 4; // total number of wiggles
  const giggleFrames = [];

  let factor = 0.4; // initial bounce is 40% back
  let direction = 2;
  for (let i = 0; i < bounces; i++) {
    const x = magnetX * factor * direction;
    const y = magnetY * factor * direction;
    giggleFrames.push([x, y]);
    direction *= -1; // switch direction
    factor *= decay; // shrink next bounce
  }

  giggleFrames.push([0, 0]); // final reset to center

  // Animate the frames
  let i = 0;
  const runGiggle = () => {
    if (i >= giggleFrames.length) return;
    const [x, y] = giggleFrames[i];
    button.style.transform = `translate(${x}px, ${y}px)`;
    i++;
    setTimeout(runGiggle, 40); // ~25fps, smooth enough
  };

  runGiggle();
});
const blendTargets = document.querySelectorAll(".blend");

blendTargets.forEach((el) => {
  el.addEventListener("mouseenter", () => {
    cursor.style.mixBlendMode = "difference";
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
