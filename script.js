let totalPages=20
var currentPage=1
let ChangePage
var rows=5
let array=''

let div=tn('div')

let titl=tn('h1')
titl.setAttribute('id','title')
titl.innerHTML='PAGINATION'
div.append(titl)

let desc=tn('p')
desc.setAttribute('id','description')
desc.innerHTML='This Webpage is about Pagination using DOM'
div.append(desc)

let divt=tn('div')
divt.className='table-responsive'
let TABLE=tn('table')      
TABLE.setAttribute('required','')
TABLE.className="table table-bordered"
let THEAD=tn('thead')
THEAD.className='table-dark'
let tr=tn('tr')
let td1=tn('th')
td1.innerHTML='ID'
let td2=tn('th')
td2.innerHTML='Name'
let td3=tn('th')
td3.innerHTML='Email'

let TBODY=tn('tbody')

tr.append(td1,td2,td3)
THEAD.append(tr)


divt.append(TABLE)
TABLE.append(THEAD,TBODY)

div.append(titl,desc,divt)

let div2=tn('div')
div2.className='d-flex justify-content-center'
div2.setAttribute('id','buttons')
let nav=tn('nav')
nav.setAttribute('aria-label','Page navigation example')
let ul=tn('ul')
ul.className='pagination justify-content-center'


let li1=[]
for ( var i=0;i<totalPages+2;i++)
{
    let pagintemp=`
                        <li class="page-item">
                        <a class="page-link" href="#">${i}</a>
                        </li>
                 `
    ul.innerHTML+=pagintemp

}

ul.append(li1)
nav.append(ul)
div2.append(nav)

document.body.append(div,div2)

function tn(td){
    let res=document.createElement(td)
    return res
}

function nextPrev (){
    let btn=document.getElementsByClassName('page-link')
    for ( var i=0;i<totalPages+2;i++){
        btn[i].addEventListener('click',clickedPage)

        if (btn[i].innerHTML==="0"){
            btn[i].innerHTML='<< prev'
            btn[i].id='prev'
        }
        else if ( btn[i].innerHTML==='21'){
            btn[i].innerHTML='next >>'
            btn[i].id='next'
        }
        else if (btn[i].innerHTML>0 && btn[i].innerHTML<21){
            btn[i].id=`${i}`
        }
    }
}
nextPrev()

pageNunmberChange(1)

function createTable (start, end){
    let paginData= new XMLHttpRequest();
    paginData.open('get','https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json', true)
    paginData.send()
    paginData.onload=function (){
    let pdata=JSON.parse(paginData.response)

    for ( var i=start;i<end;i++){
    //for ( var i=0;i<100;i++){
    let templet=`
                        <tr>
                            <td>${pdata[i].id}</td>
                            <td>${pdata[i].name}</td>
                            <td>${pdata[i].email}</td>
                        </tr>
                `
        console.log(templet)
        TBODY.innerHTML+=templet 
        }
    }
}

function clickedPage(events){
    
    let res=events.target.id
    
    if (res==='prev'){
        res=currentPage-1
        pageNunmberChange(res) 
    }
    if (res==='next'){
        res=currentPage+1
        pageNunmberChange(res)
    }
    else{
        pageNunmberChange(res)
    }
}

function pageNunmberChange(num){

    currentPage=num

    if (num<1) num=1
    if ( num>totalPages) num=totalPages

    var startPoint= (num-1)*rows
    var endPoint=startPoint+rows

    createTable (startPoint, endPoint)

    if (num===1){
        document.getElementById('prev').style.visibility='hidden'
    }
    else {
        document.getElementById('prev').style.visibility='visible'
    }

    if (num===totalPages){
        document.getElementById('next').style.visibility='hidden'
    }
    else {
        document.getElementById('next').style.visibility='visible'
    }
    
}