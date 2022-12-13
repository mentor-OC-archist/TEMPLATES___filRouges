import Tools from "./assets/Tools.js"
        let index
        , filRouge_origin_URI = ""
        , github_account = "mentor-OC-archist"
        , repo_name = "___________TO_DEFINE_______________"
        , default_working_branch = "develop"
        , prefix_host = "."
        //, tools = new Tools()
        
        //Tools.showSourceOnIframeLoad()

        select.onchange = selectOnchange
        select.focus()

        /**
         * REMPLIR LA BALISE <select/> AVEC LES TITRE jsonDatas[index].h
         */
        for(index in jsonDatas){
            let opt = document.createElement('option')
            opt.value = index
            opt.innerHTML = index+": "+jsonDatas[index].h
            opt.data = jsonDatas[index]
            // console.log(opt.data);
            select.append(opt)
        }

        /**
         * REPÈRE LE HASH DE L'URL LORSQUE LE CLIENT ARRIVE SUR LA PAGE
         * ET CHARGE L'<option/> DU <select/> CORRESPONDANTE 
         */
        let s_array = Array.from(select.querySelectorAll('option'))
        if(document.location.hash != ""){
            for(let a in s_array)if("#"+s_array[a].value == document.location.hash){
                select.selectedIndex = a
                // console.log(a.value);
                // console.log('ok');
                select.onchange()
            }
        }
         
        /**
         * PERMET DE SELECTIONNER UN NOUVEL EXERCICE
         * ////@param {event onchange} that CE N'EST PAS VRAIMENT UTILISÉ xD
         */
        function selectOnchange(){
            // console.log();
            // alert(select.selectedIndex)
            // alert(select.childNodes[select.selectedIndex].value)
            // console.log(select.querySelectorAll('option')[select.selectedIndex]);
            let opt = select.querySelectorAll('option')[select.selectedIndex]
            // alert(opt.value)
            document.location.hash = select.value
            // console.log(select.value);



            if(location.host.indexOf('localhost')==-1)prefix_host = "https://raw.githubusercontent.com/"+github_account+"/"+repo_name+"/"+default_working_branch

            iframe.src = prefix_host+"/_/"+select.value
            iframe_enonce.src = prefix_host+"/_/"+select.value+"/ENONCE.html"
            iframe_sol.src = prefix_host+"/_/"+select.value+"/_/SOLUTION/"
            iframe_codebase.src = prefix_host+"/_/"



            _codepens.innerHTML = opt.data.codepens && opt.data.codepens.map((url,i) => `<a href="${url}" target="_blank">Codepen ${select.value+" - "+(i+1)}</a>`)

        
            if(opt?.data?.begin!==false){
                _begin.href = filRouge_origin_URI+"/tree/"+select.value+"-begin"
                _begin.innerHTML = select.value+"-begin"
            }
            if(opt?.data?.begin!==false){
                _sol.href = filRouge_origin_URI+"/tree/"+select.value+"-solution"
                _sol.innerHTML = select.value+"-solution"
            }
            _SC.href = opt?.data?.liens?.[0]?.indexOf('vimeo') != -1 
                ? opt.data.liens[0]
                : ""
            _SC.innerHTML = opt.data.liens?.[0].indexOf('vimeo') != -1 
                ? "SCREENCAST vidéo"
                : ""
            
            if(opt.data.begin != "" && opt.data.begin.indexOf('codepen') == -1){
                copypast.className = ""
                from_root.innerHTML = "cd ./_/begins/"+select.value+"; npm run start"
                from_inner.innerHTML = "cd ../"+select.value+"; npm run start"
            }else copypast.className = "off"



            h1.innerHTML = p.innerHTML = tasks_p.innerHTML = tasks_ol.innerHTML = ""
            h1.innerHTML = opt.data.h
            p.innerHTML = opt.data.p
            tasks_p.innerHTML = opt.data.tasks.p
            opt.data.tasks.ol.map((item) => { 
                let li = document.createElement('li')
                li.innerHTML = item
                li.style.width = window.innerWidth > 1000 
                    ? "calc(" + (100 / Math.floor(opt.data.tasks.ol.length / 2)) + "% - 1em)"
                    : "calc(" + (100 / Math.floor(opt.data.tasks.ol.length / 3)) + "% - 1em)"
                tasks_ol.append(li) 
            })

        }

                
        /**
         * PERMET DE PASSER À L'EXERCICE ADJACENT
         * @param {INT} smthg CORRENSPOND AU NUMÉRO DE L'EXERCICE
         */
        function move(smthg){
            if(typeof smthg == "undefined" && select.selectedIndex>1){
                select.selectedIndex = select.selectedIndex - 1
                select.onchange()
            }
            if(typeof smthg != "undefined" && select.selectedIndex<26){
                select.selectedIndex = select.selectedIndex + 1
                select.onchange()
            }
            // console.log(s_array);
            // console.log(s_array[select.selectedIndex]);
            // console.log(s_array[select.selectedIndex].value);
            document.location.hash = s_array[select.selectedIndex].value
        }
        document.querySelector("header>a:first-of-type").addEventListener('click', (e)=>{e.preventDefault();move();})
        document.querySelector("header>a:last-of-type").addEventListener('click', (e)=>{e.preventDefault();move(1);})

        document.querySelectorAll("iframe+span.enhanced").forEach(ifr => { console.log(ifr); ifr.addEventListener('click', (self) => { window.open(self.target.previousSibling.previousSibling.src, '_blank') }) })
        