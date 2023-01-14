addEventListener('wheel', (event) => {
    event.preventDefault()
    let sensitivity = 0.3
    let delta = {
        x: event.deltaX * sensitivity,
        y: event.deltaY * sensitivity
    }

    compute_delta(delta)

    last_percentage = next_percentage
});










let grid = document.querySelector(".image_grid")
let images = Array.from(document.querySelectorAll(".image"))

let tiles = Array.from(grid.querySelectorAll(".tile"))
let columns = Math.ceil(Math.sqrt(tiles.length))

grid.style.setProperty("--columns", columns)

shuffle(tiles)
tiles.forEach(tile =>{
    grid.removeChild(tile)
    grid.appendChild(tile)
})

let videos = Array.from(grid.querySelectorAll("video"))

videos.forEach(video =>{
    video.ondblclick = ()=>{
        setTimeout(()=>{
            video.muted = video.muted == true ? false : true
            videos.filter(v => v != video && v.muted == false).forEach(v => v.muted = true)
        }, 500)
    }
})

tiles.forEach((tile, i) =>{
    tile.onmouseover = (e)=>{
        window.setTimeout(()=>{
            trigger_stagger_animation_over(i)
        }, 5)

    }
    tile.onmouseout = (e)=>{
        trigger_stagger_animation_out(i)
    }
})

const trigger_stagger_animation_over = (index)=>{
    anime({
        targets: '.tile',
        easing: "linear",
        scale: anime.stagger([1.1, 0.7], {grid: [4, 5], from: index}),
        delay: anime.stagger(100, {grid: [4, 5], from: index}),
        duration: 200
    })
}

const trigger_stagger_animation_out = (index)=>{
    anime({
        targets: '.tile',
        easing: "linear",
        scale: 1,
        delay: anime.stagger(20, {grid: [4, 5], from: index}),
        duration: 100,
    })
}


let mouse_down_at = {
    x: 0,
    y: 0
}
let next_percentage = {
    x: 0,
    y: 0
}
let last_percentage = {
    x: 0,
    y: 0,
}

window.onpointerdown = e =>{
    e.preventDefault()
    mouse_down_at = {
        x: e.clientX,
        y: e.clientY
    }

    window.onpointermove = e =>{
        let sensitivity = 0.85
        const mouseDelta = {
            x: (mouse_down_at.x - e.clientX) * sensitivity,
            y: (mouse_down_at.y - e.clientY) * sensitivity
        }

        compute_delta(mouseDelta)
    }
}

const compute_delta = (delta)=>{
    const maxDelta = {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2
    }
    const percentage = {
        x: delta.x / maxDelta.x * -100,
        y: delta.y / maxDelta.y * -100
    }
    next_percentage = {
        x: Math.min(2, Math.max(-50, last_percentage.x + percentage.x)),
        y: Math.min(1, Math.max(-65, last_percentage.y + percentage.y))
    }

    grid.animate({
        transform: `translate(${next_percentage.x}%, ${next_percentage.y}%)`
    }, {duration: 1200, fill:"forwards"})

    images.forEach(image =>{
        image.animate({
            objectPosition: `${100 + next_percentage.x}% ${60 + next_percentage.y/5}%`
        }, {duration: 1200, fill:"forwards"})
    })
}

window.onpointerup = e =>{
    mouse_down_at = 0;
    last_percentage = next_percentage

    window.onmousemove = ()=>{}
}




const lazyLoadInstance = new LazyLoad({
    // Your custom settings go here
});

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}


