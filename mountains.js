// This page was written 90% by my with the help of ai (that 10%) because js is fucking bullshit

let sheight = window.innerHeight
let swidth = window.innerWidth

const svg = document.querySelector("svg")
svg.setAttribute("viewBox", `0 0 ${swidth} ${sheight}`)

let scale = 25
let fuckyness = 0.35
let simmilarity = 0.65
let detail = 7.5
let spaced = 1.5

// toning
let toning = true
let tone_top = 0.5
let tone_bottom = 0.0

let length = swidth/detail+5
let rows = sheight/(spaced*scale) / 2.5

let d = ""
let h = 0
let line = []
let all_rows = []
for (let x = 0; x < rows; x++) {
  let curr_line = []
  let pts = []
  h = 0
  for (let y = 0; y < length; y++) {
    h += (Math.random() - 0.5) * fuckyness
    h *= 0.97
    let v = line.length
      ? simmilarity * line[y] + Math.sqrt(1 - simmilarity*simmilarity) * h
      : h
    let px = y*detail
    let py = sheight - (rows - x) * spaced * scale + v * scale
    d += `${y === 0 ? "M" : "L"} ${px} ${py} `
    pts.push(`${px} ${py}`)
    curr_line.push(v)
  }
  line = curr_line
  all_rows.push(pts)
}

let bands = ""
if (toning) {
  for (let i = 0; i < all_rows.length; i++) {
    let t = all_rows.length > 1 ? i/(all_rows.length-1) : 0
    let alpha = tone_top + (tone_bottom - tone_top) * t
    let below = i < all_rows.length-1
      ? all_rows[i+1].slice().reverse().join(" L ")
      : `${(length-1)*detail} ${sheight} L 0 ${sheight}`
    bands += `<path d="M ${all_rows[i].join(" L ")} L ${below} Z" fill="white" fill-opacity="${alpha.toFixed(3)}" stroke="none"/>`
  }
}

document.getElementById("bands").innerHTML = bands
document.getElementById("polyline").setAttribute("d", d)
