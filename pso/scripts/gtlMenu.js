flyIn = function(){
    document.getElementById("app").className = "application flyIn";
}
flyOut = function(){
    document.getElementById("app").className = "application flyOut";
}
var gtlMenu = function(){

    var CMenu = function(oTopLevelHTML){
        var self = this;
        self.id = oTopLevelHTML.id;
        self.selector = oTopLevelHTML;
        self.selector.addEventListener('click', Menu.SetActive, false);
        self.Menu = document.getElementById(self.id + "-gtlMenu");
        self.Options = (document.getElementById(self.id + "-gtlMenu-options")).getElementsByTagName('a');
        self.Contents = self.Menu.getElementsByClassName("gtlMenuSelectedContent");
        
        self.height = self.Menu.scrollHeight;
        self.currentSelection = -1;
        self.SetActiveOption(0);
        self.Select = function(e){
            var id = e.currentTarget.id.substring(e.currentTarget.id.lastIndexOf("-") + 1);
            self.SetActiveOption(id)
        }
        
        for(var i = 0; i < self.Options.length; i++){
            self.Options[i].addEventListener('click', self.Select, false);
        }
        
    }
    CMenu.prototype.Expand = function(){
        this.Menu.className = "gtlMenuSecondLevel";
        this.Menu.style.height = this.height + "px";
        this.selector.parentElement.style.backgroundColor = "#EEEEEE";
        this.selector.parentElement.style.borderTopLeftRadius = "10px";
        this.selector.parentElement.style.borderBottomRightRadius = "10px";
        this.selector.style.color = "#161616";
    }
    CMenu.prototype.Collapse = function(){
        this.Menu.className = "gtlMenuSecondLevel collapse";
        this.Menu.style.height = "0px";
        this.selector.parentElement.style.backgroundColor = "";
        this.selector.parentElement.style.borderTopLeftRadius = "";
        this.selector.parentElement.style.borderBottomRightRadius = "";
        this.selector.style.color = "";
    }
    CMenu.prototype.SetActiveOption = function(index){
        //Release Current Selection
        if(this.currentSelection >= 0){
            //Clear li
            this.Options[this.currentSelection].parentElement.className = "";
            this.Options[this.currentSelection].style.color = "";
            
            //Clear Content
            this.Contents[this.currentSelection].style.display = "none";
        }
        
        //Clear li
        this.Options[index].parentElement.className = "gtlMenuSelected";
        this.Options[index].style.color = "#161616";
        
        //Clear Content
        this.Contents[index].style.display = "block";
        
        this.currentSelection = index;
    }
    
    var Menu = {
        HTML: {
            Main: null,
            Toggle: {
                a: null,
                img: null
            },
            TopLevel: {
                html: null,
                anchors: []
            }
        },
        Load: function(){
            Menu.HTML.Main = document.getElementById("gtlMenu");
            
            Menu.HTML.Toggle.a = document.getElementById("gtlMenu-toggle");
            Menu.HTML.Toggle.img = Menu.HTML.Toggle.a.childNodes[0];
            
            Menu.HTML.Toggle.a.addEventListener('click', Menu.Toggle, false);
            
            Menu.HTML.TopLevel.html = document.getElementById("gtlMenuTopLevel");
            Menu.HTML.TopLevel.anchors = Menu.HTML.TopLevel.html.getElementsByTagName('a');
            
            for(var i = 0; i < Menu.HTML.TopLevel.anchors.length; i++){
                Menu[Menu.HTML.TopLevel.anchors[i].id] = new CMenu( Menu.HTML.TopLevel.anchors[i]);
            }
            
        },
        Toggle: function(e){
            
            if(Menu.visible){
                //Collapse Active gtlMenu
                if(Menu.Current != ""){
                    Menu[Menu.Current].Collapse();
                }
                
                Menu.HTML.Main.style.bottom = "-37px";
                Menu.HTML.Toggle.img.src = "images/arrow_top.png";
                Menu.visible = false;
            }
            else{
                Menu.HTML.Main.style.bottom = "0px";
                 Menu.HTML.Toggle.img.src = "images/arrow_bottom.png";
                Menu.visible = true;
            }
        },
        visible: true,
        SetActive: function(e){
            //Clear Current
            if(Menu.Current != ""){
                Menu[Menu.Current].Collapse();
            }
            
            //If already selected, Collapse gtlMenu
            if(Menu.Current == e.currentTarget.id){
                Menu[e.currentTarget.id].Collapse();
                Menu.Current = "";
            }
            else{//Otherwise Expand
                Menu[e.currentTarget.id].Expand();
                
                Menu.Current = e.currentTarget.id;
            }
            
            
        },
        Current: ""
        
    }
    
    return Menu;
}

