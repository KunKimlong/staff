
    //layout javascript
    const toggle = document.getElementById('header-toggle')
    const nav = document.getElementById('nav-bar')
    const bodypd = document.getElementById('body-pd')
    const headerpd = document.getElementById('header')
    console.log(toggle+" "+ nav+" " + bodypd+ " " + headerpd);
    // Validate that all variables exist
    if(toggle && nav && bodypd && headerpd){
        toggle.addEventListener('click', ()=>{
            // show navbar
            nav.classList.toggle('show')
            // change icon
            toggle.classList.toggle('bx-x')
            // add padding to body
            bodypd.classList.toggle('body-pd')
            // add padding to header
            headerpd.classList.toggle('body-pd')
        })
    }
    else{
        console.log("Error");
    }
    
    const linkColor = document.querySelectorAll('.nav_link')
    
    function colorLink(){
        if(linkColor){
            linkColor.forEach(l=> l.classList.remove('active'))
            this.classList.add('active')
        }
    }
    linkColor.forEach(l=> l.addEventListener('click', colorLink))