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




function isMobile() {
    var Uagent = navigator.userAgent||navigator.vendor||window.opera;
      return(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(Uagent)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(Uagent.substr(0,4))); 
  };







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


function toggle_mute(video){
    setTimeout(()=>{
        video.muted = video.muted == true ? false : true
        videos.filter(v => v != video && v.muted == false).forEach(v => v.muted = true)
    }, 500)
}

if(!isMobile()){
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
}


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

async function handlepointerdown(e){
    e.preventDefault()
    let dragging = await is_dragging();
    if(!dragging){
        toggle_mute(e.target);
    }else{
        handle_drag(e)
    }
}

function is_dragging(){
    return new Promise((resolve)=>{
        window.onpointermove = ()=>{
            window.onpointermove = ()=>{}
            window.setTimeout(()=>{
                window.onpointerup = ()=>{}
                resolve(true)
            }, 100)
        }
        window.onpointerup = ()=>{
            window.onpointermove = ()=>{}
            window.onpointerup = ()=>{}
            resolve(false)
        }
    })
}

window.onpointerdown = handlepointerdown

function handle_drag(e){
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

    window.onpointerup = e =>{
        last_percentage = next_percentage
    
        window.onpointermove = ()=>{}
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




function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}


