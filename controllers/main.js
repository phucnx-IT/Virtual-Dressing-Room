$(document).ready(function () {
        let callData = new CallData();
        let listChosen = new ListChosen();
        getData();
        function getData() {
                callData.getListData().done(
                        function (result) {
                                let contentNavPills = "";
                                let contentTabPanes = "";
                                result.navPills.forEach((item, index)=>{
                                        let activeClass = item.tabName == "tabTopClothes" ? "active" : "";
                                        let fadeClass = item.tabName == "tabTopClothes" ? "" :"fade";
                                        let arrTabPanes = result.tabPanes.filter((panes)=> item.type == panes.type);
                                        if(arrTabPanes){
                                                contentNavPills += getElmTabPill(item, activeClass);
                                                contentTabPanes += getElmTabPanes(item,arrTabPanes,activeClass, fadeClass);
                                        }
                                                
                                });
                                $(".tab-content").html(contentTabPanes);
                                $(".nav-pills").html(contentNavPills);
                        }
                ).fail(
                        function (err) {
                                console.log(err);
                        }
                );
        }

        const getElmTabPill = (item, activeClass)=>{
                return `
                <li class="nav-item">
                        <a class="nav-link ${activeClass} btn-default" data-toggle="pill"
                        href="#${item.tabName}"
                        >${item.showName}</a>
                </li>
                `
        }
        const getElmTabPanes = (item,arrTabPanes,activeClass, fadeClass)=>{
                let divPanes = '';
                arrTabPanes.forEach((panes)=>{
                        divPanes += renderPanes(panes);
                });
                return `
                        <div class='tab-pane container ${activeClass} ${fadeClass}' id="${item.tabName}">
                                <div class="row">
                                        ${divPanes}
                                </div>
                        </div>
                `
        }
        const renderPanes = (item) =>{
                let elmItem = `
                        <div class="col-md-3 mt-3">
                                <div class="card text-center">
                                        <img src="${item.imgSrc_jpg}">
                                        <h4><b>${item.name}</b></h4>
                                        <button data-id="${item.id}" data-type="${item.type}" data-name="${item.name}" data-desc="${item.desc}" data-imgsrcJpg="${item.imgSrc_jpg}" data-imgsrcPng="${item.imgSrc_png}" class="changStyle">Thử đồ</button>
                                </div>
                        </div>
                `
                return elmItem;
        }
        $("body").delegate(".changStyle","click",function(){
                let id = $(this).data("id");
                let type = $(this).data("type");
                let name = $(this).data("name");
                let desc = $(this).data("desc");
                let imgsrc_jpg = $(this).data("imgsrcjpg");
                let imgsrc_png = $(this).data("imgsrcpng");
                let choseItem = new ChoseItem (id, type, name, desc, imgsrc_jpg, imgsrc_png);
                let findIndex = listChosen.arr.findIndex((item)=>{
                        return item.type == choseItem.type
                })
                if(findIndex != -1){
                        listChosen.arr[findIndex] = choseItem;
                }else{
                        listChosen.addItem(choseItem);
                }
                listChosen.arr.forEach(item=>{
                        if(item.type == 'topclothes'){
                                renderBikiniTop(item.imgsrc_png);
                        }
                        if(item.type == 'botclothes'){
                                renderBikiniBot(item.imgsrc_png);
                        }
                        if(item.type == 'shoes'){
                                renderShoes(item.imgsrc_png);
                        }
                        if(item.type == 'handbags'){
                                renderHandbags(item.imgsrc_png);
                        }
                        if(item.type == 'necklaces'){
                                renderNecklaces(item.imgsrc_png);
                        }
                        if(item.type == 'hairstyle'){
                                renderHairstyle(item.imgsrc_png);
                        }
                        if(item.type == 'background'){
                                renderBackground(item.imgsrc_png);
                        }
                })
        })

        function renderBikiniTop(img){
                $(".bikinitop").css({
                        width:"500px",
                        height:"500px",
                        background:`url(${img})`,
                        position:"absolute",
                        top:"-9%",
                        left:"-5%",
                        zIndex:"3",
                        transform:"scale(0.5)"
                })
        }
        function renderBikiniBot(img){
                $(".bikinibottom").css({
                        width:"500px",
                        height:"1000px",
                        background:`url(${img})`,
                        position:"absolute",
                        top:"-30%",
                        left:"-5%",
                        zIndex:"2",
                        transform:"scale(0.5)"
                })
        }
        const renderShoes = (img)=>{
                $(".feet").css({
                        background:`url(${img})`
                })
        }
        const renderHandbags = (img)=>{
                $(".handbag").css({
                        background:`url(${img})`
                })
        }
        const renderNecklaces = (img)=>{
                $(".necklace").css({
                        background:`url(${img})`
                })
        }
        const renderHairstyle = (img)=>{
                $(".hairstyle").css({
                        background:`url(${img})`
                })
        }
        const renderBackground = (img)=>{
                $(".background").css({
                        background:`url(${img})`
                })
        }
})