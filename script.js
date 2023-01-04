let grid = document.querySelector(".image_grid")
let images = Array.from(document.querySelectorAll(".image"))
let templates = Array.from(document.querySelector(".templates").children)
shuffle(templates)

templates.forEach(element =>{
    grid.appendChild(element)
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

window.onmousedown = e =>{
    e.preventDefault()
    mouse_down_at = {
        x: e.clientX,
        y: e.clientY
    }

    window.onmousemove = e =>{
        const mouseDelta = {
            x: mouse_down_at.x - e.clientX,
            y: mouse_down_at.y - e.clientY
        }
        const maxDelta = {
            x: window.innerWidth / 2,
            y: window.innerHeight / 2
        }
        const percentage = {
            x: mouseDelta.x / maxDelta.x * -100,
            y: mouseDelta.y / maxDelta.y * -100
        }
        next_percentage = {
            x: Math.min(2, Math.max(-50, last_percentage.x + percentage.x)),
            y: Math.min(1, Math.max(-65, last_percentage.y + percentage.y))
        }
    
        console.log(next_percentage)
        grid.animate({
            transform: `translate(${next_percentage.x}%, ${next_percentage.y}%)`
        }, {duration: 1200, fill:"forwards"})

        images.forEach(image =>{
            image.animate({
                objectPosition: `${100 + next_percentage.x}% ${60 + next_percentage.y/5}%`
            }, {duration: 1200, fill:"forwards"})
        })
    }
}

window.onmouseup = e =>{
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